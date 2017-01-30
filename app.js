const Discord = require("discord.js");
const nixbot = new Discord.Client();

const config = require("./config.json");

const fs = require('fs');


nixbot.on('ready', () => {
  console.log(`\n**********************************************************************************************`);
  console.log(`\n******                                                                                ********`);
  console.log(`\n*****             Connecté en tant que : ${nixbot.user.username}  ! Prêt pour tartiner des daronnes !           *****`);
  console.log(`\n******                                                                                ********`);
  console.log(`\n**********************************************************************************************`);
});



// Quand un membre est nouveau sur le serveur :

nixbot.on("guildMemberAdd", member =>
{
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Bienvenue à ${member.user} au serveur de la NIXgamingTeam.\n\n`);
  // guild.defaultChannel.sendMessage(member.user.presenceStatus);
  console.log(`${member.user} vient de rejoindre le serveur`);

});

nixbot.on("guildCreate", guild =>
{
  console.log(`New Guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});





// Messages
nixbot.on('message', msg =>
{

  if(msg.author.nixbot) return;

  // Interdiction des mots
  var badwords = {
  "pd" : "pd",
  "PD" : "PD",
  "pédé" : "pédé",
  "Pédé" : "Pédé",
  "péDé" : "péDé",
  "PéDé" : "PéDé",
  "fuck": "fu**",
  "FUCK" : "FUCK",
  "FuCk" : "FuCk",
  "encule": "encu**",
  "enculé": "encu***",
  "fdp" : "Fils de p****",
  "fils de pute" : "Fils de p****",
  "salope" : "salo**",
  "Connard" : "Conn***",
  "Connasse":"Conna***",
  "Con":"C**",
  "Enfoiré":"Enfoiré ",
  "Enculé":"Enculé ",
  "Fils de pute":"Fils de pute ",
  "Salaud":"Salaud ",
  "Salope":"Salope",
  "Salopard":"Salopard ",
  "Emmerdeur":"Emmerdeur ",
  "Merdeux":"Merdeux ",
  "Merde":"Merde ",
  "Pétasse":"Pétasse ",
  "Poufiasse":"Poufiasse ",
  "Bouffon":"Bouffon ",
  "Putain":"Putain",
  "Abruti":"Abruti",
  "Imbécile":"Imbécile ",
  "Tête de neu":"Tête de neu ",
  "Neuneu":"Neuneu ",
  "Va te faire foutre":"Va te faire foutre ",
  "Ca me fais chier":"Ca me fais chier",
  "J'en ai ras le cul ":"J'en ai ras le cul ",
  "Je m'en fous":"Je m'en fous ",
  "Casse-burnes":"Casse-burnes ",
  "Vermine ":"Vermine ",
  "Crétin des alpes":"Crétin des alpes",
  "Bachi-bouzouk":"Bachi-bouzouk"
};

  if (badwords[msg.content])
  {


    var d = new Date();
    var fs = require("fs");
    var logger = fs.createWriteStream('logs_insultes.txt',
    {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })

    msg.delete();
    msg.reply("Vous avez utilisé un mot interdit par EL MODERATOR ! Il te reste X ( futur systeme de reward ) avertissements avant l'exclusion du serveur\n\nMot utilisé : " + badwords[msg.content] );
    console.log(`${msg.member.user.username} à utilisé le mot ` +  badwords[msg.content] + " le " + d.getUTCDate() + "." + d.getUTCMonth() + "." + d.getUTCFullYear() + " à " + d.getHours() + ":" + d.getMinutes() +
    ":" + d.getSeconds());


      /*fs.writeFileSync("./logs_insultes.txt",
      `${msg.member.user.username} à utilisé le mot ` +  badwords[msg.content] + " le " + d.getUTCDate() + "." + d.getUTCMonth()
      + "." + d.getUTCFullYear() + " à " + d.getHours() + ":" + d.getMinutes() +
      ":" + d.getSeconds(), "UTF-8");*/

      logger.write(`${msg.member.user.username} à utilisé le mot ` +  badwords[msg.content] + " le " + d.getUTCDate() + "." + d.getUTCMonth() + "." + d.getUTCFullYear() + " à " + d.getHours() + ":" + d.getMinutes() +
      ":" + d.getSeconds() + "\n") // append string to your file


    }



  // END OF BADWORDS


  // Message automatiques

  if (msg.content.toLowerCase() === "salut")
  {
    msg.reply(`Salut ${msg.member.user.username} ! Comment tu vas ? `);
  }

  if (msg.content.toLowerCase() === "hello")
  {
    msg.reply(`Hello ${msg.member.user.username} ! Comment tu vas ? `);
  }

  if (msg.content.toLowerCase() === "coucou")
  {
    msg.reply(`Coucou ${msg.member.user.username} ! Comment tu vas ? `);
  }

  if (msg.content === "++")
  {
    msg.reply(`Aurevoir  ${msg.member.user.username} ! Au plaisir de te revoir parmis notre tribu d'ici peu ! `);
  }


  if(!msg.content.startsWith(config.prefix))
  {
    return;
  }


  let command = msg.content.split(" ")[0];

  command = command.slice(config.prefix.length);

  let args = msg.content.split(" ").slice(1);

  if (command.toLowerCase() === "say")
  {

    msg.channel.sendMessage(args.join(" "));
  }

  if (command.toLowerCase() === "add")
  {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce((p, c) => p+c);

    msg.channel.sendMessage("Le résultat de l'addition est : " + total );
  }

  // Commandes
  if (command.toLowerCase()  === "bonjour")
  {
    msg.channel.sendMessage('Je suis le nouveau BOT crée par la NIXamerGaming Team en node.js');
  } else

  if (command.toLowerCase()  === "foo")
  {
    //MODERATOR Roles verifications
    let modRole = msg.guild.roles.find("name", "EL MODERATOR");
    if(msg.member.roles.has(modRole.id))
    {
      msg.channel.sendMessage("bar !");
    }
    else
    {
      msg.reply("Vous n'avez pas la permission d'utiliser cette commande. Veuillez vous référer vers EL MODERATOR").catch(console.error);
    }
  }

  if (command.toUpperCase()  === "FOO2")
  {

  }


  // Commande avatard

  if (command.toUpperCase()  ==="AVATAR")
  {
    msg.reply(msg.author.avatarURL);
  }

  // Kick and ban

  if (command.toUpperCase()  === "KICK")
  {
    let modRole = msg.guild.roles.find("name", "EL MODERATOR");

    if(!msg.member.roles.has(modRole.id))
    {
      return msg.reply("Vous n'avez pas la permission d'utiliser cette commande. Veuillez vous référer vers EL MODERATOR").catch(console.error);
    }
    if(msg.mentions.users.size === 0)
    {
      return msg.reply("J'ai besoin d'un nom d'utilisateur à kicker de la NIX").catch(console.error);
    }
    let kickMember = msg.guild.member(msg.mentions.users.first());
    if(!kickMember)
    {
      return msg.reply("Tu es sûr que cet utilisateur existe ? ").catch(console.error);
    }
    if(!msg.guild.member(nixbot.user).hasPermission("KICK_MEMBERS"))
    {
      return msg.reply("Je n'ai pas le droit de faire ça. Il faut que je regarge avec EL MODERATOR ! ").catch(console.error);
    }

    kickMember.kick().then(member =>
    {
      msg.reply(`${member.user.username} à été correctement explusé du serveur de la NIXgaming Team.`).catch(console.error);
    }).catch(console.error)

  } // END OF KICK AND BAN


  // command memberCount
  if (command.toUpperCase()  ==="STATS")
  {
    let modRole = msg.guild.roles.find("name", "EL MODERATOR");
    if(msg.member.roles.has(modRole.id))
    {

    msg.channel.sendMessage(`Nombre de personnes inscrite sur le serveur : ${msg.guild.members.size}\nNombre de salons textuel et vocal connectés : ${msg.guild.channels.size}`);
    /*
    Send a message using a webhook
  */

  // create a new webhook
  const hook = new Discord.WebhookClient('webhook id', 'webhook token');

  // send a message using the webhook
  hook.sendMessage('I am now alive!');


    }
    else
    {
      msg.delete();
      msg.reply("Vous n'avez pas la permission d'utiliser la commande !stats. Veuillez vous référer vers EL MODERATOR").catch(console.error);
    }
  }


  // command eval

  if (command.toUpperCase()  === "EVAL")
  {
      if(msg.author.id !== "209744043087757312")
      {
        return;
      }
      try
      {
        var code = args.join(" ");
        var evaled = eval(code);

        if(typeof evaled !== "string")
        {
          evaled = require("util").inspect(evaled);
        }
        msg.channel.sendCode("x1", clean(evaled));
      }
      catch(err)
      {
        msg.channel.sendMessage(`\`Une erreur c'est produite : \`  \`\`\`x1\n${clean(err)}\n\`\`\``);
      }
  }


}); // END OF MESSAGE HANDLER


// clean fucntion

function clean(text)
{
  if (typeof(text) === "string")
  {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }
  else
  {
    return text;
  }
}

// Function commandIs




// Methode d'accès au serveur
nixbot.login(config.token);
