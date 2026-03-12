// main.js - 公共小组数据逻辑

// 加载 JSON 数据（学生端使用）
function fetchGroupsJSON(url, callback){
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(callback) callback(data);
    })
    .catch(err=>{
      console.error("加载 groups.json 失败:", err);
      if(callback) callback([]);
    });
}

// 教师端渲染小组列表
function renderTeacherGroups(groups, containerEl){
  containerEl.innerHTML = '';
  groups.forEach((g, idx)=>{
    const li = document.createElement('li');
    li.textContent = g.name + ' ';
    const btn = document.createElement('button');
    btn.textContent = '删除';
    btn.onclick = ()=>{ groups.splice(idx,1); renderTeacherGroups(groups, containerEl); };
    li.appendChild(btn);
    containerEl.appendChild(li);
  });
}

// 教师端添加新小组
function addGroup(groups, name, containerEl){
  if(name && name.trim() !== ''){
    groups.push({id:groups.length+1, name:name.trim()});
    renderTeacherGroups(groups, containerEl);
  }
}
