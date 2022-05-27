const ws = new WebSocket('wss://whispering-caverns-90296.herokuapp.com');

ws.addEventListener('open', () => {
  // eslint-disable-next-line
  console.log('connected');
});

ws.addEventListener('error', () => {
  // eslint-disable-next-line
  console.log('error');
});

const main = document.querySelector('.main-page');
const btn = document.querySelector('.main-btn');

const chat = document.querySelector('.chat');
const userList = document.querySelector('.user-list');
const chatWindow = document.querySelector('.write-window');
const text = document.getElementById('text');
const confirmBtn = document.querySelector('.confirm');
const userInput = document.getElementById('name');

ws.addEventListener('message', (evt) => {
  // eslint-disable-next-line
  console.log(evt.data);

  if (evt.data === 'Доступ запрещен') {
    // eslint-disable-next-line
    alert('Данное имя занято! Введите другое.');
    ws.addEventListener('close', (e) => {
      // eslint-disable-next-line
      console.log('Доступ к чату закрыт', e);
    });
  } else {
    // eslint-disable-next-line
    alert('Запускается чат...');
    main.classList.add('hidden');
    chat.classList.remove('hidden');

    userList.insertAdjacentHTML('afterbegin', `<li class="user iam-user">${userInput.value}</li>`);
  }
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = userInput.value;
  // eslint-disable-next-line
  console.log(nickname);
  ws.send(nickname);
});

const dialog = [
  'How is it going?',
  'What are you up to?',
  'Take care!',
  'Have a good weekend',
  'Till next time!',
];

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const chatText = chatWindow.previousElementSibling;
  chatText.insertAdjacentHTML('afterend', `<div class="window user-window"><img class="user-icon img" src="https://i.hizliresim.com/OvmnqP.png">${dialog[Math.floor(Math.random() * 5)]}</div>`);
  chatText.insertAdjacentHTML('afterend', `<div class="window my-window"> <img class="my-icon img" src="https://i.pinimg.com/originals/74/da/07/74da07214279d76f9809b9c3943f23e6.png">${text.value}</div>`);
  document.getElementById('text').value = '';
});
