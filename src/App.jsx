import { useState, useEffect, useCallback } from "react";
import OriginalDashboard from "./OriginalDashboard.jsx";
import GlobalDashboard from "./GlobalDashboard.jsx";
import HormuzTracker from "./HormuzTracker.jsx";

const C = {bg:"#0b0f19",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",red:"#e63946",white:"#f1faee",muted:"#8899aa",text:"#e0e0e0",blue:"#457b9d",green:"#2a9d8f",gold:"#e9c46a",purple:"#9b5de5",orange:"#f77f00",cyan:"#00b4d8",pink:"#ff6b6b"};
const REFRESH_MS = 3600000; // 1 hour

function Badge({t,c}){return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,padding:"2px 8px",borderRadius:3,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{t}</span>}

// ═══════════════════════════════
// LIVE REFRESH HOOK
// ═══════════════════════════════
function useAutoRefresh(ms){
  const [tick,setTick]=useState(0);
  const [lastUpdate,setLastUpdate]=useState(Date.now());
  const [countdown,setCountdown]=useState(ms/1000);
  useEffect(()=>{
    const iv=setInterval(()=>{setTick(t=>t+1);setLastUpdate(Date.now());setCountdown(ms/1000)},ms);
    const cd=setInterval(()=>setCountdown(c=>Math.max(0,c-1)),1000);
    return ()=>{clearInterval(iv);clearInterval(cd)};
  },[ms]);
  const refresh=useCallback(()=>{setTick(t=>t+1);setLastUpdate(Date.now());setCountdown(ms/1000)},[ms]);
  return {tick,lastUpdate,countdown,refresh};
}

function RefreshBar({lastUpdate,countdown,refresh}){
  const mins=Math.floor(countdown/60);
  const secs=Math.floor(countdown%60);
  const ago=Math.floor((Date.now()-lastUpdate)/1000);
  const agoStr=ago<60?`${ago}s ago`:ago<3600?`${Math.floor(ago/60)}m ago`:`${Math.floor(ago/3600)}h ago`;
  return <div style={{background:C.cardAlt,borderBottom:`1px solid ${C.border}`,padding:"6px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:6,height:6,borderRadius:"50%",background:countdown>10?C.green:C.gold,boxShadow:`0 0 6px ${countdown>10?C.green:C.gold}66`,animation:"pulse 2s infinite"}}/>
      <span style={{color:C.muted}}>LIVE</span>
      <span style={{color:C.text}}>Updated {agoStr}</span>
      <span style={{color:C.muted}}>• Next refresh in {mins}:{secs.toString().padStart(2,"0")}</span>
    </div>
    <button onClick={refresh} style={{background:C.green+"22",color:C.green,border:`1px solid ${C.green}33`,borderRadius:4,padding:"3px 10px",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>↻ REFRESH NOW</button>
  </div>
}

// ═══════════════════════════════
// LIVE NEWS FEED (RSS via proxy)
// ═══════════════════════════════
function LiveNewsFeed({tick}){
  const [news,setNews]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    const feeds = [
      {src:"Al Jazeera",url:"https://api.rss2json.com/v1/api.json?rss_url=https://www.aljazeera.com/xml/rss/all.xml&count=15"},
      {src:"BBC",url:"https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/middle_east/rss.xml&count=15"},
    ];
    setLoading(true);
    Promise.allSettled(feeds.map(f=>
      fetch(f.url).then(r=>r.json()).then(d=>
        (d.items||[]).filter(it=>{
          const t=(it.title||"").toLowerCase();
          return t.includes("iran")||t.includes("hormuz")||t.includes("gulf")||t.includes("strait")||
                 t.includes("tehran")||t.includes("irgc")||t.includes("khamenei")||t.includes("oil")||
                 t.includes("qatar")||t.includes("kuwait")||t.includes("bahrain")||t.includes("uae")||
                 t.includes("saudi")||t.includes("middle east")||t.includes("conflict");
        }).map(it=>({...it,source:f.src}))
      ).catch(()=>[])
    )).then(results=>{
      const all=results.flatMap(r=>r.value||[])
        .sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate))
        .slice(0,12);
      setNews(all);
      setLoading(false);
    }).catch(e=>{setError(e.message);setLoading(false)});
  },[tick]);

  if(error) return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:16}}>
    <div style={{color:C.red,fontSize:11}}>News feed unavailable — RSS proxy may be rate limited. Refresh in a few minutes.</div>
  </div>;

  return <div style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`2px solid ${C.cyan}`,borderRadius:8,padding:"14px 18px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:C.red,animation:"pulse 1.5s infinite"}}/>
        <span style={{color:C.cyan,fontSize:12,fontWeight:700}}>LIVE NEWS FEED</span>
        <span style={{color:C.muted,fontSize:9}}>Iran / Gulf / Hormuz</span>
      </div>
      <span style={{color:C.muted,fontSize:9}}>{news.length} stories • Al Jazeera + BBC</span>
    </div>
    {loading?<div style={{color:C.muted,fontSize:11,padding:20,textAlign:"center"}}>Loading headlines...</div>:
    <div style={{maxHeight:320,overflow:"auto"}}>
      {news.map((n,i)=>{
        const time=n.pubDate?new Date(n.pubDate):null;
        const tStr=time?time.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"";
        return <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"8px 0",borderBottom:`1px solid ${C.border}15`,textDecoration:"none",transition:"background 0.15s"}}
          onMouseEnter={e=>e.currentTarget.style.background=C.cardAlt+"44"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div style={{display:"flex",gap:8,alignItems:"baseline"}}>
            <Badge t={n.source} c={n.source==="Al Jazeera"?C.cyan:C.orange}/>
            <span style={{color:C.muted,fontSize:8,fontFamily:"monospace"}}>{tStr}</span>
          </div>
          <div style={{color:C.white,fontSize:11,fontWeight:500,marginTop:3,lineHeight:1.4}}>{n.title}</div>
        </a>
      })}
      {news.length===0&&<div style={{color:C.muted,fontSize:11,padding:20,textAlign:"center"}}>No Iran/Gulf headlines found in current feed cycle. Will retry on next refresh.</div>}
    </div>}
  </div>
}

