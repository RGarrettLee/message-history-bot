import discord
import json
from discord.ext import commands

with open('../db/serverData.json', 'r') as f:
    serverData = json.loads(f.read())

token = serverData['bot']['token']
prefix = serverData['token']

intents = discord.Intents()
intents.members = True
intents.messages = True
intents.reactions = True

bot = commands.Bot(command_prefix=prefix, intents=intents, slash_commands=True)

@bot.event
async def on_ready():
    print(bot.user.name, 'logged in')
    print('-----------')

bot.remove_command('help')