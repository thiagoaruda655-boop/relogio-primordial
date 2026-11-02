const PHASES=[{n:'Noite',i:'🌙'},{n:'Aurora',i:'🌅'},{n:'Dia',i:'☀️'},{n:'Crepúsculo',i:'🌇'}];
const SEASONS=['Primavera','Verão','Outono','Inverno'];
let baseSeason=0, curPhase=0, curSeason=0, turn=1, year=1, started=false;
const $ = id => document.getElementById(id);
function renderDots(){
  const d=$('dots'); d.innerHTML='';
  for(let k=1;k<=8;k++){
    const s=document.createElement('span');
    if(k<turn) s.className='on';
    if(k===turn) s.className='now';
    d.appendChild(s);
  }
}
function update(){
  const ph=PHASES[curPhase], se=SEASONS[curSeason];
  $('icon').textContent=ph.i;
  $('phase').textContent=ph.n.toUpperCase();
  $('season').textContent=se.toUpperCase();
  $('window').textContent=`${ph.n} / ${se}`;
  $('yearInfo').textContent=`ANO ${year} • TURNO ${turn}/8`;
  $('winInfo').textContent=`JANELA ${curSeason*4+curPhase+1}/16`;
  renderDots();
}
function logAdd(txt){
  const l=$('log'); const p=document.createElement('div');
  p.innerHTML=txt; l.prepend(p);
}
document.querySelectorAll('#sGrid .opt').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('#sGrid .opt').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    baseSeason=parseInt(b.dataset.s); curSeason=baseSeason; check();
  })
});
document.querySelectorAll('#pGrid .opt').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('#pGrid .opt').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    curPhase=parseInt(b.dataset.p); check();
  })
});
function check(){
  if(document.querySelector('#sGrid .active') && document.querySelector('#pGrid .active')){
    update(); $('next').disabled=false; $('next').textContent='AVANÇAR TEMPO ▶';
    if(!started){started=true; turn=1; curSeason=baseSeason; logAdd(`<b>Início:</b> ${PHASES[curPhase].n} / ${SEASONS[curSeason]} - Ano ${year}`);}
  }
}
$('next').addEventListener('click',()=>{
  if(!started) return;
  const prevPh=PHASES[curPhase].n, prevSe=SEASONS[curSeason];
  curPhase=(curPhase+1)%4; turn++; if(turn>8){turn=1; year++; logAdd(`<b>--- NOVO ANO ${year} ---</b>`);}
  curSeason=(baseSeason+Math.floor((turn-1)/2))%4;
  update(); logAdd(`T${turn} A${year}: <b>${prevPh}/${prevSe}</b> → <b>${PHASES[curPhase].n}/${SEASONS[curSeason]}</b>`);
});
for(let i=0;i<8;i++){const s=document.createElement('span'); $('dots').appendChild(s);} update();