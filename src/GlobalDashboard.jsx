import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts";

const C = {bg:"#0b0f19",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",red:"#e63946",orange:"#f77f00",blue:"#457b9d",blueLight:"#a8dadc",green:"#2a9d8f",gold:"#e9c46a",text:"#e0e0e0",muted:"#8899aa",white:"#f1faee",purple:"#9b5de5",pink:"#ff6b6b",cyan:"#00b4d8",teal:"#20c997"};

const tabs=["Overview","GCC Under Fire","Hormuz Closure","Desalination Threat","Casualties","Military Ops","Markets & Energy","International","Legal & Domestic","Humanitarian","Probability & Stats","Sources"];

function Badge({t,c}){return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 8px",borderRadius:3,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{t}</span>}
function Card({children,style}){return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 18px",...style}}>{children}</div>}
function ST({children,sub}){return <div style={{marginBottom:14}}><h2 style={{color:C.white,fontSize:17,fontWeight:700,margin:0}}>{children}</h2>{sub&&<p style={{color:C.muted,fontSize:11,margin:"2px 0 0"}}>{sub}</p>}</div>}
function TH({children,w}){return <th style={{color:C.muted,fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:.8,padding:"6px 8px",textAlign:"left",borderBottom:`1px solid ${C.border}`,width:w}}>{children}</th>}
function TD({children,s}){return <td style={{padding:"8px",color:C.text,fontSize:11,verticalAlign:"top",...s}}>{children}</td>}
function StatBox({n,l,c,s}){return <Card style={{textAlign:"center",borderTop:`2px solid ${c}`}}><div style={{fontSize:22,fontWeight:800,color:c}}>{n}</div><div style={{fontSize:9,color:C.muted,marginTop:2}}>{l}</div>{s&&<div style={{fontSize:8,color:C.muted,marginTop:1}}>{s}</div>}</Card>}
function Note({c,title,children}){return <Card style={{borderLeft:`3px solid ${c}`}}><p style={{color:C.text,fontSize:11,margin:0,lineHeight:1.6}}><strong style={{color:c}}>{title}:</strong> {children}</p></Card>}
function Bl({items,c}){return items.map((t,i)=><div key={i} style={{display:"flex",gap:5,marginBottom:4}}><span style={{color:c||C.muted,fontSize:9,marginTop:3}}>▸</span><span style={{color:C.text,fontSize:11,lineHeight:1.5}}>{t}</span></div>)}
function PB({v,max,c,label}){return <div style={{marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{color:C.text,fontSize:10}}>{label}</span><span style={{color:c,fontSize:10,fontWeight:700}}>{v}%</span></div><div style={{height:8,background:C.border,borderRadius:4}}><div style={{height:"100%",width:`${(v/max)*100}%`,background:c,borderRadius:4,transition:"width 0.5s"}}/></div></div>}

function OverviewTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Card style={{borderLeft:`3px solid ${C.orange}`,background:`linear-gradient(135deg,${C.card},${C.cardAlt})`}}>
      <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:8}}>Conflict Summary — Day 4</div>
      <p style={{color:C.text,fontSize:12,lineHeight:1.7,margin:0}}>On February 28, 2026, the US and Israel launched coordinated strikes on Iran — Operation Epic Fury / Roaring Lion. Supreme Leader Khamenei killed. Iran retaliated across 9 countries, declared Hormuz closed. 912+ Iranian civilians killed (HRA). 6 US troops dead. All 6 GCC states struck with 1,500+ missiles/drones. Oil +13%. Global recession fears as Hormuz remains blocked. The "real nightmare scenario" — strikes on desalination plants — looms as next escalation rung.</p>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
      <StatBox n="912+" l="Iran civilians killed" c={C.red} s="HRA Mar 3"/>
      <StatBox n="6" l="US troops killed" c={C.blue} s="CENTCOM"/>
      <StatBox n="1,500+" l="Missiles+drones at GCC" c={C.orange} s="First 72 hours"/>
      <StatBox n="9" l="Countries hit by Iran" c={C.green} s="All 6 GCC + 3"/>
      <StatBox n="$83/bbl" l="Brent crude" c={C.gold} s="Proj $110-200"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.blue}`}}><div style={{color:C.blue,fontSize:11,fontWeight:700,marginBottom:6}}>US/ISRAEL OBJECTIVES</div><Bl c={C.blue} items={["Destroy nuclear program","Eliminate missile arsenal + production","Degrade proxy networks","Annihilate Iran's navy","Regime change — 'take over your government'"]}/></Card>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>IRAN'S STRATEGY</div><Bl c={C.green} items={["Close Hormuz — weaponize energy supply","Target GCC infra to pressure US","Exhaust interceptor supply (200:1 cost ratio)","Activate proxies (Hezbollah, Iraqi militias)","Force ceasefire before regime collapses"]}/></Card>
    </div>
    <Note c={C.purple} title="Key Contested Facts">Pentagon admitted Iran NOT planning to strike US first. Oman mediation: deal "within reach" before strikes. 2025 Intel: Iran NOT building nuke. Minab school: 168+ girls killed — collateral or deliberate?</Note>
  </div>
}

const gccInterceptions=[{c:"UAE",missiles:186,drones:812,total:998},{c:"Kuwait",missiles:97,drones:283,total:380},{c:"Bahrain",missiles:73,drones:91,total:164},{c:"Qatar",missiles:104,drones:39,total:143}];
const gccData=[
  {c:"UAE",dead:"3",inj:"58+",intercept:"186 missiles + 812 drones (755 intercepted; 35 fell through)",targets:"Dubai Airport, Palm Jumeirah, Jebel Ali port, Fujairah, AWS data centers",econ:"3/4 GDP non-oil; Dubai brand shattered; recalled ambassador to Israel",mil:"Considering counter-strikes on Iranian launch sites (WSJ)",pop:"9.4M",color:C.cyan},
  {c:"Qatar",dead:"0",inj:"16+",intercept:"101 ballistic, 39 drones, 3 cruise missiles intercepted; 2 Iranian SU-24 jets SHOT DOWN",targets:"Ras Laffan + Mesaieed LNG (ALL production ceased), Doha industrial zone",econ:"16% of world energy; LNG force majeure; 8,000+ stranded travelers",mil:"Shot down 2 Iranian jets Mar 2 — first GCC offensive action of conflict",pop:"2.7M",color:C.gold},
  {c:"Kuwait",dead:"1",inj:"32",intercept:"97 ballistic missiles + 283 drones intercepted",targets:"Airport (drone hit), Ali al-Salem Air Base, Shuaiba port (6 US dead)",econ:"Airport damaged; flights suspended; strategic food reserves activated",mil:"2,465% water use vs renewable supply — most water-vulnerable GCC state",pop:"4.3M",color:C.orange},
  {c:"Saudi Arabia",dead:"TBD",inj:"TBD",intercept:"Multiple waves; Ras Tanura refinery fire; US Embassy Riyadh hit by 2 drones",targets:"Ras Tanura (world's largest refinery), Eastern Province oil, Riyadh US Embassy",econ:"Red line crossed: civilian + oil + desal hit; Princeton: 'thinking about counterattack'",mil:"Considering strikes on launch sites; fears 'failed state with 92M people next door'",pop:"36M",color:C.green},
  {c:"Bahrain",dead:"1+",inj:"4+",intercept:"73 missiles + 91 drones destroyed",targets:"US 5th Fleet HQ (Juffair), residential towers, hotel tower hit by Shahed drone",econ:"Smallest GCC; dense pop; Shia protests beginning; economic anxiety rising",mil:"Most exposed: small geography, dense population, weaker civil defense",pop:"1.5M",color:C.pink},
  {c:"Oman",dead:"0",inj:"5",intercept:"Limited strikes; initially spared as mediator",targets:"Vessels near waters hit; UKMTO activity near Kumzar",econ:"Mediator role now compromised; FM said peace 'within reach' before strikes",mil:"Credibility as neutral intermediary eroded by being dragged into conflict",pop:"4.6M",color:C.teal},
];

function GCCTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="All 6 GCC states struck — unprecedented. 390+ ballistic missiles + 830+ drones in first 48 hours.">GCC Under Fire — Country-by-Country Analysis</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      <StatBox n="1,500+" l="Missiles + drones at GCC" c={C.red} s="First 72 hours"/>
      <StatBox n="5+" l="GCC civilians killed" c={C.orange} s="UAE 3, Kuwait 1, Bahrain 1"/>
      <StatBox n="~90-95%" l="Intercept rate" c={C.green} s="But 5-10% at scale = devastation"/>
    </div>
    <Card><ResponsiveContainer width="100%" height={180}><BarChart data={gccInterceptions} margin={{left:10,right:10}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="c" tick={{fill:C.muted,fontSize:10}}/><YAxis tick={{fill:C.muted,fontSize:10}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Bar dataKey="missiles" fill={C.red} name="Missiles" stackId="a"/><Bar dataKey="drones" fill={C.orange} name="Drones" stackId="a"/><Legend wrapperStyle={{fontSize:10}}/></BarChart></ResponsiveContainer></Card>
    {gccData.map((g,i)=><Card key={i} style={{borderLeft:`3px solid ${g.color}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{color:g.color,fontSize:14,fontWeight:800}}>{g.c}</span>
        <div style={{display:"flex",gap:6}}><Badge t={`${g.dead} dead`} c={C.red}/><Badge t={`${g.inj} injured`} c={C.orange}/><Badge t={`Pop: ${g.pop}`} c={C.muted}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:10,color:C.text}}>
        <div><strong style={{color:C.muted,fontSize:9}}>INTERCEPTED:</strong><br/>{g.intercept}</div>
        <div><strong style={{color:C.muted,fontSize:9}}>TARGETS HIT:</strong><br/>{g.targets}</div>
        <div><strong style={{color:C.muted,fontSize:9}}>ECONOMIC IMPACT:</strong><br/>{g.econ}</div>
        <div><strong style={{color:C.muted,fontSize:9}}>STRATEGIC:</strong><br/>{g.mil}</div>
      </div>
    </Card>)}
    <Note c={C.red} title="Carnegie">Gulf "soft power — their brand as stable, predictable havens for investment" is the real casualty. Dubai's economic model depends on perceived safety.</Note>
    <Note c={C.purple} title="Atlantic Council">Trump called Gulf strikes "probably the biggest surprise." GCC considering counter-strikes on Iranian launch sites (WSJ). Saudi red line: civilian/oil/water/power — ALL crossed.</Note>
    <Note c={C.green} title="Former Qatar PM Warning">"GCC must not be dragged into direct confrontation...forces want us embroiled. A direct clash will deplete resources of both sides and let others control us."</Note>
  </div>
}

