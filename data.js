
if(!localStorage.groups){

localStorage.groups=JSON.stringify([
{name:"第一组",open:true,scores:[]},
{name:"第二组",open:true,scores:[]}
])

}

function getGroups(){

return JSON.parse(localStorage.groups)

}

function saveGroups(g){

localStorage.groups=JSON.stringify(g)

}

function loadGroups(){

let groups=getGroups()

let select=document.getElementById("group")

select.innerHTML=""

groups.forEach((g,i)=>{

if(g.open){

let option=document.createElement("option")

option.value=i

option.text=g.name

select.appendChild(option)

}

})

}

function saveScore(group,score){

let groups=getGroups()

groups[group].scores.push(score)

saveGroups(groups)

}

function renderAdmin(){

let table=document.getElementById("table")

let groups=getGroups()

groups.forEach((g,i)=>{

let row=table.insertRow()

let avg=0

if(g.scores.length>0){

let sum=0

g.scores.forEach(s=>{

sum+=s.c1+s.c2+s.c3+s.c4

})

avg=(sum/g.scores.length).toFixed(1)

}

row.innerHTML=

`<td contenteditable onblur="editName(${i},this.innerText)">${g.name}</td>
<td><button onclick="toggle(${i})">${g.open?"关闭":"开放"}</button></td>
<td>${avg}</td>`

})

}

function toggle(i){

let g=getGroups()

g[i].open=!g[i].open

saveGroups(g)

location.reload()

}

function editName(i,name){

let g=getGroups()

g[i].name=name

saveGroups(g)

}

function addGroup(){

let g=getGroups()

g.push({name:"新小组",open:true,scores:[]})

saveGroups(g)

location.reload()

}
