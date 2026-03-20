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
    li.textContent = ch.name;
    li.onclick = () => renderChannel(ch.id);
    channelListEl.appendChild(li);
  });
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
  if(document.documentElement.getAttribute('data-theme') === 'light'){
    document.documentElement.setAttribute('data-theme','dark');
  } else {
    document.documentElement.setAttribute('data-theme','light');
  }
};