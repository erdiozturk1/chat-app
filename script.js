let username = '';

        document.getElementById('loginButton').addEventListener('click', login);
        document.getElementById('sendButton').addEventListener('click', sendMessage);
        document.getElementById('messageInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            } else {
                showTypingIndicator();
            }
        });

        function login() {
            const usernameInput = document.getElementById('usernameInput');
            username = usernameInput.value.trim();
            if (username === '') {
                alert('Please enter a username');
                return;
            }

            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('chatContainer').style.display = 'flex';
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value;
            if (message.trim() === '') return;

            const chat = document.querySelector('.chat');
            const chatMessage = document.createElement('div');
            chatMessage.classList.add('chat-message', 'sent');

            const messageP = document.createElement('p');
            messageP.classList.add('user-message');
            messageP.textContent = `${username}: ${message}`;
            chatMessage.appendChild(messageP);

            const timestampSpan = document.createElement('span');
            timestampSpan.classList.add('timestamp');
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
            timestampSpan.textContent = formattedTime;
            chatMessage.appendChild(timestampSpan);

            chat.appendChild(chatMessage);
            chat.scrollTop = chat.scrollHeight; // Scroll to the bottom

            input.value = '';
            hideTypingIndicator();
        }

        function showTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            typingIndicator.style.display = 'block';
            clearTimeout(typingIndicator.timeout);
            typingIndicator.timeout = setTimeout(hideTypingIndicator, 1000);
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            typingIndicator.style.display = 'none';
        }