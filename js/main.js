$(document).ready(function(){
    /* VARIABLES */
    var mainSection = $('.main'),
        timeline = $('.timeline'),
        marker = $('.marker'),
        perc = $('.percentage'),
        svgPerc = 'svg#main',
        vh = $(window).height(),
        offsetPercOriginal = perc.offset().top;

    /* STICKY GRAPHIC */
    $('.graphic').stick_in_parent();
    $('.percentage').stick_in_parent();

    /* TITLE PERCENTAGE SECTION */
    var texts = $(svgPerc+' #Percentage text')
    var rectAf = $('svg #Africa rect');
    texts.css('opacity', 0);

    $(window).scroll(function(){
        if($('.zahlen').isInViewport()){
            texts.removeClass('fadeOut');
            texts.addClass('fadeIn');
        } else {
            texts.removeClass('fadeIn');
            texts.addClass('fadeOut');
        }

        if($('.afrika').isInViewport()){
            rectAf.removeClass('fadeOutColor');
            rectAf.addClass('fadeInColor');
            console.log('visible')
        } else {
            rectAf.removeClass('fadeInColor');
            rectAf.addClass('fadeOutColor');
        }

        if($('.msg').isInViewport()){
            $('svg #AfrikaMsg text').removeClass('fadeOut');
            $('svg #AfrikaMsg text').addClass('fadeIn');
        } else {
            $('svg #AfrikaMsg text').removeClass('fadeIn');
            $('svg #AfrikaMsg text').addClass('fadeOut');
        }
    });

    /* FILTERING */
    var svg = $('#filter');
    $(window).scroll(function(){
        if($('.filter').isInViewport()){
            svg.addClass('fadeIn');
        } else {
            svg.removeClass('fadeIn');
        }
    });
    svg.find('.filtering').click(function(){
        var classes = $(this).attr('class'); // store all classes and add them to body
        $(this).removeClass('nonactive');
        $(this).addClass('active');
        $('.filtering').not($(this)).removeClass('active');
        $('.filtering').not($(this)).addClass('nonactive');
        $('body').attr('class', ''); // empty body classes
        $('body').attr('class', classes); // add classes of current element to body
    });

    $(window).scroll(function(){
        if($('.main').isInViewport()){
            $('.filter .inside').addClass('shrink');
            $('.graphic').removeClass('fadeOut');
            $('.graphic').addClass('fadeIn');
        } else {
            $('.filter .inside').removeClass('shrink');
            $('.graphic').removeClass('fadeIn');
            $('.graphic').addClass('fadeOut');
        }
        var nf = $('svg#main .nf circle'),
            tt = $('svg#main .tt circle'),
            tf = $('svg#main .tf circle'),
            to = $('svg#main .to circle, svg#main .to ellipse'),
            hideClass = 'peopleHide',
            showClass = 'peopleShow';

        if($('#nf').isInViewport()){
            nf.removeClass(hideClass);
            nf.addClass(showClass);
        } else {
            nf.removeClass(showClass);
            nf.addClass(hideClass);
        }
        if($('#tt').isInViewport()){
            tt.removeClass(hideClass);
            tt.addClass(showClass);
        } else {
            tt.removeClass(showClass);
            tt.addClass(hideClass);
        }
        if($('#tf').isInViewport()){
            tf.removeClass(hideClass);
            tf.addClass(showClass);
        } else {
            tf.removeClass(showClass);
            tf.addClass(hideClass);
        }
        if($('#to').isInViewport()){
            to.removeClass(hideClass);
            to.addClass(showClass);
        } else {
            to.removeClass(showClass);
            to.addClass(hideClass);
        }

        if($('.txt').isInViewport()){
            $('#main .to .Africa cirlce, #main .to .Africa cirlce').addClass('fadeIn');
            $('.box').removeClass('fadeOut');
            $('.box').addClass('fadeIn');
        } else {
            $('#main .to .Africa cirlce, #main .to .Africa cirlce').removeClass('fadeIn');
            $('.box').removeClass('fadeIn');
            $('.box').addClass('fadeOut');
        }
    });

    /* TIMELINE MARKER */
    var updateMarker = function() {
        // Update measurements
        var viewportHeight = $(window).height(),
            contentHeight = mainSection.height(),
            pathWidth = timeline.height(),
            offset = mainSection.offset().top,
            scrollPosition = $(window).scrollTop();

            // Update #marker dimensions
            marker.height((scrollPosition-offset)/(contentHeight-viewportHeight)*pathWidth);
        }

    $(window).on('scroll resize', updateMarker);

    updateMarker();

    /* TIMELINE SCROLL SPY */
    // make links animate scroll to section
    $('.years a').click(function(){
        var href = $(this).attr('href'),
            offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    // bind scroll to section, and add active class in navigation
    $(window).scroll(function(){
        mainSection.find('section').each(function(){
            var offset = $(this).offset().top,
                scrollPos = $(window).scrollTop(),
                id = $(this).attr('id'),
                sectionHeight = $(this).outerHeight();
            if(scrollPos > offset - sectionHeight){
                // console.log(id);
                $('.years a').removeClass('active');
                $('.years a[href="#'+id+'"]').addClass('active');
            }
        });
    });

});


$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
