const chat = document.getElementById('chat');
const statusEl = document.getElementById('status');
const orb = document.getElementById('orb');

function addMessage(text, who = 'ai') {
  const div = document.createElement('div');
  div.className = 'message ' + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'hi-IN';
  u.rate = 0.95;
  u.pitch = 1;

  speechSynthesis.speak(u);
}

async function assistantReply(text) {
  statusEl.textContent = 'Thinking...';
  orb.classList.add('listening');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    const reply = data.reply;

    addMessage(reply, 'ai');
    speak(reply);

    statusEl.textContent = 'Ready';
  } catch (error) {
    console.error(error);

    const errorMessage =
      'Sorry, abhi server se connection nahi ho pa raha.';

    addMessage(errorMessage, 'ai');
    speak(errorMessage);

    statusEl.textContent = 'Error';
  }

  orb.classList.remove('listening');
}
