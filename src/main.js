import './style.css';

const services = [
  { name: 'YouTube', url: 'https://www.youtube.com/', mark: 'YT', free: true,
    guide: ['Live','Movies & TV','News','Sports','Music','Kids','Documentaries','Comedy','Science & Technology','Official Channels'] },
  { name: 'Pluto TV', url: 'https://pluto.tv/us/watch/live-tv/', mark: 'PTV', free: true,
    guide: ['Featured','Movies','Star Trek','Comedy','Classic TV','Western','Sci-Fi','Drama','True Crime','Reality','News'] },
  { name: 'Tubi', url: 'https://tubitv.com/live', mark: 'T', free: true,
    guide: ['ABC News Live','NBC News NOW','LiveNOW from FOX','NFL Channel','FOX Sports on Tubi','NHL','PGA TOUR','Grit Xtra','BUZZR','Game Show Central','The Carol Burnett Show','Baywatch','Bob Ross','Top Gear','Travel + Adventure'] },
  { name: 'Plex Free TV', url: 'https://www.plex.tv/watch-free-tv/', mark: 'PX', free: true,
    guide: ['Live TV','News','Sports','Movies','Comedy','Crime','Drama','Kids & Family','Lifestyle','Reality','Sci-Fi','True Crime'] },
  { name: 'The Roku Channel', url: 'https://therokuchannel.roku.com/browse/free-movies-and-tv', mark: 'R', free: true,
    guide: ['Live TV','News','Sports','Movies','Comedy','Crime','Drama','Kids & Family','Lifestyle','Reality','Game Shows'] },
  { name: 'Real Life Network', url: 'https://reallifenetwork.com/jack-hibbs', mark: 'RLN', free: true,
    guide: ['Live Now','Jack Hibbs','Bible Teaching','Faith & Culture','Christian News','Family & Children','Documentaries','Podcasts','On Demand'] },
  { name: 'GraceFM', url: 'https://calvaryco.church/gracefm', mark: 'GFM', free: true,
    guide: ['Listen Live 24/7','Bible Teaching','Worship','Ed Taylor','Calvary Church','Weekend Worship'] },
  { name: 'Prime Video', url: 'https://www.primevideo.com/', mark: 'P', guide: ['Prime Video'] },
  { name: 'Paramount+', url: 'https://www.paramountplus.com/', mark: 'P+', guide: ['Live TV','CBS','News','Sports','Shows','Movies'] },
  { name: 'discovery+', url: 'https://www.discoveryplus.com/', mark: 'D+', guide: ['Live','Discovery','HGTV','Food Network','TLC','Animal Planet','Travel Channel'] }
];

