$(function(){

    let header = $('#header');
    let intro = $('#intro');
    let navToggle = $('#navToggle');
    let nav = $('#nav');
    let headerH = header.innerHeight(); //hight header
    let introH = intro.innerHeight(); //hieght intro
    let scrollTop = $(window).scrollTop();

    // HEADER CHANGE ======================================================================

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

    // SMOOTH SCROLL TO SECTION ======================================================================

    $('[data-scroll]').on('click', function(event){

        event.preventDefault();

        let scrollEl = $(this).data('scroll');
        let scrollElPos = $(scrollEl).offset().top;  //позиция от верха до элемента

        navToggle.removeClass('active');
        nav.removeClass('show');
        $('body').removeClass('show-nav');

        $('html, body').animate({
            scrollTop: scrollElPos - headerH
        }, 500)

    });

    // SCROLL SPY ======================================================================

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


    // MODAL ======================================================================

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        });
    });

    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).parents('.modal');

        modalClose(modal);
    });

    $('.modal').on('click', function() {
        let modal = $(this);

        modalClose(modal);
    });

    $('.modal__content').on('click', function(event) {
        event.stopPropagation();
    });

    function modalClose (modal) {
        modal.find('.modal__content').css({
            transform: 'scale(.5)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            $(modal).removeClass('show');
        }, 200);
    }

    // SLICK SLIDER https://kenwheeler.github.io/slick/   ======================================================================

    // INTRO SLIDER

    let introSlider = $('#introSlider');
    let reviewsSlider = $('#reviewsSlider');

    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500
      });

      $('#introSliderPrev').on('click', function() {
        introSlider.slick('slickPrev');
      });

      $('#introSliderNext').on('click', function() {
        introSlider.slick('slickNext');
      });

    //   REVIEWS SLIDER

      reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500
      });

    //   BURGER MENU ======================================================================

    navToggle.on('click', function(event) {
        event.preventDefault();

        $(this).toggleClass('active');
        nav.toggleClass('show');
        $('body').toggleClass('show-nav');

    });

    $(window).on('resize', function(){
        navToggle.removeClass('active');
        nav.removeClass('show');
        $('body').removeClass('show-nav');
    });

});
