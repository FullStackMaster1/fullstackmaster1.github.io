import{a4 as S,W as z,aG as H,C as Z,n as q,o as J,s as K,g as Q,c as X,b as Y,_ as g,l as F,t as tt,d as et,D as rt,H as at,P as it,k as nt}from"./SystemDesignMastery-KOuuyVAP.js";import{p as ot}from"./chunk-4BX2VUAB-BWKzlU3w.js";import{p as st}from"./treemap-KMMF4GRG-Djg_oTPc.js";import{d as I}from"./arc-CbCdPDIk.js";import{o as lt}from"./ordinal-Cboi1Yqb.js";import"./index-BybNKZTr.js";import"./WhatsAppWidget-C9QjkVoD.js";import"./card-DFvBBy2P.js";import"./accordion-TWTvkXzl.js";import"./Footer-DPq_H55F.js";import"./file-text-C4xFNl2e.js";import"./phone-CP-yvHq1.js";import"./calendar-xw7E830v.js";import"./map-pin-BI2Tj0g_.js";import"./shield-nTfol1y-.js";import"./Breadcrumb-35qDQreI.js";import"./youtubeShorts-q8iA1iTN.js";import"./proxy-D6Ugx_xe.js";import"./VideoTipsCarousel-xMYV25GZ.js";import"./gift-CcK4xJyl.js";import"./lightbulb-DtCJC-9-.js";import"./layers-DMoxwsSL.js";import"./graduation-cap-Bw_thNEL.js";import"./code-hp2DCRYD.js";import"./building-CyQ9xpBf.js";import"./_baseUniq-C3r7dMGY.js";import"./_basePickBy-6gJnEfVY.js";import"./clone-CoBUJuWb.js";import"./init-Gi6I4Gst.js";function ct(t,r){return r<t?-1:r>t?1:r>=t?0:NaN}function pt(t){return t}function ut(){var t=pt,r=ct,m=null,x=S(0),o=S(z),l=S(0);function s(e){var i,c=(e=H(e)).length,p,y,h=0,u=new Array(c),n=new Array(c),v=+x.apply(this,arguments),w=Math.min(z,Math.max(-z,o.apply(this,arguments)-v)),f,C=Math.min(Math.abs(w)/c,l.apply(this,arguments)),$=C*(w<0?-1:1),d;for(i=0;i<c;++i)(d=n[u[i]=i]=+t(e[i],i,e))>0&&(h+=d);for(r!=null?u.sort(function(A,D){return r(n[A],n[D])}):m!=null&&u.sort(function(A,D){return m(e[A],e[D])}),i=0,y=h?(w-c*$)/h:0;i<c;++i,v=f)p=u[i],d=n[p],f=v+(d>0?d*y:0)+$,n[p]={data:e[p],index:i,value:d,startAngle:v,endAngle:f,padAngle:C};return n}return s.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),s):t},s.sortValues=function(e){return arguments.length?(r=e,m=null,s):r},s.sort=function(e){return arguments.length?(m=e,r=null,s):m},s.startAngle=function(e){return arguments.length?(x=typeof e=="function"?e:S(+e),s):x},s.endAngle=function(e){return arguments.length?(o=typeof e=="function"?e:S(+e),s):o},s.padAngle=function(e){return arguments.length?(l=typeof e=="function"?e:S(+e),s):l},s}var L=Z.pie,G={sections:new Map,showData:!1,config:L},T=G.sections,W=G.showData,gt=structuredClone(L),dt=g(()=>structuredClone(gt),"getConfig"),mt=g(()=>{T=new Map,W=G.showData,tt()},"clear"),ft=g(({label:t,value:r})=>{if(r<0)throw new Error(`"${t}" has invalid value: ${r}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,r),F.debug(`added new section: ${t}, with value: ${r}`))},"addSection"),ht=g(()=>T,"getSections"),vt=g(t=>{W=t},"setShowData"),St=g(()=>W,"getShowData"),_={getConfig:dt,clear:mt,setDiagramTitle:q,getDiagramTitle:J,setAccTitle:K,getAccTitle:Q,setAccDescription:X,getAccDescription:Y,addSection:ft,getSections:ht,setShowData:vt,getShowData:St},xt=g((t,r)=>{ot(t,r),r.setShowData(t.showData),t.sections.map(r.addSection)},"populateDb"),yt={parse:g(async t=>{const r=await st("pie",t);F.debug(r),xt(r,_)},"parse")},wt=g(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),At=wt,Dt=g(t=>{const r=[...t.values()].reduce((o,l)=>o+l,0),m=[...t.entries()].map(([o,l])=>({label:o,value:l})).filter(o=>o.value/r*100>=1).sort((o,l)=>l.value-o.value);return ut().value(o=>o.value)(m)},"createPieArcs"),Ct=g((t,r,m,x)=>{F.debug(`rendering pie chart
`+t);const o=x.db,l=et(),s=rt(o.getConfig(),l.pie),e=40,i=18,c=4,p=450,y=p,h=at(r),u=h.append("g");u.attr("transform","translate("+y/2+","+p/2+")");const{themeVariables:n}=l;let[v]=it(n.pieOuterStrokeWidth);v??(v=2);const w=s.textPosition,f=Math.min(y,p)/2-e,C=I().innerRadius(0).outerRadius(f),$=I().innerRadius(f*w).outerRadius(f*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const d=o.getSections(),A=Dt(d),D=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let b=0;d.forEach(a=>{b+=a});const N=A.filter(a=>(a.data.value/b*100).toFixed(0)!=="0"),k=lt(D);u.selectAll("mySlices").data(N).enter().append("path").attr("d",C).attr("fill",a=>k(a.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(N).enter().append("text").text(a=>(a.data.value/b*100).toFixed(0)+"%").attr("transform",a=>"translate("+$.centroid(a)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(p-50)/2).attr("class","pieTitleText");const P=[...d.entries()].map(([a,M])=>({label:a,value:M})),E=u.selectAll(".legend").data(P).enter().append("g").attr("class","legend").attr("transform",(a,M)=>{const R=i+c,V=R*P.length/2,U=12*i,j=M*R-V;return"translate("+U+","+j+")"});E.append("rect").attr("width",i).attr("height",i).style("fill",a=>k(a.label)).style("stroke",a=>k(a.label)),E.append("text").attr("x",i+c).attr("y",i-c).text(a=>o.getShowData()?`${a.label} [${a.value}]`:a.label);const B=Math.max(...E.selectAll("text").nodes().map(a=>(a==null?void 0:a.getBoundingClientRect().width)??0)),O=y+e+i+c+B;h.attr("viewBox",`0 0 ${O} ${p}`),nt(h,p,O,s.useMaxWidth)},"draw"),$t={draw:Ct},ee={parser:yt,db:_,renderer:$t,styles:At};export{ee as diagram};