document.querySelector('#app').innerHTML = `
<main class="shell">
  <header class="topbar">
    <div class="brand"><span class="brand-mark">▶</span><div><span class="eyebrow">WATCH TOGETHER</span><h1>Watch together. Anywhere.</h1></div></div>
    <div class="top-actions"><span id="userBadge" class="pill">Guest</span><button class="secondary" id="shareRoom">Invite</button><button class="secondary" id="create">Create room</button></div>
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
      <p class="muted">Create your own room, invite your people, pick a service, and jump through its guide with a few taps. Every guest can create a separate room too.</p>
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
    <p class="muted small">Choose a channel here, then tap Open to continue in the provider's own player or official stream. Watch Together does not bypass provider login, subscriptions, DRM, or channel restrictions.</p>
  </section>

  <section class="card" id="together">
    <div class="section-head"><h2>Watch Together room</h2><span id="roomState" class="pill">Not connected</span></div>
    <div class="share-panel"><div><strong>Everyone can invite. Everyone can create a room.</strong><p class="muted">Use Share to send this room through Messages, Messenger, email, or your device's normal share menu. Creating another room never takes over this one.</p></div><div class="share-actions"><button id="openChat">💬 Open chat</button><button id="copyInvite" class="secondary">🔗 Copy invite</button></div></div>
    <div class="people" id="people"></div>
    <div class="media-stage"><div class="video-tile"><video id="localVideo" autoplay muted playsinline></video><span>You</span></div><div class="video-tile"><video id="remoteVideo" autoplay playsinline></video><span id="remoteLabel">Waiting for a video guest</span></div></div>
    <div class="call-controls"><button id="voiceCall">🎙️ Voice</button><button id="videoCall">📹 Video</button><button id="hangUp" class="secondary">✕ End call</button></div>
    <div class="chat-box"><div class="chat-messages" id="chatMessages"><div class="muted small">Join the room to start chatting.</div></div><div class="chat-compose"><input id="chatInput" maxlength="500" placeholder="Type a message…" aria-label="Chat message"><button id="sendChat">Send</button></div></div>
    <p id="chatStatus" class="muted small">Text, voice, and video are built into the room when the live room server is connected.</p>
    <p class="muted small">Watch Together never asks for or stores your streaming passwords and does not bypass provider login, subscriptions, DRM, or channel restrictions.</p>
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

const status = document.querySelector('#status'), input = document.querySelector('#room'), nameInput = document.querySelector('#name'), badge = document.querySelector('#userBadge');
const roomState = document.querySelector('#roomState'), people = document.querySelector('#people'), chatMessages = document.querySelector('#chatMessages'), chatInput = document.querySelector('#chatInput'), chatStatus = document.querySelector('#chatStatus'), localVideo = document.querySelector('#localVideo'), remoteVideo = document.querySelector('#remoteVideo'), remoteLabel = document.querySelector('#remoteLabel');
const guideService = document.querySelector('#guideService'), guideTabs = document.querySelector('#guideTabs'), channelSearch = document.querySelector('#channelSearch'), channelList = document.querySelector('#channelList'), selectedChannel = document.querySelector('#selectedChannel');
let activeService = services[0], filteredChannels = [...activeService.guide], selectedIndex = 0;

const savedName = localStorage.getItem('watchTogetherName');
if (savedName) { nameInput.value = savedName; badge.textContent = savedName; }

document.querySelector('#saveName').onclick = () => {
  const name = nameInput.value.trim().replace(/[^a-zA-Z0-9 _-]/g, '').slice(0, 24);
  if (!name) { status.textContent = 'Enter a name first.'; return; }
  localStorage.setItem('watchTogetherName', name); badge.textContent = name; status.textContent = `Welcome, ${name}. Create a room or join one below.`;
};

function currentRoomUrl() {
  const code = input.value.trim().toUpperCase();
  const url = new URL(location.href);
  if (code) url.searchParams.set('room', code); else url.searchParams.delete('room');
  return { code, url };
}

function shareWatchLink() {
  const { code, url } = currentRoomUrl();
  if (!code) {
    status.textContent = 'Create a room link first.';
    return;
  }
  const text = `Join my Watch Together room: ${code}`;
  if (navigator.share) {
    navigator.share({title:'Watch Together', text, url:url.toString()})
      .then(() => { status.textContent = 'Invite ready to share.'; })
      .catch(() => {});
  } else if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url.toString()).then(() => {
      status.textContent = 'Invite link copied. Paste it into Messages, Facebook Messenger, email, or anywhere you like.';
    }).catch(() => { status.textContent = url.toString(); });
  } else {
    status.textContent = url.toString();
  }
}

function setRoom(code) {
  const n = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  if (!n) { status.textContent = 'Enter a room code.'; return; }
  input.value = n;
  status.textContent = 'Room ' + n + ' is ready. Share the link so everyone can join you.';
  connectRoom();
}

document.querySelector('#shareRoom').onclick = shareWatchLink;
document.querySelector('#copyInvite').onclick = () => {
  const { code, url } = currentRoomUrl();
  if (!code) { status.textContent = 'Create or join a room first.'; return; }
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url.toString()).then(() => status.textContent = 'Invite link copied.').catch(() => window.prompt('Copy this Watch Together invite link:', url.toString()));
  else window.prompt('Copy this Watch Together invite link:', url.toString());
};
document.querySelector('#create').onclick = () => { setRoom(Math.random().toString(36).slice(2, 8)); shareWatchLink(); };
document.querySelector('#join').onclick = () => setRoom(input.value);
input.onkeydown = e => { if (e.key === 'Enter') setRoom(input.value); };
const roomFromUrl = new URLSearchParams(location.search).get('room');
if (roomFromUrl) { input.value = roomFromUrl.toUpperCase(); setRoom(roomFromUrl); }
document.querySelector('#openChat').onclick = () => { document.querySelector('#together').scrollIntoView({behavior:'smooth',block:'start'}); chatInput.focus(); };


let roomSocket = null;
let myId = null;
const peers = new Map();
let localStream = null;
function roomSocketUrl(room){const proto=location.protocol==='https:'?'wss:':'ws:';return proto+'//'+location.host+'/api/room/'+encodeURIComponent(room);}
function addChatLine(name,text,mine=false){const empty=chatMessages.querySelector('.muted.small');if(empty&&chatMessages.children.length===1)empty.remove();const row=document.createElement('div');row.className='chat-line'+(mine?' mine':'');const who=document.createElement('strong');who.textContent=name;const msg=document.createElement('span');msg.textContent=text;row.append(who,msg);chatMessages.appendChild(row);chatMessages.scrollTop=chatMessages.scrollHeight;}
function renderPeople(list){people.innerHTML='';(list||[]).forEach(p=>{const el=document.createElement('span');el.className='person';el.textContent=(p.name||'Guest')+(p.id===myId?' · You':'');people.appendChild(el);});}
async function startMedia(videoMode){if(!navigator.mediaDevices?.getUserMedia){chatStatus.textContent='This browser does not provide camera/microphone access.';return null;}try{localStream?.getTracks().forEach(t=>t.stop());localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:!!videoMode});localVideo.srcObject=videoMode?localStream:null;localVideo.muted=true;chatStatus.textContent=videoMode?'Video call is ready.':'Voice call is ready.';return localStream;}catch{chatStatus.textContent='Camera/microphone permission was not granted.';return null;}}
function createPeer(peerId,name){if(peers.has(peerId))return peers.get(peerId);const pc=new RTCPeerConnection();peers.set(peerId,pc);if(localStream)localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));pc.onicecandidate=e=>{if(e.candidate&&roomSocket?.readyState===WebSocket.OPEN)roomSocket.send(JSON.stringify({type:'signal',to:peerId,signal:{candidate:e.candidate}}));};pc.ontrack=e=>{if(e.streams?.[0]){remoteVideo.srcObject=e.streams[0];remoteLabel.textContent=name||'Guest';}};pc.onconnectionstatechange=()=>{if(['failed','closed','disconnected'].includes(pc.connectionState)){pc.close();peers.delete(peerId);renderPeople([{id:myId,name:nameInput.value||'Guest'},...Array.from(peers.keys()).map(id=>({id}))]);}};return pc;}
async function callPeer(peerId,name){const pc=createPeer(peerId,name);if(localStream)localStream.getTracks().forEach(t=>{if(!pc.getSenders().some(s=>s.track===t))pc.addTrack(t,localStream);});const offer=await pc.createOffer();await pc.setLocalDescription(offer);roomSocket?.send(JSON.stringify({type:'signal',to:peerId,signal:{description:pc.localDescription}}));}
function connectRoom(){const room=input.value.trim().toUpperCase();if(!room||!/^[A-Z0-9]{4,8}$/.test(room))return;if(roomSocket)roomSocket.close();if(location.hostname.endsWith('github.io')){roomState.textContent='Chat server pending';chatStatus.textContent='This launch page is the shareable front door. Live chat, voice, and video are ready in the room-server build and will activate when that server is attached.';return;}try{roomSocket=new WebSocket(roomSocketUrl(room));roomState.textContent='Connecting…';roomSocket.onopen=()=>{roomState.textContent='Connected';roomSocket.send(JSON.stringify({type:'hello',name:(nameInput.value||'Guest').trim().slice(0,24)}));chatStatus.textContent='Room connected. Text chat is ready.';};roomSocket.onmessage=async event=>{let data;try{data=JSON.parse(event.data);}catch{return;}if(data.type==='ready'){myId=data.id;const peersList=data.peers||[];renderPeople([{id:myId,name:nameInput.value||'Guest'},...peersList]);addChatLine('System','You joined room '+room+'.');for(const p of peersList){try{await callPeer(p.id,p.name);}catch{}}}else if(data.type==='peer-joined'){const current=[{id:myId,name:nameInput.value||'Guest'},...Array.from(peers.keys()).map(id=>({id}))];renderPeople(current.concat([{id:data.peer?.id,name:data.peer?.name||'Guest'}]));addChatLine('System',(data.peer?.name||'Guest')+' joined the room.');}else if(data.type==='peer-left'){const pc=peers.get(data.id);pc?.close();peers.delete(data.id);renderPeople([{id:myId,name:nameInput.value||'Guest'},...Array.from(peers.keys()).map(id=>({id}))]);addChatLine('System','A guest left the room.');}else if(data.type==='chat'){addChatLine(data.name||'Guest',data.text||'',data.from===myId);}else if(data.type==='signal'){const pc=createPeer(data.from,data.name),signal=data.signal||{};try{if(signal.description){await pc.setRemoteDescription(signal.description);if(signal.description.type==='offer'){if(localStream)localStream.getTracks().forEach(t=>{if(!pc.getSenders().some(s=>s.track===t))pc.addTrack(t,localStream);});const answer=await pc.createAnswer();await pc.setLocalDescription(answer);roomSocket.send(JSON.stringify({type:'signal',to:data.from,signal:{description:pc.localDescription}}));}}if(signal.candidate)await pc.addIceCandidate(signal.candidate);}catch{}}};roomSocket.onclose=()=>{roomState.textContent='Not connected';chatStatus.textContent='Room connection closed. Share/join still works; live chat needs the room server.';};roomSocket.onerror=()=>{roomState.textContent='Unavailable';chatStatus.textContent='Live room server is not reachable from this deployment yet.';};}catch{roomState.textContent='Unavailable';}}
document.querySelector('#sendChat').onclick=()=>{const text=chatInput.value.trim();if(!text)return;if(!roomSocket||roomSocket.readyState!==WebSocket.OPEN){chatStatus.textContent='Live chat is not connected on this deployment yet.';return;}roomSocket.send(JSON.stringify({type:'chat',text}));chatInput.value='';};chatInput.onkeydown=e=>{if(e.key==='Enter')document.querySelector('#sendChat').click();};
document.querySelector('#voiceCall').onclick=async()=>{const stream=await startMedia(false);if(!stream||!roomSocket||roomSocket.readyState!==WebSocket.OPEN)return;for(const [id,pc] of peers){stream.getTracks().forEach(t=>{if(!pc.getSenders().some(s=>s.track===t))pc.addTrack(t,stream);});await callPeer(id,'');}};
document.querySelector('#videoCall').onclick=async()=>{const stream=await startMedia(true);if(!stream||!roomSocket||roomSocket.readyState!==WebSocket.OPEN)return;for(const [id] of peers)await callPeer(id,'');};
document.querySelector('#hangUp').onclick=()=>{localStream?.getTracks().forEach(t=>t.stop());localStream=null;localVideo.srcObject=null;remoteVideo.srcObject=null;remoteLabel.textContent='Waiting for a video guest';for(const pc of peers.values())pc.close();peers.clear();renderPeople([{id:myId,name:nameInput.value||'Guest'}]);chatStatus.textContent='Call ended.';};

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
document.querySelector('#openGuide').onclick = () => { window.open(activeService.url, '_blank', 'noopener,noreferrer'); status.textContent = `${activeService.name}: opening the official guide/player.`; };

document.querySelectorAll('[data-control]').forEach(b => b.onclick = () => status.textContent = `${b.textContent.trim()} requested for room ${input.value.trim().toUpperCase() || 'this room'}.`);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
selectService(activeService.name);
