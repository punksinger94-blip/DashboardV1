import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts";

const C = {bg:"#0b0f19",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",red:"#e63946",orange:"#f77f00",blue:"#457b9d",blueLight:"#a8dadc",green:"#2a9d8f",gold:"#e9c46a",text:"#e0e0e0",muted:"#8899aa",white:"#f1faee",purple:"#9b5de5",pink:"#ff6b6b",cyan:"#00b4d8"};

const tabs=["Overview","Casualty Tracker","Military Operations","Hormuz & Energy","Global Markets","International Response","Legal & Domestic","Humanitarian Crisis","Cyber & Info War","Scenarios & Outlook","Sources"];

// ── CASUALTY DATA ──
const casualties = [
  {party:"Iran (civilians)",dead:"787-912+",injured:"2,580+",src:"Red Crescent / HRA",color:C.green,note:"181+ children under 10; 7+ hospitals damaged; 168+ schoolgirls in Minab"},
  {party:"Iran (military)",dead:"Unknown",injured:"Unknown",src:"IRGC/Artesh",color:C.green,note:"Army chief, defense minister, IRGC commanders, police chief killed"},
  {party:"United States",dead:"6",injured:"18+",src:"CENTCOM",color:C.red,note:"Shuaiba port Kuwait; direct hit on tactical ops center; F-15E friendly fire"},
  {party:"Israel",dead:"11+",injured:"40+",src:"Israeli media",color:C.blue,note:"Tel Aviv (1 woman killed, 27 injured), Bnei Brak, Rosh HaAyin, Haifa"},
  {party:"Lebanon",dead:"40+",injured:"246+",src:"Health Ministry",color:C.purple,note:"Israeli retaliatory strikes; Hezbollah leaders killed"},
  {party:"Kuwait",dead:"1",injured:"32",src:"Defense Ministry",color:C.gold,note:"Airport drone; US warplanes crashed (friendly fire); Shuaiba 6 US dead"},
  {party:"Bahrain",dead:"1",injured:"Multiple",src:"Interior Ministry",color:C.orange,note:"Residential buildings; Salman Industrial City; 5th Fleet area"},
  {party:"UAE",dead:"3",injured:"58+",src:"UN HRC statement",color:C.cyan,note:"Abu Dhabi/Dubai airports; Fujairah oil zone fire; AWS DCs"},
  {party:"Pakistan (protests)",dead:"24-35",injured:"120+",src:"Wikipedia/media",color:C.pink,note:"Pro-Iran protests; US consulate Karachi (10-16 killed by Marines)"},
  {party:"Qatar",dead:"0",injured:"Minor",src:"State media",color:C.blueLight,note:"Ras Laffan/Mesaieed LNG hit → ALL production shut down"},
];
const casualtyTimeline=[{d:"Feb 28",iran:200,us:0,region:2,label:"Strikes begin"},{d:"Mar 1",iran:400,us:3,region:8,label:"First US deaths"},{d:"Mar 2",iran:555,us:6,region:12,label:"Toll rises"},{d:"Mar 3",iran:787,us:6,region:15,label:"HRA: 912"},{d:"Mar 4",iran:912,us:6,region:15,label:"Ongoing"}];

// ── MILITARY OPS ──
const usIsraelOps = [
  {metric:"Total strikes",value:"2,000+",note:"Nearly double 2003 Iraq 'shock and awe'"},
  {metric:"Provinces struck",value:"24 of 31",note:"1,200+ munitions (Israel alone)"},
  {metric:"Missile launchers destroyed",value:"300+ (50%)",note:"70% drop in Iranian fire toward Israel"},
  {metric:"Naval vessels sunk",value:"11+",note:"Including IRGC drone carrier Shahid Bagheri"},
  {metric:"Air superiority",value:"Established over Tehran",note:"Mar 2 — lower-gen aircraft now operable"},
  {metric:"Leadership killed",value:"Supreme Leader + 12+ generals",note:"Army chief, defense min, IRGC commanders, police chief"},
  {metric:"Operation codenames",value:"Epic Fury (US) / Roaring Lion (Israel)",note:"Division of labor: Israel = decapitation, US = capability"},
  {metric:"US aircraft used",value:"B-2 Spirit, F-22, F-15E",note:"12 F-22s at Ovda, Israel — first US offensive weapons there"},
  {metric:"Nuclear sites",value:"Natanz entrance damaged",note:"IAEA: no nuclear installations confirmed hit; Iran says 1 site hit"},
];
const iranOps = [
  {metric:"Bases targeted",value:"27",note:"Across 9 countries simultaneously"},
  {metric:"Operation True Promise waves",value:"17+",note:"Ground force entered with 230 drones (claimed)"},
  {metric:"Countries struck",value:"9",note:"Bahrain, Iraq, Jordan, Kuwait, Oman, Qatar, Saudi, UAE + Cyprus"},
  {metric:"Strait of Hormuz",value:"Declared CLOSED",note:"'Not a drop of oil will leave the region' — IRGC"},
  {metric:"Hormuz enforcement",value:"Tankers attacked",note:"USVs, drones, projectiles on commercial vessels"},
  {metric:"Claims (unverified)",value:"US carrier sunk, F-15 downed",note:"CENTCOM denies carrier; F-15E confirmed crashed (friendly fire)"},
  {metric:"Drone strategy",value:"Shahed-series primary weapon",note:"US sources: 'most dangerous threat' — getting through defenses"},
  {metric:"Hezbollah activation",value:"Haifa + IDF bases struck",note:"Revenge for Khamenei; prompted Israeli strikes on Lebanon"},
  {metric:"Iraqi militias",value:"Erbil, Baghdad Victory Base",note:"Saraya Awliya Al-Dam claimed responsibility"},
];

// ── ENERGY ──
const oilData=[{d:"Feb 27",brent:73,gold:5100,vix:20},{d:"Feb 28",brent:76,gold:5200,vix:22},{d:"Mar 1",brent:82,gold:5247,vix:23},{d:"Mar 2",brent:82.5,gold:5317,vix:24},{d:"Mar 3",brent:83,gold:5300,vix:25.4}];
const hormuzStats=[
  {n:"20M",l:"Barrels/day disrupted",s:"20% global oil supply"},{n:"27%",l:"Maritime oil trade",s:"World's largest chokepoint"},
  {n:"~0%",l:"Current tanker traffic",s:"150+ ships stranded"},{n:"20%",l:"Global LNG at risk",s:"Qatar ALL production ceased"},
  {n:"+13%",l:"Brent crude surge",s:"$73→$83, projections $120-200"},{n:"$5,300+",l:"Gold record high",s:"+$200 single session"},
];
const oilScenarios=[{s:"Base (1-2 wks)",p:"$90-100",src:"Analysts",pr:"Likely"},{s:"Sustained (3+ wks)",p:"$120",src:"JPMorgan",pr:"High"},{s:"GCC infra hit",p:"$150+",src:"BofA",pr:"If escalates"},{s:"Full blockade+mining",p:"$200",src:"Deutsche Bank",pr:"Tail risk"}];
const asiaDep=[{c:"Pakistan",d:"99% LNG from Gulf",r:"Critical"},{c:"Bangladesh",d:"72% LNG",r:"Critical"},{c:"India",d:"53% LNG",r:"High"},{c:"China",d:"40% oil via Hormuz",r:"High"},{c:"S. Korea",d:"Major crude importer",r:"High"},{c:"Japan",d:"Major crude importer",r:"High"},{c:"Europe",d:"30% jet fuel via Hormuz",r:"Elevated"}];

// ── MARKETS ──
const marketData=[
  {m:"Brent Crude",pre:"$73",now:"$83",ch:"+13%",proj:"$120-200",sect:"Commodity",dir:"up"},
  {m:"Gold",pre:"$5,100",now:"$5,300+",ch:"+4%",proj:"$6,300 (JPM)",sect:"Safe haven",dir:"up"},
  {m:"EU Natural Gas",pre:"Base",now:"+40%",ch:"+40%",proj:"60+ EUR/MWh",sect:"Commodity",dir:"up"},
  {m:"S&P 500",pre:"6,884",now:"6,882",ch:"-1.2% intraday",proj:"Volatile",sect:"Equity",dir:"flat"},
  {m:"Dow Jones",pre:"48,978",now:"48,905",ch:"-1,200 intraday",proj:"War premium",sect:"Equity",dir:"down"},
  {m:"Nasdaq",pre:"22,668",now:"22,749",ch:"+0.36%",proj:"Tech resilient",sect:"Equity",dir:"up"},
  {m:"VIX",pre:"~20",now:"25.4",ch:"+27%",proj:"Elevated",sect:"Volatility",dir:"up"},
  {m:"Bitcoin",pre:"$68K",now:"$66.4K",ch:"-2.6%",proj:"Risk-off",sect:"Crypto",dir:"down"},
  {m:"10Y Treasury",pre:"3.97%",now:"4.04%",ch:"+7bps",proj:"Inflation fear",sect:"Bonds",dir:"up"},
  {m:"USD Index",pre:"Base",now:"+0.95%",ch:"5-wk high",proj:"Safe haven",sect:"Currency",dir:"up"},
  {m:"Defense stocks",pre:"Base",now:"+2-5%",ch:"LMT,NOC,RTX",proj:"Demand surge",sect:"Equity",dir:"up"},
  {m:"Airlines",pre:"Base",now:"-4 to -10%",ch:"Fuel+cancel",proj:"Pressure",sect:"Equity",dir:"down"},
  {m:"Energy stocks",pre:"Base",now:"+3-5%",ch:"XOM,CVX,BP",proj:"Oil premium",sect:"Equity",dir:"up"},
];

// ── INTERNATIONAL ──
const intlResponses=[
  {actor:"China",position:"Condemn",quote:"Grave violation of Iran's sovereignty...tramples on the UN Charter",action:"UN emergency session; Wang Yi-Lavrov call; CM-302 missile deal reports",color:C.red},
  {actor:"Russia",position:"Condemn",quote:"Deliberate, premeditated, and unprovoked act of armed aggression",action:"UN emergency session; no direct military support pledged; military pact ≠ defense guarantee",color:C.red},
  {actor:"UN Sec-Gen",position:"Condemn both",quote:"Squandering an opportunity for diplomacy",action:"Condemned US-Israeli strikes AND Iranian counter-strikes; Article 2 reminder",color:C.orange},
  {actor:"UK",position:"Cautious support",quote:"Does not want to see further escalation",action:"RAF Typhoons to Qatar for base defense; no offensive role; Akrotiri base hit",color:C.blue},
  {actor:"France",position:"Cautious",quote:"Called for restraint from all parties",action:"Joint statement w/ UK + Germany; considering defensive measures; ECFR: 'illegal war of choice'",color:C.blue},
  {actor:"Canada",position:"Support",quote:"Supports the U.S. acting to prevent Iran from obtaining a nuclear weapon",action:"PM Carney statement backing US",color:C.green},
  {actor:"Turkey",position:"Critical",quote:"Erdogan expressed sorrow over civilian suffering",action:"Pledged intensified diplomacy for ceasefire",color:C.orange},
  {actor:"GCC States",position:"Mixed",quote:"50th Extraordinary GCC Ministerial: dialogue is the sole path",action:"Condemned Iranian strikes on their soil; some shot down drones; but also demanded de-escalation",color:C.gold},
  {actor:"Pakistan",position:"Criticize both",quote:"Condemned action as breaching international law",action:"Also condemned Iran strikes on Gulf; 24-35 killed in pro-Iran protests domestically",color:C.orange},
  {actor:"Colombia",position:"Condemn",quote:"Criticized the action as breaching international law",action:"Backed China/Russia at UNSC",color:C.red},
  {actor:"Amnesty Int'l",position:"Condemn all",quote:"Grave threat to multilateralism and international legal order",action:"Called on ALL parties to protect civilians; demanded investigations",color:C.purple},
  {actor:"IAEA",position:"Neutral/warning",quote:"No indication nuclear installations hit",action:"Grossi urged return to diplomacy; monitoring nuclear safety",color:C.muted},
];

// ── LEGAL ──
const legalData={
  forWar:["Iran's nuclear program threat","Iran killed 7,000-30,000+ protesters in Jan 2026","Iran's proxy network (Hamas, Hezbollah, Houthis)","Trump: 'regime menacing activities' since 1979","Rubio: preemptive self-defense — 'higher casualties if we waited'","US Art. 51 self-defense notification to UN","Iran breached multiple UN Security Council resolutions"],
  againstWar:["No Congressional authorization (Article I)","No UN Security Council authorization","Pentagon admitted Iran was NOT planning to strike US first","Oman mediation: deal was 'within reach' before strikes","2025 US intel: Iran was NOT building nuclear weapon","Violates UN Charter Article 2 (use of force)","CENTCOM legal chief: 'clearly violates Constitution and War Powers Resolution'","70% of Americans opposed military action (Jan 2026 Quinnipiac)"],
  congress:["Kaine-Paul bipartisan War Powers Resolution (Senate) — vote ~Mar 4","Khanna-Massie bipartisan War Powers Resolution (House) — vote ~Mar 5","Previous Senate vote FAILED 47-53 (June 2025)","Most Democrats + handful of Republicans support","Fetterman (D-PA) backs the attack","Near-unified Republican resistance to curbing Trump"],
};

// ── HUMANITARIAN ──
const humanData=[
  {issue:"Civilian deaths",detail:"912+ verified (HRA); 181+ children under 10; 880 more under review; Red Crescent: 787",severity:"Critical"},
  {issue:"Minab school strike",detail:"168+ girls killed in elementary school; US investigating; Israel denies; near IRGC naval facility",severity:"Critical"},
  {issue:"Hospitals damaged",detail:"10+ medical centers; Gandhi Hospital, Khatam al-Anbiya, Motahari, Valiasr; ICRC condemns",severity:"Critical"},
  {issue:"Internet blackout",detail:"Connectivity dropped to 4% (NetBlocks); prevents information flow, communication with loved ones",severity:"Severe"},
  {issue:"Prisoner safety",detail:"Thousands of Jan 2026 protesters still detained; Evin Prison admin collapse reported",severity:"Severe"},
  {issue:"IRGC in civilian sites",detail:"Footage shows security forces stationed in schools/hospitals; foreign ministry presser from classroom",severity:"Severe"},
  {issue:"Displaced travelers",detail:"20,000+ stranded at Dubai/Abu Dhabi airports; largest disruption since COVID",severity:"High"},
  {issue:"Medical supplies",detail:"Hormuz closure + sanctions = critical shortages; hospitals overwhelmed across 153 cities",severity:"Critical"},
  {issue:"Civilian infrastructure",detail:"Residential towers, luxury hotels, roads, airports, Red Crescent HQ, state TV — all hit",severity:"Severe"},
  {issue:"Iran's own violence",detail:"Jan 2026: 7,000-30,000+ protesters killed by IRGC/Basij; worst massacre since 1979",severity:"Critical"},
];

// ── CYBER ──
const cyberData=[
  {actor:"Israel (Unit 8200)",action:"'Largest cyberattack in history' — near-total internet blackout in Iran",impact:"Government services, media, energy, aviation disrupted; 4% connectivity"},
  {actor:"Iran (IRGC/MOIS)",action:"APT groups + proxy hacktivists activated; 150+ incidents recorded",impact:"Targeting Israel, US, Gulf critical infrastructure"},
  {actor:"UAE defense",action:"Detected and foiled AI-enabled cyberattacks on gov, finance, vital sectors",impact:"Essential services maintained through coordinated monitoring"},
  {actor:"Russia/China tech",action:"S-400 air defenses, Su-35 fighters, BeiDou-3 navigation provided to Iran",impact:"Designed to negate Western stealth/jamming; effectiveness uncertain"},
  {actor:"Information war",action:"Both sides controlling narrative; Iran uses state media, US uses press briefings",impact:"Fog of war extreme; casualty figures contested; claims unverifiable"},
];

// ── SCENARIOS (from Brookings, CSIS, Chatham House) ──
const scenarios=[
  {name:"Swift Transition",desc:"IRGC lays down arms; opposition unites; nuclear program surrendered; oil opened to US firms",prob:5,src:"Analysts: 'least likely'. IRGC unlikely to surrender.",color:C.green},
  {name:"Maduro Model",desc:"Moderate successor negotiates; nuclear/missile concessions; regime survives in weakened form",prob:20,src:"Acceptable to Trump. Similar to Venezuela playbook.",color:C.blue},
  {name:"Regime Weathers Storm",desc:"Hardliner/IRGC cleric takes over; hunkers down; nuclear breakout possible (440kg HEU)",prob:35,src:"Brookings: 'deeply embedded networks ensure near-term survival'",color:C.orange},
  {name:"Prolonged Air War",desc:"4-5 week campaign; Iran attrits interceptors; regional escalation continues; no regime change",prob:30,src:"Trump: '4-5 weeks'; Iran: 'no intention of negotiating'",color:C.red},
  {name:"Regional Conflagration",desc:"Hezbollah, Houthis, Iraqi militias fully activate; Gulf states drawn in; global energy crisis",prob:10,src:"Already partially happening. Gulf states shooting down drones.",color:C.pink},
];

// ── SOURCES ──
const sourceList=[
  {name:"Al Jazeera",type:"Casualty tracker, Hormuz, IRGC statements, humanitarian",bias:"Qatar-based; critical of US/Israel"},
  {name:"Critical Threats (AEI/ISW)",type:"Detailed military analysis, satellite imagery, order of battle",bias:"US-based think tank; hawkish lean"},
  {name:"CNN",type:"Casualty reports, market analysis, Pentagon leaks",bias:"US mainstream; balanced war reporting"},
  {name:"CNBC / Bloomberg",type:"Markets, oil prices, financial analysis",bias:"Financial focus; data-driven"},
  {name:"NPR / PBS",type:"US casualties, White House objectives, congressional debate",bias:"US public media; balanced"},
  {name:"CBS News",type:"Trump statements, Rubio briefing, War Powers",bias:"US mainstream; factual"},
  {name:"House of Commons Library",type:"UK parliamentary briefing — comprehensive overview",bias:"UK government; analytical"},
  {name:"UN Security Council / IAEA",type:"Emergency session, nuclear safety, international law",bias:"Multilateral institution"},
  {name:"Brookings Institution",type:"Strategic analysis, 4 scenarios, domestic politics",bias:"US centrist think tank"},
  {name:"CSIS",type:"Nuclear program analysis, Operation Epic Fury objectives",bias:"US bipartisan think tank"},
  {name:"Chatham House",type:"Early analysis, UK perspective, Iran internal dynamics",bias:"UK think tank; balanced"},
  {name:"Amnesty International",type:"Civilian protection, IHL compliance, both sides",bias:"Human rights focus; impartial"},
  {name:"HRA (Iran)",type:"Civilian casualty documentation — 912 dead, 181 children",bias:"Iranian human rights monitors"},
  {name:"NCRI / MEK",type:"Iranian opposition perspective; regime collapse narrative",bias:"Anti-regime; exile opposition"},
  {name:"The Intercept",type:"Legal analysis, war powers, CENTCOM legal chief quotes",bias:"US progressive investigative"},
  {name:"Wikipedia",type:"Prelude, conflict, protests — crowdsourced synthesis",bias:"Neutral aggregator; evolving"},
  {name:"Chinese Foreign Ministry",type:"Official PRC position; Wang Yi statements",bias:"Chinese government"},
  {name:"Russian Foreign Ministry",type:"Official Russian position; 'unprovoked aggression'",bias:"Russian government"},
  {name:"CloudSEK",type:"Cyber warfare situation report; 150+ hacktivist incidents",bias:"Cybersecurity firm; technical"},
  {name:"SpecialEurasia",type:"Russia-China-Iran tech/strategic depth analysis",bias:"Geopolitical analysis firm"},
  {name:"ICG (Crisis Group)",type:"UN Security Council analysis; diplomatic dynamics",bias:"International conflict resolution"},
];

// ── COMPONENTS ──
function Badge({t,c}){return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 8px",borderRadius:3,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{t}</span>}
function Card({children,style}){return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 18px",...style}}>{children}</div>}
function ST({children,sub}){return <div style={{marginBottom:14}}><h2 style={{color:C.white,fontSize:17,fontWeight:700,margin:0}}>{children}</h2>{sub&&<p style={{color:C.muted,fontSize:11,margin:"2px 0 0"}}>{sub}</p>}</div>}
function TH({children}){return <th style={{color:C.muted,fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:.8,padding:"6px 8px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{children}</th>}
function TD({children,s}){return <td style={{padding:"8px",color:C.text,fontSize:11,...s}}>{children}</td>}
function StatBox({n,l,c,s}){return <Card style={{textAlign:"center",borderTop:`2px solid ${c}`}}><div style={{fontSize:22,fontWeight:800,color:c}}>{n}</div><div style={{fontSize:9,color:C.muted,marginTop:2}}>{l}</div>{s&&<div style={{fontSize:8,color:C.muted,marginTop:1}}>{s}</div>}</Card>}
function Note({c,title,children}){return <Card style={{borderLeft:`3px solid ${c}`}}><p style={{color:C.text,fontSize:11,margin:0,lineHeight:1.6}}><strong style={{color:c}}>{title}:</strong> {children}</p></Card>}
function Bl({items,c}){return items.map((t,i)=><div key={i} style={{display:"flex",gap:5,marginBottom:4}}><span style={{color:c||C.muted,fontSize:7,marginTop:5}}>{">"}</span><span style={{color:C.text,fontSize:11,lineHeight:1.5}}>{t}</span></div>)}

// ── TAB: OVERVIEW ──
function OverviewTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Card style={{borderLeft:`3px solid ${C.orange}`,background:`linear-gradient(135deg,${C.card},${C.cardAlt})`}}>
      <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:8}}>Conflict Summary — Day 4</div>
      <p style={{color:C.text,fontSize:12,lineHeight:1.7,margin:0}}>On February 28, 2026, the United States and Israel launched Operation Epic Fury / Roaring Lion — coordinated strikes on Iran targeting leadership, nuclear facilities, missile sites, and military infrastructure. The stated objectives include preventing nuclear weapons capability, destroying Iran's missile program, degrading proxy networks, and regime change. Supreme Leader Khamenei was killed in the opening salvo. Iran has retaliated with missile and drone barrages across 9 countries, declared the Strait of Hormuz closed, and vowed to continue fighting. The conflict has produced 850+ confirmed deaths across multiple countries, disrupted global energy markets, triggered a humanitarian crisis, and drawn international condemnation from multiple directions.</p>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
      <StatBox n="912+" l="Civilians killed (Iran)" c={C.red} s="HRA verified"/>
      <StatBox n="6" l="US troops killed" c={C.blue} s="CENTCOM"/>
      <StatBox n="2,000+" l="US-Israel strikes" c={C.orange} s="2x Iraq 'shock & awe'"/>
      <StatBox n="9" l="Countries hit by Iran" c={C.green} s="27 US bases targeted"/>
      <StatBox n="$83/bbl" l="Brent crude" c={C.gold} s="+13%, proj $120-200"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.blue}`}}><div style={{color:C.blue,fontSize:11,fontWeight:700,marginBottom:6}}>US/ISRAEL STATED OBJECTIVES</div><Bl c={C.blue} items={["Prevent nuclear weapons capability","Destroy missile arsenal + production","Degrade proxy networks (Hamas/Hezbollah/Houthis)","Annihilate Iran's navy","Regime change — Trump: 'take over your government'","Trump: '4-5 weeks, but capability to go far longer'"]}/></Card>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>IRAN'S RESPONSE STRATEGY</div><Bl c={C.green} items={["Avenge Khamenei — 'heaviest operations in history'","Close Strait of Hormuz — 'not a drop of oil leaves'","Target GCC economic infrastructure","Attrition: exhaust US/Israeli interceptor supply","Force ceasefire before regime collapses","Mokhber: 'no intention of negotiating' with US"]}/></Card>
    </div>
    <Card style={{borderTop:`2px solid ${C.purple}`}}><div style={{color:C.purple,fontSize:11,fontWeight:700,marginBottom:6}}>KEY CONTESTED FACTS</div><Bl c={C.purple} items={[
      "Pentagon briefers admitted Iran was NOT planning to strike US unless Israel attacked first (CNN) — contradicts Rubio's 'preemptive self-defense' claim",
      "Oman mediation: diplomats said nuclear deal was 'within reach' before strikes; Trump said Iran 'backed out'",
      "2025 US Intelligence Community assessed Iran was NOT building a nuclear weapon; JD Vance claims otherwise",
      "Minab school: 168+ girls killed; US 'investigating'; Israel denies; near IRGC naval facility — collateral or deliberate?",
      "Iran claims to have sunk US carrier + downed F-15; CENTCOM denies carrier; F-15E crash confirmed as friendly fire",
      "Iran casualty figures: Red Crescent (787) vs HRA (912) vs state media — internet blackout prevents verification",
    ]}/></Card>
    <Note c={C.muted} title="Methodology">This dashboard aggregates reporting from 20+ sources across the geopolitical spectrum (US, UK, Iranian, Chinese, Russian, multilateral). All claims are attributed. Contested facts are flagged. No single narrative is privileged.</Note>
  </div>
}

// ── TAB: CASUALTIES ──
function CasualtyTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="All parties — as of March 4, 2026. Figures rapidly evolving; internet blackout limits verification in Iran.">Casualty & Damage Tracker</ST>
    <Card><ResponsiveContainer width="100%" height={200}><AreaChart data={casualtyTimeline} margin={{left:10,right:10}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="d" tick={{fill:C.muted,fontSize:10}}/><YAxis tick={{fill:C.muted,fontSize:10}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Area type="monotone" dataKey="iran" stroke={C.green} fill={C.green} fillOpacity={.12} strokeWidth={2} name="Iran dead"/><Area type="monotone" dataKey="us" stroke={C.red} fill={C.red} fillOpacity={.12} strokeWidth={2} name="US dead"/><Area type="monotone" dataKey="region" stroke={C.gold} fill={C.gold} fillOpacity={.08} strokeWidth={2} name="Regional dead"/><Legend wrapperStyle={{fontSize:10}}/></AreaChart></ResponsiveContainer></Card>
    <Card><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Party</TH><TH>Killed</TH><TH>Injured</TH><TH>Source</TH><TH>Key Details</TH></tr></thead><tbody>{casualties.map((r,i)=><tr key={i}><TD s={{color:r.color,fontWeight:700,fontSize:10}}>{r.party}</TD><TD s={{color:C.white,fontWeight:700,fontFamily:"monospace"}}>{r.dead}</TD><TD s={{fontFamily:"monospace"}}>{r.injured}</TD><TD s={{fontSize:9,color:C.muted}}>{r.src}</TD><TD s={{fontSize:10,color:C.muted}}>{r.note}</TD></tr>)}</tbody></table></div></Card>
    <Note c={C.orange} title="Data Quality Warning">Iran's near-total internet blackout (4% connectivity) severely limits independent verification. Iranian state media may inflate/deflate numbers for propaganda. US/Israeli claims of precision targeting are contested by hospital/school damage reports. All figures should be treated as provisional.</Note>
  </div>
}

// ── TAB: MILITARY ──
function MilTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Tracking both sides' operations, claims, and verified outcomes">Military Operations — Day 4</ST>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.blue}`}}><div style={{color:C.blue,fontSize:11,fontWeight:700,marginBottom:6}}>US-ISRAEL OPERATIONS</div><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{usIsraelOps.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD s={{color:C.white,fontWeight:600,fontSize:10,width:"35%"}}>{r.metric}</TD><TD s={{color:C.blue,fontWeight:700,fontSize:12}}>{r.value}</TD><TD s={{fontSize:9,color:C.muted}}>{r.note}</TD></tr>)}</tbody></table></Card>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>IRAN'S RETALIATION</div><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{iranOps.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD s={{color:C.white,fontWeight:600,fontSize:10,width:"35%"}}>{r.metric}</TD><TD s={{color:C.green,fontWeight:700,fontSize:12}}>{r.value}</TD><TD s={{fontSize:9,color:C.muted}}>{r.note}</TD></tr>)}</tbody></table></Card>
    </div>
    <Note c={C.blue} title="US/Israeli Assessment">CTP-ISW: "Combined force has designed campaign to destroy Iran's ballistic missile capabilities before depleting interceptor stockpiles." 70% drop in Iranian missile fire suggests significant degradation. Air superiority established over Tehran. Half of missile launchers destroyed.</Note>
    <Note c={C.green} title="Iranian Assessment">IRGC: "Heaviest offensive operations in history of Islamic Republic." Ground forces entered fight with 3 simultaneous operations. Mokhber: war is "sustainable over time." Shahed drones described by US sources as "most dangerous threat — getting through some air defenses."</Note>
    <Note c={C.orange} title="Critical Asymmetry">Iran's strategy targets interceptor supply (estimated 3-4 days at peak consumption). Cost ratio: $50K drone vs $1M-$10M interceptor (200:1 in Iran's favor). However, US/Israeli strikes on launchers are reducing the volume of incoming fire, potentially negating the attrition strategy.</Note>
  </div>
}