// ═══════════════════════════════
// TRADINGVIEW WIDGETS
// ═══════════════════════════════
function TradingViewTicker(){
  useEffect(()=>{
    const id="tv-ticker-script";
    if(document.getElementById(id)) return;
    const s=document.createElement("script");
    s.id=id;s.async=true;
    s.src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.innerHTML=JSON.stringify({
      symbols:[
        {proName:"NYMEX:CL1!",title:"WTI Crude"},
        {proName:"TVC:UKOIL",title:"Brent Crude"},
        {proName:"COMEX:GC1!",title:"Gold"},
        {proName:"FOREXCOM:SPXUSD",title:"S&P 500"},
        {proName:"TVC:VIX",title:"VIX"},
        {proName:"TVC:DXY",title:"USD Index"},
        {proName:"BITSTAMP:BTCUSD",title:"Bitcoin"},
        {proName:"TVC:US10Y",title:"10Y Treasury"},
      ],
      showSymbolLogo:true,colorTheme:"dark",isTransparent:true,displayMode:"adaptive",locale:"en"
    });
    const c=document.getElementById("tv-ticker-container");
    if(c) c.appendChild(s);
  },[]);
  return <div style={{borderBottom:`1px solid ${C.border}`,overflow:"hidden",height:46}}>
    <div id="tv-ticker-container" className="tradingview-widget-container"><div className="tradingview-widget-container__widget"></div></div>
  </div>
}

