// COUNTERS
document.querySelectorAll('.counter').forEach(counter=>{
  let target = +counter.dataset.target;
  let count = 0;
  let interval = setInterval(()=>{
    count += Math.ceil(target / 50);
    counter.innerText = count;
    if(count >= target){
      counter.innerText = target;
      clearInterval(interval);
    }
  },30);
});

// MODAL
function openModal(){
  document.getElementById("leadModal").style.display = "flex";
}

function closeModal(){
  document.getElementById("leadModal").style.display = "none";
}

// Close on outside click
window.addEventListener("click", e=>{
  const modal = document.getElementById("leadModal");
  if(e.target === modal){
    closeModal();
  }
});

// THEME
function toggleTheme(){
  document.body.classList.toggle("light");
}

// MENU
function toggleMenu(){
  document.querySelector(".nav-links").classList.toggle("active");
}


/* ================= MODAL FUNCTIONS ================= */
function openModal(){
  const modal = document.getElementById("leadModal");
  modal.style.display = "flex";
}

function closeModal(){
  const modal = document.getElementById("leadModal");
  modal.style.display = "none";
}

/* CLOSE MODAL ON OUTSIDE CLICK */
window.addEventListener("click", function(e){
  const modal = document.getElementById("leadModal");
  if(e.target === modal){
    modal.style.display = "none";
  }
});



window.addEventListener("load",()=>{
  const loader = document.getElementById("pageLoader");
  if(loader){
    loader.remove();
  }
});

<script>
function startProject() {
  window.open(
    "https://wa.me/919900464841?text=Hello%20Web%20Wonder,%20I%20want%20to%20start%20a%20project.",
    "_blank"
  );
}
</script>

<script>
function openModal() {
  document.getElementById("leadModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("leadModal").style.display = "none";
}
</script>




<script>
function toggleMenu(){
  document.getElementById("navMenu")
    .classList.toggle("active");
}
</script>
