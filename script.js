// Eye tracking
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".eye").forEach(eye => {
    const pupil = eye.querySelector(".pupil");
    const r = eye.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top + r.height/2);
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(18, Math.hypot(dx, dy)/10);
    pupil.style.transform =
      `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
  });
});

// Bug reveal
const cards = document.querySelectorAll(".bug-card");
const success = document.getElementById("success");
const sound = document.getElementById("click-sound");

cards.forEach(card=>{
  card.onclick = ()=>{
    if(!card.classList.contains("revealed")){
      card.classList.add("revealed");
      sound.currentTime=0;
      sound.volume=0.25;
      sound.play();
      if([...cards].every(c=>c.classList.contains("revealed")))
        success.classList.add("show");
    }
  }
});

// Reset
document.getElementById("reset-btn").onclick = ()=>{
  cards.forEach(c=>c.classList.remove("revealed"));
  success.classList.remove("show");
};

// Resume modal
const modal = document.getElementById("resume-modal");
document.getElementById("open-resume").onclick = ()=>modal.classList.add("show");
document.getElementById("close-resume").onclick = ()=>modal.classList.remove("show");
