const ws = new WebSocket('ws://localhost:8080/ws');

ws.addEventListener('open', () => {
    console.log('connected');
    ws.send('hello')
});

ws.addEventListener('error', () => {
    console.log('error')
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
    console.log(evt.data)
})

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const nickname = userInput.value;
    console.log(nickname);

    const users = [
        {
            username: 'Sasha'
        },
        {
            username: "Misha"
        },
        {
            username: 'Andrew'
        },
        {
            username: 'Patrick'
        },
        {
            username: 'Helen'
        }
    ]
    console.log(users);

    function check(name) {
        let found = users.some(function (el) {
            return el.username === name;
        });
        if (!found) {
            users.push({ username: name });
            alert('Запускается чат...');
            main.classList.add('hidden');
            chat.classList.remove('hidden');
            
            userList.insertAdjacentHTML('afterbegin', `<li class="user iam-user">${userInput.value}</li>`);

        } else {
            console.log('error');
            alert('Данное имя занято! Введите другое.')
        }
    }

    check(nickname);
    console.log(users);

});

const dialog = [
    "How is it going?",
    "What are you up to?",
    "Take care!",
    "Have a good weekend",
    "Till next time!"
]

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const chatText = chatWindow.previousElementSibling;
    chatText.insertAdjacentHTML('afterend', `<div class="window user-window"><img class="user-icon img" src="https://i.hizliresim.com/OvmnqP.png">${dialog[Math.floor(Math.random() * 5)]}</div>`)
    chatText.insertAdjacentHTML('afterend', `<div class="window my-window"> <img class="my-icon img" src="https://i.pinimg.com/originals/74/da/07/74da07214279d76f9809b9c3943f23e6.png">${text.value}</div>`);
    document.getElementById('text').value='';
});