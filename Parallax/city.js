var data = {
    clicks : 0
}

var alignAll = function(){
    $('.center').css({
        'left' : $(window).width()/2 - $($('.center')[0]).width()/2+  'px',
        'width' : $('#godzilla').width() + 'px'
    });

    $('#linkedIn').css({
        'left': $(window).width()/3 - $('#linkedIn').width()/2+  'px',
        'bottom' : '0px'
    });
    $('#email').css({
        'left': $(window).width()/2 - $('#email').width()/2+  'px',
        'bottom' : '0px'
    });
    $('#github').css({
        'right': $(window).width()/3 - $('#github').width()/2+  'px',
        'bottom' : '0px'
    });

    $('#initialText').css({
        'left' : $(window).width()/2 - $('#initialText').width()/2+  'px'
    });

    $('#finalText').css({
        'left' : $(window).width()/2 - $('#finalText').width()/2+  'px'
    });
}

var lifeToggle = function (id) {
    $.each($('.life'), function (index, value) {
        if ($(this).attr('id') === id) {
            $(this).show();
            return true;
        }
        $(this).hide();
    });
}

window.onresize = function(){
    alignAll();
}

window.onload = function() {
    var $html = $('html');
    var $body = $('body');
    var $style = $('<style>');

    

    var layers = ['front', 'middle', 'back'];
    $.each(layers, function(index, value) {
        $container = $('<div>', { id: value, class: 'container' });
        var counter = 1;
        for (var i = 0; i < 209; i++) {
            var $building = $('<div>', { id: 'building' + i, class: 'building building_' + value });

            if (i === 0) {
                var $keyframes = '@keyframes anim0';
                $keyframes += '{0%{ left: -10%;} 100%{ left: 100%;}}';
                $style.append($keyframes);
            }
            if (i > 99) {
                var $keyframes = '@keyframes anim' + i;
                $keyframes += '{0%{ left:' + parseInt(i - 109) + '%;} 100%{ left: ' + parseInt(i + 1) + '%;}}';
                $style.append($keyframes);
            }

            var speed = 0;
            switch (index) {
                case 0:
                    speed = 50;
                    break;
                case 1:
                    speed = 70;
                    break;
                case 2:
                    speed = 90;
                    break;
            }

            $building.css({
                'animation-name': i > 99 ? 'anim' + i : 'anim0',
                'animation-duration': speed + 's',
                'animation-delay': i > 99 ? 0 + 's' : i * (speed / 100) + 's',
                'animation-iteration-count': i > 99 ? '1' : 'infinite',
                'animation-fill-mode': 'forwards',
                'animation-timing-function': 'linear'
            });

            if (i > 99) {
                counter += 1;
            }

            $building.css({ 'height': Math.floor(Math.random() * 100) + (100 * (index + 1)) })

            $container.append($building);
        }
        $html.append($style);
        $body.append($container);
        alignAll();

        $($('.center')[0]).unbind().click(function () {
            data.clicks += 1;
            var self = $(this);
            self.css({
                'opacity': '.4'
            });
            setTimeout(function () {
                self.css({
                    'opacity': '1'
                });
            }, 100);

            setTimeout(function () {
                self.css({
                    'opacity': '.4'
                });
            }, 200);
            setTimeout(function () {
                self.css({
                    'opacity': '1'
                });
            }, 300);

            if (data.clicks === 1){
                lifeToggle('life2');
            }
            if (data.clicks === 2){
                lifeToggle('life3');
            }
            if (data.clicks === 3) {
                lifeToggle('life4');

                $('#initialText').hide();
                $('#finalText').show();
                $('.textContainer').css({
                    'animation-name': '',
                    'animation-duration': '0s'
                })

                $(this).css({
                    'animation-name': 'die',
                    'animation-iteration-count': 1
                });
                $.each($('.container'), function (index, value) {
                    $(this).css({
                        'animation-name': '',
                        'animation-duration': '0s'
                    });
                });

                setTimeout(function () {
                    $('.center')[0].remove();

                    var animateIcons = {
                        'animation-name': 'throwIcons',
                        'animation-duration': '.5s',
                        'animation-delay': '0s',
                        'animation-iteration-count': '1',
                        'animation-fill-mode': 'forwards',
                        'animation-timing-function': 'linear',
                    };

                    $('#github').css(animateIcons);
                    $('#email').css(animateIcons);
                    $('#linkedIn').css(animateIcons);

                }, 2000);
            }
        });
    });
}