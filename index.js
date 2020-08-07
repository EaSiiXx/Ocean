const Discord = require("discord.js"),
client = new Discord.Client,
config = require("./config.json"),
fs = require ("fs")

client.login('NzM4MDgwMDE4ODY0OTMwODQ2.XyGslQ.-6l7p6pMibYr-LWBHkvd2JARxfU')
client.commands = new Discord.Collection()

fs.readdir("./commands", (err, files) => {
  if (err) throw err
  files.forEach(file => {
      if (!file.endsWith('.js')) return
      const command = require(`./commads/${file}`)
      client.commands.set(command.name, command)
  })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client,)
})

