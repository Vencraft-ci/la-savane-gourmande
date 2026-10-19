(function(){
"use strict";
var WA="https://wa.me/2250173942119";
var $=function(s){return document.querySelector(s)};

/* ----- message WhatsApp pré-rempli ----- */
function msg(t){return "Bonjour, je souhaite obtenir une estimation pour mon projet :\n\n1. Nom & Prénom :\n2. Type de projet :"+(t?" "+t:" (ex: Construction neuve, Rénovation, Topographie)")+"\n3. Type de bâtiment : (ex: Villa, Immeuble, Magasin, Duplex)\n4. Localisation du chantier : (ex: Grand-Bassam, Abidjan, Yamoussoukro)\n5. Superficie du terrain/projet :\n6. Budget estimatif (Optionnel) :\n7. Description rapide du besoin (Optionnel) :"}
function wa(t){return WA+"?text="+encodeURIComponent(msg(t))}
Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"),function(a){a.href=wa()});

/* ----- données ----- */
var S=[
{t:"Aménagement foncier",s:"Découpage des parcelles, voies d’accès, réseaux et espaces verts",img:"foncier",a:"Vue aérienne d’un aménagement foncier : lots, voies d’accès et espaces verts",
p:["Vous avez un terrain et souhaitez en faire un projet structuré, accessible et valorisé ? CTBAT.CI vous accompagne dans la conception et la réalisation de votre projet d’aménagement foncier.","Nous vous proposons notamment l’organisation et le découpage des parcelles, l’aménagement des voies d’accès, la planification des espaces réservés aux équipements et services, ainsi que l’organisation des réseaux et des espaces verts."],
o:["De l’étude de votre terrain à la mise en œuvre du projet, nous mettons notre expertise technique et foncière à votre service pour vous accompagner dans la réalisation d’un aménagement cohérent et adapté à vos objectifs."]},
{t:"Promotion immobilière",s:"De l’acquisition du terrain à la livraison, clé en main",img:"promotion",a:"Remise des clés d’une maison",
p:["Concevoir, financer et réaliser des projets de construction — résidences, immeubles — depuis l’acquisition du terrain jusqu’à la livraison des ouvrages aux futurs propriétaires ou locataires. Chez CTBAT.CI, nous portons vos projets immobiliers avec rigueur, en veillant à la qualité, aux délais et à la conformité réglementaire à chaque étape."],
l:[["Étude de faisabilité","analyse du terrain, du marché et de la rentabilité du projet"],["Conception architecturale","élaboration de plans adaptés aux besoins et aux normes en vigueur"],["Montage et suivi de projet","coordination des différentes phases, du permis de construire à la réception des travaux"],["Gestion de chantier","supervision technique et respect des standards de qualité"],["Commercialisation","accompagnement dans la vente ou la location des biens réalisés"]],
o:["Fort de notre double expertise en topographie et en construction, nous offrons à nos clients un accompagnement complet et sécurisé, de l’idée jusqu’à la clé en main."]},
{t:"Topographie et lotissement",s:"Levés, bornage, morcellement et plans de lotissement",img:"lotissement",a:"Plan de lotissement avec courbes de niveau",
p:["Mesurer, délimiter et représenter fidèlement un terrain avant toute intervention. Grâce à notre expertise du terrain, nous vous garantissons des relevés précis et des découpages fiables, base essentielle de la sécurité juridique de vos projets."],
l:[["Levés topographiques","relevés précis du terrain (relief, limites, superficies)"],["Bornage","délimitation officielle et matérialisation des limites de propriété"],["Plan de morcellement","division du terrain en lots exploitables"],["Élaboration de plans de lotissement","conception conforme aux règles d’urbanisme"],["Assistance technique","accompagnement dans les démarches administratives et cadastrales"]],
o:["Grâce à une maîtrise rigoureuse des outils de mesure (GPS RTK, stations totales) et une bonne connaissance du foncier ivoirien, nous garantissons des données fiables pour sécuriser vos investissements."]},
{t:"Bâtiment et travaux publics",s:"Construction, voiries, réseaux divers et assainissement",img:"travaux",a:"Canalisations en béton sur un chantier de voirie",
p:["Nous mettons notre expertise technique au service de vos projets, en garantissant qualité, solidité et respect des normes en vigueur."],
l:[["Construction de bâtiments","résidences, immeubles, locaux commerciaux et administratifs"],["Travaux publics","voiries, réseaux divers (VRD), ouvrages d’assainissement"],["Réhabilitation et rénovation","mise aux normes et modernisation d’ouvrages existants"],["Suivi et contrôle des travaux","supervision technique garantissant qualité et respect des délais"],["Étude et dimensionnement des ouvrages","conception adaptée aux contraintes du terrain et aux normes techniques"]]},
{t:"Conception de plans architecturaux",s:"Plans de masse, façades, coupes et permis de construire",img:"plans",a:"Plan architectural d’une maison",
p:["Nous concevons des plans clairs et détaillés — plans de masse, plans de niveaux, façades et coupes — pour donner vie à vos projets résidentiels, commerciaux ou administratifs."],
l:[["Plans de masse","implantation du bâtiment sur le terrain"],["Plans d’aménagement intérieur","distribution des pièces et espaces de vie"],["Façades et élévations","représentation visuelle des différentes vues du bâtiment"],["Coupes et détails techniques","précision des dimensions, matériaux et niveaux"],["Dossiers de permis de construire","constitution des documents nécessaires aux démarches administratives"]]},
{t:"Devis et études techniques",s:"Métrés rigoureux et devis détaillés avant de commencer",img:"devis",a:"Plan annoté, mètres et crayon",
p:["Avant tout démarrage de projet, une évaluation précise des coûts et des aspects techniques est indispensable pour garantir sa réussite.","Nous réalisons des métrés rigoureux et des devis détaillés, basés sur une analyse technique approfondie, afin de vous offrir une visibilité claire sur le budget et la faisabilité de votre projet."],
l:[["Métré et quantitatif","évaluation précise des quantités de matériaux et de main-d’œuvre"],["Devis détaillés","estimation transparente des coûts par poste de dépense"],["Études techniques","analyse de faisabilité et des contraintes du projet"],["Optimisation budgétaire","recommandations pour maîtriser les coûts sans compromettre la qualité"],["Assistance à la planification","appui dans la définition des priorités et du phasage des travaux"]],
o:["Grâce à notre rigueur et notre connaissance du terrain, nous vous accompagnons avec des chiffrages fiables, essentiels à la bonne gestion de vos projets."]},
{t:"Suivi et contrôle de chantier",s:"Supervision technique, qualité, délais et sécurité",img:"chantier",a:"Équipe de chantier consultant un plan",
p:["La réussite d’un projet de construction repose sur un suivi rigoureux à chaque étape des travaux. CTBAT.CI vous assure une supervision technique constante des chantiers, garantissant le respect des plans, des délais, des normes de qualité et de sécurité, du premier coup de pioche jusqu’à la réception des ouvrages."],
l:[["Suivi technique des travaux","vérification de la conformité des ouvrages aux plans et normes"],["Contrôle qualité","inspection des matériaux et de l’exécution des travaux"],["Gestion des délais","suivi du planning et coordination des différents corps de métier"],["Rapports de chantier","comptes rendus réguliers sur l’avancement et les points de vigilance"],["Réception des travaux","accompagnement lors des vérifications finales avant livraison"]],
o:["Grâce à notre expertise technique et notre présence rigoureuse sur le terrain, nous garantissons des ouvrages conformes, sécurisés et livrés dans les meilleures conditions."]},
{t:"Vente et location d’appareils topographiques",s:"GPS RTK, stations totales, niveaux : vente, location, formation",img:"materiel",a:"Gamme d’appareils topographiques",
p:["Pour la réalisation de vos travaux de topographie, disposer d’un matériel fiable et performant est essentiel.","Nous mettons à votre disposition une gamme d’appareils topographiques de qualité, disponibles à la vente ou à la location, adaptés aussi bien aux professionnels qu’aux particuliers souhaitant réaliser leurs propres relevés."],
l:[["Vente d’équipements","GPS RTK, stations totales, niveaux et accessoires topographiques"],["Location de matériel","solutions flexibles pour vos missions ponctuelles ou de courte durée"],["Conseil technique","accompagnement dans le choix du matériel adapté à votre projet"],["Formation à l’utilisation","initiation à la prise en main des appareils pour un usage optimal"],["Service après-vente","maintenance et assistance technique sur les équipements"]]}
];
var AFF=[
{s:"img/affiche-terrain.webp",a:"Affiche CTBAT.CI : Votre terrain, notre expertise — topographie, lotissement, bâtiments, plans",c:"Topographie · Lotissement · Bâtiments · Plans"}
];
var GAL=[
{s:"img/bureau.webp",a:"Intérieur du bureau CTBAT.CI à Djébonoua",c:"Notre bureau",w:1},
{s:"img/accueil.webp",a:"Espace d’accueil client avec l’enseigne CTBAT.CI",c:"Espace d’accueil"},
{s:"img/enseigne.webp",a:"Enseigne CTBAT.CI Immobilier et Génie Civil",c:"Notre enseigne"},
{s:"img/exterieur.webp",a:"Vue extérieure des abords de l’agence",c:"Vue extérieure",w:1}
];
var MAP=[{s:"img/carte.webp",a:"Carte de Djébonoua indiquant la position de CTBAT.CI",c:"CTBAT.CI — Djébonoua"}];
var MN=[["Accueil","#top","home"],["Services","#services","services"],["Expertise","#affiches","affiches"],["Méthode","#methode","methode"],["Galerie","#galerie","galerie"],["Localisation","#localisation","localisation"]];
var ARW='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ----- rendu ----- */
var rvd=function(i){return ' style="--d:'+((i%5)*70)+'ms"'};
var mq=S.map(function(s){return "<span>"+s.t+" /</span>"}).join("");$("#mq").innerHTML=mq+mq;
$("#list").innerHTML=S.map(function(s,i){return '<button class="row rv"'+rvd(i)+' type="button" data-i="'+i+'" aria-haspopup="dialog"><img src="img/'+s.img+'.webp" alt="" width="68" height="68" loading="lazy"><span class="tx"><span class="t d">'+s.t+'</span><small>'+s.s+'</small></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1B33" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>'}).join("");
$("#pr").innerHTML=AFF.map(function(p,i){return '<button class="po rv"'+rvd(i)+' type="button" data-p="'+i+'" aria-label="Agrandir : '+p.c+'"><img src="'+p.s+'" alt="'+p.a+'" loading="lazy"></button>'}).join("");
$("#gg").innerHTML=GAL.map(function(g,i){return '<button class="gi rv'+(g.w?" w":"")+'"'+rvd(i)+' type="button" data-g="'+i+'" aria-label="Agrandir : '+g.c+'"><img src="'+g.s+'" alt="'+g.a+'" loading="lazy"><span class="cap">'+g.c+'</span></button>'}).join("");
$("#mg").innerHTML=MN.map(function(m,i){return '<a href="'+m[1]+'" data-v="'+m[2]+'" style="--i:'+i+'"><span>'+m[0]+'</span>'+ARW+'</a>'}).join("");

/* ----- apparitions en douceur ----- */
var io=null;
if("IntersectionObserver" in window){io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -5% 0px"})}
function watch(root){Array.prototype.forEach.call(root.querySelectorAll(".rv"),function(el){if(!io){el.classList.add("in");return}el.classList.remove("in");io.unobserve(el);io.observe(el)})}
watch(document);

/* ----- affiches : flèches ----- */
var pr=$("#pr"),pw=pr.parentNode,pa1=$("#pa1"),pa2=$("#pa2");
function arr(){pw.classList.toggle("nos",pr.scrollWidth<=pr.clientWidth+4);pa1.disabled=pr.scrollLeft<4;pa2.disabled=pr.scrollLeft+pr.clientWidth>=pr.scrollWidth-4}
function slide(d){pr.scrollBy({left:d*(pr.firstElementChild.offsetWidth+14),behavior:"smooth"})}
pa1.addEventListener("click",function(){slide(-1)});pa2.addEventListener("click",function(){slide(1)});
pr.addEventListener("scroll",arr,{passive:true});window.addEventListener("resize",arr);window.addEventListener("load",arr);

/* ----- méthode : traits qui se chargent ----- */
var steps=document.querySelectorAll(".stp");
function tl(){var w=$(".tlw");if(!w||!w.offsetParent)return;var r=w.getBoundingClientRect(),p=Math.min(1,Math.max(0,(window.innerHeight*.72-r.top)/r.height));w.style.setProperty("--p",p.toFixed(3));Array.prototype.forEach.call(steps,function(st){st.classList.toggle("on",p*r.height>=st.offsetTop+14)})}

/* ----- en-tête ----- */
var hd=$("#hd"),view="home";
function onScroll(){hd.classList.toggle("sc",window.scrollY>30||view!=="home");tl()}
window.addEventListener("scroll",onScroll,{passive:true});

/* ----- vues : un clic = une seule section + le pied de page ----- */
var hero=$(".hero"),mqw=$(".mqw"),secs=Array.prototype.slice.call(document.querySelectorAll("main>section"));
function setView(v){var home=!v||v==="home";view=home?"home":v;document.body.setAttribute("data-view",view);
hero.hidden=!home;mqw.hidden=!home;
secs.forEach(function(s){var show=home||s.id===v;if(s.hidden===show)watch(s);s.hidden=!show;s.classList.toggle("solo",show&&!home)});
Array.prototype.forEach.call(document.querySelectorAll(".mg a"),function(a){a.classList.toggle("cur",a.dataset.v===view)});
window.scrollTo({top:0,left:0,behavior:"instant"});arr();onScroll()}
function nav(v){setView(v);history.pushState({v:v},"")}
window.addEventListener("popstate",function(e){setView(e.state&&e.state.v||"home")});
var h0=location.hash.slice(1);
if(secs.some(function(s){return s.id===h0}))setView(h0);
history.replaceState({v:view},"");onScroll();

/* ----- menu hamburger ----- */
var mb=$("#mb"),mn=$("#mn"),mv=$("#mv");
function menu(on){mn.classList.toggle("on",on);mv.classList.toggle("on",on);hd.classList.toggle("mo",on);document.body.classList.toggle("lock",on);mn.setAttribute("aria-hidden",on?"false":"true");mb.setAttribute("aria-expanded",on?"true":"false");mb.setAttribute("aria-label",on?"Fermer le menu":"Ouvrir le menu")}
mb.addEventListener("click",function(){menu(!mn.classList.contains("on"))});

/* ----- fiche service ----- */
var last,sheet=$("#sheet");
function openS(i){var s=S[i],h=s.p.map(function(p){return "<p>"+p+"</p>"}).join("");last=document.activeElement;
$("#si").src="img/"+s.img+".webp";$("#si").alt=s.a;$("#st").textContent=s.t;
if(s.l)h+='<div class="sub">Nos prestations incluent</div>'+s.l.map(function(x,j){return '<div class="li" style="--i:'+j+'"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join("");
if(s.o)h+='<div class="out">'+s.o.map(function(p){return "<p>"+p+"</p>"}).join("")+"</div>";
$("#sb").innerHTML=h;$("#sw").href=wa(s.t);
$(".pn").scrollTop=0;sheet.classList.add("on");sheet.setAttribute("aria-hidden","false");document.body.classList.add("lock");$(".pn").focus({preventScroll:true})}
function closeS(){sheet.classList.remove("on");sheet.setAttribute("aria-hidden","true");document.body.classList.remove("lock");if(last)last.focus({preventScroll:true})}

/* ----- visionneuse ----- */
var lb=$("#lb"),L={set:[],i:0},lastL;
function lbShow(){var it=L.set[L.i],im=$("#lbi");im.classList.remove("in2");im.src=it.s;im.alt=it.a;void im.offsetWidth;im.classList.add("in2");$("#lbc").textContent=it.c+(L.set.length>1?"  ·  "+(L.i+1)+" / "+L.set.length:"")}
function openL(set,i){L.set=set;L.i=i;lastL=document.activeElement;lb.classList.toggle("one",set.length<2);lbShow();lb.classList.add("on");lb.setAttribute("aria-hidden","false");document.body.classList.add("lock");$(".lbx1").focus({preventScroll:true})}
function closeL(){lb.classList.remove("on");lb.setAttribute("aria-hidden","true");if(!sheet.classList.contains("on")&&!mn.classList.contains("on"))document.body.classList.remove("lock");if(lastL)lastL.focus({preventScroll:true})}
function go(d){L.i=(L.i+d+L.set.length)%L.set.length;lbShow()}
$("#lbp").addEventListener("click",function(){go(-1)});
$("#lbn").addEventListener("click",function(){go(1)});
var tx=null;
lb.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",function(e){if(tx===null||L.set.length<2)return;var dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>50)go(dx<0?1:-1)},{passive:true});

/* ----- clics et clavier ----- */
document.addEventListener("click",function(e){var t=e.target,r;
if(t.closest("[data-lbclose]")){closeL();return}
if((r=t.closest("[data-v]"))){e.preventDefault();menu(false);nav(r.dataset.v);return}
if((r=t.closest(".row"))){openS(+r.dataset.i);return}
if(t.closest("[data-close]")){closeS();return}
if((r=t.closest(".po"))){openL(AFF,+r.dataset.p);return}
if((r=t.closest(".gi"))){openL(GAL,+r.dataset.g);return}
if(t.closest("[data-m]")){openL(MAP,0);return}
if(t.closest("[data-menu-close]")||t.closest(".mc a"))menu(false)});
document.addEventListener("keydown",function(e){
if(lb.classList.contains("on")){if(e.key==="Escape")closeL();else if(e.key==="ArrowRight")go(1);else if(e.key==="ArrowLeft")go(-1);return}
if(e.key==="Escape"){if(sheet.classList.contains("on"))closeS();else if(mn.classList.contains("on"))menu(false)}});
})();

/* ----- voix d'accueil + barre basse masquée sur le pied de page ----- */
(function(){
"use strict";
var a=document.getElementById("vo"),b=document.getElementById("vb"),t=document.getElementById("vt");
if(a&&b){
var stopped=false,started=false,tm=null;
function ui(){var on=!a.paused;b.classList.toggle("off",!on);b.setAttribute("aria-pressed",on?"true":"false");b.setAttribute("aria-label",on?"Couper la voix":"Réécouter la voix")}
function hideTip(){if(t)t.classList.remove("show");clearTimeout(tm)}
function showTip(){if(!t)return;t.classList.add("show");clearTimeout(tm);tm=setTimeout(hideTip,9000)}
function reveal(){b.hidden=false}
if(a.readyState>=1)reveal();else a.addEventListener("loadedmetadata",reveal);
a.addEventListener("play",function(){ui();showTip()});
a.addEventListener("pause",function(){ui();hideTip()});
a.addEventListener("ended",function(){ui();hideTip()});
function tryPlay(){if(stopped||started)return;var p=a.play();if(p&&p.then)p.then(function(){started=true}).catch(function(){})}
tryPlay();
/* les navigateurs bloquent souvent le son automatique : on lance la voix dès le premier geste */
function unlock(e){if(started||stopped){off();return}if(e.target&&e.target.closest&&e.target.closest("#vb"))return;tryPlay()}
var ev=["pointerup","touchend","click","keydown"];
function off(){ev.forEach(function(n){document.removeEventListener(n,unlock,true)})}
ev.forEach(function(n){document.addEventListener(n,unlock,true)});
b.addEventListener("click",function(){
if(a.paused){stopped=false;started=true;if(a.ended)a.currentTime=0;var p=a.play();if(p&&p.catch)p.catch(function(){})}
else{stopped=true;a.pause()}});
document.addEventListener("visibilitychange",function(){
if(document.hidden){if(!a.paused)a.pause()}
else if(started&&!stopped&&!a.ended&&a.currentTime>0){var p=a.play();if(p&&p.catch)p.catch(function(){})}});
}
var ft=document.getElementById("contact");
if(ft&&"IntersectionObserver" in window){new IntersectionObserver(function(es){document.body.classList.toggle("fin",es[0].isIntersecting)},{rootMargin:"0px 0px -70px 0px"}).observe(ft)}
})();

/* ----- formulaire à remplir avant d'ouvrir WhatsApp ----- */
(function(){
"use strict";
var NUM="2250173942119";
var fm=document.getElementById("fm"),ff=document.getElementById("ff"),fe=document.getElementById("fe");
if(!fm||!ff)return;
var f=function(i){return document.getElementById("f"+i)},lastF=null;
function isOn(id){var el=document.getElementById(id);return el&&el.classList.contains("on")}
function openF(ctx){
lastF=document.activeElement;
if(ctx){var s=f(2),ok=false;Array.prototype.forEach.call(s.options,function(o){if(o.text===ctx||o.value===ctx){s.value=o.value;ok=true}});
if(!ok){var o=document.createElement("option");o.text=ctx;o.setAttribute("data-x","1");s.add(o);s.value=ctx}}
fe.hidden=true;
fm.classList.add("on");fm.setAttribute("aria-hidden","false");document.body.classList.add("lock");
fm.querySelector(".fp").scrollTop=0;
setTimeout(function(){f(1).focus({preventScroll:true})},350)}
function closeF(){
fm.classList.remove("on");fm.setAttribute("aria-hidden","true");
if(!isOn("sheet")&&!isOn("mn")&&!isOn("lb"))document.body.classList.remove("lock");
if(lastF&&lastF.focus)lastF.focus({preventScroll:true})}
function v(i){return (f(i).value||"").trim()}
function opt(i){return v(i)||"Non précisé"}
function build(){return "Bonjour, je souhaite obtenir une estimation pour mon projet :\n\n1. Nom & Prénom : "+v(1)+"\n2. Type de projet : "+v(2)+"\n3. Type de bâtiment : "+v(3)+"\n4. Localisation du chantier : "+v(4)+"\n5. Superficie du terrain/projet : "+opt(5)+"\n6. Budget estimatif (Optionnel) : "+opt(6)+"\n7. Description rapide du besoin (Optionnel) : "+opt(7)}
/* un clic sur n'importe quel bouton WhatsApp ouvre d'abord le formulaire */
document.addEventListener("click",function(e){
var t=e.target.closest&&e.target.closest("[data-wa],#sw");
if(!t)return;
e.preventDefault();
var ctx=t.id==="sw"?(document.getElementById("st").textContent||"").trim():"";
setTimeout(function(){openF(ctx)},0)},true);
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("[data-fclose]"))closeF()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&fm.classList.contains("on")){e.stopPropagation();closeF()}},true);
Array.prototype.forEach.call(ff.querySelectorAll("input,select,textarea"),function(el){el.addEventListener("input",function(){el.classList.remove("bad")});el.addEventListener("change",function(){el.classList.remove("bad")})});
ff.addEventListener("submit",function(e){
e.preventDefault();
var bad=null;
for(var i=1;i<=4;i++){var el=f(i);if(!v(i)){el.classList.add("bad");if(!bad)bad=el}else el.classList.remove("bad")}
if(bad){fe.hidden=false;bad.focus();return}
fe.hidden=true;
var url="https://wa.me/"+NUM+"?text="+encodeURIComponent(build());
var w=window.open(url,"_blank","noopener");
if(!w)window.location.href=url;
ff.reset();
Array.prototype.forEach.call(f(2).querySelectorAll("option[data-x]"),function(o){o.parentNode.removeChild(o)});
closeF()});
})();