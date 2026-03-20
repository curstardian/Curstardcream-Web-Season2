const channelListEl = document.getElementById('channel-list');
const channelTitleEl = document.getElementById('channel-title');
const messagesContainer = document.getElementById('messages-container');
const themeToggle = document.getElementById('theme-toggle');

let channelsData = [];

// JSON 불러오기
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    channelsData = data.channels;
    renderSidebar();
    if(channelsData.length) renderChannel(channelsData[0].id);
  });

function renderSidebar() {
  channelListEl.innerHTML = '';
  channelsData.forEach(ch => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = ch.name;
    btn.setAttribute('data-type', ch.type);
    btn.onclick = () => {
      setActiveButton(btn);
      renderChannel(ch.id);
    };
    li.appendChild(btn);
    channelListEl.appendChild(li);
  });
}

// active 버튼 스타일 처리
function setActiveButton(activeBtn) {
  const buttons = channelListEl.querySelectorAll('button');
  buttons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

function renderChannel(id) {
  const ch = channelsData.find(c => c.id === id);
  if(!ch) return;

  channelTitleEl.textContent = ch.name;
  messagesContainer.innerHTML = '';

  if(ch.type === 'message') {
    ch.messages.forEach(m => {
      const div = document.createElement('div');
      div.className = 'message';
      div.innerHTML = `<span class="author">${m.author}:</span> ${m.content}`;
      messagesContainer.appendChild(div);
    });
  } else if(ch.type === 'forum') {
    ch.posts.forEach(p => {
      const div = document.createElement('div');
      div.className = 'forum-post';
      div.innerHTML = `<h4>${p.title}</h4><span class="author">${p.author}</span><p>${p.content}</p>`;
      messagesContainer.appendChild(div);
    });
  } else if(ch.type === 'announcement') {
    ch.announcements.forEach(a => {
      const div = document.createElement('div');
      div.className = 'announcement';
      div.innerHTML = `<h4>${a.title}</h4><p>${a.content}</p>`;
      messagesContainer.appendChild(div);
    });
  }
}

// 다크/라이트 토글
themeToggle.onclick = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute(
    'data-theme',
    currentTheme === 'light' ? 'dark' : 'light'
  );
};