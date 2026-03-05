import { useState } from "react";
import GlobalDashboard from "./GlobalDashboard.jsx";
import HormuzTracker from "./HormuzTracker.jsx";

const C = {bg:"#0b0f19",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",red:"#e63946",white:"#f1faee",muted:"#8899aa",text:"#e0e0e0",blue:"#457b9d",green:"#2a9d8f",gold:"#e9c46a",purple:"#9b5de5"};

const pages = ["Home","Global Analysis","Hormuz Vessel Tracker"];

function Home({go}){
  return <div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{width:12,height:12,borderRadius:"50%",background:C.red,boxShadow:`0 0 20px ${C.red}88`,marginBottom:16}}/>
    <h1 style={{color:C.white,fontSize:32,fontWeight:800,margin:"0 0 8px",textAlign:"center"}}>2026 US-Iran Conflict</h1>
    <h2 style={{color:C.muted,fontSize:16,fontWeight:400,margin:"0 0 6px",textAlign:"center"}}>Global Intelligence Dashboard</h2>
    <p style={{color:C.muted,fontSize:12,margin:"0 0 40px",textAlign:"center",maxWidth:600}}>
      Impartial multi-source analysis from US, Iranian, Chinese, Russian, European, and multilateral perspectives. 20+ source groups. Every contested fact flagged. No single narrative privileged.
    </p>
    <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
      <DashCard title="Global Analysis" sub="12 tabs: Casualties, Military, GCC Crisis, Hormuz Cascade, Water/Desal, Markets, Legal, Probabilities" color={C.blue} onClick={()=>go(1)} icon="🌍"/>
      <DashCard title="Hormuz Vessel Tracker" sub="Global Fishing Watch API integration. Real-time vessel presence, AIS data, strait traffic analysis" color={C.green} onClick={()=>go(2)} icon="🚢"/>
    </div>
    <div style={{marginTop:40,padding:20,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,maxWidth:700}}>
      <h3 style={{color:C.white,fontSize:13,fontWeight:700,margin:"0 0 8px"}}>Data Sources</h3>
      <p style={{color:C.muted,fontSize:11,margin:0,lineHeight:1.6}}>Al Jazeera • CNN • CNBC • Bloomberg • Critical Threats (AEI/ISW) • House of Commons Library • UN/IAEA/WHO • Brookings • CSIS • Chatham House • Amnesty International • HRA Iran • Chinese Foreign Ministry • Russian Foreign Ministry • Gulf Insider • Middle East Institute • Middle East Forum • EIA • Kpler • Nomura • JPMorgan • IMF • Global Fishing Watch • CloudSEK • SpecialEurasia • The Intercept • Wikipedia</p>
    </div>
    <p style={{color:C.muted,fontSize:10,marginTop:24}}>Updated March 4, 2026 | Day 4 of Active Conflict</p>
  </div>
}

function DashCard({title,sub,color,onClick,icon}){
  return <button onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`3px solid ${color}`,borderRadius:8,padding:"24px 20px",width:300,cursor:"pointer",textAlign:"left",transition:"transform 0.15s",fontFamily:"inherit"}}
    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
    <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
    <div style={{color:C.white,fontSize:16,fontWeight:700,marginBottom:6}}>{title}</div>
    <div style={{color:C.muted,fontSize:11,lineHeight:1.5}}>{sub}</div>
  </button>
}

export default function App(){
  const [page,setPage]=useState(0);
  if(page===0) return <Home go={setPage}/>;
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"8px 20px",display:"flex",alignItems:"center",gap:16}}>
      <button onClick={()=>setPage(0)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,fontFamily:"inherit",padding:"4px 8px"}}>← Home</button>
      {pages.slice(1).map((p,i)=><button key={p} onClick={()=>setPage(i+1)} style={{background:page===i+1?C.bg:"transparent",color:page===i+1?C.white:C.muted,border:`1px solid ${page===i+1?C.border:"transparent"}`,borderRadius:4,padding:"4px 12px",fontSize:11,fontWeight:page===i+1?700:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>)}
    </div>
    {page===1 && <GlobalDashboard/>}
    {page===2 && <HormuzTracker/>}
  </div>
}
