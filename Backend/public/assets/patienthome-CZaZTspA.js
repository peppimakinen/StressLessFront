import"./modulepreload-polyfill-B5Qt9EMX.js";import{c as h,a as _,h as x,g as A,b as w,r as C}from"./checkdata-2EjErbRn.js";import{s as v}from"./snackbar-BNtgsuzo.js";import"./fetch-CGUiTqyx.js";async function M(t,o={}){try{const e=await fetch("http://127.0.0.1:3000/api/entries",o);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const n=await e.json();return console.log("Response data:",n),n}catch(e){console.error("Error:",e)}}async function T(t,o){M(t,o).then(e=>{console.log("Response data:",e)}).catch(e=>{console.error("Error:",e)})}const P=document.querySelectorAll(".moodBtn");P.forEach(t=>{t.addEventListener("click",()=>{P.forEach(o=>{o.classList.remove("selected")}),t.classList.add("selected")})});function R(t){switch(t){case"redBtn":return"FF8585";case"yellowBtn":return"FFF67E";case"greenBtn":return"9BCF53";default:return""}}async function b(){const o=document.querySelector(".FormPopupNew .EntryHeading").textContent,e=h(o);console.log(e);let n="";P.forEach(E=>{E.classList.contains("selected")&&(n=R(E.id)),E.classList.remove("selected")});const s=document.getElementById("ActivitiesNew"),r=s.selectedIndex,u=[s.options[r].value],l=document.querySelector(".notesNew input").value,d=localStorage.getItem("token");if(console.log(d),!d){console.error("Token not found in local storage");return}const g={entry_date:e,mood_color:n,activities:u,notes:l};console.log(g);const y={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+d},body:JSON.stringify(g)};try{await T("http://127.0.0.1:3000/api/entries",y)}catch(E){console.error("Error submitting new entry:",E)}}async function O(t,o={}){try{const e=await fetch("http://127.0.0.1:3000/api/entries",o);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const n=await e.json();return console.log("Response data:",n),n}catch(e){console.error("Error:",e)}}async function Y(t,o){O(t,o).then(e=>{console.log("Response data:",e)}).catch(e=>{console.error("Error:",e)})}const k=document.querySelectorAll(".moodBtn");k.forEach(t=>{t.addEventListener("click",()=>{k.forEach(o=>{o.classList.remove("selected")}),t.classList.add("selected")})});function $(t){switch(t){case"redBtn":return"FF8585";case"yellowBtn":return"FFF67E";case"greenBtn":return"9BCF53";default:return""}}async function j(){const t=document.querySelector(".FormPopupEdit .EntryHeading"),o=h(t.textContent);let e="";k.forEach(y=>{y.classList.contains("selected")&&(e=$(y.id)),y.classList.remove("selected")});const n=document.getElementById("ActivitiesEdit"),s=n.selectedIndex,a=[n.options[s].value],u=document.querySelector(".notesEdit input").value,l=localStorage.getItem("token");if(!l){console.error("Token not found in local storage");return}const d={entry_date:o,mood_color:e,activities:a,notes:u};console.log(d);const g={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+l},body:JSON.stringify(d)};try{await Y("http://127.0.0.1:3000/api/entries",g)}catch(y){console.error("Error submitting entry edits:",y)}}async function V(){try{const t=localStorage.getItem("token");if(!t)throw new Error("Bearer token missing");const o={Authorization:`Bearer ${t}`},e=await fetch("http://127.0.0.1:3000/api/survey/activities",{headers:o});if(!e.ok)throw new Error("Failed to fetch activities");return await e.json()}catch(t){return console.error(t),[]}}async function I(t){const o=document.getElementById(t);o.innerHTML="";try{const e=await V();if(!e.hasOwnProperty("activities"))throw new Error("Activities data not found in response");const n=e.activities;if(!Array.isArray(n))throw new Error("Activities data is not an array");const s=document.createElement("option");if(s.value="",s.textContent="Valitse...",o.appendChild(s),n.length>0)n.forEach(r=>{const a=document.createElement("option");a.value=r,a.textContent=r,o.appendChild(a)});else{const r=document.createElement("option");r.value="",r.textContent="No activities available",o.appendChild(r)}}catch(e){console.error(e)}}const q=document.querySelector(".FormPopupNew"),F=document.querySelector(".PopupPastEntry"),L=document.querySelector(".FormPopupEdit"),H=document.querySelector(".InfoPopup"),S=document.querySelector(".calendarBackground"),D=document.getElementById("overlay");let m="";async function z(t){m=t;const o=h(m);console.log(o);try{await _(o)?(q.style.display="flex",S.style.display="none",D.style.display="block",document.querySelectorAll(".FormPopupNew .EntryHeading").forEach(n=>{n.textContent=m}),I("ActivitiesNew")):v("Red","HRV dataa ei löytynyt.")}catch(e){console.error("Error checking HRV data:",e),v("Red","HRV dataa ei löytynyt.")}}async function G(t,o){m=t;const e=h(m);console.log(e);try{const n=x(o,e);if(console.log("Has entry for date:",n),n){const s=await A(e);document.querySelectorAll(".PopupPastEntry .EntryHeading").forEach(a=>{a.textContent=m}),document.querySelector(".PopupPastEntry .hrv #sns").textContent="SNS-indeksi: "+s.measurement_data.sns_index,document.querySelector(".PopupPastEntry .hrv #pns").textContent="PNS-indeksi: "+s.measurement_data.pns_index,document.querySelector(".PopupPastEntry .hrv #stress").textContent="Stressi-indeksi: "+s.measurement_data.stress_index;const r=s.activities&&s.activities.length>0?s.activities.join(", "):"No activities";document.querySelector(".PopupPastEntry .activitiesPast p").textContent=r,document.querySelector(".PopupPastEntry .notesPast p").textContent=s.diary_entry.notes||"No notes",F.style.display="flex",S.style.display="none",D.style.display="block"}else alert("No entry found for the selected date.")}catch(n){console.error("Error fetching entry data:",n)}}function J(t){L.style.display="flex",F.style.display="none",document.querySelector(".FormPopupEdit .EntryHeading").textContent=t;const o=h(t);A(o).then(e=>{document.getElementById("NotesEdit").value=e.diary_entry.notes;const n=e.diary_entry.mood_color;document.querySelectorAll(".moodBtn").forEach(r=>{r.id===U(n)?r.classList.add("selected"):r.classList.remove("selected")}),I("ActivitiesEdit").then(()=>{const r=document.getElementById("ActivitiesEdit"),a=e.activities[0],u=[...r.options].findIndex(l=>l.value===a);r.selectedIndex=u})})}function U(t){switch(t){case"FF8585":return"redBtn";case"FFF67E":return"yellowBtn";case"9BCF53":return"greenBtn";default:return""}}function N(){H.style.display="block",D.style.display="block",S.style.display="none"}function B(){q.style.display="none",F.style.display="none",L.style.display="none",H.style.display="none",S.style.display="block",D.style.display="none"}let p=new Date,i=p.getFullYear(),c=p.getMonth();const W=document.querySelectorAll(".calendarHeader span");let f={};const K=async()=>{f=await w(i,c+1),console.log(f),C(i,c,f)},Q=async t=>{c=t.id==="prev"?c-1:c+1,c<0||c>11?(p=new Date(i,c,new Date().getDate()),i=p.getFullYear(),c=p.getMonth()):p=new Date;const o=await w(i,c+1);console.log(o),C(i,c,o)};W.forEach(t=>{t.addEventListener("click",()=>{Q(t)})});window.addEventListener("load",()=>{K(),sessionStorage.getItem("fromSurveyPage")&&(N(),sessionStorage.removeItem("fromSurveyPage"))});const X=document.querySelector(".calendar");X.addEventListener("click",async t=>{if(t.target.tagName==="LI"&&t.target.parentElement.classList.contains("days")){const o=parseInt(t.target.textContent);console.log("clicked date: "+o);const e=new Date(i,c,o);if(e>new Date||t.target.classList.contains("inactive"))return;const s=e.getDate().toString().padStart(2,"0"),r=(e.getMonth()+1).toString().padStart(2,"0"),a=`${s}.${r}.${e.getFullYear()}`;console.log("Selected date: "+a);const u=h(a);console.log("Clicked date:",u);const l=await w(i,c+1),d=x(l,u);console.log("Has entry for date:",d),d?G(a,l):z(a)}});const Z=document.querySelector(".editIcon");Z.addEventListener("click",()=>{const t=document.querySelector(".PopupPastEntry .EntryHeading");if(t){const o=t.textContent;console.log("Date extracted:",o),J(o)}else console.error("Date heading not found or empty.")});const tt=document.querySelector(".infoIcon");tt.addEventListener("click",async t=>{t.preventDefault(),console.log("clicked info!"),N()});const et=document.querySelectorAll(".closePopup");et.forEach(t=>{t.addEventListener("click",B)});const ot=document.querySelector(".submitNewEntry");ot.addEventListener("click",async t=>{t.preventDefault(),console.log("Lets create a new diary entry"),v("Green","Uusi merkintä luotu ja HRV data lisätty"),b(),B();const o=new Event("entrySubmitted");document.dispatchEvent(o)});const nt=document.querySelector(".submitEditEntry");nt.addEventListener("click",async t=>{t.preventDefault(),console.log("Let's edit the diary entry"),v("Green","Merkinnän muokkaus onnistui"),j(),B();const o=new Event("entrySubmitted");document.dispatchEvent(o)});document.addEventListener("entrySubmitted",async()=>{console.log("DOES THIS WORK?"),await new Promise(o=>setTimeout(o,1e3)),f=await w(i,c+1),C(i,c,f)});
