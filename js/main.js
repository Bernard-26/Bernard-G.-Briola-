(function(){
  // Manila local time
  var c=document.getElementById("clock");
  function tick(){try{c.textContent="Manila, "+new Date().toLocaleTimeString("en-PH",{hour:"numeric",minute:"2-digit",timeZone:"Asia/Manila"})}catch(e){}}
  tick();setInterval(tick,30000);

  // highlight current section in nav
  var links=[].slice.call(document.querySelectorAll(".side nav a"));
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id)})}})},{rootMargin:"-40% 0px -55% 0px"});
    links.forEach(function(a){var s=document.querySelector(a.getAttribute("href"));if(s)io.observe(s)});
  }

})();
