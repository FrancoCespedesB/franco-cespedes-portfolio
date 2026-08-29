const T={
  fr:{
    role:'Dessinateur de bande dessinée · Illustrateur · Character designer',
    navBd:'Bande dessinée',navIll:'Illustration',navKids:'Jeunesse',navCharacters:'Design de personnages',navSketches:'Croquis',navAbout:'À propos',
    bdTitle:'Bande dessinée',bdSub:'Séquentiel · narration · encrage · couleur',
    illTitle:'Illustration',illSub:'Éditorial · affiches · couvertures',
    kidsTitle:'Jeunesse',kidsSub:'Albums illustrés · édition jeunesse',
    charTitle:'Design de personnages',charSub:'Recherche · expressions · model sheets',
    sketchTitle:'Croquis & recherche',sketchSub:'Concepts · études de personnages · développement visuel',
    aboutLabel:'À PROPOS',
    bio:'Illustrateur et dessinateur de bande dessinée costaricien avec plus de vingt ans d’expérience professionnelle en illustration, animation et création de personnages. Son travail combine narration, expressivité et polyvalence graphique, pour des projets éditoriaux et de divertissement.',
    availability:'Disponible pour bande dessinée, illustration éditoriale et projets jeunesse.',back:'Retour en haut ↑'
  },
  en:{
    role:'Comic Artist · Illustrator · Character Designer',
    navBd:'Comics',navIll:'Illustration',navKids:"Children's",navCharacters:'Character Design',navSketches:'Sketches',navAbout:'About',
    bdTitle:'Comics',bdSub:'Sequential art · storytelling · inks · color',
    illTitle:'Illustration',illSub:'Editorial · posters · covers',
    kidsTitle:'Children’s Illustration',kidsSub:'Picture books · children’s publishing',
    charTitle:'Character Design',charSub:'Exploration · expressions · model sheets',
    sketchTitle:'Sketches & Development',sketchSub:'Concepts · figure studies · visual development',
    aboutLabel:'ABOUT',
    bio:'Costa Rican illustrator and comic artist with more than twenty years of professional experience in illustration, animation and character design. His work combines storytelling, expressiveness and graphic versatility across publishing and entertainment projects.',
    availability:'Available for comics, editorial illustration and children’s projects.',back:'Back to top ↑'
  },
  es:{
    role:'Dibujante de cómic · Ilustrador · Diseñador de personajes',
    navBd:'Cómic',navIll:'Ilustración',navKids:'Infantil',navCharacters:'Diseño de personajes',navSketches:'Bocetos',navAbout:'Acerca de',
    bdTitle:'Cómic',bdSub:'Arte secuencial · narrativa · tinta · color',
    illTitle:'Ilustración',illSub:'Editorial · afiches · portadas',
    kidsTitle:'Ilustración infantil',kidsSub:'Álbum ilustrado · edición infantil',
    charTitle:'Diseño de personajes',charSub:'Exploración · expresiones · hojas modelo',
    sketchTitle:'Bocetos y desarrollo',sketchSub:'Conceptos · estudios de figura · desarrollo visual',
    aboutLabel:'ACERCA DE',
    bio:'Ilustrador y dibujante de cómic costarricense con más de veinte años de experiencia profesional en ilustración, animación y diseño de personajes. Su trabajo combina narrativa, expresividad y versatilidad gráfica en proyectos editoriales y de entretenimiento.',
    availability:'Disponible para cómic, ilustración editorial y proyectos infantiles.',back:'Volver arriba ↑'
  }
};

let arr=[],idx=0,lb=document.querySelector('.lightbox');

document.querySelectorAll('.gallery').forEach(g=>{
  const a=PORTFOLIO_ITEMS.filter(x=>x.section===g.dataset.section);
  a.forEach((x,i)=>{
    const f=document.createElement('figure');
    f.className='card';
    const shortTitle=x.title.startsWith(x.project+' — ') ? x.title.slice((x.project+' — ').length) : x.title;
    f.innerHTML=`<div class="frame"><img src="${x.thumb}" loading="lazy" alt="${x.title}"></div><figcaption><strong>${x.project}</strong><span>${shortTitle}</span></figcaption>`;
    f.onclick=()=>open(a,i);
    g.appendChild(f);
  });
});

function open(a,i){arr=a;idx=i;show();lb.classList.add('open');document.body.style.overflow='hidden'}
function show(){const x=arr[idx];lb.querySelector('img').src=x.full;lb.querySelector('strong').textContent=x.title;lb.querySelector('span').textContent=x.credit}
function move(n){idx=(idx+n+arr.length)%arr.length;show()}
function close(){lb.classList.remove('open');document.body.style.overflow=''}
lb.querySelector('.close').onclick=close;
lb.querySelector('.prev').onclick=()=>move(-1);
lb.querySelector('.next').onclick=()=>move(1);
lb.onclick=e=>{if(e.target===lb)close()};
document.onkeydown=e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)};

function lang(l){
  const pack=T[l]||T.fr;
  document.documentElement.lang=l;
  document.querySelectorAll('[data-i]').forEach(e=>{const k=e.dataset.i;if(pack[k]!==undefined)e.innerHTML=pack[k]});
  document.querySelectorAll('.langs button').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  const url=new URL(location.href);url.searchParams.set('lang',l);history.replaceState(null,'',url);
}
document.querySelectorAll('.langs button').forEach(b=>b.onclick=()=>lang(b.dataset.lang));
lang(new URLSearchParams(location.search).get('lang')||'fr');
