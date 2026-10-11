var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(x){io.observe(x)});
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,n=+el.dataset.n,i=0;var t=setInterval(function(){i++;el.textContent=Math.round(n*i/30)+'+';if(i>=30)clearInterval(t)},30);co.unobserve(el)})});
document.querySelectorAll('[data-n]').forEach(function(x){co.observe(x)});
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();var s=document.getElementById('st'),ok=true;
this.querySelectorAll('[required]').forEach(function(x){var b=!x.value.trim()||(x.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.value));x.classList.toggle('bad',b);if(b)ok=false});
s.className=ok?'ok':'er';s.textContent=ok?'Preview only: the live site will email you or post to Formspree.':'Please fill in the highlighted fields.'});

window.addEventListener('load',function(){setTimeout(function(){document.getElementById('loader').classList.add('gone')},900)});setTimeout(function(){document.getElementById('loader').classList.add('gone')},2500);
var pr=document.getElementById('prog'),up=document.getElementById('up');window.addEventListener('scroll',function(){var h=document.documentElement;pr.style.width=h.scrollTop/(h.scrollHeight-h.clientHeight)*100+'%';up.classList.toggle('show',h.scrollTop>600)});
var gl=document.getElementById('glow');if(matchMedia('(pointer:fine)').matches)addEventListener('mousemove',function(e){gl.style.opacity=1;gl.style.left=e.clientX+'px';gl.style.top=e.clientY+'px'});
var words=['customers','enquiries','sales','leads'],wi=0,rt=document.getElementById('rot');setInterval(function(){rt.classList.add('out');setTimeout(function(){wi=(wi+1)%words.length;rt.textContent=words[wi];rt.classList.remove('out')},350)},2600);
if(matchMedia('(pointer:fine)').matches)document.querySelectorAll('.card,.cs').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='translateY(-6px) perspective(800px) rotateX('+(-y*5)+'deg) rotateY('+(x*5)+'deg)'});c.addEventListener('mouseleave',function(){c.style.transform=''})});

// ── Mobile hamburger menu ──
var hb=document.getElementById('hb'),nl=document.getElementById('nl');
function closeMenu(){nl.classList.remove('open');hb.classList.remove('open');hb.setAttribute('aria-expanded','false')}
hb.addEventListener('click',function(){var open=nl.classList.toggle('open');hb.classList.toggle('open',open);hb.setAttribute('aria-expanded',open?'true':'false')});
document.querySelectorAll('.nl-link').forEach(function(a){a.addEventListener('click',closeMenu)});
document.addEventListener('click',function(e){if(nl.classList.contains('open')&&!nl.contains(e.target)&&e.target!==hb&&!hb.contains(e.target)){closeMenu()}});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});

// ── requirement wizard ──
var step=1,f=document.getElementById('f');
var base={'New business website':6999,'Website redesign':6999,'WooCommerce / online store':16999,'SEO & speed improvement':3999,'Logo & branding':2999,'Maintenance':999,'Website + social media package':6999};
var fe={'Blog':1500,'Online booking':2500,'Payment gateway':2000,'Multi-language':3000,'Logo design':2500,'SEO pack':2000};
/* services priced by custom quote (depends on number of posts / designs per month) */
var customSvc=['Creative design','Social media management'];
/* services priced by number of pages */
var pageSvc=['New business website','Website redesign','WooCommerce / online store','Website + social media package'];
function fm(n){return '₹'+n.toLocaleString('en-IN')}
function curSvc(){var v=f.querySelector('[name=svc]:checked');return v?v.value:''}
function calc(){var s=curSvc();if(!s||customSvc.indexOf(s)>-1)return 0;var t=base[s]||6999;if(pageSvc.indexOf(s)>-1){var p=+f.pages.value;t+=p==10?8000:p==15?15000:0}f.querySelectorAll('[name=feat]:checked').forEach(function(c){t+=fe[c.value]||0});return t}
function upd(){var s=curSvc(),t=calc(),e=document.getElementById('est');
 if(customSvc.indexOf(s)>-1){e.textContent='Custom quote'}
 else{e.textContent=t?fm(t)+((f.pages.value==15&&pageSvc.indexOf(s)>-1)||s=='Website + social media package'?'+':''):'—'}
 document.getElementById('pgl').style.display=(!s||pageSvc.indexOf(s)>-1)?'flex':'none';
 document.getElementById('wb').style.width=step*25+'%';
 document.querySelectorAll('#ws span').forEach(function(x,i){x.classList.toggle('on',i<step)});
 document.querySelectorAll('.step').forEach(function(x){x.classList.toggle('on',+x.dataset.s===step)});
 document.getElementById('prev').style.visibility=step>1?'visible':'hidden';
 document.getElementById('next').textContent=step==4?'Send requirement →':'Next →'}
f.addEventListener('change',upd);
document.getElementById('prev').onclick=function(){step--;upd()};
document.getElementById('next').onclick=function(){var st=document.getElementById('st');st.className='';st.textContent='';
 if(step==1&&!f.querySelector('[name=svc]:checked')){st.className='er';st.textContent='Please choose what you need.';return}
 var ok=true;f.querySelectorAll('.step.on [required]').forEach(function(x){var b=!x.value.trim()||(x.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.value));x.classList.toggle('bad',b);if(b)ok=false});
 if(!ok){st.className='er';st.textContent='Please fill in the highlighted fields.';return}
 if(step<4){step++;upd();return}
 var d=Object.fromEntries(new FormData(f));if(d._gotcha)return;var feats=[].map.call(f.querySelectorAll('[name=feat]:checked'),function(c){return c.value}).join(', ')||'None';
 var pagesLine=pageSvc.indexOf(d.svc)>-1?'Pages: '+(d.pages=='15'?'10+':'up to '+d.pages)+'\n':'';
 var sum='Service: '+d.svc+'\n'+pagesLine+'Extras: '+feats+'\nBudget: '+d.budget+' · Timeline: '+d.time+'\nEstimated from: '+document.getElementById('est').textContent+'\n\nWe will contact '+d.name+' at '+d.email+' within one working day.';
 document.getElementById('sum').textContent=sum.replace(/&amp;/g,'&');f.style.display='none';document.getElementById('ws').style.display='none';document.getElementById('done').classList.add('on');
 var FORM_ENDPOINT='';/* paste your Formspree URL, e.g. https://formspree.io/f/xxxxxxx */
 var body=sum.replace(/&amp;/g,'&');
 if(FORM_ENDPOINT){fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(Object.assign({summary:body},d))}).catch(function(){})}
 else{location.href='mailto:snehaj.designs@gmail.com?subject='+encodeURIComponent('Website enquiry from '+d.name)+'&body='+encodeURIComponent(body+'\n\nPhone: '+(d.phone||'-')+'\nWebsite: '+(d.website||'-')+'\nGoals: '+d.message)}
};
upd();
