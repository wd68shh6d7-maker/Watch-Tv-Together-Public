import './style.css';

const services = [
  { name: 'Pluto TV', url: 'https://pluto.tv/us/watch/live-tv/', mark: 'PTV', free: true,
    guide: ['Featured','Movies','Star Trek','Comedy','Classic TV','Western','Sci-Fi','Drama','True Crime','Reality','News'] },
  { name: 'Tubi', url: 'https://tubitv.com/live', mark: 'T', free: true,
    guide: ['ABC News Live','NBC News NOW','LiveNOW from FOX','NFL Channel','FOX Sports on Tubi','NHL','PGA TOUR','Grit Xtra','BUZZR','Game Show Central','The Carol Burnett Show','Baywatch','Bob Ross','Top Gear','Travel + Adventure'] },
  { name: 'Plex Free TV', url: 'https://www.plex.tv/watch-free-tv/', mark: 'PX', free: true,
    guide: ['Live TV','News','Sports','Movies','Comedy','Crime','Drama','Kids & Family','Lifestyle','Reality','Sci-Fi','True Crime'] },
  { name: 'The Roku Channel', url: 'https://therokuchannel.roku.com/browse/free-movies-and-tv', mark: 'R', free: true,
    guide: ['Live TV','News','Sports','Movies','Comedy','Crime','Drama','Kids & Family','Lifestyle','Reality','Game Shows'] },
  { name: 'Prime Video', url: 'https://www.primevideo.com/', mark: 'P', guide: ['Prime Video'] },
  { name: 'Paramount+', url: 'https://www.paramountplus.com/', mark: 'P+', guide: ['Live TV','CBS','News','Sports','Shows','Movies'] },
  { name: 'discovery+', url: 'https://www.discoveryplus.com/', mark: 'D+', guide: ['Live','Discovery','HGTV','Food Network','TLC','Animal Planet','Travel Channel'] }
];

document.querySelector('#app').innerHTML = `
<main class="shell">
  <header class="topbar">
    <div class="brand"><span class="brand-mark">▶</span><div><span class="eyebrow">WATCH TOGETHER</span><h1>Watch together. Anywhere.</h1></div></div>
    <div class="top-actions"><span id="userBadge" class="pill">Guest</span><button class="secondary" id="create">Create room</button></div>
  </header>

  <section class="hero card">
    <div class="hero-art" aria-hidden="true">
      <div class="screen screen-a"><span>TONIGHT</span><b>Movie Night</b></div>
      <div class="screen screen-b"><span>TOGETHER</span><b>Press Play</b></div>
      <div class="screen screen-c"><span>ROOM 7K2P</span><b>Everyone's here</b></div>
      <div class="play-orb">▶</div>
    </div>
    <div class="hero-copy">
      <span class="eyebrow">PRIVATE WATCH ROOMS</span>
      <h2>Make movie night feel like everyone is in the room.</h2>
      <p class="muted">Create a room, invite your people, pick a service, and jump through its guide with a few taps.</p>
      <div class="login-row"><input id="name" maxlength="24" placeholder="Your name" aria-label="Your name"><button id="saveName">Continue</button></div>
      <div class="room-actions"><input id="room" maxlength="8" placeholder="Room code" aria-label="Room code"><button id="join">Join room</button></div>
      <p id="status" class="status" aria-live="polite"></p>
    </div>
  </section>

  <section>
    <div class="section-head"><h2>Free TV</h2><span class="muted">No subscription required</span></div>
    <div class="services" id="freeServices"></div>
  </section>

  <section>
    <div class="section-head"><h2>Subscription services</h2><span class="muted">Use your own account</span></div>
    <div class="services" id="paidServices"></div>
  </section>

  <section class="guide card" id="guide">
    <div class="section-head"><h2>Channel guide</h2><span id="guideService" class="pill">Choose a service</span></div>
    <div class="guide-tabs" id="guideTabs"></div>
    <div class="guide-tools"><input id="channelSearch" placeholder="Search channels or categories" aria-label="Search channels or categories"><button id="openGuide">Open service</button></div>
    <div class="channel-list" id="channelList"></div>
    <div class="channel-nav"><button id="prevChannel" class="secondary">‹ Previous</button><strong id="selectedChannel">Select a channel</strong><button id="nextChannel" class="secondary">Next ›</button></div>
    <p class="muted small">Choose a channel here, then tap Open to continue in the provider's own player. Watch Together does not bypass provider login, subscriptions, DRM, or channel restrictions.</p>
  </section>

  <section class="card">
    <div class="section-head"><h2>Room controls</h2><span id="roomLabel" class="pill">No room</span></div>
    <div class="controls"><button data-control="play">▶ Play</button><button data-control="pause">Ⅱ Pause</button><button data-control="back">↶ 10 sec</button><button data-control="forward">10 sec ↷</button></div>
    <p class="muted small">Playback commands are prepared for room coordination. Direct control of a streaming provider will only be used where that provider officially permits it.</p>
  </section>

  <section class="card" id="together">
    <div class="section-head"><h2>Chat & call</h2><span id="connectionPill" class="pill">Not connected</span></div>
    <div class="people" id="people"></div>
    <div class="media-stage">
      <div class="video-tile"><video id="remoteVideo" autoplay playsinline></video><span>Room video</span></div>
      <div class="video-tile local"><video id="localVideo" autoplay playsinline muted></video><span>You</span></div>
    </div>
    <div class="call-controls">
      <button id="voiceCall" class="secondary">🎙 Voice</button>
      <button id="videoCall">📹 Video</button>
      <button id="muteCall" class="secondary" disabled>Mute</button>
      <button id="cameraCall" class="secondary" disabled>Camera off</button>
    </div>
    <div class="chat-box">
      <div id="chatMessages" class="chat-messages" aria-live="polite"></div>
      <div class="chat-compose"><input id="chatInput" maxlength="500" placeholder="Message the room…" aria-label="Message the room"><button id="sendChat">Send</button></div>
    </div>
    <p class="muted small">Text chat uses the shared room. Voice and video use direct browser-to-browser WebRTC when your network allows it; Watch Together does not record calls.</p>
  </section>

  <section class="sponsor"><span>Sponsored support</span><strong>Discreet sponsor space — never blocks your screen.</strong></section>
  <footer>Watch Together · Built for simple, shared movie nights</footer>
</main>`;