// ── TAB: HORMUZ & ENERGY ──
function EnergyTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Strait of Hormuz crisis + global energy market disruption">Energy & Hormuz Crisis</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>{hormuzStats.map((d,i)=><StatBox key={i} n={d.n} l={d.l} c={[C.red,C.orange,C.gold,C.green,C.blue,C.purple][i]} s={d.s}/>)}</div>
    <Card><ResponsiveContainer width="100%" height={180}><LineChart data={oilData} margin={{left:10,right:40}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="d" tick={{fill:C.muted,fontSize:10}}/><YAxis yAxisId="l" domain={[70,90]} tick={{fill:C.muted,fontSize:10}}/><YAxis yAxisId="r" orientation="right" domain={[5000,5500]} tick={{fill:C.muted,fontSize:10}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Line yAxisId="l" type="monotone" dataKey="brent" stroke={C.red} strokeWidth={2} name="Brent $/bbl"/><Line yAxisId="r" type="monotone" dataKey="gold" stroke={C.gold} strokeWidth={2} name="Gold $/oz"/><Legend wrapperStyle={{fontSize:10}}/></LineChart></ResponsiveContainer></Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card><div style={{color:C.orange,fontSize:11,fontWeight:700,marginBottom:6}}>OIL PRICE SCENARIOS</div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Scenario</TH><TH>Price</TH><TH>Source</TH></tr></thead><tbody>{oilScenarios.map((r,i)=><tr key={i}><TD s={{fontSize:10}}>{r.s}</TD><TD s={{color:C.red,fontWeight:700}}>{r.p}</TD><TD s={{fontSize:9,color:C.muted}}>{r.src}</TD></tr>)}</tbody></table></Card>
      <Card><div style={{color:C.cyan,fontSize:11,fontWeight:700,marginBottom:6}}>ASIA/EUROPE DEPENDENCY</div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Country</TH><TH>Gulf Dependency</TH><TH>Risk</TH></tr></thead><tbody>{asiaDep.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:500,fontSize:10}}>{r.c}</TD><TD s={{fontSize:10}}>{r.d}</TD><TD><Badge t={r.r} c={r.r==="Critical"?C.red:r.r==="High"?C.orange:C.gold}/></TD></tr>)}</tbody></table></Card>
    </div>
    <Card style={{borderLeft:`3px solid ${C.red}`}}>
      <div style={{fontSize:11,fontWeight:700,color:C.white,marginBottom:6}}>Shipping Status</div>
      <Bl c={C.red} items={["IRGC: 'The strait is closed. Ships will be set ablaze'","Maersk, MSC, CMA CGM, Hapag-Lloyd, COSCO — ALL suspended","Insurance withdrawn effective Mar 5; premiums 0.125%→0.4%","Only Iranian/Chinese-flagged vessels transiting (limited, AIS off)","Qatar: Ras Laffan + Mesaieed — ALL LNG production ceased after drone strikes","UKMTO: 'significant military activity' near Kumzar, Oman","CENTCOM claims Hormuz remains open — contradicts IRGC + shipping data","Emirates SkyCargo suspended all operations"]}/>
    </Card>
  </div>
}

