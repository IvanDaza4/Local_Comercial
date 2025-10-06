document.getElementById('year').textContent = new Date().getFullYear();

// mobile menu
const btn = document.getElementById('btn-mobile');
const panel = document.getElementById('mobile-panel');
btn.addEventListener('click', () => panel.classList.toggle('hidden'));// carousel logic
(function(){
  const track = document.querySelector('.carousel-track');
  const items = track.children;
  const total = items.length;
  let index = 0;  const dotsContainer = document.getElementById('dots');
  for (let i=0;i<total;i++){
    const d = document.createElement('span');
    d.className = 'w-2.5 h-2.5 rounded-full bg-gray-600 mx-1.5 inline-block opacity-60' + (i===0 ? ' bg-racemax-orange opacity-100 shadow-[0_0_6px_rgba(216,97,16,0.5)]' : '');
    d.dataset.i = i;
    dotsContainer.appendChild(d);
    d.addEventListener('click', (e)=> { goTo(parseInt(e.target.dataset.i)); });
  }  function update(){
    const pct = -100 * index;
    track.style.transform = 'translateX(' + pct + '%)';
    document.querySelectorAll('#dots span').forEach((el, i) => {
      el.className = 'w-2.5 h-2.5 rounded-full mx-1.5 inline-block ' + (i===index ? 'bg-racemax-orange opacity-100 shadow-[0_0_6px_rgba(216,97,16,0.5)]' : 'bg-gray-600 opacity-60');
    });
  }
  window.goTo = function(i){
    index = (i + total) % total;
    update();
  };  document.getElementById('prev').addEventListener('click', ()=> { goTo(index-1); });
  document.getElementById('next').addEventListener('click', ()=> { goTo(index+1); });  // autoplay
  let autoplay = setInterval(()=> { goTo(index+1); }, 4000);
  // pause on hover
  const carouselEl = document.getElementById('carousel');
  carouselEl.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  carouselEl.addEventListener('mouseleave', ()=> { autoplay = setInterval(()=> goTo(index+1),4000); });
})();