function renderServices(target, items) {
  const root = document.querySelector(target);
  items.forEach(s => {
    const c = document.createElement('article');
    c.className = 'service card';
    c.innerHTML = `<div class="service-info"><span class="service-logo">${s.mark}</span><div><h3>${s.name}</h3><p class="muted">${s.free ? 'Free streaming' : 'Use your account'}</p></div></div><button class="open guide-button">Guide</button>`;
    c.querySelector('.guide-button').onclick = () => selectService(s.name);
    root.appendChild(c);
  });
}
renderServices('#freeServices', services.filter(s => s.free));
renderServices('#paidServices', services.filter(s => !s.free));

const status = document.querySelector('#status'), label = document.querySelector('#roomLabel'), input = document.querySelector('#room'), nameInput = document.querySelector('#name'), badge = document.querySelector('#userBadge');
const guideService = document.querySelector('#guideService'), guideTabs = document.querySelector('#guideTabs'), channelSearch = document.querySelector('#channelSearch'), channelList = document.querySelector('#channelList'), selectedChannel = document.querySelector('#selectedChannel');
let activeService = services[0], filteredChannels = [...activeService.guide], selectedIndex = 0;

const savedName = localStorage.getItem('watchTogetherName');
if (savedName) { nameInput.value = savedName; badge.textContent = savedName; }

document.querySelector('#saveName').onclick = () => {
  const name = nameInput.value.trim().replace(/[^a-zA-Z0-9 _-]/g, '').slice(0, 24);
  if (!name) { status.textContent = 'Enter a name first.'; return; }
  localStorage.setItem('watchTogetherName', name); badge.textContent = name; status.textContent = `Welcome, ${name}. Create a room or join one below.`;
};

let roomSocket = null;
let myPeerId = null;
const peers = new Map();
const people = document.querySelector('#people');
const connectionPill = document.querySelector('#connectionPill');
const chatMessages = document.querySelector('#chatMessages');
const chatInput = document.querySelector('#chatInput');
const localVideo = document.querySelector('#localVideo');
const remoteVideo = document.querySelector('#remoteVideo');
let localStream = null;
let callMode = null;
let muted = false;
let cameraOff = false;