// ── TAB: MARKETS ──
function MarketTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Equities, commodities, bonds, crypto, currencies — full picture">Global Markets Impact</ST>
    <Card><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Asset</TH><TH>Pre-War</TH><TH>Current</TH><TH>Change</TH><TH>Projection</TH><TH>Sector</TH></tr></thead><tbody>{marketData.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{r.m}</TD><TD s={{fontSize:10}}>{r.pre}</TD><TD s={{color:r.dir==="up"?C.green:r.dir==="down"?C.red:C.gold,fontWeight:700,fontSize:10}}>{r.now}</TD><TD><Badge t={r.ch} c={r.dir==="up"?C.green:r.dir==="down"?C.red:C.gold}/></TD><TD s={{fontSize:9,color:C.muted}}>{r.proj}</TD><TD s={{fontSize:9,color:C.muted}}>{r.sect}</TD></tr>)}</tbody></table></div></Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Note c={C.green} title="Bull Case">Morgan Stanley: S&P 500 averages +2/6/8% at 1/6/12 months after geopolitical shocks (since Korean War). Wells Fargo 2026 target: 7,500. Defense + energy stocks benefiting. Tech dip-buying strong. Markets historically shrug off conflicts.</Note>
      <Note c={C.red} title="Bear Case">Goldman Sachs: "Only a severe and sustained oil disruption would have large effects" — Hormuz closure qualifies. If conflict extends beyond 1 month, cyclical sectors at risk. Inflation fears rising. Rate cut odds falling. VIX at 25.4 signals fear.</Note>
    </div>
  </div>
}

