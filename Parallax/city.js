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
                    speed = 15;
                    break;
                case 1:
                    speed = 20;
                    break;
                case 2:
                    speed = 30;
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
    });
}