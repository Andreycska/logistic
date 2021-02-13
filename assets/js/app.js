$(function(){

    let header = $('#header');
    let intro = $('#intro');
    let headerH = header.innerHeight(); //hight header
    let introH = intro.innerHeight(); //hieght intro
    let scrollTop = $(window).scrollTop();

    // HEADER CHANGE

    headerScroll();  // Для того чтобы при обновлении страницы выявить нужно прозрачноре меню или темное

    $(window).on('scroll resize', function(){
        headerScroll();
    });

    function headerScroll() {
        headerH = header.innerHeight();
        introH = intro.innerHeight();
        let scrollTop = $(this).scrollTop();

        if (scrollTop >= (introH -  headerH)) {
            header.addClass('header--dark');
        } else {
            header.removeClass('header--dark');
        }
    }

    // SMOOTH SCROLL TO SECTION

    $('[data-scroll]').on('click', function(event){

        event.preventDefault();

        let scrollEl = $(this).data('scroll');
        let scrollElPos = $(scrollEl).offset().top;  //позиция от верха до элемента

        $('html, body').animate({
            scrollTop: scrollElPos - headerH
        }, 500)

    });

    // SCROLL SPY

    let windowH = $(window).height();

    scrollSpy(scrollTop);

    $(window).on('scroll', function(){

        scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);

    });

    function scrollSpy(scrollTop) {
        $('[data-scrollspy]').each(function(){

            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.3);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }

        });
    }

});