function TradingViewMiniCharts(){
  const charts=[
    {sym:"TVC:UKOIL",title:"Brent Crude"},
    {sym:"COMEX:GC1!",title:"Gold"},
    {sym:"FOREXCOM:SPXUSD",title:"S&P 500"},
    {sym:"TVC:VIX",title:"VIX Fear Index"},
  ];
  return <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
    {charts.map((ch,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
      <iframe
        src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en&symbol=${encodeURIComponent(ch.sym)}&dateRange=1M&colorTheme=dark&isTransparent=true&autosize=true&largeChartUrl=`}
        style={{width:"100%",height:180,border:"none"}}
        title={ch.title}
        loading="lazy"
      />
    </div>)}
  </div>
}

function LiveMarketsPanel(){
  return <div style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`2px solid ${C.gold}`,borderRadius:8,padding:"14px 18px"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <div style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulse 1.5s infinite"}}/>
      <span style={{color:C.gold,fontSize:12,fontWeight:700}}>LIVE MARKETS</span>
      <span style={{color:C.muted,fontSize:9}}>Real-time via TradingView</span>
    </div>
    <TradingViewMiniCharts/>
  </div>
}

// ═══════════════════════════════
// DASHBOARD CARDS
// ═══════════════════════════════
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

// ═══════════════════════════════
// HOME PAGE
// ═══════════════════════════════
function Home({go,tick}){
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

    {/* TICKER TAPE */}
    <TradingViewTicker/>

    {/* HERO */}
    <div style={{background:`linear-gradient(180deg,${C.cardAlt},${C.bg})`,padding:"40px 40px 30px",textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <div style={{width:12,height:12,borderRadius:"50%",background:C.red,boxShadow:`0 0 20px ${C.red}88`,animation:"pulse 2s infinite"}}/>
        <span style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:3,fontWeight:600}}>LIVE IMPARTIAL ANALYSIS</span>
        <Badge t="DAY 4" c={C.red}/><Badge t="ALL SIDES" c={C.purple}/><Badge t="3 DASHBOARDS" c={C.blue}/><Badge t="LIVE DATA" c={C.green}/>
      </div>
      <h1 style={{color:C.white,fontSize:36,fontWeight:800,margin:"0 0 8px",lineHeight:1.2}}>2026 US-Iran Conflict</h1>
      <h2 style={{color:C.muted,fontSize:18,fontWeight:400,margin:"0 0 8px"}}>Global Intelligence Platform</h2>
      <p style={{color:C.muted,fontSize:12,margin:"0 auto",maxWidth:700,lineHeight:1.7}}>
        Multi-source analysis with live market data, real-time news, and vessel tracking.
        23+ sources. Every contested fact flagged. No single narrative privileged.
      </p>
    </div>

    {/* DASHBOARD CARDS */}
    <div style={{display:"flex",gap:20,justifyContent:"center",padding:"10px 40px 24px",flexWrap:"wrap"}}>
      <DashCard title="Global Analysis" sub="12-tab dashboard: Casualties, Military, Cyber Warfare, International Response, Legal, Humanitarian, Scenarios & Outlook" color={C.blue} onClick={()=>go(1)} icon="🌍"
        tags={[["12 TABS",C.blue],["CYBER WAR",C.purple],["SCENARIOS",C.orange]]}/>
      <DashCard title="GCC & Threat Analysis" sub="GCC Crisis, Hormuz Cascade, Desalination Water Crisis, Full Probability Models with 26 statistics" color={C.orange} onClick={()=>go(2)} icon="🏗️"
        tags={[["GCC CRISIS",C.red],["WATER THREAT",C.pink],["27 SCENARIOS",C.gold]]}/>
      <DashCard title="Hormuz Vessel Tracker" sub="Global Fishing Watch API. Live AIS map, traffic collapse, dark fleet detection, stranded tanker clusters" color={C.green} onClick={()=>go(3)} icon="🚢"
        tags={[["GFW API",C.green],["LIVE MAP",C.cyan],["DARK FLEET",C.red]]}/>
    </div>

    {/* QUICK STATS */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 20px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
        {[["912+","Iran civilians killed",C.red],["2,000+","US-Israel strikes",C.blue],["9","Countries hit by Iran",C.green],["$83/bbl","Brent crude (+13%)",C.gold],["~0","Hormuz transits/day",C.orange],["90%","Kuwait: water from desal",C.purple]].map(([n,l,c],i)=>
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,borderTop:`2px solid ${c}`,padding:"10px 8px",textAlign:"center"}}>
            <div style={{color:c,fontSize:16,fontWeight:800}}>{n}</div>
            <div style={{color:C.muted,fontSize:8,marginTop:2}}>{l}</div>
          </div>
        )}
      </div>
    </div>

    {/* LIVE PANELS */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <LiveNewsFeed tick={tick}/>
      <LiveMarketsPanel/>
    </div>

    {/* SOURCES */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 20px"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px"}}>
        <h3 style={{color:C.white,fontSize:11,fontWeight:700,margin:"0 0 6px"}}>Data Sources</h3>
        <p style={{color:C.muted,fontSize:10,margin:0,lineHeight:1.7}}>Al Jazeera · BBC · CNN · CNBC · Bloomberg · Reuters · TradingView · Critical Threats · House of Commons Library · UN/IAEA/WHO · Brookings · CSIS · Chatham House · Amnesty International · HRA Iran · Chinese Foreign Ministry · Russian Foreign Ministry · Gulf Insider · MEI · EIA · Kpler · Nomura · JPMorgan · IMF · Global Fishing Watch · CloudSEK · SpecialEurasia · The Intercept · Wikipedia</p>
      </div>
    </div>

    {/* METHODOLOGY */}
    <div style={{maxWidth:900,margin:"0 auto",padding:"0 40px 30px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          [C.blue,"Multi-Perspective","US gov + critics, Iranian state + opposition, Chinese + Russian, European + multilateral"],
          [C.orange,"Contested Facts","Pentagon: Iran NOT planning to strike first. Oman: deal 'within reach.' All flagged."],
          [C.green,"Live Integration","TradingView real-time markets, RSS news feeds, GFW vessel tracking. Auto-refresh hourly."],
        ].map(([c,t,d],i)=>
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${c}`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{color:c,fontSize:11,fontWeight:700,marginBottom:4}}>{t}</div>
            <p style={{color:C.muted,fontSize:10,margin:0,lineHeight:1.5}}>{d}</p>
          </div>
        )}
      </div>
    </div>

    <div style={{textAlign:"center",padding:"16px",borderTop:`1px solid ${C.border}`}}>
      <p style={{color:C.muted,fontSize:10,margin:0}}>Updated March 4, 2026 | Day 4 | 3 Dashboards | Live Data | 23+ Sources</p>
    </div>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
  </div>
}

