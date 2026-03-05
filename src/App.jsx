import { useState } from "react";
import OriginalDashboard from "./OriginalDashboard.jsx";
import GlobalDashboard from "./GlobalDashboard.jsx";
import HormuzTracker from "./HormuzTracker.jsx";

const C = {bg:"#0b0f19",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",red:"#e63946",white:"#f1faee",muted:"#8899aa",text:"#e0e0e0",blue:"#457b9d",green:"#2a9d8f",gold:"#e9c46a",purple:"#9b5de5",orange:"#f77f00",cyan:"#00b4d8",pink:"#ff6b6b"};

function Badge({t,c}){return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 8px",borderRadius:3,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{t}</span>}

function DashCard({title,sub,color,onClick,icon,tags}){
  return <button onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`3px solid ${color}`,borderRadius:10,padding:"28px 24px",width:320,cursor:"pointer",textAlign:"left",transition:"all 0.2s",fontFamily:"inherit"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${color}22`}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
    <div style={{fontSize:32,marginBottom:12}}>{icon}</div>
    <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:8}}>{title}</div>
    <div style={{color:C.muted,fontSize:11,lineHeight:1.6,marginBottom:12}}>{sub}</div>
    {tags&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{tags.map((tg,i)=><Badge key={i} t={tg[0]} c={tg[1]}/>)}</div>}
  </button>
}

function Home({go}){
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:`linear-gradient(180deg,${C.cardAlt},${C.bg})`,padding:"60px 40px 40px",textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <div style={{width:12,height:12,borderRadius:"50%",background:C.red,boxShadow:`0 0 20px ${C.red}88`,animation:"pulse 2s infinite"}}/>
        <span style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:3,fontWeight:600}}>LIVE IMPARTIAL ANALYSIS</span>
        <Badge t="DAY 4" c={C.red}/><Badge t="ALL SIDES" c={C.purple}/><Badge t="3 DASHBOARDS" c={C.blue}/>
      </div>
      <h1 style={{color:C.white,fontSize:36,fontWeight:800,margin:"0 0 8px",lineHeight:1.2}}>2026 US-Iran Conflict</h1>
      <h2 style={{color:C.muted,fontSize:18,fontWeight:400,margin:"0 0 8px"}}>Global Intelligence Platform</h2>
      <p style={{color:C.muted,fontSize:12,margin:"0 auto",maxWidth:700,lineHeight:1.7}}>
        Multi-source analysis from US, Iranian, Chinese, Russian, European, and multilateral perspectives. 
        23+ sources. Every contested fact flagged. No single narrative privileged.
      </p>
    </div>
    <div style={{display:"flex",gap:20,justifyContent:"center",padding:"20px 40px 30px",flexWrap:"wrap"}}>
      <DashCard title="Global Analysis" sub="12-tab dashboard: Casualties, Military Ops, Cyber Warfare, International Response, Legal Debate, Humanitarian Crisis, NATO & Allies, Scenarios & Outlook" color={C.blue} onClick={()=>go(1)} icon="🌍"
        tags={[["12 TABS",C.blue],["CYBER WAR",C.purple],["SCENARIOS",C.orange],["21 SOURCES",C.green]]}/>
      <DashCard title="GCC & Threat Analysis" sub="Expanded analysis: GCC Crisis Dashboard, Hormuz Cascade Timeline, Desalination Water Crisis, Full Probability Models with 26 verified statistics" color={C.orange} onClick={()=>go(2)} icon="🏗️"
        tags={[["GCC CRISIS",C.red],["WATER THREAT",C.pink],["27 SCENARIOS",C.gold],["HORMUZ",C.orange]]}/>
      <DashCard title="Hormuz Vessel Tracker" sub="Global Fishing Watch API integration. Live AIS vessel presence map, traffic collapse chart, dark fleet detection, stranded tanker clusters" color={C.green} onClick={()=>go(3)} icon="🚢"
        tags={[["GFW API",C.green],["LIVE MAP",C.cyan],["AIS DATA",C.blue],["DARK FLEET",C.red]]}/>
    </div>
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 30px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
        {[["912+","Iran civilians killed",C.red],["2,000+","US-Israel strikes",C.blue],["9","Countries hit by Iran",C.green],["$83/bbl","Brent crude (+13%)",C.gold],["~0","Hormuz transits/day",C.orange],["90%","Kuwait: water from desal",C.purple]].map(([n,l,c],i)=>
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,borderTop:`2px solid ${c}`,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:c,fontSize:16,fontWeight:800}}>{n}</div>
            <div style={{color:C.muted,fontSize:8,marginTop:2}}>{l}</div>
          </div>
        )}
      </div>
    </div>
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 20px"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 20px"}}>
        <h3 style={{color:C.white,fontSize:12,fontWeight:700,margin:"0 0 8px"}}>Data Sources</h3>
        <p style={{color:C.muted,fontSize:10,margin:0,lineHeight:1.7}}>Al Jazeera · CNN · CNBC · Bloomberg · Critical Threats (AEI/ISW) · House of Commons Library · UN/IAEA/WHO/UNESCO · Brookings · CSIS · Chatham House · Amnesty International · HRA Iran · Chinese Foreign Ministry · Russian Foreign Ministry · Gulf Insider · Middle East Institute · EIA · Kpler · Nomura · JPMorgan · IMF · Global Fishing Watch · CloudSEK · SpecialEurasia · The Intercept · Wikipedia</p>
      </div>
    </div>
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 40px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          [C.blue,"Multi-Perspective","US gov + US critics, Iranian state + opposition, Chinese + Russian, European + multilateral institutions"],
          [C.orange,"Contested Facts Flagged","Pentagon: Iran NOT planning to strike first. Oman: deal 'within reach.' 2025 Intel: NOT building bomb. All identified."],
          [C.green,"Live Data","Global Fishing Watch API for AIS vessel tracking. SAR satellite detections for dark fleet. MarineTraffic/Reuters shipping data."],
        ].map(([c,t,d],i)=>
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${c}`,borderRadius:8,padding:"14px 16px"}}>
            <div style={{color:c,fontSize:11,fontWeight:700,marginBottom:4}}>{t}</div>
            <p style={{color:C.muted,fontSize:10,margin:0,lineHeight:1.5}}>{d}</p>
          </div>
        )}
      </div>
    </div>
    <div style={{textAlign:"center",padding:"20px",borderTop:`1px solid ${C.border}`}}>
      <p style={{color:C.muted,fontSize:10,margin:0}}>Updated March 4, 2026 | Day 4 | 3 Dashboards | 23+ Sources</p>
    </div>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
  </div>
}

function TopNav({page,go}){
  return <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:0,overflowX:"auto",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    {[["🏠","Home",0],["🌍","Global Analysis",1],["🏗️","GCC & Threats",2],["🚢","Vessel Tracker",3]].map(([ic,lb,pg])=>
      <button key={pg} onClick={()=>go(pg)} style={{background:page===pg?C.bg:"transparent",color:page===pg?C.white:C.muted,border:"none",borderBottom:page===pg?`2px solid ${C.red}`:"2px solid transparent",padding:"10px 14px",fontSize:11,fontWeight:page===pg?700:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:13}}>{ic}</span>{lb}
      </button>
    )}
  </div>
}

export default function App(){
  const [page,setPage]=useState(0);
  if(page===0) return <Home go={setPage}/>;
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <TopNav page={page} go={setPage}/>
    {page===1 && <OriginalDashboard/>}
    {page===2 && <GlobalDashboard/>}
    {page===3 && <HormuzTracker/>}
  </div>
}
