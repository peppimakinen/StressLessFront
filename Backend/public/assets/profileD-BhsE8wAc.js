import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as n}from"./snackbar-BNtgsuzo.js";function r(){const e=localStorage.getItem("user_name"),t=document.getElementById("name");t.textContent=e||"No name available",console.log(t);const o=localStorage.getItem("user_email"),a=document.getElementById("email");a.textContent=o||"No email available"}document.getElementById("changePasswordLink").addEventListener("click",function(e){e.preventDefault(),document.getElementById("passwordModal").style.display="block"});document.querySelector(".close").addEventListener("click",function(){document.getElementById("passwordModal").style.display="none"});document.getElementById("passwordForm").addEventListener("submit",async function(e){e.preventDefault();const t=document.getElementById("newPassword").value,o="https://hyte-server-aleksi.northeurope.cloudapp.azure.com/api/users/doctor/change-password",l={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({new_password:t})};try{if((await fetch(o,l)).ok)n("Green","Salasana vaihdettu onnistuneesti"),document.getElementById("passwordModal").style.display="none";else throw new Error("Salasanan vaihto epäonnistui")}catch(s){n("Red","Salasanan vaihto epäonnistui"),console.log(s.message)}});document.querySelector(".pic a").addEventListener("click",function(e){e.preventDefault(),document.getElementById("deleteModal").style.display="block"});document.querySelector(".close2").addEventListener("click",function(){document.getElementById("deleteModal").style.display="none"});document.getElementById("confirmDeletion").addEventListener("click",async function(){if(document.getElementById("deleteConfirm").value==="Poista tili")try{if((await fetch("https://hyte-server-aleksi.northeurope.cloudapp.azure.com/api/users",{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).ok)n("Green","Tili poistettu onnistuneesti"),setTimeout(()=>{window.location.href="../login/logindoctor.html"},3e3);else throw new Error("Failed to delete account")}catch(t){n("Red",t.message)}else n("Red","Poistaminen epäonnistui: väärä teksti");document.getElementById("deleteModal").style.display="none"});r();
