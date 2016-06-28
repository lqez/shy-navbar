//
// shy-navbar.js - Add “shyness” into your navigation bar.
// https://github.com/lqez/shy-navbar
//
// usage : $("#navbar").shy();
//
(function ($) {
    $.fn.shy = function(options) {
        if (options == 'off' || options == 'brave') {
            this.brave();
            return;
        }
        // for re-initialization
        if (typeof this.data('shy') == 'object') {
            this.brave();
        }
        // Change these variables to suit your favor.
        var settings = $.extend({
            thresholdUp: 10,
            thresholdDown: 50,
            animationDelay: 250,
            animationDur: 150
        }, options);

        var $this = this;
        var lastScrollTop = 0;
        var durInSec = (settings.animationDur / 1000.0) + 's';

        var shy = {
            previousStyles: {
                'position': this.css('position'),
                'top': this.css('top'),
                'z-index': this.css('z-index'),
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            },
            handler: function () {
                var position = $this.css('position');
                var height = $this.height();
                var scrollTop = $(this).scrollTop()

                if( scrollTop <= height ) {
                    $this.clearQueue()
                        .css({
                            '-webkit-transform': 'translateY(0)',
                            'transform': 'translateY(0)'});
                } else {
                    if( scrollTop < lastScrollTop ) {
                        if( scrollTop + settings.thresholdDown < lastScrollTop ) {
                            $this.clearQueue().delay(settings.animationDelay).queue(function() {
                                $(this).css({
                                    '-webkit-transform': 'translateY(0)',
                                    'transform': 'translateY(0)'});
                                 $(this).dequeue();
                            });
                        }
                    } else if( position == 'fixed' && ( scrollTop - settings.thresholdUp > lastScrollTop ) ) {
                        $this.clearQueue().delay(settings.animationDelay).queue(function() {
                            $(this).css({
                                '-webkit-transform': 'translateY(-100%)',
                                'transform': 'translateY(-100%)'});
                             $(this).dequeue();
                        });
                    }
                }
                lastScrollTop = scrollTop;
            }
        };

        this.data('shy', shy);
        this.css({
            'position': 'fixed',
            'top': '0',
            'z-index': '1',
            '-webkit-transition': '-webkit-transform ' + durInSec,
            'transition': 'transform ' + durInSec
        });
        $(window).on('scroll', shy.handler);
    };

    $.fn.brave = function() {
        var shy = this.data('shy');

        if (shy && typeof shy.handler == 'function') {
            $(window).off('scroll', shy.handler);
            this.clearQueue();
            for (var key in shy.previousStyles) {
                this.css(key, shy.previousStyles[key]);
            }
        }
    };
}(jQuery));