function addChat(name, text, mine = false) {
  const row = document.createElement('div');
  row.className = `chat-line${mine ? ' mine' : ''}`;
  row.innerHTML = `<strong></strong><span></span>`;
  row.querySelector('strong').textContent = name;
  row.querySelector('span').textContent = text;
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderPeople() {
  if (!roomSocket) { people.innerHTML = ''; return; }
  const names = [{ id: myPeerId, name: badge.textContent || 'You' }, ...[...peers.values()].map(p => ({id:p.id,name:p.name}))];
  people.innerHTML = names.map((p,i) => `<span class="person">${i===0?'●':'○'} ${p.name}</span>`).join('');
}

function signal(to, payload) {
  if (roomSocket?.readyState === WebSocket.OPEN) roomSocket.send(JSON.stringify({type:'signal',to,signal:payload}));
}

function createPeer(peerId, offerer) {
  if (peers.get(peerId)?.pc) return peers.get(peerId).pc;
  const peer = peers.get(peerId) || {id:peerId,name:'Guest',pc:null};
  const pc = new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
  peer.pc = pc;
  peers.set(peerId, peer);
  if (localStream) localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
  pc.onicecandidate = e => { if (e.candidate) signal(peerId,{type:'ice',candidate:e.candidate}); };
  pc.ontrack = e => { remoteVideo.srcObject = e.streams[0]; };
  pc.onconnectionstatechange = () => {
    if (['failed','closed','disconnected'].includes(pc.connectionState)) {
      pc.close(); peer.pc=null;
    }
  };
  if (offerer) {
    pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => signal(peerId,{type:'offer',sdp:pc.localDescription}));
  }
  return pc;
}

async function startCall(mode) {
  if (!roomSocket || roomSocket.readyState !== WebSocket.OPEN) {
    status.textContent = 'Join a room first so your call has someone to connect to.';
    document.querySelector('#together').scrollIntoView({behavior:'smooth'});
    return;
  }
  callMode = mode;
  try {
    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({audio:true,video:mode==='video'});
      localVideo.srcObject = localStream;
    }
    document.querySelector('#muteCall').disabled = false;
    document.querySelector('#cameraCall').disabled = mode !== 'video';
    for (const peer of peers.values()) createPeer(peer.id, true);
    status.textContent = `${mode === 'video' ? 'Video' : 'Voice'} call ready for the room.`;
  } catch (e) {
    status.textContent = 'Your browser did not allow microphone/camera access.';
  }
}

async function handleSignal(from, data) {
  const pc = createPeer(from, false);
  if (data.type === 'offer') {
    await pc.setRemoteDescription(data.sdp);
    if (localStream) localStream.getTracks().forEach(track => {
      if (!pc.getSenders().some(s => s.track === track)) pc.addTrack(track, localStream);
    });
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    signal(from,{type:'answer',sdp:pc.localDescription});
  } else if (data.type === 'answer') {
    await pc.setRemoteDescription(data.sdp);
  } else if (data.type === 'ice' && data.candidate) {
    try { await pc.addIceCandidate(data.candidate); } catch {}
  }
}

function connectRoom(code) {
  const n = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  if (!n) { status.textContent = 'Enter a room code.'; return; }
  if (roomSocket) roomSocket.close();
  label.textContent = n;
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  roomSocket = new WebSocket(`${proto}//${location.host}/api/room/${n}`);
  connectionPill.textContent = 'Connecting…';
  roomSocket.onopen = () => {
    connectionPill.textContent = 'Connected';
    roomSocket.send(JSON.stringify({type:'hello',name:badge.textContent === 'Guest' ? 'Guest' : badge.textContent}));
    status.textContent = `Connected to room ${n}.`;
  };
  roomSocket.onmessage = async event => {
    let data; try { data = JSON.parse(event.data); } catch { return; }
    if (data.type === 'ready') {
      myPeerId = data.id;
      data.peers.forEach(p => peers.set(p.id,{id:p.id,name:p.name,pc:null}));
      renderPeople();
      if (callMode) for (const peer of peers.values()) createPeer(peer.id,true);
    } else if (data.type === 'peer-joined') {
      peers.set(data.peer.id,{id:data.peer.id,name:data.peer.name,pc:null});
      renderPeople();
      addChat('Watch Together', `${data.peer.name} joined the room.`);
      if (callMode) createPeer(data.peer.id,true);
    } else if (data.type === 'peer-left') {
      const peer=peers.get(data.id); if (peer?.pc) peer.pc.close();
      peers.delete(data.id); renderPeople(); addChat('Watch Together','Someone left the room.');
    } else if (data.type === 'chat') {
      addChat(data.name,data.text,data.from===myPeerId);
    } else if (data.type === 'signal') {
      const p=peers.get(data.from) || {id:data.from,name:data.name||'Guest',pc:null};
      p.name=data.name||p.name; peers.set(data.from,p); renderPeople();
      try { await handleSignal(data.from,data.signal); } catch {}
    } else if (data.type === 'room-control') {
      status.textContent = `Room: ${data.control}`;
    }
  };
  roomSocket.onclose = () => { connectionPill.textContent = 'Disconnected'; };
  roomSocket.onerror = () => { connectionPill.textContent = 'Connection problem'; status.textContent = 'This room could not connect. Try the room code again.'; };
}