const hormuzTimeline=[
  {period:"Week 1 (NOW)",oil:"$80-85",impact:"Insurance withdrawn; 150+ tankers stranded; 70% traffic drop; LNG force majeure",prob:"100%",color:C.green},
  {period:"Week 2-3",oil:"$90-110",impact:"SPR releases; OPEC+ adds 206K bpd (drop in bucket); Cape rerouting adds 2-3 weeks",prob:"75%",color:C.gold},
  {period:"Month 1-2",oil:"$110-150",impact:"Stagflation; Asian crisis; EU gas +150%; supply chains fracture; airlines collapse",prob:"45%",color:C.orange},
  {period:"Month 3+",oil:"$150-200+",impact:"GUARANTEED RECESSION (McNally); 15% global LNG decline; mass unemployment",prob:"20%",color:C.red},
];
const bypass=[{r:"Saudi East-West Pipeline",cap:"7M bpd",act:"~2.6M available",n:"Jeddah terminal limits throughput"},{r:"UAE ADCOP (Fujairah)",cap:"1.5M bpd",act:"~1.5M",n:"Bypasses Hormuz to Indian Ocean"},{r:"Iraq-Turkey",cap:"Damaged",act:"<0.5M",n:"Intermittent"},{r:"TOTAL",cap:"~4.1M max",act:"vs 20M Hormuz",n:"Only 13% replaceable"}];
const asiaExp=[
  {c:"Japan",d:"87% energy imported; 95% crude from ME; 1.6M bpd via Hormuz",r:"Stagflation; yen collapse",color:C.red},
  {c:"S. Korea",d:"68% crude via Hormuz (~1.7M bpd)",r:"Industrial slowdown; chip costs surge",color:C.red},
  {c:"India",d:"60% oil from ME; 53% LNG Gulf-linked",r:"Largest combined exposure; dual shock",color:C.red},
  {c:"China",d:"40% oil via Hormuz; 30% LNG; 80%+ of Iran's oil buyer",r:"Material but flexible; Russian pivot",color:C.orange},
  {c:"Pakistan",d:"99% LNG from Gulf",r:"CRITICAL: power grid collapse within weeks",color:C.red},
  {c:"Bangladesh",d:"72% LNG from Gulf",r:"CRITICAL: industrial shutdown",color:C.red},
  {c:"Europe",d:"30% jet fuel; 20% LNG (Qatar); gas already +40%",r:"Gas +150% if prolonged; industrial recession",color:C.orange},
];

function HormuzTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="What happens if Iran keeps it closed — escalating global consequences">If Hormuz Stays Closed: Cascading Crisis</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      <StatBox n="20M" l="Barrels/day disrupted" c={C.red} s="20% global oil"/>
      <StatBox n="2.6M" l="Bypass capacity" c={C.orange} s="Only 13% replaceable"/>
      <StatBox n="150+" l="Tankers stranded" c={C.gold} s="Insurance gone Mar 5"/>
      <StatBox n="100%" l="Qatar LNG halted" c={C.purple} s="Force majeure"/>
    </div>
    <Card style={{borderTop:`2px solid ${C.red}`}}>
      <div style={{color:C.red,fontSize:12,fontWeight:700,marginBottom:8}}>CLOSURE TIMELINE — ESCALATING CONSEQUENCES</div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Period</TH><TH>Oil</TH><TH>Prob</TH><TH>Impact</TH></tr></thead>
      <tbody>{hormuzTimeline.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}20`}}><TD s={{color:r.color,fontWeight:700,fontSize:11}}>{r.period}</TD><TD s={{color:C.white,fontWeight:800,fontFamily:"monospace"}}>{r.oil}</TD><TD><Badge t={r.prob} c={r.color}/></TD><TD s={{fontSize:10}}>{r.impact}</TD></tr>)}</tbody></table>
    </Card>
    <Card style={{borderTop:`2px solid ${C.orange}`}}>
      <div style={{color:C.orange,fontSize:12,fontWeight:700,marginBottom:8}}>BYPASS — WHY IT'S NOT ENOUGH</div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Route</TH><TH>Capacity</TH><TH>Available</TH><TH>Limitation</TH></tr></thead>
      <tbody>{bypass.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{r.r}</TD><TD>{r.cap}</TD><TD s={{color:C.gold,fontWeight:700}}>{r.act}</TD><TD s={{fontSize:9,color:C.muted}}>{r.n}</TD></tr>)}</tbody></table>
    </Card>
    <Card style={{borderTop:`2px solid ${C.purple}`}}>
      <div style={{color:C.purple,fontSize:12,fontWeight:700,marginBottom:8}}>COUNTRY EXPOSURE</div>
      {asiaExp.map((r,i)=><div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.border}15`}}>
        <div style={{width:90,color:r.color,fontWeight:700,fontSize:11,flexShrink:0}}>{r.c}</div>
        <div style={{flex:1,fontSize:10}}>{r.d}</div>
        <div style={{flex:1,fontSize:10,color:C.muted}}>{r.r}</div>
      </div>)}
    </Card>
    <Note c={C.red} title="Bob McNally (Former WH Energy Adviser)">"A prolonged Hormuz closure is a GUARANTEED global recession." Rapidan Energy: 70% traffic drop already fracturing supply chains.</Note>
    <Note c={C.blue} title="Kpler">"This is a real supply disruption, not a risk premium event. Physical barrels affected across crude, products, LPG, and LNG simultaneously."</Note>
  </div>
}

