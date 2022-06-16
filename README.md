# Message History Bot + Express Backend

## Description

This is just to see if I can make a discord bot with a backend server using discord OAuth

## Tech Stack
- Python (bot)
- ExpressJS (backend)

> **Use this to reinforce Express backend usage**

# Things that need to happen

- create a discord bot that stores user's ID's and messages in a database/JSON file
    - store data as ```{ userID: { messages: [], dates: [] } }```
- create a backend server that stores the info and hosts it on a website (*heroku*)
- create a landing page that allows users to login then redirect to a page populated with their message history
    - take user ID from discord OAuth as query parameter to display their messages
- create a frontend that displays the messages to the user