// ── TAB: INTERNATIONAL ──
function IntlTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="How the world is responding — governments, institutions, analysts">International Response</ST>
    <Card><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Actor</TH><TH>Position</TH><TH>Key Statement</TH><TH>Actions</TH></tr></thead><tbody>{intlResponses.map((r,i)=><tr key={i}><TD s={{color:r.color,fontWeight:700,fontSize:10}}>{r.actor}</TD><TD><Badge t={r.position} c={r.position.includes("Condemn")?C.red:r.position.includes("Support")||r.position.includes("support")?C.green:C.orange}/></TD><TD s={{fontSize:10,fontStyle:"italic"}}>"{r.quote.substring(0,60)}..."</TD><TD s={{fontSize:9,color:C.muted}}>{r.action}</TD></tr>)}</tbody></table></div></Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Note c={C.red} title="China-Russia Limits">Despite condemning strikes, neither China nor Russia has pledged military or civilian support. CNBC: "A strategic partnership with Beijing falls far short of a military alliance." Russia has military pact but no defense guarantee. Both requested UN emergency session but no resolution passed.</Note>
      <Note c={C.green} title="Pro-Iran Protests Globally">Pakistan: 24-35 killed in protests (US consulate Karachi: Marines opened fire). India: Shia protests across 12+ states. Iraq: protesters tried to storm US Embassy. Gilgit-Baltistan: UN offices burned. Seoul, Izmir, Rabat, Lagos — demonstrations worldwide.</Note>
    </div>
  </div>
}

