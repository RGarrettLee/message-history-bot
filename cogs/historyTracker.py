import discord
import json
import requests
import os
from discord.ext import commands
from discord.ext.commands import Option

class Tracker(commands.Cog):
    def loadData(self, link): # change this to a get request to the server to borrow the data
        self.messageHistory = requests.get(f'{link}/api/history').json()

    def saveData(self): # gonna have to change this to send to the server and then append it there, this works FOR NOW. Refer to mini project feedback section
        requests.post(f'{self.backend}/api/history', json=self.messageHistory, headers={ 'Content-Type': 'application/json' })

    def __init__(self, bot):
        self.bot = bot
        self.backend = 'https://3121-2605-b100-e00a-b90d-6482-13e3-c991-e8d7.ngrok.io'
        self.messageHistory = {}
        self.loadData(self.backend)

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.bot: return

        if (str(f'{message.author.id}') in self.messageHistory):
            self.messageHistory[f'{message.author.id}']['messages'].append(message.content)
            self.messageHistory[f'{message.author.id}']['dates'].append(str(message.created_at.date()))
            self.saveData()
            self.loadData(self.backend)
        else:
            self.messageHistory[f'{message.author.id}'] = { "messages": [message.content], "dates": [str(message.created_at.date())] }
            self.saveData()
            self.loadData(self.backend)

def setup(bot):
    bot.add_cog(Tracker(bot))