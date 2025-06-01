/**
 * Goat Bot Render Deployment Fix by Eren
 */

const express = require("express");
const { spawn } = require("child_process");
const log = require("./logger/log.js");
const fs = require("fs");

// === Express server to keep Render service alive ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Goat Bot is alive and running on Render!");
});

app.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
});

// === Detect if running on Render ===
function isRenderPlatform() {
	return Boolean(process.env.RENDER); // Render sets RENDER=true by default
}

// === Apply dev configs only if NOT on Render ===
function applyDevConfig() {
	if (!isRenderPlatform()) {
		console.log("🛠️ Local/GitHub environment detected: Applying dev configs...");

		const filesToCopy = [
			{ from: "account.dev.txt", to: "account.txt" },
			{ from: "config.dev.json", to: "config.json" },
			{ from: "configCommands.dev.json", to: "configCommands.json" }
		];

		for (const { from, to } of filesToCopy) {
			if (fs.existsSync(from)) {
				fs.copyFileSync(from, to);
				console.log(`📄 Copied: ${from} → ${to}`);
			} else {
				console.warn(`⚠️ Dev file not found: ${from}`);
			}
		}
	} else {
		console.log("🌐 Render environment detected: Skipping dev configs.");
	}
}

// === Start the Goat bot process ===
function startProject() {
	applyDevConfig();

	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code === 2) {
			log.info("🔄 Restarting Project...");
			startProject();
		}
	});
}

startProject();
