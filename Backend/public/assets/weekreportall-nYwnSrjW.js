import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as m}from"./fetch-CGUiTqyx.js";import{c as l}from"./convertDay-qbsODVBg.js";window.addEventListener("load",async c=>{c.preventDefault();try{const n="http://127.0.0.1:3000/api/reports/available-weeks",d={method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}},r=await m(n,d);if(r&&r.length>0){const o=document.querySelector(".weeks");r.forEach(e=>{const t=document.createElement("li");t.classList.add("week"),t.textContent=`Viikko ${e.week_number}`;const i=document.createElement("div");i.classList.add("date");const p=l(e.week_start_date),k=l(e.week_end_date);i.textContent=`${p} - ${k}`;const s=document.createElement("div");s.classList.add("reports");const a=document.createElement("a");a.href=`weekReport.html?week=${e.week_number}`,a.addEventListener("click",function(h){localStorage.setItem("selectedReportId",e.report_id)}),a.textContent="Näytä raportti",s.appendChild(a),t.appendChild(i),t.appendChild(s),o.appendChild(t)})}else{const o=document.querySelector(".weeks");o.style.whiteSpace="pre-line",o.textContent=`Viikkoraportit ovat erinomainen tapa seurata omaa hyvinvointia ja tarkastella kuluneita viikkoja kokonaisuutena.
Tällä hetkellä sivu on tyhjä, koska sinulla ei ole menneiltä viikoilta päiväkirjamerkintöjä. Uusi raportti generoituu aina viikon vaihtuessa.`}}catch(n){console.error("Error fetching report:",n)}});
