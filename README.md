# CuteButtons

* [Changelog](https://choggi.org/misc/CuteButtonsCrystalSVG/change.log)
* If you have icons missing/wrong, or you want an extension added then please send me an [email](mailto:CuteButtonsCrystalSVG@choggi.org).
* for a signed extension see [here](https://choggi.org/misc/CuteButtonsCrystalSVG/), or [Releases](https://github.com/ChoGGi/CuteButtons/releases) (the point releases will have a different ID then the release versions)

```
Inspired by/uses code & icon set from CuteMenus - Crystal SVG (you don't need to have CuteMenus installed).
```

### Adds icons to these extensions, and generic icons to others:
##### (this list hasn't been updated for ages)
```
Adblock Filterset.G Updater, Adblock Plus, AI Roboform, Autocopy, Autofill Forms
Back to Top, Bookmark DD, British English Dictionary
Calc, Cache Status. Cache View, CacheViewer, Chatzilla, Chrome List, CLE, Clippings, CookieSafe, CustomizeGoogle
Dictionarysearch, Download Statusbar, DownThemAll!
Easy DragToGo, Enigmail, Explore Chrome
FasterFox, Favicon Picker 2, FEBE, Fetch Text URL, Firebug, FireFTP, Fission, FlashGot, Forecastfox, FormFiller, FoxMarks, Foxy Proxy, Foxytunes
Gmail Manager, Gmail Notifier, Googlebar Lite, GreaseMonkey, GSpace
HTML Validator
IE Tab, IEView Lite
JSView
keyconfig
Lightning, LinkVisitor, Live HTTP Headers, LiveClick
Menu Editor, MinimizeToTray, MR Tech Toolkit (Local Install), Multiple Tab Handler
NoScript, NoSquint, Nostalgy
Objection, ObPwd, OmniSidebar, Organize Search Engines, Organize Status Bar
PageShortcuts, Password Hasher, Password Exporter, PasswordMaker, PDF Download, Personal Menu, Perspectives, Public Fox
QuickNote
RDFViewer, Redirect Remover, Remove it Permanently, RSS Ticker
Sage, Save Link in Folder, Secure Login, Session Manager, Smart Link, SmoothWheel, SQLite Manager, Show Picture, Splash!, Split Browser, StumbleUpon, Stylish, Stylish-Custom, StyleSheet Chooser Plus
Tab Mix Plus, TargetKiller, Titlebar Tweaks, Tweak Network
Update Notifier, Update Scanner, Unplug
View Cookies
WeatherBug, Wizz RSS
Xmarks
LouCypher's inspectWindow.uc.js/inspectChrome.uc.js
```


### How to manually install in Firefox 57+

* Navigate to your [Firefox profile](https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data)\chrome folder
* Open UserChrome.css/UserContent.css in your preferred editor (if they don't exist see [here](http://kb.mozillazine.org/index.php?title=UserChrome.css))
* Add this line to the top of both files:
```
@import url("Icons.Normal.css");
```
###### Optional (open each css file for a description):
```
/*checkmarks/radios*/
@import url("Icons.CheckmarkButton.css");
@import url("Icons.CheckmarkMenu.css");
@import url("Icons.RadioButton.css");
@import url("Icons.RadioMenu.css");

/*change icon style on mouse over*/
@import url("Icons.Hover.css");
@import url("Icons.CheckmarkButtonHover.css");
@import url("Icons.CheckmarkMenuHover.css");
@import url("Icons.RadioButtonHover.css");
@import url("Icons.RadioMenuHover.css");

/*blur disabled menuitems*/
@import url("BlurDisabledIcons.css");

/*rotate icons on mouseover/click*/
@import url("RotateIcons.css");
```
###### Statusbar icons:
```
/*used with Status-4-Evar extension*/
@import url("Statusbar-4evar.css");

/*only needed for decrepit-fox that had an actual statusbar*/
@import url("Statusbar.css");
```
###### Fixes for other OSes (Linux/*BSD/macOS):
```
/*Linux/*BSD fix (skip if using different OS)*/
@import url("UnixFix.css");
/*macOS fix (skip if using different OS)*/
@import url("OSXFix.css");
```
###### If you want to hide icons on buttons or menus, then add _one_ of the below:
```
/*removes all icons from buttons*/
@import url("NoIconsButtons.css");
/*removes all icons from menus*/
@import url("NoIconsMenus.css");
```
(for UserChrome.css: Make sure to add these lines **above** the @namespace line)

* Click on the Github Clone or download button above, then click Download ZIP, and extract it somewhere
* Copy over whichever content/*.css files you want to the chrome folder
* Rename one of the content/mosaic*.png files to:
```
mosaic.png
mosaic.hover.png (if using *Hover.css)
```
* and place in the chrome folder along with the CSS files (PNG filenames are case-sensitive)

##### Image with example: https://github.com/ChoGGi/CuteButtons/issues/5