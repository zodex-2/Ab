const fs = require('fs');const moment = require('moment-timezone');
module.exports = {
  config: {
    name: "info",
    aliases: ["creator", "cr"],
    version: "2.0",
    author: "VEX_ADNAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "cr") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const botName = "𝐼𝑇𝐻𝐴𝐶𝐻𝐼 ✞︎ 𝑈𝐶𝐻𝐼𝐶𝐻𝐴 ←✰ ";
    const botPrefix = "ɪᴛʜᴀᴄʜɪ";
    const authorName = "𝘏𝘜𝘚𝘚𝘈𝘐𝘕 𝘈𝘏𝘔𝘌𝘋 ";
    const authorFB = "https://www.facebook.com/farhan.ahmed2401";
    const authorInsta = "𝘕𝘖𝘕𝘌 𝘗𝘜𝘉𝘓𝘐𝘊";
    const status = "𝗣𝘂𝗿𝗲 𝗦𝗶𝗻𝗴𝗹𝗲";

    const urls = JSON.parse(fs.readFileSync('scripts/cmds/assets/Ayan.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}h ${minutes}m ${seconds}sec`;

    message.reply({
      body: `╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: ${authorName}
├‣ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:  ${botName}
├‣ 𝐏𝐫𝐞𝐟𝐢𝐱:  ${botPrefix}
├‣ 𝐅𝐛: ${authorFB}
├‣ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦:  ${authorInsta}
├‣ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: ${status}   
├‣ 𝐓𝐢𝐦𝐞:  ${time}
├‣ 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptimeString}
╰────────────◊`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  }
};
