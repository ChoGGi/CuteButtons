"use strict";
const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
//cbCommon.dump();

const EXPORTED_SYMBOLS = ["cbCommon"];

var cbCommon = {

  addonID: null,
  prefs: Services.prefs.getBranch("extensions.cutebuttons."),
  profileDir: FileUtils.getDir("ProfD",["CuteButtonsSVG"],true),

  getProfileFile: function(file)
  {
    return FileUtils.getFile("ProfD",["CuteButtonsSVG",file]);
  },

  getAddonFile: function(file)
  {
    return FileUtils.getFile("ProfD",["extensions",cbCommon.addonID,"content",file]);
  },

  //removes CuteButtonsSVG directory from Profile when user removes addon
  cleanUpProfileDir: function()
  {
    this.profileDir.remove(true);
  },

  //copy file from ext dir to profile dir
  copyFile: function(fileAddon,fileProfile,name)
  {
    //remove old file and copy new one over
    try {
      //checking for file existence means an extra file operation (less = better)
      fileProfile.remove(false);
    } catch(e) {
      //so we just ignore error if file doesn't exist
    }
    //copyTo doesn't let you overwrite existing files, so we had to do the above
    fileAddon.copyTo(this.profileDir,name);
  },

  //copy over css files from addon to profile directory, if dates are newer
  cssCopy: function()
  {
    function copyCSS(file)
    {
      var fileAddon = cbCommon.getAddonFile(file),
      fileProfile = cbCommon.getProfileFile(file);
      cbCommon.copyFile(fileAddon,fileProfile,file);
    }
    function filelist()
    {
      copyCSS("Icons.Hover.css");
      copyCSS("Icons.CheckmarkButton.css");
      copyCSS("Icons.CheckmarkButtonHover.css");
      copyCSS("Icons.CheckmarkMenu.css");
      copyCSS("Icons.CheckmarkMenuHover.css");
      copyCSS("Icons.RadioButton.css");
      copyCSS("Icons.RadioButtonHover.css");
      copyCSS("Icons.RadioMenu.css");
      copyCSS("Icons.RadioMenuHover.css");
      copyCSS("Statusbar-4evar.css");
      copyCSS("Statusbar.css");
    }

    var cssFileProfile = cbCommon.getProfileFile("Icons.Normal.css"),
    cssFileAddon = cbCommon.getAddonFile("Icons.Normal.css");

    //check if file doesn't exist or check if stored date and addon file date are different
    if (cssFileProfile.exists() == false) {
      cssFileAddon.copyTo(this.profileDir,"Icons.Normal.css");
      filelist();
    } else if (cssFileAddon.lastModifiedTime != this.prefs.getCharPref("cssdate")) {
      cssFileProfile.remove(false);
      cssFileAddon.copyTo(this.profileDir,"Icons.Normal.css");
      filelist();
      //add date of addon file to pref for next startup check above
      //to let people can edit files in \Profile\CuteButtonsSVG (at least till next version update)
      this.prefs.setCharPref("cssdate",cssFileAddon.lastModifiedTime);
    }

    //check for the old (pre v0.4.7) files, and remove them
    try {
      cbCommon.getProfileFile("Icons.css").remove(false);
      //when ^ is missing it'll fail, so the below won't do anything
      cbCommon.getProfileFile("CheckmarkIcons.css").remove(false);
      cbCommon.getProfileFile("Menubar.css").remove(false);
      cbCommon.getProfileFile("RadioIcons.css").remove(false);
    } catch(e) {/*don't care*/}
  },

  //copy over css files from addon to profile directory, if dates are newer (or user switched mosaic file)
  mosaicCopy: function()
  {
    var m = this.mosaicFile,
    mosaicNormal = this.prefs.getIntPref("mosaicnormal"),
    mosaicHover = this.prefs.getIntPref("mosaichover");

    switch(mosaicNormal) {
    case 0:
      m("mosaic.normal.png",mosaicNormal,1);
    break;
    case 1:
      m("mosaic.faded.png",mosaicNormal,1);
    break;
    case 2:
      m("mosaic.brighter.png",mosaicNormal,1);
    break;
    case 3:
      m("mosaic.gray.png",mosaicNormal,1);
    break;
    }

    switch(mosaicHover) {
    case 0:
      m("mosaic.normal.png",mosaicHover);
    break;
    case 1:
      m("mosaic.faded.png",mosaicHover);
    break;
    case 2:
      m("mosaic.brighter.png",mosaicHover);
    break;
    case 3:
      m("mosaic.gray.png",mosaicHover);
    break;
    }
  },

  mosaicFile: function(nameAddon,mosaic,filename)
  {
    var nameProfile,
    pref;
    if (filename) {
      nameProfile = "mosaic.png";
      pref = "mosaicnormalwhich";
    } else {
      nameProfile = "mosaic.hover.png";
      pref = "mosaichoverwhich";
    }
    var fileAddon = cbCommon.getAddonFile(nameAddon),
    fileProfile = cbCommon.getProfileFile(nameProfile);

    if (cbCommon.prefs.getIntPref(pref) != mosaic) {
    //numbers don't match; no need to check file dates, just copy and call it a day
      cbCommon.copyFile(fileAddon,fileProfile,nameProfile);
      //update mosaicWhich so we aren't copying the same file all the time
      cbCommon.prefs.setIntPref(pref,mosaic);
    } else if (fileProfile.exists() == false)
    //if it doesn't exist (first run)
      fileAddon.copyTo(cbCommon.profileDir,nameProfile);
    else if (fileProfile.lastModifiedTime != fileAddon.lastModifiedTime) {
    //profile file time is different from addon file time so copy over
      cbCommon.copyFile(fileAddon,fileProfile,nameProfile);
    }
  },

  //get the first window available
  getMainWindow: function()
  {
    var wm = Services.wm.getMostRecentWindow,
    mainWin = wm("navigator:browser");//Firefox/Palemoon/Seamonkey
    if (!mainWin)
      mainWin = wm("mail:3pane");//thunderbird
    return mainWin;
  },

  dump: function(aString)
  {
    try {
      Services.console.logStringMessage("CuteButtons:\n " + aString);
    } catch(e) {
      this.catchError(e);
    }
  },

  catchError: function(e)
  {
    //http://blogger.ziesemer.com/2007/10/javascript-debugging-in-firefox.html
    try {
      if (e.stack)
        Cu.reportError(e.stack);
    } finally {
      //throw e;
      return null;
    }
  }

};
