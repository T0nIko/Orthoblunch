$(document).ready(function () {

    // Изменение количества товара
    let count = 1;
    $(document).on('click', '.add', function () {
        let input_id = '.' + $(this).data('countid'); // куда вписывать количество
        let price_id = $(this).data('priceid'); // куда вписывать сумму
        let base_summ = '#' + $(this).data('baseid'); // обратиться к инпуту с базовой суммой
        base_summ = $(base_summ).attr('value'); // взять базовую сумму

        count++;
        let new_summ = base_summ * count;

        $(input_id).attr('value', count); // запись нового количества
        $('.' + price_id).text(new_summ); // запись суммы в видимый блок
        $('#' + price_id).attr('value', new_summ); // запись суммы в скрытый инпут
    });
    $(document).on('click', '.remove', function () {
        let input_id = '.' + $(this).data('countid'); // куда вписывать количество
        let price_id = $(this).data('priceid'); // куда вписывать сумму
        let summ = $('.' + price_id).text(); // взять сумму после умножения
        let base_summ = '#' + $(this).data('baseid'); // обратиться к инпуту с базовой суммой
        base_summ = $(base_summ).attr('value'); // взять базовую сумму

        if (count > 1) {
            count--;
            let new_summ = summ - base_summ;

            $(input_id).attr('value', count); // запись нового количества
            $('.' + price_id).text(new_summ); // запись суммы в видимый блок
            $('#' + price_id).attr('value', new_summ); // запись суммы в скрытый инпут
        }
        // теги в каталоге
        else if ($(this).hasClass('catalog-tag-item-icon')) {
            $(this).parent('.catalog-tag-item').toggleClass('active-item');
        }
    });

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

        // Посчет ширины картинки и расположение ее по центру
        // Выпадающий блок из навигации
        $('.navigation-all-special-image').each(function () {
            let width = $(this).width();
            $(this).attr('style', 'left: calc(50% - ' + (width / 2) + 'px);');
        });

        $('#product_img').attr('src', $('.product-item-img').attr('src'));

    });

    // Закрыть блок, если жмякнули мимо блока
    $(document).mouseup(function (e) {
        let popup = $('.active');
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            $(popup).removeClass('active');
            $('.navigation-item').removeClass('next');
            enableScroll();
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
    let $headerMob = $(".header--mob");

    let $sidebarHeight = $sidebar.innerHeight();
    let $sidebarOffset = $sidebar.offset();

    let $headerOffset = $header.offset();

    let $headerMobOffset = $headerMob.offset();

    let $footerOffsetTop = $(".footer").offset().top;


    $window.scroll(function () {
        if ($window.scrollTop() > $sidebarOffset.top - 80) {
            $sidebar.addClass("fixed");
            let width = $sidebar.width();
            $sidebar.attr('style', 'left: calc(50% - ' + (width / 2) + 'px);');
            $(".main").addClass("active-main");
        }
        else {
            $sidebar.removeClass("fixed");
            $sidebar.attr('style', '');
            $(".main").removeClass("active-main");
        }
        if ($window.scrollTop() > $headerOffset.top + 65) {
            $header.addClass("fixed");
        }
        else {
            $header.removeClass("fixed");
        }
        if ($window.scrollTop() > $headerMobOffset.top + 20) {
            $headerMob.addClass("fixed");
        }
        else {
            $headerMob.removeClass("fixed");
        }
        if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
            $sidebar.css({"top": -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});
            $header.css({"top": -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});
        }
        else {
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
    let swiper = new Swiper('.special-list-wrapper', {
        slidesPerView: 'auto',
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

    // Слайдер на странице продукта #1
    let swiper_2 = new Swiper('.product-aside__slider', {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.product-btn.next',
            prevEl: '.product-btn.prev',
        }
    });

    // Слайдер на странице продукта #2
    let swiper_3 = new Swiper('.compare-slider-wrapper', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        grabCursor: true,
        navigation: {
            nextEl: '.compare-btn.next',
            prevEl: '.compare-btn.prev',
        }
    });

    // Слайдер фоток
    let swiper_4 = new Swiper('.photo-slider__container', {
        grabCursor: true,
        navigation: {
            nextEl: '.photo-btn.next',
            prevEl: '.photo-btn.prev',
        },
    });

    // Слайдер фоток
    let swiper_5 = new Swiper('.main-good-list-wrapper.swiper-container', {
        grabCursor: true,
        navigation: {
            nextEl: '.main-good-btn.next',
            prevEl: '.main-good-btn.prev',
        },
    });

    function mobSlider() {
        if (window.screen.width < 768) {
            // Слайдер промсмотренных
            let mobil_slider = new Swiper('.mobil-slider.swiper-container', {
                grabCursor: true,
                slidesPerView: 'auto',
                loop: true,
                navigation: {
                    nextEl: '.catalog-special.next',
                    prevEl: '.catalog-special.prev',
                },
            });
        }
    }

    mobSlider();

    $(window).resize(function() {
        mobSlider();
    });

    $(document).on('click', '.product-item-img', function () {
        let img_addess = $(this).attr('src');
        $('.product-item-img').closest('.product-item').removeClass('img-active');
        $(this).closest('.product-item').addClass('img-active');

        $('#product_img').attr('src', img_addess);
    });

    // Открыть список
    $(document).on('click', '.open-list', function () {
        let list_id = $(this).data('listid');

        $('[data-list = ' + list_id + ']').addClass('active');

        if ($(this).hasClass('cart-select-wrapper')) {
            $(this).addClass('active');
            $(this).siblings('.choose-list').addClass('active');
        }
        else {
            $(this).closest('.cart-select-wrapper').addClass('active');
            $(this).parent('.cart-select-wrapper').siblings('.choose-list').addClass('active');
        }
    });

    // Анимация лейбла на странице регистрации
    let show = 'show';
    $('input').on('checkval', function () {
        let label = $(this).next('label');
        if (this.value !== '') {
            label.addClass(show);
        } else {
            label.removeClass(show);
        }
    }).on('keyup', function () {
        $(this).trigger('checkval');
    });

    // Маска для телефона
    $(document).on('input #phone_num', function () {
        $("#phone_num").mask("+7(999) 999-99-99");
    });

    // Если галочка проставлена, то кнопка становится кликабельной
    $(document).on('click', '.check', function () {
        let button = '#' + $(this).find('input').data('buttonid');

        if ($(this).find('input[type = checkbox]').prop('checked') === true) {
            $(button).addClass('active-btn');
        }
        else {
            $(button).removeClass('active-btn');
            console.log(button);
        }
    });

    // Смена активной вкладки
    $(document).on('click', '.contact-caption', function (e) {
        e.preventDefault();
        $('.contact-caption').removeClass('active-btn');
        $(this).addClass('active-btn');

        let item_id = $(this).data('itemid');
        $('.contact-item').removeClass('active-item');
        $('[data-item = ' + item_id + ']').addClass('active-item');
    });


    // перезаписать значение юзерского выбора и закрыть блок
    $(document).on('click', '.choose-item', function () {
        $(this).closest('div').find('p.open-list').text($(this).data('name'));
        $(this).closest('div').find('input[type=hidden]').attr('value', $(this).data('valueid'));
        $('.choose-list').removeClass('active');

        if ($(this).hasClass('catalog-tag-item')) {
            $(this).toggleClass('active-item');
        }
    });

    // Открыть попап
    $(document).on('click', '.open-container', function () {
        let container = $(this).data('containerid');
        $('[data-container = ' + container + ']').addClass('active');

        if ( container === 'add_item') {
            disableScroll();
        }
    });

    // Закрыть попап
    $(document).on('click', '.close-container', function () {
        let container = $(this).data('containerid');
        $('[data-container = ' + container + ']').removeClass('active');
        enableScroll();
    });

    // Пока поп-ап активен, запретить скролл
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

});
