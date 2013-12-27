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
            thresholdDown: 80,
            animationDelay: 250,
            animationDur: 150
        }, options);

        var $this = this;
        var lastScrollTop = 0;
        var shy = {
            previousStyles: {
                'position': this.css('position'),
                     'top': this.css('top'),
                 'z-index': this.css('z-index')
            },
            handler: function () {
                var position = $this.css('position');
                var height = $this.height();
                var scrollTop = $(this).scrollTop()

                if( scrollTop <= 0 ) {
                    $this.clearQueue().css({ top: 0, position: 'absolute' });
                } else {
                    if( scrollTop < lastScrollTop ) {
                        if( position != 'fixed' && ( scrollTop + settings.thresholdDown < lastScrollTop ) ) {
                            $this.clearQueue()
                                .css({ top: '-'+height+'px', position: 'fixed' })
                                .delay(settings.animationDelay).animate({ top: 0 }, settings.animationDur);
                        }
                    } else if( position == 'fixed' && ( scrollTop - settings.thresholdUp > lastScrollTop ) ) {
                        $this.clearQueue()
                            .delay(settings.animationDelay).animate({ top: '-'+height+'px' }, settings.animationDur, function() { 
                                $(this).clearQueue().css({ top: 0, position: 'absolute' });
                            });
                    }
                }
                lastScrollTop = scrollTop;
            }
        };

        this.data('shy', shy);
        this.css({
            'position': 'absolute',
                 'top': '0',
             'z-index': '1'
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
