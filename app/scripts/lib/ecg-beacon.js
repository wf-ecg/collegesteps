/*jslint white:false */
/*globals window, console, document, ga */

//<!-- Google Analytics -->
//<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-5483042-1', 'auto');  // Replace with your property ID.
ga('send', 'pageview');
//</script>
//<!-- End Google Analytics -->

var Beacon = (function (W) {

    var self, start = 0;

    function log() {
        if (!W.console) return;
        if (!console.log.apply) console.log(arguments);
        else console.log.apply(console, arguments);
    }

    self = {
        interval: 15e3, // 15 second intervals
        _: null,
        now: function () {
            return (1 * new Date());
        },
        start: function () {
            start = start || self.now();
            return start;
        },
        elapsed: function () {
            return self.now() - self.start();
        },
        throttle: function (func, wait) {
            var args, result, thisArg, lastCalled = 0, timeoutId = null;

            function trailingCall() {
                lastCalled = new Date();
                timeoutId = null;
                result = func.apply(thisArg, args);
            }
            return function () {
                var now = new Date(),
                remaining = wait - (now - lastCalled);

                args = arguments;
                thisArg = this;

                if (remaining <= 0) {
                    W.clearTimeout(timeoutId);
                    timeoutId = null;
                    lastCalled = now;
                    result = func.apply(thisArg, args);
                } else if (!timeoutId) {
                    timeoutId = W.setTimeout(trailingCall, remaining);
                }
                return result;
            };
        },
        beacon: function (act) {
            ((W.ga && (!W.debug || W.debug < 1)) ? ga : log)('send', {
                'hitType': 'event',             // !
                'eventCategory': 'engagement',  // !
                'eventAction': act,             // !
                'eventLabel': 'Beacon',
                'eventValue': (self.elapsed() / 1000) | 0
            });
        },
        pulse: function () {
            log('Beacon running ' + (W.debug ? 'in console' : 'live'));
            return self.throttle(function () {
                self.beacon('movement');
            }, self.interval);
        },
        init: function (sec) {
            self.interval = sec || self.interval;

            W.onload = function () {
                W.addEventListener ?
                W.document.addEventListener('mousemove', self.pulse(), false) :
                W.attachEvent && W.document.attachEvent('onmousemove', self.pulse());
            };
        }
    };
    return self;

}(window));

Beacon.init();
