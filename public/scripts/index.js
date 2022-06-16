let loginButton = document.querySelector('#disc-login');

loginButton.addEventListener('click', function() {
    let backendLogin = 'https://discord.com/api/oauth2/authorize?client_id=987047543399653447&redirect_uri=https%3A%2F%2Fmessage-history-bot.herokuapp.com%2Fsuccess&response_type=code&scope=identify';
    window.location = backendLogin;
});