const desalDep=[
  {c:"Kuwait",pct:100,reserve:"~7 days",pop:"4.3M",vuln:"2,465% of renewable supply; zero alternatives",color:C.red},
  {c:"Qatar",pct:99,reserve:"~7 days",pop:"2.7M",vuln:"Near-100% dependent; power-desal integrated",color:C.red},
  {c:"Bahrain",pct:97,reserve:"<7 days",pop:"1.5M",vuln:"220% of renewable supply; no strategic depth",color:C.red},
  {c:"UAE",pct:90,reserve:"~7 days",pop:"9.4M",vuln:"Jebel Ali power-desal = Dubai lifeline",color:C.red},
  {c:"Saudi Arabia",pct:70,reserve:"~14 days",pop:"36M",vuln:"943% renewable; some groundwater backup",color:C.orange},
  {c:"Oman",pct:50,reserve:"~14 days",pop:"4.6M",vuln:"Arabian Sea source (not Gulf); some aquifer",color:C.gold},
];

function DesalTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Bloomberg's Javier Blas: 'the most strategic asset for Gulf countries'">If Iran Targets Desalination: Existential Threat</ST>
    <Card style={{background:`linear-gradient(135deg,#1a0a0a,${C.card})`,borderLeft:`3px solid ${C.red}`}}>
      <div style={{color:C.red,fontSize:13,fontWeight:800,marginBottom:6}}>THE SCENARIO EVERYONE FEARS</div>
      <p style={{color:C.text,fontSize:12,lineHeight:1.7,margin:0}}>Gulf states depend on desalination for nearly ALL drinking water. Without it, 50°C+ temperatures make these countries <strong style={{color:C.red}}>literally uninhabitable</strong>. GCC holds 60% of global desal capacity — 400+ plants on exposed coastlines within drone range. Most plants integrated with power generation: destroy one, lose BOTH water AND electricity. Strategic reserves: <strong style={{color:C.red}}>only 7 days</strong>. A sustained strike = humanitarian catastrophe within 1-2 weeks for ~18 million people.</p>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      <StatBox n="60%" l="Global desal in GCC" c={C.red} s="400+ plants"/>
      <StatBox n="7 days" l="Average water reserves" c={C.orange} s="Kuwait/Qatar/Bahrain/UAE"/>
      <StatBox n="~18M" l="People at extreme risk" c={C.pink} s="If desal facilities hit"/>
    </div>
    <Card>
      <div style={{color:C.white,fontSize:12,fontWeight:700,marginBottom:8}}>DESALINATION DEPENDENCY</div>
      {desalDep.map((d,i)=><div key={i} style={{marginBottom:10}}>
        <PB v={d.pct} max={100} c={d.color} label={`${d.c} — Reserve: ${d.reserve} | Pop: ${d.pop}`}/>
        <div style={{fontSize:9,color:C.muted,marginLeft:12}}>{d.vuln}</div>
      </div>)}
    </Card>
    <Card style={{borderTop:`2px solid ${C.red}`}}>
      <div style={{color:C.red,fontSize:12,fontWeight:700,marginBottom:8}}>CASCADE: WHAT HAPPENS</div>
      <Bl c={C.red} items={[
        "Day 1-3: Rationing; emergency reserves; hospitals prioritized; panic buying",
        "Day 7: Reserves depleted in Kuwait/Qatar/Bahrain/UAE; military water convoys",
        "Day 14: No drinking water for millions; heatstroke deaths; mass evacuation attempts",
        "Day 30: International humanitarian intervention; refugee crisis; total economic collapse",
        "Power collapses simultaneously (integrated plants) — no AC in 50°C = lethal within hours",
        "Hospitals lose power AND water — medical system collapses",
        "Airports closed + Hormuz blocked = TRAPPED population — no escape route",
      ]}/>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Note c={C.red} title="Princeton (Haykel)">"Saudi red line: if water desalination, electricity, or communications attacked — Saudis would attack Iran. That's what's happening now."</Note>
      <Note c={C.orange} title="Bloomberg (Blas, Mar 2)">"Keep an eye on what may prove the MOST STRATEGIC ASSET: water desalination plants."</Note>
    </div>
    <Note c={C.purple} title="Why Iran Hasn't Yet">Targeting desal is Iran's ultimate escalation card. Would: (1) Turn GCC into active combatants, (2) Trigger Saudi/UAE counter-strikes, (3) Create humanitarian catastrophe turning global opinion against Iran. Being held in reserve — but calculus changes as regime fights for survival.</Note>
  </div>
}

