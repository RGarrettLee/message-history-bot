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
        self.backend = 'https://message-history-bot.herokuapp.com'
        self.messageHistory = {}
        self.loadData(self.backend)

    @commands.command()
    async def history(self, ctx):
        """See the your message history"""
        avatarLink = str(ctx.author.avatar)
        #https://cdn.discordapp.com/avatars/174263950685372417/2dcdfeeb59be0df62108498a6307f1cd.png?size=1024
        avatarLink = avatarLink.replace('https://cdn.discordapp.com/avatars/', '')
        
        avatarCode = ''
        switch = False
        for i in avatarLink:
            if (i == '.'):
                break
            if (switch):
                avatarCode += i
            if (i == '/'):
                switch = True
        await ctx.send(f'https://message-history-bot.herokuapp.com/history/{ctx.author.name}/{ctx.author.id}/{avatarCode}')

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