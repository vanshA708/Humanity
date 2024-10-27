function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
      multiplier: 0.8,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  
  locoScroll();
  
  const t1 = gsap.timeline();
  
  t1.to(".fixed-text", {
    top: "100%",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page1",
      start: "top top",
      end: "top -240%",
      // markers: true,
      scrub: 0.01,
    },
  });
  
  let clutter = "";
  
  document
    .querySelector(".page2>h1")
    .textContent.split(" ")
    .forEach(function (dets) {
      clutter += `<span> ${dets} </span>`;
      document.querySelector(".page2>h1").innerHTML = clutter;
    });
  
  document.querySelectorAll(".page2>h1>span").forEach((dets) => {
    dets.style.color = "#dadada69";
  });
  
  t1.to(".page2>h1>span", {
    stagger: 0.1,
    color: "#fff",
    scrollTrigger: {
      trigger: ".page2>h1>span",
      scroller: ".main",
      start: "top 70%",
      end: "bottom 10%",
      scrub: 0.5,
      // markers: true,
    },
  });
  
  t1.to(".page5-bg>img", {
    filter: "invert(100%)",
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 20%",
      end: "top -10%",
      scrub: 1,
      // markers: true,
    },
  });
  
  let clutter2 = "";
  document
    .querySelector(".page5-part2>h1")
    .textContent.split(" ")
    .forEach((dets) => {
      clutter2 += `<span> ${dets} </span>`;
      document.querySelector(".page5-part2>h1").innerHTML = clutter2;
    });
  
  document.querySelectorAll(".page5-part2>h1>span").forEach((dets) => {
    dets.style.color = "#dadada69";
  });
  
  t1.to(".page5-part2>h1>span", {
    color: "#fff",
    stagger: 0.5,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page5-part2>h1>span",
      start: "top 90%",
      end: "bottom 40%",
      scrub: 0.5,
      // markers: true,
    },
  });
  
  t1.from(".page6-line", {
    width: "0%",
    stagger: 0.2,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page6-line",
      start: "top 40%",
      end: "bottom 0%",
      scrub: 1,
    },
  });