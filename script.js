/* =========================================================
   PROJECT 5:09 — script
   ========================================================= */
(function(){
  "use strict";

  /* ---------- The two dates this whole page revolves around ---------- */
  // 25 June 2026, 5:09 PM — the moment she said "Yes for me too"
  var SAID_YES = new Date(2026, 5, 25, 17, 9, 0);
  // 20 November 2026, 6:15 AM — the wedding
  var WEDDING  = new Date(2026, 10, 20, 6, 15, 0);

  var HER_MESSAGE_PREFIX =
    "After all our conversations I just felt that we can grow, learn and adapt together so it is ";
  var HER_MESSAGE_HIGHLIGHT = "Yes for me too";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var M = REDUCED ? 0.04 : 1; // time multiplier for the intro choreography

  /* ---------- small helpers ---------- */
  function $(id){ return document.getElementById(id); }
  function pad(n){ return String(n).padStart(2, "0"); }
  function diffParts(ms){
    ms = Math.max(0, ms);
    return {
      days:    Math.floor(ms / 86400000),
      hours:   Math.floor((ms % 86400000) / 3600000),
      minutes: Math.floor((ms % 3600000) / 60000),
      seconds: Math.floor((ms % 60000) / 1000)
    };
  }

  /* =====================================================
     ACT 1 — the intro sequence
     ===================================================== */
  function runIntro(){
    var l1 = $("l1"), l2 = $("l2");

    setTimeout(function(){ l1.classList.add("in"); }, 500 * M);
    setTimeout(function(){ l1.classList.remove("in"); l1.classList.add("out"); }, 3100 * M);
    setTimeout(function(){
      l2.classList.add("in");
    }, 4300 * M);
    setTimeout(function(){
      l2.classList.remove("in"); l2.classList.add("out");
    }, 7600 * M);
    setTimeout(revealMain, 8800 * M);
  }


  function revealMain(){
    $("intro").classList.add("hide");
    document.body.classList.remove("locked");
    $("main").classList.add("ready");
    setTimeout(function(){ $("intro").style.display = "none"; }, 1700);

    initReveal();
    initParallax();
    tick();
    setInterval(tick, 1000);
  }

  /* =====================================================
     ACT 4 / ACT 7 — live timers with a flip transition
     ===================================================== */
  function setFlipValue(id, value){
    var el = $(id);
    if (!el) return;
    var newText = pad(value);
    if (el.dataset.val === undefined){
      el.dataset.val = newText;
      el.textContent = newText;
      return;
    }
    if (el.dataset.val === newText) return;
    el.dataset.val = newText;
    el.classList.add("flipping");
    setTimeout(function(){ el.textContent = newText; }, 300);
    setTimeout(function(){ el.classList.remove("flipping"); }, 620);
  }

  function tick(){
    var now = new Date();

    // Card 1 — always counts up from the moment she said yes
    var since = diffParts(now - SAID_YES);
    setFlipValue("since-days", since.days);
    setFlipValue("since-hours", since.hours);
    setFlipValue("since-minutes", since.minutes);
    setFlipValue("since-seconds", since.seconds);
    $("sinceCaption").textContent =
      since.days + " days, " + since.hours + " hours since you said yes.";

    // Card 2 + Finale — countdown to the wedding, then counts up after
    var toWedding = WEDDING - now;
    var married = toWedding <= 0;
    var up = diffParts(married ? (now - WEDDING) : toWedding);

    ["until", "finale"].forEach(function(prefix){
      setFlipValue(prefix + "-days", up.days);
      setFlipValue(prefix + "-hours", up.hours);
      setFlipValue(prefix + "-minutes", up.minutes);
      setFlipValue(prefix + "-seconds", up.seconds);
    });

    var untilLabel = $("untilLabel");
    var finaleLabel = $("finaleLabel");
    var untilCaption = $("untilCaption");

    if (married){
      untilLabel.textContent = "Married For";
      finaleLabel.textContent = "Married For";
      untilCaption.textContent = up.days + " days of being each other's forever.";
    } else {
      untilLabel.textContent = "And we are about to get locked in";
      finaleLabel.textContent = "Wedding Countdown";
      untilCaption.textContent = up.days + " days until we're each other's forever.";
    }
  }

  /* =====================================================
     ACT 5 — reflection signature moment, triggered on view
     ===================================================== */
  function initReflectionSignature(){
    var sig = $("signature2");
    if (!sig) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        sig.classList.add("show", "heart-in");
        setTimeout(function(){
          sig.classList.remove("heart-in");
          sig.classList.add("morph");
        }, 1600 * M);
        setTimeout(function(){
          sig.classList.add("fade-out");
        }, 3400 * M);
        io.unobserve(sig);
      });
    }, { threshold: 0.6 });
    io.observe(sig);
  }

  /* =====================================================
     Scroll reveal — opacity + translateY + blur
     ===================================================== */
  function initReveal(){
    var els = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function(el){ io.observe(el); });

    initReflectionSignature();
  }

  /* =====================================================
     Subtle parallax on the hero image while it's in view
     ===================================================== */
  function initParallax(){
    if (REDUCED) return;
    var media = $("heroMedia");
    var hero = $("hero");
    if (!media || !hero) return;
    var ticking = false;

    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY;
        var h = hero.offsetHeight;
        if (y < h){
          media.style.transform = "translateY(" + (y * 0.22) + "px)";
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- go ---------- */
  runIntro();
})();
