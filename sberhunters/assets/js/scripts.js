$('button').on('touchstart', function (e) {
    $(this).addClass('mobile-touch');
});

$('button').click(function(e) {
    e.preventDefault();

    $(this).removeClass('mobile-touch');

    $('body').removeAttr('class');
    $('.preloader').addClass('visible');
    $('.section, .question, .answer').removeClass('visible');

    var _result = false;

    if ( $(this).hasClass('button--get-answer') ) {
        var text = 'На самом деле',
            data = _data.quest[_count - 1],
            number = _count,
            image = $('body').find('.answer .image'),
            content = $('body').find('.answer .content'),
            tagline = $('body').find('.answer .title--answer'),
            label = 'true';

        if ( $(this).hasClass('button--false') ) {
            text = 'Ты прав!';
            label = 'false';
            _false++;
        }

        $('body').addClass('page-quest').addClass('page-answer').addClass('page-a' + number);

        $(tagline).empty().append(text);
        $(content).empty().append(data.answer);
        $(image).empty().append('<img src="assets/images/i/'+data.a_image+'.svg" />');

        if (_count == 5) {
            $('body').addClass('page-result-next');

            $('body').find('.button--next').remove();
            $('body').find('.button--get-result').addClass('visible');
        }


        ga('send', 'event', 'sberbank_project', 'myth'+number, label);

        $('.quest, .answer').addClass('visible');
    } else if ( $(this).hasClass('button--start') || $(this).hasClass('button--next') ) {
        var data = _data.quest[_count],
            number = _count + 1,
            title = $('body').find('.question .title'),
            image = $('body').find('.question .image'),
            content = $('body').find('.question .content');

        $('body').addClass('page-quest').addClass('page-question').addClass('page-q'+number);

        $(title).empty().append(data.title);
        $(content).empty().append('<p>'+data.question+'</p>');
        $(image).empty().append('<img src="assets/images/i/'+data.q_image+'.svg" />');

        $('.quest, .question').addClass('visible');

        if ( $(this).hasClass('button--start') ) {
            ga('send', 'event', 'sberbank_project', 'start');
        } else {
            ga('send', 'event', 'sberbank_project', 'next'+_count);
        }

        _count++;
    } else if ( $(this).hasClass('button--get-result') ) {
        $('body').addClass('page-result');

        var content = $('body').find('.result .content');

        if ( _false < 2 ) {
            $(content).append('<p>'+_data.result[0]+'</p>');
        } else if ( _false < 4 ) {
            $(content).append('<p>'+_data.result[1]+'</p>');
        } else {
            $(content).append('<p>'+_data.result[2]+'</p>');
        }

        $('.result').addClass('visible');

        $('.footer').addClass('visible');

        ga('send', 'event', 'sberbank_project', 'result');

        _result = true;
    }

    setTimeout(function() {
        $('.preloader').removeClass('visible');
    }, 1000);

    if ( _result === true ) {
        setTimeout(function() {
            $('body').find('.banner__result__layer--1').addClass('animation-start');
        }, 600);

        setTimeout(function() {
            $('body').find('.banner__result__layer--5').addClass('animation-start-destroyers');
        }, 1000);
    }

    $("html, body").animate({ scrollTop: 0 }, "fast");
});

$('a').click(function() {
    if ($(this).hasClass('vk')) {
        ga('send', 'event', 'sberbank_project', 'final', 'share_vk');
    }

    if ($(this).hasClass('ok')) {
        ga('send', 'event', 'sberbank_project', 'final', 'share_ok');
    }

    if ($(this).hasClass('vk')) {
        ga('send', 'event', 'sberbank_project', 'final', 'share_fb');
    }

    if ($(this).hasClass('link-rating')) {
        ga('send', 'event', 'sberbank_project', 'final', 'rating');
    }

    if ($(this).hasClass('link-vacancies')) {
        ga('send', 'event', 'sberbank_project', 'final', 'vacancies');
    }
});