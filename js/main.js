$(document).ready(function () {

    $(function () {

        // Изменение текста в зависимости от состояния: есть или нет в наличии
        $('.state').each(function () {
            if ($(this).hasClass('state-in-stock')) {
                $(this).text('Товар есть в наличии');
            }
            else if ($(this).hasClass('state-not-available')) {
                $(this).text('Товара нет в наличии');
            }
        });

        $('.navigation-all-special-image').each(function () {
            let width = $(this).width();
            $(this).attr('style', 'left: calc(50% - ' + (width / 2) + 'px);');
        })

    });

    // Закрыть блок, если жмякнули мимо блока
    $(document).mouseup(function (e) {
        let popup = $('.active');
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            $(popup).removeClass('active');
            $('.navigation-item').removeClass('next');
        }
    });

    // Открыть меню в шапке
    $(document).on('click', '.navigation-item', function () {
        let list_id = $(this).find('.navigation-item-link').data('listid');

        $('.navigation-item').addClass('next');
        $(this).addClass('active');

        $('.navigation-all__container').addClass('active');
        $('[data-list = ' + list_id + ']').addClass('active')
    });

    // Фиксация шапки и навигации, если доскроллили до навигации
    let $window = $(window);
    let $sidebar = $("#navigation");
    let $header = $(".header");
    let $sidebarHeight = $sidebar.innerHeight();
    let $footerOffsetTop = $(".footer").offset().top;
    let $sidebarOffset = $sidebar.offset();

    // Скролл до определенного момента
    $window.scroll(function () {
        if ($window.scrollTop() > $sidebarOffset.top + 110) {
            $sidebar.addClass("fixed");
            $header.addClass("fixed");
        } else {
            $sidebar.removeClass("fixed");
            $header.removeClass("fixed");
        }
        if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
            $sidebar.css({"top": -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});
            $header.css({"top": -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});
        } else {
            console.log('It is work');
        }
    });

    // Иницализация параллакса
    $(window).scroll(function (e) {
        parallaxScroll();
    });

    // Функция генерация скорости для параллакса
    function parallaxScroll() {
        let scrolled = $(window).scrollTop();

        this.speed03 = .05 * $(this).scrollTop();
        this.speed1 = .1 * $(this).scrollTop();
        this.speed2 = .2 * $(this).scrollTop();
        this.speed3 = .15 * $(this).scrollTop();
        this.speed4 = .4 * $(this).scrollTop();

        // БГ в швейцарском блоке
        $('.brand-good-bg').css({
            transform: "translate3d(0," + this.speed4 + "px,0)",
            "-webkit-transform": "translate3d(0," + this.speed4 + "px,0)",
            "-moz-transform": "translate3d(0," + this.speed4 + "px,0)",
            "-o-transform": "translate3d(0," + this.speed4 + "px,0)",
            "-ms-transform": "translate3d(0," + this.speed4 + "px,0)"
        });
    }

    // Слайдер на главной
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 125,
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
            dragSize: 300,
        },
        navigation: {
            nextEl: '.special-btn.next',
            prevEl: '.special-btn.prev',
        }
    });

});