const casualtyTimeline=[{d:"Feb 28",iran:200,us:0,region:2},{d:"Mar 1",iran:400,us:3,region:8},{d:"Mar 2",iran:555,us:6,region:12},{d:"Mar 3",iran:787,us:6,region:15},{d:"Mar 4",iran:912,us:6,region:15}];
const casualties=[
  {p:"Iran (civilians)",d:"787-912+",inj:"2,580+",src:"Red Crescent/HRA",n:"181+ children <10; 168+ schoolgirls Minab; 10+ hospitals",color:C.green},
  {p:"Iran (military)",d:"Unknown",inj:"Unknown",src:"IRGC/Artesh",n:"Supreme Leader + 12+ generals killed",color:C.green},
  {p:"United States",d:"6",inj:"18+",src:"CENTCOM",n:"Shuaiba Kuwait direct hit",color:C.red},
  {p:"Israel",d:"11+",inj:"40+",src:"Israeli media",n:"Tel Aviv, Haifa, Bnei Brak",color:C.blue},
  {p:"Lebanon",d:"40+",inj:"246+",src:"Health Ministry",n:"Israeli retaliatory strikes",color:C.purple},
  {p:"UAE",d:"3",inj:"58+",src:"UN HRC",n:"Interceptor debris; airports/hotels/ports",color:C.cyan},
  {p:"Kuwait",d:"1",inj:"32",src:"Defense Ministry",n:"Airport; Shuaiba",color:C.orange},
  {p:"Bahrain",d:"1+",inj:"4+",src:"Interior Ministry",n:"5th Fleet area; residential",color:C.pink},
  {p:"Pakistan (protests)",d:"24-35",inj:"120+",src:"Media",n:"US consulate Karachi: Marines fired",color:C.pink},
];

function CasualtyTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="All parties — March 4, 2026">Casualty Tracker</ST>
    <Card><ResponsiveContainer width="100%" height={180}><AreaChart data={casualtyTimeline}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="d" tick={{fill:C.muted,fontSize:10}}/><YAxis tick={{fill:C.muted,fontSize:10}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Area type="monotone" dataKey="iran" stroke={C.green} fill={C.green} fillOpacity={.12} strokeWidth={2} name="Iran"/><Area type="monotone" dataKey="us" stroke={C.red} fill={C.red} fillOpacity={.12} strokeWidth={2} name="US"/><Area type="monotone" dataKey="region" stroke={C.gold} fill={C.gold} fillOpacity={.08} strokeWidth={2} name="Regional"/><Legend wrapperStyle={{fontSize:10}}/></AreaChart></ResponsiveContainer></Card>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Party</TH><TH>Killed</TH><TH>Injured</TH><TH>Source</TH><TH>Details</TH></tr></thead><tbody>{casualties.map((r,i)=><tr key={i}><TD s={{color:r.color,fontWeight:700,fontSize:10}}>{r.p}</TD><TD s={{color:C.white,fontWeight:700,fontFamily:"monospace"}}>{r.d}</TD><TD s={{fontFamily:"monospace"}}>{r.inj}</TD><TD s={{fontSize:9,color:C.muted}}>{r.src}</TD><TD s={{fontSize:10,color:C.muted}}>{r.n}</TD></tr>)}</tbody></table></Card>
  </div>
}

function MilTab(){
  const us=[{m:"Strikes (Day 1)",v:"2,000+",n:"2x Iraq shock & awe"},{m:"Launchers destroyed",v:"300+ (50%)",n:"70% drop in fire"},{m:"Ships sunk",v:"11+",n:"Drone carrier included"},{m:"Air superiority",v:"Over Tehran",n:"Mar 2"},{m:"Leaders killed",v:"Supreme Leader + 12+",n:"CIA: most successors killed"}];
  const ir=[{m:"Bases targeted",v:"27 (9 countries)",n:"Simultaneous"},{m:"Hormuz",v:"CLOSED",n:"Ships 'set ablaze'"},{m:"Cost ratio",v:"200:1",n:"$50K drone vs $1-10M interceptor"},{m:"Drones",v:"Most dangerous",n:"Getting through defenses"},{m:"Hezbollah",v:"Activated",n:"Haifa struck; IDF bases"}];
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Both sides' operations">Military Operations — Day 4</ST>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.blue}`}}><div style={{color:C.blue,fontSize:11,fontWeight:700,marginBottom:6}}>US-ISRAEL</div><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{us.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10,width:"40%"}}>{r.m}</TD><TD s={{color:C.blue,fontWeight:700}}>{r.v}</TD><TD s={{fontSize:9,color:C.muted}}>{r.n}</TD></tr>)}</tbody></table></Card>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>IRAN</div><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{ir.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10,width:"40%"}}>{r.m}</TD><TD s={{color:C.green,fontWeight:700}}>{r.v}</TD><TD s={{fontSize:9,color:C.muted}}>{r.n}</TD></tr>)}</tbody></table></Card>
    </div>
  </div>
}

