(()=>{const e=document.querySelector("#nameForm"),t=document.querySelector("#userForm"),n=document.querySelector("#content"),o=e=>{e.text().then((t=>{const o={200:"Success",201:"Created",204:"Updated (no content)",400:"Bad Request",404:"Not Found"};e.status>299&&console.log(t),n.innerHTML="";const a=document.createElement("h1"),s=document.createElement("p");if(a.textContent=o[e.status]||o[404],t.length>0)try{const e=JSON.parse(t);e.message?s.textContent=`Message: ${e.message}`:s.textContent=t}catch{s.textContent=t}n.appendChild(a),n.appendChild(s)}))},a=e=>{const t=e.querySelector("#urlField").value,n=e.querySelector("#methodSelect").value;fetch(t,{method:n,headers:{"Content-Type":"application/json"}}).then(o)},s=e=>{const t=e.querySelector("#nameField").value,n=Number(e.querySelector("#ageField").value),a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,age:n})};fetch("addUsers",a).then(o)};(()=>{const n=e=>t=>(t.preventDefault(),e(t.target),!0);e.addEventListener("submit",n(s)),t.addEventListener("submit",n(a))})()})();