// ── TAB: LEGAL ──
function LegalTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Constitutional, international law, and domestic political dimensions">Legal & Domestic Debate</ST>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>ARGUMENTS FOR MILITARY ACTION</div><Bl c={C.green} items={legalData.forWar}/></Card>
      <Card style={{borderTop:`2px solid ${C.red}`}}><div style={{color:C.red,fontSize:11,fontWeight:700,marginBottom:6}}>ARGUMENTS AGAINST MILITARY ACTION</div><Bl c={C.red} items={legalData.againstWar}/></Card>
    </div>
    <Card style={{borderTop:`2px solid ${C.purple}`}}><div style={{color:C.purple,fontSize:11,fontWeight:700,marginBottom:6}}>CONGRESSIONAL ACTION</div><Bl c={C.purple} items={legalData.congress}/></Card>
    <Note c={C.orange} title="Constitutional Tension">Brookings: "Trump's decision to go it alone without a vote or even debate in Congress creates both constitutional problems and political challenges." The Intercept: CENTCOM's former legal chief calls it a "clear violation of the Constitution and War Powers Resolution." But executive war powers have expanded steadily under both parties since Korea.</Note>
  </div>
}

// ── TAB: HUMANITARIAN ──
function HumanTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Civilian impact across all affected countries">Humanitarian Crisis</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Issue</TH><TH>Details</TH><TH>Severity</TH></tr></thead><tbody>{humanData.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{r.issue}</TD><TD s={{fontSize:10}}>{r.detail}</TD><TD><Badge t={r.severity} c={r.severity==="Critical"?C.red:r.severity==="Severe"?C.orange:C.gold}/></TD></tr>)}</tbody></table></Card>
    <Note c={C.red} title="Amnesty International">"{`The escalating crisis poses a grave threat to multilateralism and the integrity of the international legal order. Unlawful acts by parties to the conflict...endanger civilians across multiple countries.`}" — Agnès Callamard. Called on ALL parties to protect civilians.</Note>
    <Note c={C.orange} title="Critical Context — Iran's Own Record">Before the US/Israeli strikes, Iran's IRGC and Basij killed an estimated 7,000-30,000+ of their own protesters in January 2026 (figures vary: HRANA 7,000; govt 3,117; Trump/Iranian health officials ~30,000). This was the worst state massacre since 1979. The same security forces now stationed in hospitals and schools for cover.</Note>
    <Note c={C.purple} title="UN Response">WHO: Gandhi Hospital damage "a reminder that all efforts must be taken to prevent health facilities from being caught up in conflict." UNESCO: Minab school attack a "grave violation of humanitarian law." UN HRC: Gulf states condemned Iranian strikes on their sovereignty.</Note>
  </div>
}

