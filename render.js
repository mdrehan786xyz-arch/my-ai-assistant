const chat = document.getElementById('chat');
const statusEl = document.getElementById('status');
const orb = document.getElementById('orb');

function addMessage(text, who='ai'){
  const div=document.createElement('div');
  div.className='message '+who;
  div.textContent=text;
  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
}

function speak(text){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.rate=1;
  u.pitch=1;
  speechSynthesis.speak(u);
}

function assistantReply(text){
  const t=text.toLowerCase().trim();
  let reply;

  if(t.includes('hello') || t.includes('hi') || t.includes('namaste')){
    reply='Hello! Main aapki help ke liye ready hoon.';
  } else if(t.includes('time') || t.includes('samay')){
    reply='Abhi time '+new Date().toLocaleTimeString()+ ' hai.';
  } else if(t.includes('date') || t.includes('tarikh')){
    reply='Aaj '+new Date().toLocaleDateString()+ ' hai.';
  } else if(t.includes('youtube')){
    reply='YouTube khol raha hoon.';
    window.open('https://www.youtube.com','_blank');
  } else if(t.includes('google')){
    reply='Google khol raha hoon.';
    window.open('https://www.google.com','_blank');
  } else if(t.includes('help')){
    reply='Aap hello, time, date, Google ya YouTube bol sakte hain.';
  } else {
    reply='Maine suna: "'+text+'". Is demo version mein main limited commands handle karta hoon.';
  }

  addMessage(reply,'ai');
  speak(reply);
  statusEl.textContent='Ready';
  orb.classList.remove('listening');
}
