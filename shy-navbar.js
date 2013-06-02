//
// shy-navbar.js - Add “shyness” into your navigation bar.
// https://github.com/lqez/shy-navbar
//
// usage : addShyness("#navbar");
//
function addShyness(target)
{
    return function(target) {
        // Change these variables to suit your favor.
        var thresholdUp = 10;
        var thresholdDown = 80;
        var animationDelay = 250;
        var animationDur = 150;

        var $navbar = $(target);
        var lastScrollTop = 0;

        $(window).scroll(function () { 
            var position = $navbar.css('position');
            var height = $navbar.height();
            var scrollTop = $(this).scrollTop()

            if( scrollTop < height ) {
                $navbar.clearQueue().css({ top: 0, position: 'absolute' });
            } else {
                if( scrollTop < lastScrollTop ) {
                    if( position != 'fixed' && ( scrollTop + thresholdDown < lastScrollTop ) ) {
                        $navbar.clearQueue()
                            .css({ top: '-'+height+'px', position: 'fixed' })
                            .delay(animationDelay).animate({ top: 0 }, animationDur);
                    }
                } else if( position == 'fixed' && ( scrollTop - thresholdUp > lastScrollTop ) ) {
                    $navbar.clearQueue()
                        .delay(animationDelay).animate({ top: '-'+height+'px' }, animationDur, function() { 
                            $(this).clearQueue().css({ top: 0, position: 'absolute' });
                        });
                }
            }
            lastScrollTop = scrollTop;
        });
    }(target);
}
