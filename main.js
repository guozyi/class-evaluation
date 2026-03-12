// main.js

// 获取下拉元素和输入框
const groupSelect = document.getElementById('groupSelect');
const scoreInput = document.getElementById('scoreInput');
const submitBtn = document.getElementById('submitBtn');

// ----------------------
// 1️⃣ 自动获取教师端最新小组列表
// ----------------------
// CDN URL 指向 GitHub 仓库的 groups.json
// ?ts= 时间戳防止 CDN 缓存
const groupsUrl = 'https://cdn.jsdelivr.net/gh/guozyi/class-evaluation/groups.json?ts=' + Date.now();

fetch(groupsUrl)
  .then(res => res.json())
  .then(data => {
    groupSelect.innerHTML = ''; // 清空原来的选项
    data.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g.id;       // 小组 id
      opt.textContent = g.name; // 小组名称
      groupSelect.appendChild(opt);
    });
  })
  .catch(err => {
    console.error('加载小组失败', err);
    groupSelect.innerHTML = '<option>加载失败</option>';
  });

// ----------------------
// 2️⃣ 提交评分 → 生成 JSON 文件
// ----------------------
submitBtn.onclick = () => {
  const groupId = groupSelect.value;
  const score = scoreInput.value.trim();

  if (!groupId || !score) {
    alert('请填写小组和评分');
    return;
  }

  // 生成学生提交的 JSON 对象
  const submission = {
    groupId: groupId,
    score: Number(score),
    time: new Date().toISOString()
  };

  // 生成 Blob 并下载 JSON 文件
  const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `submission_group${groupId}_${Date.now()}.json`; // 文件名包含小组和时间戳
  a.click();
  URL.revokeObjectURL(url);

  alert('已生成 JSON 文件，请发送给教师汇总');
  
  // 清空评分输入框，方便下一个提交
  scoreInput.value = '';
};
