shy-navbar - Add "shyness" into your navigation bar.
====================================================


Navigation bar is a common design asset used widely in web site design. But it is - **sometimes** - not so handy,

 - When it just stucked at top : Scrolling up to the bar in long long page makes me crazy.
 - When it had `position:fixed` : But my phone screen size is not so tall.

Sounds familiar? then just add `shy-navbar` into your one.


Install
-------

 - Need `jQuery`.
 - Download and include [shy-navbar.js](https://raw.github.com/lqez/shy-navbar/master/shy-navbar.js) at the end of your project or wherever you want.
 - Call `$("#navbar").shy();`.
 - Change threshold and other variables to suit your taste.
 - Done.
 - ...or, call `$("#navbar").brave();` to fix it on top again. :)

Sample
------

<http://lqez.github.io/shy-navbar/>


Updates
-------

 - v0.2.0 : Replace css animations to css transitions for mobile devices.
 - v0.1.0 : Initial release.


Motive
------

Facebook mobile app provides a 'quick-accessible' sub-navigation bar contains buttons in their 'news feed' page.
It hides automatically when it scrolled down and appears again if user scrolled up rapidly, even not at top.
( It makes me little bit confused - `up-down` or `down-up`, whatever, (sigh). ) 


License
-------

Distributed under MIT license.