// ── TAB: CYBER ──
function CyberTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="The conflict's digital dimension — cyberattacks, information warfare, tech transfers">Cyber & Information Warfare</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Actor</TH><TH>Operations</TH><TH>Impact</TH></tr></thead><tbody>{cyberData.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{r.actor}</TD><TD s={{fontSize:10}}>{r.action}</TD><TD s={{fontSize:10,color:C.muted}}>{r.impact}</TD></tr>)}</tbody></table></Card>
    <Note c={C.purple} title="Hybrid War">CloudSEK: 150+ hacktivist incidents recorded in first 72 hours. Iran faces "near-total digital fog" from Israeli cyber operations. This is the most significant state-on-state cyber campaign in history, running simultaneously with kinetic operations. Global spillover risks to energy, finance, IT, and critical infrastructure.</Note>
    <Note c={C.orange} title="Russia-China Tech Pipeline">SpecialEurasia: Moscow and Beijing have transitioned from diplomatic allies to "technological anchors" — providing S-400 air defenses, Su-35 fighters, BeiDou-3 navigation. However, if they fail to move beyond technology transfers to active deterrence, they risk a "credibility deficit" that undermines the multipolar world order.</Note>
  </div>
}

// ── TAB: SCENARIOS ──
function ScenarioTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Expert assessments from Brookings, CSIS, Chatham House, and analysts">Scenarios & Outlook</ST>
    <Card><ResponsiveContainer width="100%" height={200}><BarChart data={scenarios} layout="vertical" margin={{left:140,right:20}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis type="number" domain={[0,40]} tick={{fill:C.muted,fontSize:10}} label={{value:"Probability %",fill:C.muted,fontSize:9,position:"bottom"}}/><YAxis type="category" dataKey="name" tick={{fill:C.text,fontSize:10}} width={130}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Bar dataKey="prob" radius={[0,4,4,0]} name="Probability">{scenarios.map((s,i)=><Cell key={i} fill={s.color}/>)}</Bar></BarChart></ResponsiveContainer></Card>
    {scenarios.map((s,i)=><Card key={i} style={{borderLeft:`3px solid ${s.color}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{color:s.color,fontSize:12,fontWeight:700}}>{s.name}</span><Badge t={`${s.prob}%`} c={s.color}/></div><p style={{color:C.text,fontSize:11,margin:"4px 0"}}>{s.desc}</p><p style={{color:C.muted,fontSize:10,margin:0,fontStyle:"italic"}}>{s.src}</p></Card>)}
    <Note c={C.purple} title="Chatham House Assessment">"The parallel with the 2003 Iraq war is difficult to ignore. That war demonstrated that collapsing a regime is far easier than shaping what follows." The IRGC's sprawling religious authority, armed branches, militias, and economic assets "will not just melt away, even if they eventually fracture."</Note>
    <Note c={C.blue} title="Brookings Assessment">"If the bombing fails to achieve regime change or worse, expands into a regional war, the American people will know where the blame lies." Netanyahu's right-wing coalition trails in polls — war success helps him. Trump's patience for a lengthy campaign is an open question.</Note>
  </div>
}

// ── TAB: SOURCES ──
function SourceTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Full source list with bias assessment — transparency is methodology">Sources & Methodology</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Source</TH><TH>Coverage</TH><TH>Perspective/Bias</TH></tr></thead><tbody>{sourceList.map((s,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{s.name}</TD><TD s={{fontSize:10}}>{s.type}</TD><TD s={{fontSize:10,color:C.muted,fontStyle:"italic"}}>{s.bias}</TD></tr>)}</tbody></table></Card>
    <Note c={C.muted} title="Impartiality Note">This dashboard deliberately includes sources from opposing perspectives: US government (CENTCOM, White House), US critics (Intercept, Brookings), Iranian state media, Iranian opposition (NCRI), Chinese Foreign Ministry, Russian Foreign Ministry, multilateral institutions (UN, IAEA, Amnesty), and independent analysts (CTP-ISW, CSIS, Chatham House, ICG). No single narrative is privileged. Contested claims are flagged.</Note>
    <Note c={C.orange} title="Fog of War Caveat">Iran's internet blackout (4% connectivity) makes independent verification extremely difficult. Both sides are engaged in information warfare. Casualty figures, military claims, and damage assessments should ALL be treated as provisional until independent verification is possible.</Note>
  </div>
}

const TABS=[OverviewTab,CasualtyTab,MilTab,EnergyTab,MarketTab,IntlTab,LegalTab,HumanTab,CyberTab,ScenarioTab,SourceTab];

export default function Dashboard(){
  const [at,setAt]=useState(0);const T=TABS[at];
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif",color:C.text}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:`linear-gradient(135deg,${C.card},${C.cardAlt})`,borderBottom:`1px solid ${C.border}`,padding:"16px 20px 12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.red,boxShadow:`0 0 8px ${C.red}88`}}/><span style={{color:C.muted,fontSize:9,textTransform:"uppercase",letterSpacing:2,fontWeight:600}}>LIVE IMPARTIAL ANALYSIS</span><Badge t="DAY 4" c={C.red}/><Badge t="ALL SIDES" c={C.purple}/><Badge t={`${sourceList.length} SOURCES`} c={C.blue}/></div>
      <h1 style={{color:C.white,fontSize:20,fontWeight:800,margin:"0 0 2px"}}>2026 US-Iran Conflict — Global Intelligence Dashboard</h1>
      <p style={{color:C.muted,fontSize:11,margin:0}}>Multi-source analysis from US, Iranian, Chinese, Russian, European, and multilateral perspectives | Updated March 4, 2026</p>
    </div>
    <div style={{display:"flex",gap:0,padding:"0 20px",background:C.card,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {tabs.map((t,i)=><button key={t} onClick={()=>setAt(i)} style={{background:at===i?C.bg:"transparent",color:at===i?C.white:C.muted,border:"none",borderBottom:at===i?`2px solid ${C.red}`:"2px solid transparent",padding:"9px 11px",fontSize:10,fontWeight:at===i?700:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>{t}</button>)}
    </div>
    <div style={{padding:"16px 20px 32px",maxWidth:920,margin:"0 auto"}}><T/></div>
    <div style={{textAlign:"center",padding:"12px",borderTop:`1px solid ${C.border}`}}><p style={{color:C.muted,fontSize:9,margin:0}}>Data aggregated from {sourceList.length} verified sources across the geopolitical spectrum | Contested facts flagged | No single narrative privileged</p></div>
  </div>
}
