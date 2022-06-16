let loginButton = document.querySelector('#disc-login');

loginButton.addEventListener('click', function() {
    window.location = 'https://discord.com/api/oauth2/authorize?client_id=987047543399653447&redirect_uri=https%3A%2F%2F3121-2605-b100-e00a-b90d-6482-13e3-c991-e8d7.ngrok.io%2Fsuccess&response_type=code&scope=identify';
});