// ═══════════════════════════════
// TOP NAV
// ═══════════════════════════════
function TopNav({page,go}){
  return <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:0,overflowX:"auto",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    {[["🏠","Home",0],["🌍","Global Analysis",1],["🏗️","GCC & Threats",2],["🚢","Vessel Tracker",3]].map(([ic,lb,pg])=>
      <button key={pg} onClick={()=>go(pg)} style={{background:page===pg?C.bg:"transparent",color:page===pg?C.white:C.muted,border:"none",borderBottom:page===pg?`2px solid ${C.red}`:"2px solid transparent",padding:"10px 14px",fontSize:11,fontWeight:page===pg?700:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:13}}>{ic}</span>{lb}
      </button>
    )}
  </div>
}

// ═══════════════════════════════
// MAIN APP
// ═══════════════════════════════
export default function App(){
  const [page,setPage]=useState(0);
  const {tick,lastUpdate,countdown,refresh}=useAutoRefresh(REFRESH_MS);

  if(page===0) return <>
    <RefreshBar lastUpdate={lastUpdate} countdown={countdown} refresh={refresh}/>
    <Home go={setPage} tick={tick}/>
  </>;

  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Inter',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <RefreshBar lastUpdate={lastUpdate} countdown={countdown} refresh={refresh}/>
    <TopNav page={page} go={setPage}/>
    {page===1 && <OriginalDashboard key={tick}/>}
    {page===2 && <GlobalDashboard key={tick}/>}
    {page===3 && <HormuzTracker key={tick}/>}
  </div>
}
