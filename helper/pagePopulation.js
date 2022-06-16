const fs = require('fs');
const path = require('path');

function generateTable(user_id) {
    let data = fs.readFileSync(path.join(__dirname, '../db/messages.json'));
    let messageHistory = JSON.parse(data);

    let table = '';

    if (messageHistory[`${user_id}`]) {
        for (let i = messageHistory[`${user_id}`]['messages'].length - 1; i >= 0; i--) {
            table += `<tr>
    <td>${messageHistory[`${user_id}`]['dates'][i]}</td>
    <td>${messageHistory[`${user_id}`]['messages'][i]}</td>
</tr>
    
            `;
        }
    } else {
        table += `<tr>
        <td>No</td>
        <td>History</td>
    </tr>`
    }

    return table;
}

function generatePage(username, user_id, avatar) { // generate page data here
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${username}'s Message History</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
        </head>
        <body>
            <header>
                <h1>${username}'s Message History</h1>
            </header>
    
            <img style="position: relative; left: 45%; padding-top: 35px;" alt="pfp" src="https://cdn.discordapp.com/avatars/${user_id}/${avatar}.png" />
    
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateTable(user_id)}
                    </tbody>
                </table>
            </section>
        </body>
    </html>
`;
}

function noInfo() {
    return `
`;
}

module.exports = generatePage;