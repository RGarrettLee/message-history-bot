// deal with discord OAuth login and redirect to /history/:userid

const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

const discordAPI = 'https://discord.com/api';
const clientID = '987047543399653447';
const clientSecret = 'E24RZ6Fy6vXhhqHf-9X8lhKq1SkPvPA2';
const backend = 'https://message-history-bot.herokuapp.com';
const redirect_uri = `${backend}/success`

let token = '';

let details = {
    'client_id': clientID,
    'client_secret': clientSecret,
    'grant_type': 'authorization_code',
    'code': params.code,
    'redirect_uri': redirect_uri
}

let formBody = [];

for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');

fetch(`${discordAPI}/oauth2/token`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
})
.then((response) => response.json())
.then((data) => {
    console.log(data);
    //window.location = `${backend}/history/${data.access_token}`;
    token = data.access_token;
    fetch(`${discordAPI}/v10/users/@me`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        }
    })
    .then((response) => response.json())
    .then((resp) => {
        window.location = `${backend}/history/${resp.username}/${resp.id}/${resp.avatar}`;
    })
})
.catch(error => {
    console.log('something went wrong: ', error)
})