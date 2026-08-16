const micBtn=document.getElementById('micBtn');
const sendBtn=document.getElementById('sendBtn');
const textInput=document.getElementById('textInput');

function sendText(){
  const text=textInput.value.trim();
  if(!text) return;
  addMessage(text,'user');
  textInput.value='';
  assistantReply(text);
}

sendBtn.addEventListener('click',sendText);
textInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendText();});

const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
  const recognition=new SpeechRecognition();
  recognition.lang='en-IN';
  recognition.interimResults=false;
  recognition.continuous=false;

  micBtn.addEventListener('click',()=>{
    try{
      recognition.start();
      statusEl.textContent='Listening...';
      orb.classList.add('listening');
    }catch(e){}
  });

  recognition.onresult=(event)=>{
    const text=event.results[0][0].transcript;
    addMessage(text,'user');
    assistantReply(text);
  };

  recognition.onerror=()=>{
    statusEl.textContent='Voice error. Try again.';
    orb.classList.remove('listening');
  };

  recognition.onend=()=>{
    if(statusEl.textContent==='Listening...') statusEl.textContent='Ready';
    orb.classList.remove('listening');
  };
}else{
  statusEl.textContent='Voice input is not supported in this browser. Type instead.';
  micBtn.disabled=true;
}
