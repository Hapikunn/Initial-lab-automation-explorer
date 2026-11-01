import { stages, steps } from './data.js';

function svgArt(type, mode){
  const palette = {
    manual:{a:'#7856a7',b:'#d8c6ef',bg:'#f6f0fb'},
    bio:{a:'#157c83',b:'#a8dadd',bg:'#eefafa'},
    robot:{a:'#b56a1f',b:'#efd0aa',bg:'#fff8ef'}
  }[mode];
  const {a,b,bg}=palette;
  const common = `fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  let machine='';
  if(mode==='bio') machine=`<rect x="112" y="18" width="62" height="56" rx="8" fill="#fff" stroke="${a}" stroke-width="2"/><circle cx="128" cy="61" r="4" fill="${a}"/><circle cx="158" cy="61" r="4" fill="${a}"/><path d="M126 33h33M126 42h22" ${common}/>`;
  if(mode==='robot') machine=`<path d="M150 72h35" ${common}/><circle cx="150" cy="72" r="8" fill="#fff" stroke="${a}" stroke-width="2"/><path d="M150 64l-15-24 19-12 16 20" ${common}/><circle cx="135" cy="40" r="7" fill="#fff" stroke="${a}" stroke-width="2"/><circle cx="154" cy="28" r="7" fill="#fff" stroke="${a}" stroke-width="2"/><path d="M170 48l12-10 8 9" ${common}/>`;
  if(type==='ice'||type==='ice2'||type==='cool') return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><path d="M37 67h70l-8 22H45z" fill="#fff" stroke="${a}" stroke-width="2"/><path d="M46 61c10-11 18 8 27-4s19 7 28-4" ${common}/><path d="M69 22v36M55 31l28 18M83 31L55 49" ${common}/>${machine}</svg>`;
  if(type==='pipette'||type==='media') return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><path d="M60 22l25 25-15 15-25-25z" fill="#fff" stroke="${a}" stroke-width="2"/><path d="M83 45l23 23" ${common}/><path d="M108 72c0 0-5 9-5 12a5 5 0 0010 0c0-3-5-12-5-12z" fill="${b}" stroke="${a}" stroke-width="2"/><rect x="79" y="84" width="58" height="11" rx="5" fill="#fff" stroke="${a}" stroke-width="2"/>${machine}</svg>`;
  if(type==='heat') return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><rect x="36" y="63" width="78" height="28" rx="6" fill="#fff" stroke="${a}" stroke-width="2"/><rect x="51" y="28" width="14" height="35" rx="6" fill="#fff" stroke="${a}" stroke-width="2"/><rect x="82" y="28" width="14" height="35" rx="6" fill="#fff" stroke="${a}" stroke-width="2"/><path d="M46 54c-6-9 6-10 0-18M69 54c-6-9 6-10 0-18M104 54c-6-9 6-10 0-18" ${common}/>${machine}</svg>`;
  if(type==='shake') return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><rect x="33" y="35" width="85" height="55" rx="8" fill="#fff" stroke="${a}" stroke-width="2"/><rect x="46" y="48" width="58" height="28" rx="5" fill="${b}" opacity=".5" stroke="${a}" stroke-width="2"/><path d="M45 22c11-9 22 9 33 0s22 9 33 0" ${common}/>${machine}</svg>`;
  if(type==='plate') return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><ellipse cx="75" cy="66" rx="48" ry="19" fill="#fff" stroke="${a}" stroke-width="2"/><ellipse cx="75" cy="62" rx="44" ry="15" fill="${b}" opacity=".45"/><circle cx="56" cy="60" r="3" fill="${a}"/><circle cx="72" cy="69" r="3" fill="${a}"/><circle cx="91" cy="57" r="3" fill="${a}"/><circle cx="101" cy="67" r="3" fill="${a}"/>${machine}</svg>`;
  return `<svg viewBox="0 0 220 112"><rect width="220" height="112" fill="${bg}"/><rect x="35" y="29" width="76" height="63" rx="7" fill="#fff" stroke="${a}" stroke-width="2"/><rect x="46" y="42" width="54" height="31" rx="4" fill="${b}" opacity=".45"/><path d="M50 82h48" ${common}/>${machine}</svg>`;
}

