$(document).ready(function () {

    $(function () {

        // Изменение текста в зависимости от состояния: есть или нет в наличии
        $('.main-good-state').each(function () {
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
        }
    });

    $(document).on('click', '.navigation-item', function () {
        let list_id = $(this).find('.navigation-item-link').data('listid');
        $(this).addClass('active');
        $('.navigation-all__container').addClass('active');
        $('[data-list = ' + list_id + ']').addClass('active')
    });

});