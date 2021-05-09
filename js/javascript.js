// header
$(function() {
  const $gnb = $("header > nav > .gnb");
  const $lnb = $gnb.find(".lnb");
  const $lnb_bg = $("header > .lnb_bg");

  let nowIdx = 0;

  const lnbShow = function() {
    $lnb.stop().fadeIn(300);
    $lnb_bg.stop().fadeIn(300);
  };

  const lnbHide = function() {
    $lnb.stop().fadeOut();
    $lnb_bg.stop().fadeOut();
  };

  $gnb.children("li").on({
    mouseenter: function() {
      nowIdx = $gnb.children("li").index(this);

      $(this).children("a").append('<span class="bar"></span>');

      const barW = $(this).find("span").first().width();

      $(this).find(".bar").css({
        width: barW,
        marginLeft: -barW / 2
      });
      lnbShow();
    },
    mouseleave: function() {
      $(".bar").remove();
      lnbHide();
    }
  });

  $lnb_bg.on({
    mouseenter: function() {
      lnbShow();
    },
    mouseleave: function() {
      lnbHide();
    }
  });
});

// section
$(function() {
  const $slides = $("section > .poster > .slides");
  const $btnPausePlay = $slides.find(".slides-btn-pauseplay>a");
  const $perform = $("section > .poster > .perform > .perform-container > li");
  const $indicators = $slides.find(".slides-btn-pagination a");
  const $date = $("section > .calendar");
  let nowIdx = 0;
  let intervalKey = null;

  const moveSlidesFn = function() {
    $indicators
      .eq(nowIdx)
      .parent("li")
      .addClass("on")
      .siblings()
      .removeClass("on");

    $slides.children(".slides-container").stop().animate(
      {
        left: -444 * nowIdx
      },
      400
    );
  };

  const nextIdx = function() {
    if (nowIdx < 7) {
      nowIdx++;
    } else {
      nowIdx = 0;
    }
  };

  const autoPlay = function() {
    clearInterval(intervalKey);
    $btnPausePlay.addClass("pause");

    intervalKey = setInterval(function() {
      nextIdx();

      moveSlidesFn();
    }, 5000);
  };

  const autoStop = function() {
    $btnPausePlay.removeClass("pause");

    clearInterval(intervalKey);
  };

  // poster-slides
  $btnPausePlay.on("click", function(evt) {
    evt.preventDefault();

    if ($(this).hasClass("pause")) {
      autoStop();
    } else {
      autoPlay();
    }
  });

  $indicators.on("click", function(evt) {
    evt.preventDefault();

    nowIdx = $indicators.index(this);

    moveSlidesFn();

    autoStop();
  });

  $perform.on({
    mouseenter: function() {
      $(this).children(".hidden").show();
    },
    mouseleave: function() {
      $(this).children(".hidden").hide();
    }
  });

  $(window).on("load", function() {
    autoPlay();
  });

  //calendar
  $date.find("li").on({
    mouseenter: function() {
      $(this).find(".hiddeninfo").show();
    },
    mouseleave: function() {
      $(this).find(".hiddeninfo").hide();
    }
  });

  $(window).on("scroll", function() {
    let scrollTop = $(window).scrollTop();

    let view = scrollTop + $(window).height() - $("footer").offset().top + 100;

    if (view > 0) {
      //푸터가 화면에 노출된 상태
      $date.css({ marginBottom: view + 280 });
    } else {
      $date.css({ marginBottom: 0 });
    }
  });
});

// group-slides
$(function() {
  const $container = $(".group-slides>.screen>.slides-container");
  const $slides = $container.children("li");

  let nowIdx = 0;
  let aniChk = false;
  let intervalKey = null;

  const nextMove = function() {
    if (aniChk == false) {
      aniChk = true;

      nowIdx++;

      if (nowIdx == 24) {
        nowIdx = 0;
      }

      $(".group-slides>.screen>.slides-container")
        .stop()
        .animate({ left: "-=150" }, "easeInBack", function() {
          $(".group-slides>.screen>.slides-container>li")
            .first()
            .appendTo(".group-slides>.screen>.slides-container");

          $container.css({ left: "+=150" });

          aniChk = false;
        });
    }
  };

  $(window).on("load", function() {
    intervalKey = setInterval(function() {
      nextMove();
    }, 5000);
  });

  $(".slides-next").click(function(evt) {
    evt.preventDefault();

    nextMove();
  });

  //이전
  $(".slides-prev").click(function(evt) {
    evt.preventDefault();

    if (aniChk == false) {
      aniChk = true;

      nowIdx--;

      if (nowIdx == -1) {
        nowIdx = 23;
      }

      $(".group-slides>.screen>.slides-container")
        .stop()
        .animate({ left: "+=150" }, "easeInBack", function() {
          $(".group-slides>.screen>.slides-container>li")
            .last()
            .prependTo(".group-slides>.screen>.slides-container");

          $container.css({ left: "-=150" });

          aniChk = false;
        });
    }
  });
});

// footer
$(function() {
  const $top = $("footer>.footer-content>.mnu>a");
  const $select = $("footer>.footer-content>.mnu>.select");

  $top.on("click", function(evt) {
    evt.preventDefault();
    $("html,body").stop().animate({
      scrollTop: 0
    });
  });

  $select.children('a').on('click',function(evt){
    evt.preventDefault();

    $select.addClass('on')
  });

  $select.on('mouseleave',function(){
    $select.removeClass('on');
  });
});
