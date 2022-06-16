import discord
import json
import os
from discord.ext import commands

with open('db/serverData.json', 'r') as f:
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

@bot.command
async def help(ctx):
    """See all commands"""
    embed = discord.Embed(title='Help', description='Guide to this bot', color=0x00ff00)
    embed.add_field(name='This bot just tracks all the messages you send', value='You can check it out here at `LINK`', inline=False)
    embed.add_field(name='`Created By:`', value='<@!174263950685372417>', inline=False)

    await ctx.send(embed=embed)

for cog in os.listdir("./cogs"):
    if cog.endswith('.py'):
        try:
            cog = f"cogs.{cog.replace('.py', '')}"
            bot.load_extension(cog)
        except Exception as e:
            print(f'{cog} can not be loaded:')
            raise e

bot.run(token)