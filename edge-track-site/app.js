const copy = {
  en: {
    skip:'Skip to content', navSystem:'The system', navInstall:'Installation', navPrivacy:'Privacy', navCta:'Discuss a pilot ↗',
    heroKicker:'Warehouse visibility / local-first concept', heroTitle:'See the work between arrival and departure.',
    heroLead:'A fixed camera can tell you when a truck arrived, which dock it used, where time was spent, and when it left. Edge Track turns those observations into a timeline your team can act on.',
    heroDemo:'Watch real footage ↓', heroHow:'See how installation works ↗', heroNote:'Working laptop prototype. The on-site edge appliance is a proposed next step.',
    boardExample:'REAL WAREHOUSE FOOTAGE', footageHeader:'01 / LOADING', footageScene:'FORKLIFT LOADS PALLETS INTO A TRUCK', footageNote:'Real stock footage of loading. The timeline below is simulated; it is not measured from this clip.', footageSource:'Video: Tomas Gutierrez Duport / Pexels ↗', videoLabel:'Real video of a forklift loading pallets into a truck at a warehouse', videoFallback:'Your browser cannot play this video.', warehouse:'WAREHOUSE', legendTruck:'Truck track', legendZone:'Dock zone', boardLocal:'FRAMES PROCESSED ON SITE',
    signalOne:'Truck visits', signalOneDetail:'Arrival to exit', signalTwo:'Dock occupancy', signalTwoDetail:'When a bay is in use', signalThree:'Activity changes', signalThreeDetail:'Loading and idle periods inferred from movement',
    scenarioIndex:'SEE THE SIGNAL', scenarioTitle:'A visit becomes a timeline.', scenarioIntro:'Select an event to see how a dock visit is interpreted. This sequence is simulated and illustrates the rules, not a live camera feed.', simulationTag:'SIMULATED SCENARIO', yard:'YARD', dock:'DOCK 1', metricStatus:'Detected state', metricZone:'Zone', metricTime:'Visit time', controlsTitle:'Follow one truck', scenarioCaveat:'Events are inferred from tracked positions and configurable zones. A person crossing a loading line is only an activity proxy; it is not a verified pallet count.',
    systemIndex:'FROM IMAGE TO EVENT', systemTitle:'Keep the picture local. Use the event.', systemIntro:'The value is not another camera screen. It is a consistent record of visits, occupancy, and exceptions that can be reviewed by an operator.', methodOneTitle:'Observe', methodOneText:'A fixed view covers the yard approach and one or more loading docks. A camera or recorded clip supplies frames to the processor.', methodTwoTitle:'Track', methodTwoText:'Computer vision finds trucks and people, keeps short-lived track IDs, and checks their positions against drawn zones and crossing lines.', methodThreeTitle:'Understand', methodThreeText:'Rules turn those movements into arrival, dock entry, activity, idle, and exit events. The dashboard shows timings and lets you export visits.', methodFoot:'Today: laptop prototype tested with simulated sequences and public recorded video. Before a warehouse pilot: validate camera angles, detection accuracy, and any custom forklift model.',
    installIndex:'A PRACTICAL PILOT', installTitle:'Start with one camera and one dock.', installIntro:'The proposed installation uses your existing fixed camera where compatible. The pilot is a small, reversible setup: no warehouse-system integration is required to learn whether the view is useful.', installOneTitle:'Check the view', installOneText:'Choose a camera that clearly sees the truck approach, the dock threshold, and the loading area. Confirm image quality and permission to use the feed.', installTwoTitle:'Connect the processor', installTwoText:'Connect an on-site computer to power and the camera network. RTSP/IP-camera compatibility and edge hardware are verified during the pilot.', installThreeTitle:'Mark the zones', installThreeText:'Draw the yard and dock areas and a loading line on a sample frame. Set thresholds for brief occlusions and idle time.', installFourTitle:'Compare with reality', installFourText:'Run a short supervised trial, compare events with observed activity, adjust zones, then decide whether to expand to more cameras.', installCalloutTitle:'What you need for a first trial', installCalloutText:'One suitable fixed camera or a sample recording, local network access, a laptop or edge computer, and an operator who can verify the resulting timeline.',
    privacyIndex:'PRIVACY BY DESIGN', privacyTitle:'Process video. Do not build a video archive.', privacyLead:'The intended on-site setup analyzes live frames locally and does not save a continuous recording by default. What remains is a small operational event record: time, zone, track ID, and duration. This illustrative website does not access your camera.', privacyCta:'Discuss privacy requirements for your site ↗', privacyOneTitle:'Camera frames', privacyOneText:'Processed on site in the proposed live setup. No continuous recording or cloud video upload is part of the default design.', privacyTwoTitle:'Offline imports', privacyTwoText:'The laptop prototype stages an imported video temporarily on the laptop while zones are set and frames are processed. It deletes the import after processing, cancellation or reset.', privacyThreeTitle:'Event history', privacyThreeText:'Visit times and event metadata are retained locally for review and CSV export. Retention periods, access, and any optional review clips are decided with the pilot site.',
    limitsTitle:'What the prototype proves — and what it doesn’t.', limitsIntro:'A useful pilot starts with honest boundaries.', worksTitle:'Working today', worksText:'A local dashboard, configurable zones, truck and person tracking on recorded video, visit timelines, occupancy estimates, movement trails, and CSV export.', nextTitle:'Needs site validation', nextText:'Live camera integration, reliable forklift detection, pallet counts, camera-specific accuracy, multi-camera identity, and deployment on a dedicated edge device.',
    ctaIndex:'NEXT STEP', ctaTitle:'Have a dock worth measuring?', ctaText:'Tell us about one camera and one operational question. We can assess the view and define a small, privacy-conscious pilot.', ctaButton:'Discuss a pilot ↗', footerBy:'A Bitlads Software concept', footerBack:'Back to Bitlads Software ↗',
    states:[{time:'00:00',name:'Truck arrives',state:'Arrival detected',zone:'Yard',duration:'00:00',badge:'ARRIVAL / YARD'}, {time:'03:12',name:'Enters dock 1',state:'Dock occupied',zone:'Dock 1',duration:'03:12',badge:'DOCK 1 / OCCUPIED'}, {time:'08:46',name:'Activity at dock',state:'Activity inferred',zone:'Dock 1',duration:'08:46',badge:'CROSSING / ACTIVITY'}, {time:'37:30',name:'Truck exits',state:'Visit complete',zone:'Outside',duration:'37:30',badge:'EXIT / VISIT COMPLETE'}],
    title:'Edge Track — See the work between arrival and departure', description:'Edge Track turns fixed-camera warehouse footage into dock occupancy, truck visits and activity events. Local-first concept by Bitlads Software.'
  },
  ro: {
    skip:'Sari la conținut', navSystem:'Cum funcționează', navInstall:'Instalare', navPrivacy:'Confidențialitate', navCta:'Hai să vorbim ↗',
    heroKicker:'Pentru curte și rampe', heroTitle:'Știi cât stă fiecare camion la rampă.',
    heroLead:'Edge Track urmărește sosirile și plecările din imaginile camerei. Vezi timpii într-un singur loc, fără să parcurgi ore de filmare.',
    heroDemo:'Vezi filmarea ↓', heroHow:'Cum se instalează ↗', heroNote:'Acum rulează pe laptop. Următorul pas este testarea într-un depozit.',
    boardExample:'FILMARE REALĂ DIN DEPOZIT', footageHeader:'01 / ÎNCĂRCARE', footageScene:'STIVUITORUL ÎNCARCĂ PALEȚI ÎN CAMION', footageNote:'Aceasta este o filmare reală. Timpii din exemplul de mai jos sunt simulați; nu au fost calculați din filmare.', footageSource:'Video: Tomas Gutierrez Duport / Pexels ↗', videoLabel:'Filmarea unui stivuitor care încarcă paleți într-un camion la depozit', videoFallback:'Browserul nu poate reda această filmare.', warehouse:'DEPOZIT', legendTruck:'Traseu camion', legendZone:'Zonă rampă', boardLocal:'PROCESARE LOCALĂ',
    signalOne:'Sosiri și plecări', signalOneDetail:'Când vine și când pleacă un camion', signalTwo:'Rampe ocupate', signalTwoDetail:'Ce rampă e folosită și pentru cât timp', signalThree:'Activitate la rampă', signalThreeDetail:'Mișcarea indică lucrul și pauzele',
    scenarioIndex:'UN EXEMPLU', scenarioTitle:'De la sosire la plecare.', scenarioIntro:'Apasă pe un moment din listă. Exemplul este simulat.', simulationTag:'SIMULARE', yard:'CURTE', dock:'RAMPA 1', metricStatus:'Stare', metricZone:'Zonă', metricTime:'Timp scurs', controlsTitle:'Ce se întâmplă cu camionul', scenarioCaveat:'Mișcarea poate indica activitate la rampă. Nu confirmă câți paleți s-au încărcat.',
    systemIndex:'CUM FUNCȚIONEAZĂ', systemTitle:'Camera vede. Tu primești timpii.', systemIntro:'Sosirile, ocuparea rampei și plecările apar în ordine, într-un panou simplu.', methodOneTitle:'O cameră fixă', methodOneText:'Ai nevoie de o imagine clară a curții și a rampei. Pentru început, putem folosi o înregistrare.', methodTwoTitle:'Urmărirea mișcării', methodTwoText:'Programul detectează camioane și persoane și urmărește când intră sau ies din zonele marcate.', methodThreeTitle:'Timpi la îndemână', methodThreeText:'Vezi cât a durat fiecare etapă și poți descărca datele într-un tabel.', methodFoot:'Testat pe laptop, cu simulări și filmări publice. Precizia trebuie verificată pe camera din depozitul tău.',
    installIndex:'INSTALARE', installTitle:'Începem cu o cameră și o rampă.', installIntro:'Verificăm dacă putem folosi camera pe care o ai deja. La primul test nu trebuie să conectăm sistemul la softul depozitului.', installOneTitle:'Alegem camera', installOneText:'Ne uităm dacă se văd bine accesul camionului și zona de încărcare.', installTwoTitle:'Conectăm calculatorul', installTwoText:'Un calculator local are nevoie de curent și acces la rețeaua camerelor. Conexiunea live urmează să fie testată.', installThreeTitle:'Marcăm rampa', installThreeText:'Desenăm zonele pe imagine și stabilim după cât timp fără mișcare semnalăm o pauză.', installFourTitle:'Verificăm împreună', installFourText:'Comparăm timpii din aplicație cu ce se întâmplă la rampă. Ajustăm ce e nevoie înainte să extindem.', installCalloutTitle:'Ce ne trebuie la început', installCalloutText:'O cameră sau o filmare de probă, un laptop și cineva din echipă care cunoaște activitatea de la rampă.',
    privacyIndex:'CONFIDENȚIALITATE', privacyTitle:'Fără arhivă video.', privacyLead:'Varianta live pe care o pregătim va analiza imaginile local, fără înregistrare continuă. Acest site nu îți accesează camera.', privacyCta:'Vorbim despre datele tale ↗', privacyOneTitle:'Imaginile rămân la tine', privacyOneText:'Pentru varianta live, procesarea va avea loc în depozit. Filmarea nu va fi trimisă în cloud.', privacyTwoTitle:'Cum testăm acum', privacyTwoText:'Pe laptop, filmarea importată este păstrată temporar cât setezi zonele și rulezi analiza. Copia importată se șterge la final, la anulare sau la resetare.', privacyThreeTitle:'Ce se păstrează', privacyThreeText:'Orele, zonele, ID-urile de urmărire și duratele rămân local. Stabilim împreună cine le vede și cât timp sunt păstrate.',
    limitsTitle:'Unde suntem acum.', limitsIntro:'Prototipul funcționează pe laptop.', worksTitle:'Ce poți vedea deja', worksText:'Camioane și persoane urmărite pe filmări, trasee, timpi la rampă și date pe care le poți descărca.', nextTitle:'Ce mai avem de testat', nextText:'Conectarea live la camere și rularea pe un dispozitiv dedicat. Stivuitoarele și paleții nu sunt încă detectați fiabil.',
    ctaIndex:'VORBIM?', ctaTitle:'Vrei să-l încercăm în depozitul tău?', ctaText:'Spune-ne unde se pierde timp. Pornim de la o singură rampă și vedem ce putem măsura.', ctaButton:'Hai să vorbim ↗', footerBy:'Un proiect Bitlads Software', footerBack:'Înapoi la Bitlads Software ↗',
    states:[{time:'00:00',name:'Camionul sosește',state:'A sosit',zone:'Curte',duration:'00:00',badge:'SOSIRE / CURTE'}, {time:'03:12',name:'Intră la rampa 1',state:'Rampă ocupată',zone:'Rampa 1',duration:'03:12',badge:'RAMPA 1 / OCUPATĂ'}, {time:'08:46',name:'Mișcare la rampă',state:'Mișcare detectată',zone:'Rampa 1',duration:'08:46',badge:'MIȘCARE LA RAMPĂ'}, {time:'37:30',name:'Camionul pleacă',state:'A plecat',zone:'În afara curții',duration:'37:30',badge:'PLECARE'}],
    title:'Edge Track — Știi cât stă fiecare camion la rampă', description:'Vezi când sosesc camioanele, cât stau la rampă și când pleacă. Edge Track, un proiect Bitlads Software cu procesare locală.'
  }
};
let lang = new URLSearchParams(location.search).get('lang') === 'ro' ? 'ro' : 'en';
let step = 0;
const eventList = document.getElementById('event-list');
function renderStep(){
  const items = copy[lang].states;
  const selected = items[step];
  document.getElementById('stage').className = `scenario-stage stage-${step}`;
  document.getElementById('stage-state').textContent = selected.badge;
  document.getElementById('metric-status').textContent = selected.state;
  document.getElementById('metric-zone').textContent = selected.zone;
  document.getElementById('metric-time').textContent = selected.duration;
  eventList.replaceChildren();
  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'event-button'; button.setAttribute('aria-pressed', String(index === step));
    const time = document.createElement('span'); time.className = 'event-time'; time.textContent = item.time;
    const name = document.createElement('span'); name.className = 'event-name'; name.textContent = item.name;
    const arrow = document.createElement('span'); arrow.className = 'event-arrow'; arrow.setAttribute('aria-hidden','true'); arrow.textContent = '↗';
    button.append(time,name,arrow); button.addEventListener('click',()=>{step=index;renderStep()}); eventList.append(button);
  });
}
function render(){
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector('meta[property="og:title"]').content = t.title;
  document.querySelector('meta[property="og:description"]').content = t.description;
  document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t[node.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-aria]').forEach(node => node.setAttribute('aria-label', t[node.dataset.i18nAria]));
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.lang === lang)));
  renderStep();
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',()=>{
  lang = button.dataset.lang;
  const url = new URL(location.href);
  if(lang==='ro')url.searchParams.set('lang','ro');else url.searchParams.delete('lang');
  history.replaceState(null,'',url);
  render();
}));
window.addEventListener('popstate',()=>{lang=new URLSearchParams(location.search).get('lang')==='ro'?'ro':'en';render()});
document.getElementById('year').textContent = new Date().getFullYear();
render();
