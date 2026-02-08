/* =========================
   SCENE NAVIGATION SYSTEM
========================= */

const scenes = document.querySelectorAll(".scene");
const nextButtons = document.querySelectorAll(".next");

function activateScene(id){
  scenes.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if(target){
    target.classList.add("active");
    target.scrollIntoView({behavior:"smooth"});
  }
}

/* buttons */
nextButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const next = btn.getAttribute("data-next");
    if(next) activateScene(next);
  });
});
/* =========================
   CHOCOLATE RAIN SYSTEM
========================= */

const rainContainer = document.getElementById("chocolate-rain");

function createChocolate(){
  if(!rainContainer) return;

  const choco = document.createElement("div");
  choco.innerText = "🍫";

  choco.style.position = "absolute";
  choco.style.left = Math.random()*100 + "vw";
  choco.style.top = "-40px";
  choco.style.fontSize = (18 + Math.random()*18) + "px";
  choco.style.opacity = 0.9;
  choco.style.pointerEvents = "none";
  choco.style.transition = "transform linear";

  rainContainer.appendChild(choco);

  const fallDuration = 5 + Math.random()*5;

  setTimeout(()=>{
    choco.style.transform = `translateY(110vh) rotate(360deg)`;
    choco.style.transitionDuration = fallDuration + "s";
  },50);

  setTimeout(()=>{
    choco.remove();
  }, fallDuration*1000 + 100);
}

/* spawn loop */
setInterval(createChocolate, 500);
/* =========================
   FIND MY HEART GAME
========================= */

const heartArea = document.getElementById("heart-area");

function initHeartGame(){
  if(!heartArea) return;

  heartArea.innerHTML = "";

  const total = 12;
  const heartIndex = Math.floor(Math.random()*total);

  for(let i=0;i<total;i++){
    const box = document.createElement("div");
    box.innerText = "🍫";

    if(i === heartIndex){
      box.dataset.heart = "yes";
    }

    box.addEventListener("click", ()=>{
      if(box.dataset.heart === "yes"){
        box.innerText = "❤️";
        box.style.background = "gold";
        box.style.transform = "scale(1.2)";
      } else {
        box.innerText = "❌";
      }
    });

    heartArea.appendChild(box);
  }
}

/* run when section visible */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      initHeartGame();
    }
  });
});

if(heartArea) observer.observe(heartArea);
/* =========================
   WIN CELEBRATION SYSTEM
========================= */

function celebrateWin(){

  /* glow flash */
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "rgba(255,215,0,0.25)";
  flash.style.backdropFilter = "blur(4px)";
  flash.style.zIndex = "999";
  flash.style.animation = "fadeFlash 0.8s forwards";
  document.body.appendChild(flash);

  setTimeout(()=>flash.remove(),800);

  /* message popup */
  const msg = document.createElement("div");
  msg.innerText = "You found it ❤️";
  msg.style.position = "fixed";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%,-50%)";
  msg.style.background = "gold";
  msg.style.color = "#4e260e";
  msg.style.padding = "15px 25px";
  msg.style.borderRadius = "20px";
  msg.style.fontWeight = "700";
  msg.style.zIndex = "1000";
  msg.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";
  document.body.appendChild(msg);

  setTimeout(()=>msg.remove(),1200);
}

/* animation add */
const fx = document.createElement("style");
fx.innerHTML = `
@keyframes fadeFlash{
  from{opacity:1;}
  to{opacity:0;}
}`;
document.head.appendChild(fx);


/* connect with heart game */
document.addEventListener("click", e=>{
  if(e.target.dataset && e.target.dataset.heart === "yes"){
    celebrateWin();
  }
});
/* =========================
   SPARKLE BURST EFFECT
========================= */

function sparkle(x,y){
  for(let i=0;i<12;i++){
    const s = document.createElement("div");

    s.style.position = "fixed";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.width = "6px";
    s.style.height = "6px";
    s.style.borderRadius = "50%";
    s.style.background = "gold";
    s.style.pointerEvents = "none";
    s.style.zIndex = "1001";

    const angle = Math.random()*360;
    const distance = 40 + Math.random()*40;

    s.style.transition = "1s ease";
    document.body.appendChild(s);

    setTimeout(()=>{
      s.style.transform = `
        translate(
          ${Math.cos(angle)*distance}px,
          ${Math.sin(angle)*distance}px
        )
      `;
      s.style.opacity = 0;
    },10);

    setTimeout(()=>s.remove(),1000);
  }
}

/* sparkle on correct heart */
document.addEventListener("click", e=>{
  if(e.target.dataset && e.target.dataset.heart === "yes"){
    const rect = e.target.getBoundingClientRect();
    sparkle(rect.left + rect.width/2, rect.top + rect.height/2);
  }
});
/* =========================
   GAME 1 – TAP FAST
========================= */
const tapBtn = document.getElementById("tap-btn");
const tapScore = document.getElementById("tap-score");

if(tapBtn){
  let score = 0;
  tapBtn.onclick = () => {
    score++;
    tapScore.innerText = "Score: " + score;
    tapBtn.style.transform = "scale(1.2)";
    setTimeout(()=>tapBtn.style.transform="scale(1)",100);
  };
}


/* =========================
   GAME 2 – CATCH HEART
========================= */
const catchArea = document.getElementById("catch-area");

function spawnHeart(){
  if(!catchArea) return;

  const heart = document.createElement("div");
  heart.innerText = "❤️";
  heart.style.position = "absolute";
  heart.style.left = Math.random()*80 + "%";
  heart.style.top = "0px";
  heart.style.cursor="pointer";

  heart.onclick = ()=> heart.remove();

  catchArea.appendChild(heart);

  let fall = setInterval(()=>{
    let top = parseInt(heart.style.top);
    heart.style.top = top + 4 + "px";
    if(top>200){
      heart.remove();
      clearInterval(fall);
    }
  },30);
}

if(catchArea){
  setInterval(spawnHeart,1200);
}


/* =========================
   GAME 3 – MEMORY MATCH
========================= */
const memoryArea = document.getElementById("memory-area");

if(memoryArea){
  const items = ["❤️","❤️","🍫","🍫","💖","💖"];
  items.sort(()=>Math.random()-0.5);

  let first = null;

  items.forEach(symbol=>{
    const box = document.createElement("div");
    box.innerText = "?";

    box.onclick = ()=>{
      box.innerText = symbol;

      if(!first){
        first = box;
      } else {
        if(first.innerText !== box.innerText){
          setTimeout(()=>{
            first.innerText="?";
            box.innerText="?";
          },600);
        }
        first = null;
      }
    };

    memoryArea.appendChild(box);
  });
}