var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

(() => {

  var $ = window.jQuery
  var TweenLite = window.TweenLite
  var Linear = window.Linear
  var Power3 = window.Power3

  var $window = $(window);
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  var aboutMap = $('#About > .map');
  var tlWorld;
  var worldMoving;

  var mouseWheelEvent;
  var delta = 0
  var isTweening = false;
  var currentSlide
  var restScrollTop
  var restScrollBtm

  var mainBottle = $('body > .bottle');

  var wW = $(window).width();
  var wH = $(window).height();
  var scrollTop

  var aboutTop = $('#AboutIntro').offset().top;
  var aboutVinaigreTop = $('#AboutVinaigre').offset().top;
  var aboutSojaTop = $('#AboutSoja').offset().top;
  var ingredientTop = $('#Ingredients').offset().top;
  var keisukeTop = $('#Keisuke').offset().top;
  var useTop = $('#UseBalsoy').offset().top;
  var tryTop = $('#TryBalsoy').offset().top;
  var footerHeight = $('body > footer').outerHeight();

  var slideTo = function (slide) {

    var orientation = orientation;
    var target = $(slide);
    currentSlide = target;

    isTweening = true;
    TweenLite.to(window, 1.2, {scrollTo: {y:target.offset().top, autoKill:false }, ease: Power2.easeInOut, overwrite: 5, onComplete: function(){
  			setTimeout(function(){
  				isTweening = false;
  			}, 300);
  		}
	   });

     if($('body').hasClass('showMenu')) {
        $('body').removeClass('showMenu');
      }

  }

  var initHeader = function () {

    $('.menu-toggle').on('click', function(e){

  		e.preventDefault();
  		$('body').addClass('showMenu');

  	})

  	$('.menu-container .close').on('click', function(e){

  		e.preventDefault();
  		$('body').removeClass('showMenu');

  	})

  	$('.navbar-brand').on('click', function(e){
  		e.preventDefault();
  		TweenLite.to(window, 1, {
  			scrollTo: {y:0, autoKill:false },
  			ease: Power3.easeInOut,
  			overwrite: 5,
  		});

  	})

  	$('.menu-container .nav-item a').on('click', function(e){

  		e.preventDefault();
  		$('.menu-container .active').removeClass('active');
  		$(this).addClass('active');
  		var target = $(this).attr("href");
  		slideTo($(target));

  	})

  	$('.discover a').on('click', function(e){

  		e.preventDefault();
  		var target = $(this).attr("href");
      $('.discover').addClass('min');
  		slideTo(target);

  	})

  	$('header .hashtag').on('click', function(e){

  		e.preventDefault();
  		TweenLite.to(window, 1, {
  			scrollTo: {y:$('body > footer').offset().top - wH + $('body > footer').outerHeight(), autoKill:false },
  			ease: Power3.easeInOut,
  			overwrite: 5,
  		});

  	});

  	$('a.btn-try').on('click', function(e){

  		e.preventDefault();
  		$(this).addClass('active');
  		var target = $(this).attr("href");
  		slideTo($(target));

  	})

  }

  var initIntro = function () {

    var tlIntroIn = new TimelineLite({ paused: true, delay:1, onComplete: () => {

      console.log('leaveIntro');
      $('body').removeClass('no-ui showIntro');
      tlIntroLeave.resume();

    }})
    TweenLite.set('#Intro .intro-title', { x: "-50%", y: "-50%" });
    tlIntroIn.from(aboutMap, 2, {opacity: 0, scale:3, ease: Power3.easeOut});
    tlIntroIn.staggerFrom('#Intro .intro-title .mask > *', 1.2, {y:'100%', ease: Power3.easeOut},  0.1);
    tlIntroIn.resume();

    var tlIntroLeave = new TimelineLite({ paused: true});
    TweenLite.set(mainBottle, { x: "-50%", y: "200%" });
    TweenLite.set('#AboutIntro .bottle', { x: "-50%", y: "200%" });
    tlIntroLeave.to($('#Intro .intro-title'), 1.4, {opacity: 0.1, ease: Power3.easeInOut});
    tlIntroLeave.to(mainBottle, 1, { x: "-50%", y: "-50%" , ease: Power3.easeOut },  0);
    tlIntroLeave.to('#AboutIntro .bottle', 1, { x: "-50%", y: "-50%" , ease: Power3.easeOut },  0);
    tlIntroLeave.from('#AboutIntro .left .about-title', 1.3, { y:1000 , ease: Power3.easeOut },  0);
    tlIntroLeave.from('#AboutIntro .right .about-title', 1.2, { y: 900 , ease: Power3.easeOut },  0);


  }

  var initKeisuke = function () {

  	var playerKeisuke;
  	window.onYouTubePlayerAPIReady= function() {
  	  playerKeisuke = new YT.Player('keisukeVideo', {
  	    events: {
  	      'onReady': onPlayerReady,
  	      'onStateChange': onPlayerStateChange
  	    }
  	  });
  	}

  	function onPlayerStateChange(event) {
  	  	if(event.data === 0) {
              $('.close-video').trigger('click');
          }
  	}

  	function onPlayerReady(event) {
  		$(window).trigger('resize');
  	}

  	$(window).resize(function(){
  		var playerWidth = wW - 60;
  		$('.iframe-wrapper').css({ width: playerWidth , height: playerWidth * 0.56 })
  	})

    $('.play-video').on('click', function(e){

  		e.preventDefault();
  		$('body').addClass('no-ui');
  		$('#Keisuke').addClass('showVideo');
  		isTweening = true;
  		TweenLite.to(window, 0.8, {
  			scrollTo: {y:$('#Keisuke').offset().top, autoKill:false },
  			ease: Power3.easeInOut,
  			autoKill: true,
  			overwrite: 5,
  			onComplete: function(){
  			   isTweening = false;
  			}
  		});

  		playerKeisuke.playVideo();

  	})

  	$('.close-video').on('click', function(e){
  		e.preventDefault();
  		$('#Keisuke').removeClass('showVideo');
  		$('body').removeClass('no-ui');
  		playerKeisuke.stopVideo();
  	})

  }

  var initRecipes = function () {
  		 $('.recipes .recipe a').magnificPopup({
			type: 'ajax',
			mainClass: 'popupRecipe',
			tLoading: 'Chargement...',
			removalDelay: 400,
			overflowY: 'hidden',
		});
  }

  var initVideos = function () {

    $('video').each(function(){

			var aspectRatio = $(this).data('aspectRatio');
	    if (aspectRatio == undefined) {
	        aspectRatio = $(this).width() / $(this).height();
	        $(this).data('aspectRatio', aspectRatio);
	    }

		})

    $('video').viewportChecker({
			classToAdd: 'visible',
			repeat: true,
			offset: 0,
      callbackFunction: function(elem, action){

        if (action == "add") {
          if (!elem.hasClass('playing')) {
            elem[0].play();
          }
          elem.addClass('playing');
        }

        if (action == "remove") {
          elem.removeClass('playing');
          elem[0].pause();
        }

      }
		});

    resizeVideos();

  }

  var updateMenu = function () {

    //switchMenuColor
  	if ( scrollTop > (ingredientTop - 40) && !$('body').hasClass('dark')) {
  		$('body').addClass('dark');
  	}
  	if ( scrollTop < (ingredientTop - 40) && $('body').hasClass('dark')) {
  		$('body').removeClass('dark');
  	}

  	//UpdateActive
  	if ( scrollTop > aboutTop - 5 && scrollTop <= ingredientTop - 5 ) {
  		$('.menu-container .nav-item a.aboutLink').addClass('active');
  	} else {
  		$('.menu-container .nav-item a.aboutLink').removeClass('active');
  	}

  	if ( scrollTop > ingredientTop - 5 && scrollTop <= keisukeTop - 5 ) {
  		$('.menu-container .nav-item a.ingredientLink').addClass('active');
  	} else {
  		$('.menu-container .nav-item a.ingredientLink').removeClass('active');
  	}

  	if ( scrollTop > keisukeTop - 5 && scrollTop < useTop - 5 ) {
  		$('.menu-container .nav-item a.keisukeLink').addClass('active');
  	} else {
  		$('.menu-container .nav-item a.keisukeLink').removeClass('active');
  	}

  	if ( scrollTop > useTop - 5 && scrollTop < tryTop - 5 ) {
  		$('.menu-container .nav-item a.useLink').addClass('active');
  	} else {
  		$('.menu-container .nav-item a.useLink').removeClass('active');
  	}

  	if ( scrollTop > tryTop - 5 ) {
  		$('.menu-container .btn-try').addClass('active');
  	} else {
  		$('.menu-container .btn-try').removeClass('active');
  	}

  }

  var updateMap = function () {

    if (scrollTop <= aboutVinaigreTop - wH * 0.25 && !aboutMap.hasClass('showWorld')) {
  		aboutMap.addClass('showWorld');
  		aboutMap.removeClass('showEurope');
  		aboutMap.removeClass('showJap');
      $('.discover').removeClass('min');
  	}

  	if (scrollTop > aboutVinaigreTop - wH * 0.25 && scrollTop <= aboutSojaTop - wH * 0.5 && !aboutMap.hasClass('showEurope')) {
  		aboutMap.removeClass('showWorld');
  		aboutMap.removeClass('showJap');
  		aboutMap.addClass('showEurope');
      $('.discover').addClass('min');

  	}

  	if (scrollTop > aboutSojaTop - wH * 0.5 && !aboutMap.hasClass('showJap')) {
  		aboutMap.addClass('showJap');
  		aboutMap.removeClass('showEurope');
  	}


  	if (scrollTop > aboutSojaTop) {
  		aboutMap.addClass('notransition');
  		TweenLite.to(aboutMap, 0, { y: - (scrollTop - aboutSojaTop) * 0.7 , ease: Linear.easeNone });
  	} else {
  		aboutMap.removeClass('notransition');
  		TweenLite.to(aboutMap, 0, { y:0 , ease: Linear.easeNone });
  	}


  }

  var tlBottleFlowers = new TimelineLite({ paused: true});
  TweenLite.set(mainBottle.find('.flower-left'), { x: "0%", y: "-50%" });
  TweenLite.set(mainBottle.find('.flower-right'), { x: "0%", y: "-50%" });
  tlBottleFlowers.from(mainBottle.find('.flower-left'), 1, {x: "0%",y:"-25%", ease: Sine.easeOut});
  tlBottleFlowers.to(mainBottle.find('.flower-left img'), 1, {scale:1, ease: Sine.easeOut}, "-=1");
  tlBottleFlowers.from(mainBottle.find('.flower-right'), 1, {x: "0%",y:"-75%", ease: Sine.easeOut}, "-=1");
  tlBottleFlowers.to(mainBottle.find('.flower-right img'), 1, {scale:1, ease: Sine.easeOut}, "-=1");

  var updateBottle = function () {

		//apparition
    if (scrollTop > 1 && scrollTop <= ingredientTop) {
      TweenLite.to(mainBottle, 0, { x: "-50%", y: "-50%" });
    }

	  if (scrollTop > ingredientTop ) {
			TweenLite.to(mainBottle, 0,{ x: "-50%", y: Math.round(- (scrollTop - ingredientTop)) , ease: Linear.easeNone });
			mainBottle.addClass('notransition');
		}

		//addShadow
		if (scrollTop < (ingredientTop - wH * 0.5) && !mainBottle.hasClass('shadowed')) {
			mainBottle.addClass('shadowed');
		}

    if (scrollTop >= (ingredientTop - wH * 0.5) && mainBottle.hasClass('shadowed')) {
			mainBottle.removeClass('shadowed');
		}

    var flowersMin = ingredientTop - wH * 0.5;
    var flowerMax= ingredientTop;
    var flowerNorm = clamp(normalize(window.pageYOffset, flowersMin, flowerMax), 0, 1);
    tlBottleFlowers.progress(flowerNorm);


  }

  var initParallax = function() {

    var tlIntro = TweenLite.to($('#Intro .intro-title'), 1, {w:'-50%', y: -wH*1.2, ease: Linear.easeNone, paused: true });

    var tlAboutIntro = new TimelineLite({ paused: true});
    tlAboutIntro.to('#AboutIntro .left .about-title', 1, {y:250, ease: Sine.easeOut});
    tlAboutIntro.to('#AboutIntro .left .about-title .visuel img', 1, {y:50, ease: Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .left .about-title .jap', 1, {y:-50, ease: Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .left .about-title .from', 1, {y:-30, ease:Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .right .about-title', 1, {y:100, ease: Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .right .about-title .visuel img', 1, {y:50, ease: Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .right .about-title .jap', 1, {y:-50, ease:Sine.easeOut}, "-=1");
    tlAboutIntro.to('#AboutIntro .right .about-title .from', 1, {y:-30, ease: Sine.easeOut}, "-=1");

    var tlVinaigre = new TimelineLite({ paused: true});
    var vinaigreSplitText = new SplitText("#AboutVinaigre .content .about-title ", {type:"chars"});
    var vinaigreLetters = shuffleArray(vinaigreSplitText.chars);
    TweenLite.set('#AboutVinaigre .video-container', {y: '50%'});
    tlVinaigre.to('#AboutVinaigre .video-container', 1, {y:"0%", ease: Linear.easeNone});
    tlVinaigre.from('#AboutVinaigre .content', 1, {y:600, ease: Sine.easeOut}, "-=1");
    tlVinaigre.from('#AboutVinaigre .content .about-title', 1, {y:250, ease: Sine.easeOut}, "-=1");
    tlVinaigre.from('#AboutVinaigre .content .about-title .visuel img', 1, {y:-250, ease: Sine.easeOut}, "-=1");
    tlVinaigre.from('#AboutVinaigre .content .about-title .jap', 1, {y:-100, ease: Sine.easeOut}, "-=1");
    tlVinaigre.from('#AboutVinaigre .content .about-title .from', 1, {y:100, ease: Sine.easeOut}, "-=1");
    tlVinaigre.from('#AboutVinaigre .content p', 1, {y:500, ease:Sine.easeOut}, "-=1");
    tlVinaigre.staggerFrom(vinaigreLetters, 1, {opacity:0, y:Math.random()*250, ease: Sine.easeOut}, 0.05, "-=1.5");

    var tlSoja = new TimelineLite({ paused: true});
    var sojaSplitText = new SplitText("#AboutSoja .content .about-title", {type:"chars"});
    var sojaLetters = shuffleArray(sojaSplitText.chars);
    TweenLite.set('#AboutSoja .video-container', {y: '50%'});
    tlSoja.to('#AboutSoja .video-container', 1, {y:"0%", ease: Linear.easeNone});
    tlSoja.from('#AboutSoja .content', 1, {y:600, ease: Sine.easeOut}, "-=1");
    tlSoja.from('#AboutSoja .content .about-title', 1, {y:250, ease: Sine.easeOut}, "-=1");
    tlSoja.from('#AboutSoja .content .about-title .visuel img', 1, {y:-250, ease: Sine.easeOut}, "-=1");
    tlSoja.from('#AboutSoja .content .about-title .jap', 1, {y:-100, ease: Sine.easeOut}, "-=1");
    tlSoja.from('#AboutSoja .content .about-title .from', 1, {y:100, ease: Sine.easeOut}, "-=1");
    tlSoja.from('#AboutSoja .content p', 1, {y:500, ease: Sine.easeOut}, "-=1");
    tlSoja.staggerFrom(sojaLetters, 1, {opacity:0, y:Math.random()*250, ease: Sine.easeOut}, 0.05, "-=1.5");

    var tlIngredients = new TimelineLite({ paused: true});
    var ingredientSplitText = new SplitText("#Ingredients .content h1 .txt", {type:"chars"});
    var ingredientLetters = shuffleArray(ingredientSplitText.chars);
    tlIngredients.from('#Ingredients .content', 1, {y:"50%", ease: Sine.easeOut}, 0);
    tlIngredients.from('#Ingredients .content h1', 1, {y:350, ease: Sine.easeOut}, 0);
    //tlIngredients.from('#Ingredients .content h1 .min', 1, {y:-500, ease: Sine.easeOut}, 0);
    tlIngredients.from('#Ingredients .content h1 .esperluette', 1, {y:0, ease: Sine.easeOut}, 0);
    tlIngredients.staggerFrom(ingredientLetters, 1, {opacity:0, y:Math.random()*150, ease: Sine.easeOut}, 0.05, 0);
    tlIngredients.from('#Ingredients .content p', 1, {y:550, ease: Sine.easeOut}, 0.15);
    tlIngredients.from('#Ingredients .recipe', 1, {y:"65%", ease: Sine.easeOut}, 0);
    tlIngredients.from('#Ingredients .recipe blockquote', 1, {y:350, ease: Sine.easeOut}, 0.25);
    tlIngredients.staggerFrom('#Ingredients .recipe .list-ingredients > li', 1, {y:550, ease: Sine.easeOut},  0.05, 0.25);
    var tlIngredientsBG = new TimelineLite({ paused: true});
    TweenLite.set('#Ingredients .content .background', {backgroundPosition: 'center -200px'});
    tlIngredientsBG.to('#Ingredients .content .background', 1, {backgroundPosition:"center 200px", ease: Linear.easeNone});

    var tlkeisuke = new TimelineLite({ paused: true});
    var keisukeSplitText = new SplitText("#Keisuke h1 span", {type:"chars"});
    var keisukeLetters = shuffleArray(keisukeSplitText.chars);
    TweenLite.set('#Keisuke .video-container', {y: '50%'});
    tlkeisuke.to('#Keisuke .video-container', 1, {y:"0%", ease: Linear.easeNone});
    tlkeisuke.from('#Keisuke .content .portrait', 1, {y:350, opacity:0, ease: Sine.easeOut}, 0);
    tlkeisuke.from('#Keisuke .content h1', 1, {y:550, ease: Sine.easeOut}, 0);
    tlkeisuke.staggerFrom(keisukeLetters, 1, {opacity:0, y:Math.random()*150, ease: Sine.easeOut}, 0.05, 0);
    tlkeisuke.from('#Keisuke .content .col', 2, {y:650, ease: Sine.easeOut}, "-=2.2");
    tlkeisuke.from('#Keisuke .content .link', 2, {y:800, ease: Sine.easeOut}, "-=2");
    tlkeisuke.from('#Keisuke .content .socials', 2, {y:1000, ease: Sine.easeOut}, "-=2");

    var tlUse = new TimelineLite({ paused: true});
    var useSplitText = new SplitText("#UseBalsoy h1 span", {type:"chars"});
    var useLetters = shuffleArray(useSplitText.chars);
    TweenLite.set('#UseBalsoy .bottle', {y: 100});
    tlUse.to('#UseBalsoy .bottle', 1, {y:'-50%', ease: Sine.easeOut});
    tlUse.from('#UseBalsoy h1', 1, {y:300, ease: Sine.easeOut}, 0);
    tlUse.staggerFrom(useLetters, 1, {y:Math.random()*500, ease: Sine.easeOut}, 0.05, 0);
    tlUse.from('#UseBalsoy .background', 1, {height:wH, ease: Sine.easeOut}, 0);
    tlUse.from('#UseBalsoy .content', 1, {y:400, ease: Sine.easeOut}, 0);

    var tlTry = new TimelineLite({ paused: true});
    var trySplitText = new SplitText("#TryBalsoy h1 span", {type:"chars"});
    var tryLetters = shuffleArray(trySplitText.chars);
    TweenLite.set('#TryBalsoy > .bottle', {y: 100});
    TweenLite.set('#TryBalsoy > .bottle .bottle-visuel', {y: -150});
    TweenLite.set('#TryBalsoy .bottles-right', {y: 120});
    TweenLite.set('#TryBalsoy .bottles-left', {y: 120});
    tlTry.to('#TryBalsoy > .bottle', 1, {y:'-50%', ease: Sine.easeOut});
    tlTry.to('#TryBalsoy > .bottle .bottle-visuel', 1, {y:'-50%', ease: Sine.easeOut}, 0);
    tlTry.to('#TryBalsoy .bottles-right', 1, {y:'-50%', ease: Sine.easeOut}, 0);
    tlTry.to('#TryBalsoy .bottles-left', 1, {y:'-50%', ease: Sine.easeOut}, 0);
    tlTry.staggerFrom('#TryBalsoy .bottles-right .bottle', 1, {x:-350, ease: Sine.easeOut},  0.05, 0);
    tlTry.staggerFrom('#TryBalsoy .bottles-left .bottle', 1, {x:350, ease: Sine.easeOut},  0.05, 0);
    tlTry.from('#TryBalsoy h1', 1, {y:300, ease: Sine.easeOut}, 0);
    tlTry.staggerFrom(tryLetters, 1, {y:Math.random()*450 , ease: Sine.easeOut}, 0.05, 0);
    tlTry.from('#TryBalsoy .background', 1, {height:wH, ease: Sine.easeOut}, 0);
    tlTry.from('#TryBalsoy .content', 1, {y:500, ease: Sine.easeOut}, 0);

    TweenLite.ticker.addEventListener("tick", updateParallax);

    function updateParallax() {



  		var introMin = 0;
  		var introMax= aboutVinaigreTop + wH*0.5;
  		var introNorm = clamp(normalize(window.pageYOffset, introMin, introMax), 0, 1);
  		tlIntro.progress(introNorm);

  		tlAboutIntro.progress(introNorm);

  		var vinaigreMin = aboutVinaigreTop - wH * 0.5;
  		var vinaigreMax= aboutVinaigreTop;
  		var vinaigreNorm = clamp(normalize(window.pageYOffset, vinaigreMin, vinaigreMax), 0, 1);
  		tlVinaigre.progress(vinaigreNorm);

  		var sojaMin = aboutSojaTop - wH * 0.5;
  		var sojaMax= aboutSojaTop;
  		var sojaNorm = clamp(normalize(window.pageYOffset, sojaMin, sojaMax), 0, 1);
  		tlSoja.progress(sojaNorm);

  		var ingredientsMin = ingredientTop - wH;
  		var ingredientsMax= ingredientTop;
  		var ingredientsBGMax= keisukeTop;
  		var ingredientsNorm = clamp(normalize(window.pageYOffset, ingredientsMin, ingredientsMax), 0, 1);
  		var ingredientsBGNorm = clamp(normalize(window.pageYOffset, ingredientsMin, ingredientsBGMax), 0, 1);
  		tlIngredients.progress(ingredientsNorm);
  		tlIngredientsBG.progress(ingredientsBGNorm);

      var keisukeMin = keisukeTop - wH * 0.5;
  		var keisukeMax= keisukeTop;
  		var keisukeNorm = clamp(normalize(window.pageYOffset, keisukeMin, keisukeMax), 0, 1);
  		tlkeisuke.progress(keisukeNorm);


      var useMin = useTop - wH * 0.5;
  		var useMax= useTop;
  		var useNorm = clamp(normalize(window.pageYOffset, useMin, useMax), 0, 1);
  		tlUse.progress(useNorm);

      var tryMin = tryTop - wH * 0.5;
  		var tryMax= tryTop;
  		var tryNorm = clamp(normalize(window.pageYOffset, tryMin, tryMax), 0, 1);
  		tlTry.progress(tryNorm);

    }

  }

  var updateFooter = function () {
   //preFooterScroll
		if (scrollTop > $('.app').outerHeight() - window.innerHeight) {

			$('body > header > .discover').removeClass('animated');

				TweenLite.to($('body > header > .toscoro'), 0, { y: - (scrollTop - $('.app').outerHeight() + wH), ease: Linear.easeNone, immediateRender:true, overwrite:1 });
				TweenLite.to($('body > header > .discover'), 0, { y: - (scrollTop - $('.app').outerHeight() + wH), ease: Linear.easeNone, immediateRender:true, overwrite:1 });
				TweenLite.to($('body > header > .hashtag'), 0, { y: - (scrollTop - $('.app').outerHeight() + wH), ease: Linear.easeNone, immediateRender:true, overwrite:1 });
				$('body > header > .toscoro, body > header > .discover, body > header > .hashtag').addClass('notransition');

				TweenLite.to($('footer > .inner'), 0, {y: - footerHeight * 0.5 + ((scrollTop - ($('.app').outerHeight() - wH)) * 0.5) , ease: Linear.easeNone, immediateRender:true, overwrite:1 });


		} else {

			$('body > header > .discover').addClass('animated');
			TweenLite.to($('body > header > .toscoro'), 0, { y: 0 , ease: Linear.easeNone, overwrite:1 });
			TweenLite.to($('body > header > .discover'), 0, { y: 0 , ease: Linear.easeNone, overwrite:1 });
			TweenLite.to($('body > header > .hashtag'), 0, { y: 0 , ease: Linear.easeNone, overwrite:1 });
			TweenLite.to($('footer > .inner'), 0, { y: 0 , ease: Linear.easeNone, overwrite:1 });

		}
  }

  var resizeVideos = function () {
   	resizeVideo($('#v0'));
		resizeVideo($('#v1'));
		resizeVideo($('#v2'));
  }

  var render = function () {

  	updateMap();

    if (wW >= 768) {
      updateBottle();
      updateFooter();
    }

  }

 	window.addEventListener('scroll', scroll);
  function scroll() {
	  scrollTop = window.pageYOffset;
	  updateMenu();
	}

	window.addEventListener('resize', resize);
	function resize() {
	  wW = $(window).width();
	  wH = $(window).height();
	  aboutTop = $('#AboutIntro').offset().top;
	  aboutVinaigreTop = $('#AboutVinaigre').offset().top;
	  aboutSojaTop = $('#AboutSoja').offset().top;
	  ingredientTop = $('#Ingredients').offset().top;
	  keisukeTop = $('#Keisuke').offset().top;
	  useTop = $('#UseBalsoy').offset().top;
	  tryTop = $('#TryBalsoy').offset().top;
	  footerHeight = $('body > footer').outerHeight();
	  resizeVideos();
	}

  var build = function () {

    FastClick.attach(document.body);

		initHeader();
		initIntro();
		initRecipes();


    if (wW >= 768) {

      initParallax();
  		initVideos();

      Hamster($('#AboutIntro').get(0)).wheel((event, delta, deltaX, deltaY) => {
        event.stopPropagation()
        event.preventDefault()
        if (deltaY < 0 && !isTweening) slideTo('#AboutVinaigre')
      });

      Hamster($('#AboutVinaigre').get(0)).wheel((event, delta, deltaX, deltaY) => {
        event.stopPropagation();
        event.preventDefault();
        if (deltaY < 0 && !isTweening) slideTo('#AboutSoja')
        if (deltaY > 0 && !isTweening) slideTo('#AboutIntro')
      });

      Hamster($('#AboutSoja').get(0)).wheel((event, delta, deltaX, deltaY) => {
        event.stopPropagation();
        event.preventDefault();
        if (deltaY < 0 && !isTweening) slideTo('#Ingredients');
        if (deltaY > 0 && !isTweening) slideTo('#AboutVinaigre');
      });

      Hamster($('#Ingredients').get(0)).wheel((event, delta, deltaX, deltaY) => {
        event.stopPropagation();
        event.preventDefault();
        if (deltaY < 0 && !isTweening) slideTo('#Keisuke')
        if (deltaY > 0 && !isTweening) slideTo('#AboutSoja')
      });

      Hamster($('#Keisuke').get(0)).wheel((event, delta, deltaX, deltaY) => {
        event.stopPropagation();
        event.preventDefault();
        if (deltaY < 0 && !isTweening) slideTo('#UseBalsoy');
        if (deltaY > 0 && !isTweening) slideTo('#Ingredients');
      });

      Hamster($('#UseBalsoy').get(0)).wheel((event, delta, deltaX, deltaY) => {

        if (scrollTop - $('#UseBalsoy').offset().top <= 0 && deltaY > 0 && !isTweening) {
          event.stopPropagation();
          event.preventDefault();
          slideTo('#Keisuke');
        }

      });

    };

		initKeisuke();

		$('.map').addClass('showWorld');
		//worldMoving = true;
		//tlWorld = new TimelineMax({repeat:-1});
		//tlWorld.to($('.map .world'), 120, {backgroundPosition:"-1400px center", ease:Linear.easeNone});
		//tlWorld.pause();

		/*$('section').viewportChecker({
			classToAdd: 'active',
			repeat: true,
			offset: 0,
		});*/

		TweenLite.ticker.addEventListener("tick", render);

  }

  $('.app').imagesLoaded( function() {
    build();
    $('body').removeClass('loading');
  });

  window.onbeforeunload = function() {window.scrollTo(0,0);}

  $(window).on('load', function () {

	  window.dispatchEvent(new Event('resize'));
    console.log('%cMade with love', 'color: #000; padding: 5px 0px;');
    console.log('%chttps://perlierleo.com', 'color:#ccc');

  })

})(); // eslint-disable-line semi

function normalize(value, min, max) {
	return (value - min) / (max - min);
}

function clamp(value, min, max) {
	return value < min ? min : (value > max ? max : value);
}

function resizeVideo(video) {

  var newWidth;
  var newHeight;
  var videoRatio = video.data('aspectRatio');
  var parentWidth  = video.parent().width();
  var parentHeight = video.parent().height();
  var parentRatio = parentWidth / parentHeight;

  if (parentRatio > videoRatio && !video.hasClass('bgWidth')) {
    video.removeClass("bgHeight");
    video.addClass("bgWidth");
  }
  if (parentRatio <= videoRatio && !video.hasClass('bgHeight')) {
    video.removeClass("bgWidth");
    video.addClass("bgHeight");
  }

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
