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

// animated text, hidden-screenshot fallback
(function(){
  var calm=matchMedia("(prefers-reduced-motion:reduce)").matches;

  // words slide up out of a mask
  function split(el,step){
    var words=el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label",words.join(" "));
    el.textContent="";
    words.forEach(function(w,i){
      var o=document.createElement("span"),n=document.createElement("span");
      o.className="rw";o.setAttribute("aria-hidden","true");
      n.textContent=w;n.style.setProperty("--d",(i*step)+"s");
      o.appendChild(n);el.appendChild(o);
      if(i<words.length-1)el.appendChild(document.createTextNode(" "));
    });
  }
  if(!calm){
    var h=document.querySelector(".hero h1");
    split(h,.08);
    requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.add("is-in")})});
    var hs=[].slice.call(document.querySelectorAll("section>h2"));
    hs.forEach(function(e){split(e,.06)});
    if("IntersectionObserver" in window){
      var io2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("is-in");io2.unobserve(en.target)}})},{threshold:.6});
      hs.forEach(function(e){io2.observe(e)});
    }else{hs.forEach(function(e){e.classList.add("is-in")})}
  }

  // typewriter line (things I have actually built)
  var t=document.getElementById("typed");
  if(t){
    var lines=["online stores.","admin dashboards.","ordering systems.","back-end APIs.","rider dispatch maps."],li=0,ci=0,del=false;
    if(calm){t.textContent=lines[0]}else{
      var tick=function(){
        var cur=lines[li],wait;
        ci+=del?-1:1;
        t.textContent=cur.slice(0,ci);
        wait=del?32:70;
        if(!del&&ci===cur.length){wait=1700;del=true}
        else if(del&&ci===0){del=false;li=(li+1)%lines.length;wait=350}
        setTimeout(tick,wait);
      };
      setTimeout(tick,900);
    }
  }

  // if a screenshot is missing, drop it and keep the plain frame
  document.querySelectorAll(".shot img").forEach(function(img){
    var gone=function(){img.remove()};
    if(img.complete&&img.naturalWidth===0)gone();else img.addEventListener("error",gone);
  });
})();