function card(step, idx, mode){
  const map={manual:{label:'MANUAL',text:'manual',meta:'manMeta',img:'manualImage',pill:'human'},bio:{label:'BIOFOUNDRY',text:'bio',meta:'bioMeta',img:'bioImage',pill:'bio-device'},robot:{label:'ROBOT ARM',text:'robot',meta:'robotMeta',img:'robotImage',pill:'robot-device'}};
  const cfg=map[mode];
  const meta=step[cfg.meta]||[];
  const imageSrc=step[cfg.img];
  const visual=imageSrc?`<img src="${imageSrc}" alt="${step.title}" loading="lazy">`:svgArt(step.art,mode);
  const gap=(mode==='robot' && step.robotGap)?`<div class="status-note"><span class="status-dot"></span>人手が残る工程</div>`:'';
  return `<div class="process-card ${mode}">
    <div class="visual"><span class="badge">${cfg.label}</span>${visual}</div>
    <div class="card-body">
      <div class="step-index">Step ${String(idx+1).padStart(2,'0')} · ${step.section}</div>
      <div class="card-title">${step.title}</div>
      <div class="card-text">${step[cfg.text]}${gap}</div>
      <div class="meta">${meta.map(m=>`<span class="pill ${mode==='robot'&&step.robotGap?'gap':cfg.pill}">${m}</span>`).join('')}</div>
    </div>
  </div>`;
}

function processRow(mode){
  const info={
    manual:{tag:'1行目｜現在の手作業',desc:'研究者が試料を見て、運び、操作し、状態を判断する'},
    bio:{tag:'2行目｜Biofoundry型',desc:'AutoBioTech型：専用装置群・plate規格・schedulerで工程をつなぐ'},
    robot:{tag:'3行目｜ロボットアーム型',desc:'OSCAR型：汎用robot armが人向けの既存装置とlabwareを操作する'}
  }[mode];
  return `<div class="process-row">
    <div class="row-label"><div class="tag ${mode}">${info.tag}</div><div class="desc">${info.desc}</div></div>
    ${steps.map((st,i)=>`<div class="card-wrap">${card(st,i,mode)}${i<steps.length-1?'<div class="arrow">→</div>':''}</div>`).join('')}
  </div>`;
}

function renderOverview(active){
  document.getElementById('overview').innerHTML = stages.map((s,i)=>`<button class="stage ${s.id===active?'active':''}" data-stage="${s.id}"><span class="num">0${i+1}</span><span class="name">${s.name}</span><span class="small">${s.small}</span></button>`).join('');
  document.querySelectorAll('.stage').forEach(btn=>btn.addEventListener('click',()=>render(btn.dataset.stage)));
}

function render(stage){
  renderOverview(stage);
  const detail = document.getElementById('detail');
  if(stage!=='transformation'){
    const s=stages.find(x=>x.id===stage);
    detail.innerHTML=`<div class="empty"><strong>${s.name}</strong>このフェーズは次の実装対象です。Transformation と同じ3段比較（手作業／Biofoundry／robot arm）を追加できます。</div>`;
    return;
  }
  detail.innerHTML=`
    <div class="detail-head">
      <div><h2>Transformation — 3つの実装思想を比較</h2><p>同じTransformationを、現在の手作業、専用統合型Biofoundry、汎用ロボットアーム型で横並びに比較します。</p></div>
      <div class="source-badge">Manual: Thermo Fisher / Biofoundry: AutoBioTech / Robot: OSCAR</div>
    </div>
    <div class="subflow"><span class="substep on">Competent cells</span><span class="substep on">DNA addition</span><span class="substep on">Heat shock</span><span class="substep on">Recovery</span><span class="substep on">Plating</span><span class="substep on">Overnight incubation</span></div>
    <div class="paper-refs">
      <div class="paper-ref bio-ref"><div><strong>Biofoundry reference — AutoBioTech, Fig. 2</strong><span>Automated E. coli transformation: cooling carrier → thermal cycler → recovery → spotting → agar incubation.</span></div><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11264319/" target="_blank" rel="noopener">論文を開く ↗</a></div>
      <div class="paper-ref robot-ref"><div><strong>Robot-arm reference — OSCAR, Fig. 5</strong><span>Robot arm + electronic pipette + gripper + stylus. Transformation and plating are demonstrated; overnight incubator transfer remains manual.</span></div><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13010791/" target="_blank" rel="noopener">論文を開く ↗</a></div>
    </div>
    <div class="comparison">${processRow('manual')}${processRow('bio')}${processRow('robot')}</div>
    <div class="delta">
      <div class="delta-cell"><div class="delta-k">手作業</div><div class="delta-v"><strong>柔軟だが暗黙知が多い</strong><br>試料同一性や状態確認を人が担う。</div></div>
      <div class="delta-cell"><div class="delta-k">Biofoundry</div><div class="delta-v"><strong>規格化された高速・高throughput</strong><br>専用装置間をschedulerとrobotic transportで結ぶ。</div></div>
      <div class="delta-cell"><div class="delta-k">Robot arm</div><div class="delta-v"><strong>既存設備を使えて柔軟</strong><br>一方でsetupや装置間移送に人手が残る場合がある。</div></div>
      <div class="delta-cell"><div class="delta-k">このアプリで見せる価値</div><div class="delta-v"><strong>同じ生物学工程でも、責任境界が変わる</strong><br>どこまで機械が保証し、どこから人が保証するかを可視化。</div></div>
    </div>`;
}
render('transformation');