const mkt=[{m:"Brent Crude",pre:"$73",now:"$83",ch:"+13%",proj:"$110-200",dir:"up"},{m:"Gold",pre:"$5,100",now:"$5,300+",ch:"+4%",proj:"$6,300",dir:"up"},{m:"EU Gas",pre:"Base",now:"+40%",ch:"+40%",proj:"+150%",dir:"up"},{m:"S&P 500",pre:"6,884",now:"6,882",ch:"-1.2%",proj:"Volatile",dir:"flat"},{m:"VIX",pre:"~20",now:"25.4",ch:"+27%",proj:"30+",dir:"up"},{m:"Defense",pre:"Base",now:"+2-5%",ch:"LMT,NOC",proj:"Surge",dir:"up"},{m:"Airlines",pre:"Base",now:"-10%",ch:"Fuel+cancel",proj:"Collapse",dir:"down"}];

function MarketTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="All asset classes">Markets & Energy</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Asset</TH><TH>Pre</TH><TH>Now</TH><TH>Change</TH><TH>Projection</TH></tr></thead><tbody>{mkt.map((r,i)=><tr key={i}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{r.m}</TD><TD>{r.pre}</TD><TD s={{color:r.dir==="up"?C.green:r.dir==="down"?C.red:C.gold,fontWeight:700}}>{r.now}</TD><TD><Badge t={r.ch} c={r.dir==="up"?C.green:r.dir==="down"?C.red:C.gold}/></TD><TD s={{fontSize:9,color:C.muted}}>{r.proj}</TD></tr>)}</tbody></table></Card>
    <Note c={C.gold} title="Russia Benefits">Kpler: conflict "materially improving Russia's competitive position." India/China incentivized to deepen Russian crude reliance.</Note>
  </div>
}

function IntlTab(){
  const d=[{a:"China",p:"Condemn",c:C.red},{a:"Russia",p:"Condemn",c:C.red},{a:"UN",p:"Condemn both",c:C.orange},{a:"UK",p:"Cautious",c:C.blue},{a:"GCC",p:"Mixed",c:C.gold},{a:"Amnesty",p:"Condemn all",c:C.purple}];
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST>International Response</ST>
    <Bl items={["China: 'Grave violation of sovereignty; tramples UN Charter' — no military support","Russia: 'Unprovoked aggression' — no defense guarantee despite pact","UN Sec-Gen: 'Squandering diplomacy' — condemned BOTH sides","UK: RAF to Qatar (defense only); Akrotiri hit by Iran","GCC: 50th Extraordinary Ministerial — 'dialogue is sole path' but considering counter-strikes","Amnesty: 'Grave threat to international legal order' — ALL parties must protect civilians"]}/>
  </div>
}

function LegalTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST>Legal & Domestic Debate</ST>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card style={{borderTop:`2px solid ${C.green}`}}><div style={{color:C.green,fontSize:11,fontWeight:700,marginBottom:6}}>FOR</div><Bl c={C.green} items={["Nuclear threat","Iran killed 7-30K+ protesters","Proxy networks","Art. 51 self-defense","Iran breached UNSC resolutions"]}/></Card>
      <Card style={{borderTop:`2px solid ${C.red}`}}><div style={{color:C.red,fontSize:11,fontWeight:700,marginBottom:6}}>AGAINST</div><Bl c={C.red} items={["No Congressional auth (Art. I)","Pentagon: Iran NOT planning to strike first","Deal 'within reach' before strikes","2025 intel: NOT building nuke","70% Americans opposed (Quinnipiac)","CENTCOM legal chief: 'violates Constitution'"]}/></Card>
    </div>
  </div>
}

function HumanTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST>Humanitarian Crisis</ST>
    <Bl c={C.red} items={[
      "912+ civilian deaths verified (HRA); 181+ children under 10; 880+ under review",
      "168+ schoolgirls killed in Minab elementary school — US investigating, Israel denies",
      "10+ hospitals damaged; Gandhi Hospital Tehran; ICRC condemns",
      "Internet blackout: 4% connectivity (NetBlocks) — prevents verification",
      "IRGC stationed in schools/hospitals — human shield dynamic",
      "Jan 2026: Iran's OWN forces killed 7,000-30,000+ protesters before the war",
      "18M+ at risk if desalination plants targeted (see Desalination tab)",
    ]}/>
  </div>
}