function setRoom(code) {
  const n = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  if (!n) { status.textContent = 'Enter a room code.'; return; }
  connectRoom(n);
}
document.querySelector('#create').onclick = () => setRoom(Math.random().toString(36).slice(2, 8));
document.querySelector('#join').onclick = () => setRoom(input.value);
input.onkeydown = e => { if (e.key === 'Enter') setRoom(input.value); };

document.querySelector('#sendChat').onclick = () => {
  const text = chatInput.value.trim();
  if (!text) return;
  if (roomSocket?.readyState !== WebSocket.OPEN) { status.textContent = 'Join a room before sending chat.'; return; }
  roomSocket.send(JSON.stringify({type:'chat',text}));
  chatInput.value='';
};
chatInput.onkeydown = e => { if (e.key === 'Enter') document.querySelector('#sendChat').click(); };
document.querySelector('#voiceCall').onclick = () => startCall('voice');
document.querySelector('#videoCall').onclick = () => startCall('video');
document.querySelector('#muteCall').onclick = () => {
  if (!localStream) return;
  muted = !muted; localStream.getAudioTracks().forEach(t=>t.enabled=!muted);
  document.querySelector('#muteCall').textContent = muted ? 'Unmute' : 'Mute';
};
document.querySelector('#cameraCall').onclick = () => {
  if (!localStream) return;
  cameraOff = !cameraOff; localStream.getVideoTracks().forEach(t=>t.enabled=!cameraOff);
  document.querySelector('#cameraCall').textContent = cameraOff ? 'Camera on' : 'Camera off';
};

function selectService(name) {
  activeService = services.find(s => s.name === name) || services[0];
  filteredChannels = [...activeService.guide];
  selectedIndex = 0;
  guideService.textContent = activeService.name;
  channelSearch.value = '';
  renderGuideTabs();
  renderChannels();
  document.querySelector('#guide').scrollIntoView({behavior:'smooth', block:'start'});
}
function renderGuideTabs() {
  guideTabs.innerHTML = services.map(s => `<button class="guide-tab ${s.name===activeService.name?'active':''}" data-service="${s.name}">${s.mark} ${s.name}</button>`).join('');
  guideTabs.querySelectorAll('button').forEach(b => b.onclick = () => selectService(b.dataset.service));
}
function renderChannels() {
  if (!filteredChannels.length) {
    channelList.innerHTML = '<div class="empty-guide">No matching channels. Try another search.</div>';
    selectedChannel.textContent = 'No channel selected';
    return;
  }
  if (selectedIndex >= filteredChannels.length) selectedIndex = filteredChannels.length - 1;
  channelList.innerHTML = filteredChannels.map((c,i) => `<button class="channel-row ${i===selectedIndex?'selected':''}" data-index="${i}"><span class="channel-number">${String(i+1).padStart(2,'0')}</span><span>${c}</span><span class="channel-arrow">›</span></button>`).join('');
  channelList.querySelectorAll('.channel-row').forEach(b => b.onclick = () => { selectedIndex = Number(b.dataset.index); renderChannels(); });
  selectedChannel.textContent = filteredChannels[selectedIndex];
}
channelSearch.oninput = () => {
  const q = channelSearch.value.trim().toLowerCase();
  filteredChannels = activeService.guide.filter(c => c.toLowerCase().includes(q));
  selectedIndex = 0;
  renderChannels();
};
document.querySelector('#prevChannel').onclick = () => { if (!filteredChannels.length) return; selectedIndex = (selectedIndex - 1 + filteredChannels.length) % filteredChannels.length; renderChannels(); };
document.querySelector('#nextChannel').onclick = () => { if (!filteredChannels.length) return; selectedIndex = (selectedIndex + 1) % filteredChannels.length; renderChannels(); };
document.querySelector('#openGuide').onclick = () => { window.open(activeService.url, '_blank', 'noopener,noreferrer'); status.textContent = `${activeService.name}: opening the provider's guide/player.`; };

document.querySelectorAll('[data-control]').forEach(b => b.onclick = () => status.textContent = `${b.textContent.trim()} requested for room ${label.textContent}.`);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
selectService(activeService.name);
