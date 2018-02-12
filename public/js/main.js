(() => {
    const socket = io(); // This is making the connection for things to happen in the browser window

    let messageList = document.querySelector('ul'),
            chatForm = document.querySelector('form'),
            nameInput = document.querySelector('.nickname'),
            chatMessage = document.querySelector('.message'),
            nickName = null;


    function setNickname() {
        //debugger;
        nickName = this.value;
    }

    function handleSendMessage(e) { //E is the event object that gets generated, which is the submit button in this case
        e.preventDefault(); //Prevents the default behavior - a submit triggers a page reload, which we ont want
        //debugger;

        nickName = (nickName && nickName.length > 0) ? nickName : 'user';

        //grab the text from the input feild at the bottom of the page
        msg = `<span class="userMessageLabel">${nickName} says:</span> ${chatMessage.value}`;

        //emit a chat event so that we can pass it through to the server (and everyone else)
        socket.emit('chat message', msg);
        chatMessage.value = '';
        return false;

    }

    function appendMessage(msg) {
        //  debugger;
        let newMsg = `<li>${msg.message}</li>`
        messageList.innerHTML += newMsg;

    }


    function appendDMessage(msg) {
        //debugger;
        let newMsg = `<li class="dmessage">${msg}</li>`
        messageList.innerHTML += newMsg;


    }

    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDMessage, false);



})();
