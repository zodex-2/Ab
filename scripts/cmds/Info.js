const fs = require("fs-extra");
const request = require("request");
const os = require("os");

module.exports = {
  config: {
    name: "info",
    version: "1.3",
    author: "✨ Eren Yeh ✨",
    shortDescription: "Display bot and user information along with uptime and Imgur images/videos.",
    longDescription: "Show detailed info about the bot and the user, with uptime and Imgur image/video features.",
    category: "INFO",
    guide: {
      en: "[user]",
    },
  },

  onStart: async function ({ api, event, args }) {
    // Replace with your info
    const userInfo = {
      name: "Raad (Eren)",  // Replace with your name
      age: "16+",           // Replace with your age
      location: "Dhaka",    // Replace with your location
      bio: "Bot & JavaScript Lover | Always Learning!", // Replace with your bio
      botName: "🕸️ spideY 🥷", // Replace with bot's name
      botVersion: "1.0",    // Replace with bot's version
    };

    // Calculate bot uptime
    const botUptime = process.uptime(); // in seconds
    const botHours = Math.floor(botUptime / 3600);
    const botMinutes = Math.floor((botUptime % 3600) / 60);
    const botSeconds = Math.floor(botUptime % 60);
    const formattedBotUptime = `${botHours} hours, ${botMinutes} minutes, ${botSeconds} seconds`;

    // Calculate system uptime in days, hours, minutes, and seconds
    const systemUptime = os.uptime(); // in seconds
    const sysDays = Math.floor(systemUptime / (3600 * 24)); // Convert seconds to days
    const sysHours = Math.floor((systemUptime % (3600 * 24)) / 3600); // Remaining hours
    const sysMinutes = Math.floor((systemUptime % 3600) / 60); // Remaining minutes
    const sysSeconds = Math.floor(systemUptime % 60); // Remaining seconds
    const formattedSystemUptime = `${sysDays} days, ${sysHours} hours, ${sysMinutes} minutes, ${sysSeconds} seconds`;

    // Example Imgur video links
    const imgurLinks = [
      "https://i.imgur.com/bde5ahr.mp4",  // Replace with actual Imgur video links
      "https://i.imgur.com/QOBaSLt.mp4",
    ];

    // Download videos and send them as attachments
    const downloadVideo = (url, filePath) => {
      return new Promise((resolve, reject) => {
        request(url)
          .pipe(fs.createWriteStream(filePath))
          .on("close", resolve)
          .on("error", reject);
      });
    };

    // Construct the body message with more space
    const bodyMsg = `
Information: 🥷

- Name: ${userInfo.name}
- Age: ${userInfo.age}
- Location: ${userInfo.location}
- Bio: ${userInfo.bio}

Bot Details:

- Bot Name: ${userInfo.botName}
- Bot Version: ${userInfo.botVersion}
- Bot Uptime: ${formattedBotUptime}

System Uptime:

- System Uptime: ${formattedSystemUptime}

─────────────────────
`;

    // Prepare video attachments
    const videoPaths = [];
    for (let i = 0; i < imgurLinks.length; i++) {
      const videoPath = __dirname + `/cache/video${i}.mp4`;
      await downloadVideo(imgurLinks[i], videoPath);
      videoPaths.push(videoPath);
    }

    // Send message with info and video attachments
    api.sendMessage(
      { 
        body: bodyMsg, 
        attachment: videoPaths.map(path => fs.createReadStream(path))
      },
      event.threadID,
      () => {
        // Clean up downloaded video files
        videoPaths.forEach(path => fs.unlinkSync(path));
      },
      event.messageID
    );
  },
};
