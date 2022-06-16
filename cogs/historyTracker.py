import discord
import json
import requests
import os
from discord.ext import commands
from discord.ext.commands import Option

class Tracker(commands.Cog):
    def loadData(self):
        with open('db/messages.json', 'r') as f:
            self.messageHistory = json.loads(f.read())

    def saveData(self):
        with open('db/messages.json', 'w', encoding='utf-8') as f:
            json.dump(self.messageHistory, f, ensure_ascii=True, indent=4)

    def __init__(self, bot):
        self.bot = bot
        self.messageHistory = {}
        self.loadData()

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.bot: return

        if (str(f'{message.author.id}') in self.messageHistory):
            self.messageHistory[f'{message.author.id}']['messages'].append(message.content)
            self.messageHistory[f'{message.author.id}']['dates'].append(str(message.created_at.date()))
            self.saveData()
            self.loadData()
        else:
            self.messageHistory[f'{message.author.id}'] = { "messages": [message.content], "dates": [str(message.created_at.date())] }
            self.saveData()
            self.loadData()

def setup(bot):
    bot.add_cog(Tracker(bot))