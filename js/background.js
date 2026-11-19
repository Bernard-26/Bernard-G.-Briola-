(function(){
  var cv=document.getElementById("bg3d");
  if(!window.THREE)return;
  var calm=matchMedia("(prefers-reduced-motion:reduce)").matches,r,sc,cam,g,w1,w2,pts,mx=0,my=0,n=0;
  try{r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
  function accent(){return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2A44D4")}
  sc=new THREE.Scene();cam=new THREE.PerspectiveCamera(45,1,.1,50);cam.position.z=8;
  g=new THREE.Group();sc.add(g);
  var c=accent();
  w1=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.6,1)),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.32}));
  w2=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.3,0)),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.6}));
  var pos=[];for(var i=0;i<140;i++){var u=Math.random()*6.283,v=Math.acos(2*Math.random()-1),d=3.4+Math.random()*1.4;pos.push(d*Math.sin(v)*Math.cos(u),d*Math.sin(v)*Math.sin(u),d*Math.cos(v))}
  var pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));
  pts=new THREE.Points(pg,new THREE.PointsMaterial({color:c,size:.06,transparent:true,opacity:.7}));
  g.add(w1,w2,pts);
  function size(){
    var W=innerWidth,H=innerHeight;r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.setSize(W,H,false);
    cam.aspect=W/H;cam.updateProjectionMatrix();
    var wide=W>900;g.position.set(wide?3.6:0,wide?0:-1.2,0);g.scale.setScalar(wide?1:.75);
    if(calm)r.render(sc,cam);
  }
  addEventListener("resize",size);
  addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  function frame(){
    if(n++%90===0){var c2=accent();w1.material.color.copy(c2);w2.material.color.copy(c2);pts.material.color.copy(c2)}
    w1.rotation.y+=.0018;w1.rotation.x+=.0008;w2.rotation.y-=.003;w2.rotation.z+=.0015;pts.rotation.y+=.0006;
    g.rotation.y+=(mx*.6-g.rotation.y)*.03;g.rotation.x+=(my*.4-g.rotation.x)*.03;
    r.render(sc,cam);requestAnimationFrame(frame);
  }
  size();if(!calm)frame();
})();