const scenarios=[
  {name:"Swift Transition",prob:5,desc:"IRGC surrenders; opposition unites; nuclear surrendered; oil opened",src:"Analysts: least likely",color:C.green},
  {name:"Maduro Model",prob:20,desc:"Moderate successor negotiates; regime survives weakened",src:"Venezuela playbook; acceptable to Trump",color:C.blue},
  {name:"Regime Weathers Storm",prob:35,desc:"Hardliner takes over; hunkers down; 440kg HEU = nuclear breakout possible",src:"Brookings: 'deeply embedded networks'",color:C.orange},
  {name:"Prolonged Air War",prob:30,desc:"4-5 weeks; attrition; no regime change; Iran: 'no negotiating'",src:"Trump: '4-5 weeks'",color:C.red},
  {name:"Regional Conflagration",prob:10,desc:"Full proxy activation; Gulf drawn in; $150-200 oil; global recession",src:"Already partially happening",color:C.pink},
];
const allStats=[
  {cat:"Scale Comparison",items:[{s:"US-Israel strikes (Day 1)",v:"2,000+",r:"vs 1,100 in 2003 Iraq"},{s:"Iran missiles at GCC (48hr)",v:"390+",r:"vs 14 in June 2025"},{s:"Iran drones at GCC (48hr)",v:"830+",r:"vs ~0 in June 2025"},{s:"Israel munitions",v:"1,200+",r:"Largest IAF sortie ever"}]},
  {cat:"Military Degradation",items:[{s:"Missile launchers destroyed",v:"~50%",r:"300+ of ~600"},{s:"Fire reduction toward Israel",v:"70%",r:"CTP-ISW"},{s:"Naval vessels sunk",v:"11+",r:"Incl. drone carrier"},{s:"Leaders killed",v:"13+",r:"Supreme Leader + generals"}]},
  {cat:"Hormuz Impact",items:[{s:"Normal flow",v:"20M bbl/day",r:"20% global oil"},{s:"Traffic reduction",v:"~70%",r:"De facto closure"},{s:"Bypass capacity",v:"2.6M bbl/day",r:"13% of Hormuz"},{s:"Tankers stranded",v:"150+",r:"Insurance withdrawn"},{s:"Asia crude via Hormuz",v:"84%",r:"EIA 2024"}]},
  {cat:"Economic Shock",items:[{s:"Brent surge",v:"+13%",r:"$73→$83"},{s:"Gold record",v:"$5,300+",r:"+$200 session"},{s:"EU gas",v:"+40%",r:"Proj +150%"},{s:"Recession prob (sustained)",v:"Near certainty",r:"McNally/Rapidan"},{s:"OPEC+ spare",v:"3.5M bpd",r:"Mostly trapped"}]},
  {cat:"GCC Air Defense",items:[{s:"UAE total",v:"998 intercepts",r:"186 missiles + 812 drones"},{s:"Kuwait total",v:"380 intercepts",r:"97+283"},{s:"Bahrain total",v:"164 intercepts",r:"73+91"},{s:"Qatar total",v:"143 + 2 jets",r:"First GCC offensive"},{s:"Overall rate",v:"~90-95%",r:"5-10% through at scale"}]},
  {cat:"Desalination Vulnerability",items:[{s:"GCC global desal share",v:"60%",r:"400+ plants"},{s:"Kuwait dependency",v:"100%",r:"2,465% renewable use"},{s:"Reserves (most GCC)",v:"~7 days",r:"Qatar, Kuwait, Bahrain, UAE"},{s:"Per capita water use",v:"550 L/day",r:"vs 120L global avg"},{s:"People at risk",v:"~18M+",r:"UAE+Kuwait+Qatar+Bahrain"}]},
  {cat:"Casualties",items:[{s:"Iran civilians",v:"912+",r:"HRA; 880+ under review"},{s:"Children <10",v:"181+",r:"HRA"},{s:"Minab school",v:"168+",r:"WaPo/NYT verified"},{s:"US troops",v:"6",r:"CENTCOM"},{s:"GCC civilians",v:"5+",r:"UAE 3, KW 1, BH 1"},{s:"Pakistan protests",v:"24-35",r:"US consulate Karachi"},{s:"Jan 2026 massacre",v:"7K-30K+",r:"Multiple sources"}]},
  {cat:"Cost Asymmetries",items:[{s:"Shahed drone",v:"~$50K",r:"'Most dangerous threat'"},{s:"Patriot interceptor",v:"$1-4M",r:"Per missile"},{s:"THAAD interceptor",v:"$10M",r:"Per missile"},{s:"Cost ratio",v:"200:1",r:"Attacker advantage"},{s:"Interceptor supply",v:"~3-4 days",r:"At peak consumption"}]},
  {cat:"Public Opinion & Legal",items:[{s:"Americans opposing",v:"70%",r:"Quinnipiac Jan 2026"},{s:"War Powers vote",v:"Failed 47-53",r:"June 2025"},{s:"Congressional notice",v:"Gang of 8 only",r:"Not full Congress"}]},
];

function StatsTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub="Every number, probability, and data point in one place">All Probability & Statistics</ST>
    <Card style={{borderTop:`2px solid ${C.purple}`}}>
      <div style={{color:C.purple,fontSize:12,fontWeight:700,marginBottom:8}}>CONFLICT OUTCOME SCENARIOS</div>
      <ResponsiveContainer width="100%" height={200}><BarChart data={scenarios} layout="vertical" margin={{left:160,right:20}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis type="number" domain={[0,40]} tick={{fill:C.muted,fontSize:10}}/><YAxis type="category" dataKey="name" tick={{fill:C.text,fontSize:10}} width={150}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:11}}/><Bar dataKey="prob" radius={[0,4,4,0]} name="%">{scenarios.map((s,i)=><Cell key={i} fill={s.color}/>)}</Bar></BarChart></ResponsiveContainer>
      {scenarios.map((s,i)=><div key={i} style={{display:"flex",gap:6,padding:"4px 0",borderBottom:`1px solid ${C.border}15`}}>
        <span style={{color:s.color,fontWeight:700,fontSize:11,width:170,flexShrink:0}}>{s.name} ({s.prob}%)</span>
        <span style={{fontSize:10,flex:1}}>{s.desc}</span>
        <span style={{fontSize:9,color:C.muted,width:160,flexShrink:0}}>{s.src}</span>
      </div>)}
    </Card>
    {allStats.map((cat,ci)=><Card key={ci} style={{borderLeft:`3px solid ${[C.blue,C.red,C.gold,C.orange,C.teal,C.red,C.pink,C.purple,C.green][ci%9]}`}}>
      <div style={{color:C.white,fontSize:12,fontWeight:700,marginBottom:6}}>{cat.cat} ({cat.items.length})</div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{cat.items.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}10`}}>
        <TD s={{fontSize:10,width:"45%"}}>{r.s}</TD>
        <TD s={{color:C.white,fontWeight:800,fontFamily:"monospace",fontSize:12,width:"20%"}}>{r.v}</TD>
        <TD s={{fontSize:9,color:C.muted}}>{r.r}</TD>
      </tr>)}</tbody></table>
    </Card>)}
  </div>
}

const sourceList=[
  {n:"Al Jazeera",t:"GCC, Hormuz, casualties, humanitarian"},{n:"Breaking Defense",t:"GCC air defense interceptions"},{n:"Carnegie Endowment",t:"GCC strategic analysis"},{n:"Atlantic Council",t:"Gulf restructuring"},{n:"Gulf International Forum",t:"GCC expert perspectives"},{n:"CNBC/Kpler",t:"Hormuz closure, Asia exposure"},{n:"EIA",t:"Hormuz flow stats, bypass data"},{n:"EY-Parthenon/World Oil",t:"Economic projections"},{n:"IBTimes",t:"Global recession analysis"},{n:"Atlas Institute",t:"Hormuz crisis deep-dive"},{n:"Bloomberg (Blas)",t:"Desalination warning"},{n:"Jerusalem Post",t:"Saudi red line (Princeton/CSIS)"},{n:"The Conversation/Rice",t:"Gulf vulnerability"},{n:"Gulf Insider",t:"Desal threat scenarios"},{n:"Middle East Forum",t:"Energy infra vulnerability"},{n:"Carboun Institute",t:"Water reserve data"},{n:"World Bank/GRC/Fanack",t:"GCC water statistics"},{n:"Brookings/CSIS/Chatham",t:"Scenario analysis"},{n:"HRA/Amnesty/ICRC",t:"Civilian documentation"},{n:"CTP-ISW",t:"Military analysis"},{n:"The National",t:"GCC condemnation statements"},{n:"MECGA/Middle East Council",t:"Iran strategic miscalculation"},{n:"Wikipedia",t:"Aggregated data"}
];

function SourceTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST sub={`${sourceList.length} sources`}>Sources</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><tbody>{sourceList.map((s,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD s={{color:C.white,fontWeight:600,fontSize:10}}>{s.n}</TD><TD s={{fontSize:10}}>{s.t}</TD></tr>)}</tbody></table></Card>
    <Note c={C.muted} title="Methodology">Multi-source from US, Iranian, Chinese, Russian, European, GCC, multilateral perspectives. All contested claims flagged. Fog of war caveats throughout.</Note>
  </div>
}

const TABS=[OverviewTab,GCCTab,HormuzTab,DesalTab,CasualtyTab,MilTab,MarketTab,IntlTab,LegalTab,HumanTab,StatsTab,SourceTab];

export default function Dashboard(){
  const [at,setAt]=useState(0);const T=TABS[at];
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif",color:C.text}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:`linear-gradient(135deg,${C.card},${C.cardAlt})`,borderBottom:`1px solid ${C.border}`,padding:"16px 20px 12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.red,boxShadow:`0 0 8px ${C.red}88`}}/><span style={{color:C.muted,fontSize:9,textTransform:"uppercase",letterSpacing:2,fontWeight:600}}>LIVE IMPARTIAL ANALYSIS</span><Badge t="DAY 4" c={C.red}/><Badge t="ALL SIDES" c={C.purple}/><Badge t={`${sourceList.length} SOURCES`} c={C.blue}/></div>
      <h1 style={{color:C.white,fontSize:20,fontWeight:800,margin:"0 0 2px"}}>2026 US-Iran Conflict — Global Intelligence Dashboard</h1>
      <p style={{color:C.muted,fontSize:11,margin:0}}>GCC crisis | Hormuz closure scenarios | Desalination threat | Full probability & statistics | {sourceList.length} sources | March 4, 2026</p>
    </div>
    <div style={{display:"flex",gap:0,padding:"0 20px",background:C.card,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {tabs.map((t,i)=><button key={t} onClick={()=>setAt(i)} style={{background:at===i?C.bg:"transparent",color:at===i?C.white:C.muted,border:"none",borderBottom:at===i?`2px solid ${C.red}`:"2px solid transparent",padding:"9px 10px",fontSize:10,fontWeight:at===i?700:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>{t}</button>)}
    </div>
    <div style={{padding:"16px 20px 32px",maxWidth:960,margin:"0 auto"}}><T/></div>
  </div>
}
