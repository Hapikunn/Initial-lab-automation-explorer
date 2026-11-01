export const stages = [
  {id:'synthesis', name:'DNA設計・合成', small:'Design / Synthesis'},
  {id:'assembly', name:'プラスミド構築', small:'Assembly / Cloning'},
  {id:'transformation', name:'Transformation', small:'E. coli transformation'},
  {id:'selection', name:'Colony selection', small:'Selection / Screening'},
  {id:'expression', name:'発現培養', small:'Culture / Expression'},
  {id:'gfp', name:'GFP活性測定', small:'Fluorescence readout'}
];

export const steps = [
  {
    section:'Transformation', title:'コンピテントセルを低温で準備',
    manual:'凍結コンピテントセルを取り出し、氷上で穏やかに解凍する。',
    bio:'AutoBioTechでは自動調製したcompetent cellsをPCR plateで4°C保管し、Transformationへ直接供給する。凍結細胞の手解凍を前提としない。',
    robot:'OSCARでは1.5 mLチューブを人が開け、氷を入れた支持体内のアルミブロックへ配置してからロボット実行を開始する。',
    manMeta:['実験者','氷上'], bioMeta:['AutoBioTech','4°C storage','Plate format'], robotMeta:['OSCAR','Manual setup','Ice block'],
    art:'ice', manualImage:'/images/manual/manual-ice.png', bioImage:'/images/biofoundry/cooling-carrier.svg', robotImage:'/images/robot-arm/arm-cold-block.svg', robotGap:true
  },
  {
    section:'Transformation', title:'DNAを添加して混和',
    manual:'DNAをコンピテントセルに加え、強い撹拌を避けて穏やかに混ぜる。',
    bio:'液体ハンドラが10 µL DNAを50 µL細胞懸濁液へ添加し、40 µLを10回pipettingして混和する。',
    robot:'ロボットアーム搭載の電子ピペットがDNA・細胞などの液体を吸引／分注する。OSCARは1–200 µLの液体操作を想定する。',
    manMeta:['実験者','Pipette'], bioMeta:['Liquid handler','10 µL DNA','50 µL cells'], robotMeta:['Robot arm','Electronic pipette','Liquid handling'],
    art:'pipette', manualImage:'/images/manual/manual-dna-addition.png', bioImage:'/images/biofoundry/liquid-handler.svg', robotImage:'/images/robot-arm/arm-pipette.svg'
  },
  {
    section:'Transformation', title:'低温インキュベーション',
    manual:'DNAと細胞を氷上で保持し、所定時間インキュベートする。',
    bio:'PCR plateを4°C cooling carrier上で30分保持し、温度と時間を装置側で固定する。',
    robot:'OSCARの実験台では試料チューブをice-filled support上に保持できる。初期配置は人手で行うため、ここは完全無人ではない。',
    manMeta:['実験者','5–30 min'], bioMeta:['Cooling carrier','4°C','30 min'], robotMeta:['Ice support','Robot workflow','Manual setup'],
    art:'cool', manualImage:'/images/manual/manual-ice.png', bioImage:'/images/biofoundry/cooling-carrier.svg', robotImage:'/images/robot-arm/arm-cold-block.svg', robotGap:true
  },
  {
    section:'Transformation', title:'Heat shock',
    manual:'チューブを所定温度の水浴／ヒートブロックへ移し、短時間ヒートショックする。',
    bio:'sealed PCR plateをthermal cyclerへ搬送し、42°Cで45秒のheat shockを実行する。',
    robot:'OSCARはthermocyclerの蓋操作や画面入力をロボット＋stylusで行える。Transformation自体はProtocol #2で実施されるが、本文ではheat-shock条件を個別表示していない。',
    manMeta:['実験者','37–42°C','25–45 s'], bioMeta:['Thermal cycler','42°C','45 s'], robotMeta:['Robot arm','Thermocycler','Stylus'],
    art:'heat', manualImage:'/images/manual/manual-heat-shock.png', bioImage:'/images/biofoundry/thermal-cycler.svg', robotImage:'/images/robot-arm/arm-thermocycler.svg'
  },
  {
    section:'Transformation', title:'低温へ戻す',
    manual:'ヒートショック後、すぐに氷上へ戻し2分以上保持する。',
    bio:'thermal cycler内でheat shock後に4°Cへ冷却し、5分保持する。',
    robot:'ロボットは既存装置を操作できる設計だが、OSCAR本文ではこのTransformation内の低温復帰条件は独立工程として記載されていない。',
    manMeta:['実験者','≥2 min'], bioMeta:['Thermal cycler','4°C','5 min'], robotMeta:['OSCAR Protocol #2','Existing equipment'],
    art:'ice2', manualImage:'/images/manual/manual-ice.png', bioImage:'/images/biofoundry/thermal-cycler.svg', robotImage:'/images/robot-arm/arm-cold-block.svg'
  },
  {
    section:'Recovery', title:'SOC培地を添加',
    manual:'回復用SOC培地を加える。',
    bio:'80 µL SOCを各sampleへ添加し、140 µLを110 µL SOC入りV-well plateへ移す。',
    robot:'OSCARの電子ピペットで培地のaspirate / dispenseを実行できる。Transformation protocolの液体操作をロボット側へ移す。',
    manMeta:['実験者','SOC'], bioMeta:['Liquid handler','80 µL + 110 µL SOC'], robotMeta:['Electronic pipette','Aspirate','Dispense'],
    art:'media', manualImage:'', bioImage:'/images/biofoundry/liquid-handler.svg', robotImage:'/images/robot-arm/arm-pipette.svg'
  },
  {
    section:'Recovery', title:'回復培養',
    manual:'37°C、振とう条件で1時間回復培養する。',
    bio:'V-well plateを37°C・900 rpmで45分回復培養し、その後centrifuge・濃縮・resuspensionまで自動処理する。',
    robot:'OSCARは既存装置をロボットが操作する思想だが、main paperではTransformation中のrecovery条件は独立した詳細工程として公開されていない。',
    manMeta:['実験者','37°C','225 rpm','1 h'], bioMeta:['Shaking incubator','37°C','900 rpm','45 min'], robotMeta:['Robot workflow','Standard equipment'],
    art:'shake', manualImage:'/images/manual/manual-recovery-incubator.png', bioImage:'/images/biofoundry/shaking-incubator.svg', robotImage:'/images/robot-arm/arm-incubator.svg'
  },
  {
    section:'Plating', title:'選択培地へプレーティング',
    manual:'適切な抗生物質入りLB寒天へ細胞懸濁液を播き、均一に広げる。',
    bio:'濃縮後のsampleを3 µLずつselection agarへspotし、plate handlingを自動化する。',
    robot:'ロボットがPetri dishを扱い、専用spreader toolで形質転換菌を選択培地へ均一にspreadする。',
    manMeta:['実験者','Selective agar'], bioMeta:['Liquid handler','3 µL spotting','Plate handling'], robotMeta:['Robot gripper','Petri dish','Custom spreader'],
    art:'plate', manualImage:'/images/manual/manual-plating.png', bioImage:'/images/biofoundry/plate-spotter.svg', robotImage:'/images/robot-arm/arm-plating.svg'
  },
  {
    section:'Plating', title:'一晩培養',
    manual:'プレートを反転し、37°Cで一晩インキュベートする。',
    bio:'agar plateを30°Cで24時間自動培養し、その後4°Cで保存する。',
    robot:'OSCAR論文ではplating後、plateを37°C incubatorへ入れる工程は人手。ここがロボットアーム型の未自動化境界として残る。',
    manMeta:['実験者','37°C','Overnight'], bioMeta:['Automated incubator','30°C','24 h','4°C storage'], robotMeta:['Manual transfer','37°C','Overnight'],
    art:'incubator', manualImage:'/images/manual/manual-overnight-incubation.png', bioImage:'/images/biofoundry/automated-incubator.svg', robotImage:'/images/robot-arm/manual-incubator.svg', robotGap:true
  }
];

