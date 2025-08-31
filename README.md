# 🖼️ Image Bot

An open source **Image Bot** is a clean, fast Discord bot that transforms text prompts into AI-generated images using the `/image` command. Includes buttons for variations, regeneration, and deletion—no branding, no watermarks, just pure imagination.

---

## ✨ Features

- `/image` — Generate an image from any prompt
- 🔁 Redo — Regenerate new image using a fresh seed
- 🎨 Like Variations — Artistic reinterpretations with slight prompt tweaks
- ❌ Delete — Instantly remove the message
- Global slash command — Works in any server
- No image branding or attribution

---

## ⚙️ Requirements

- Node.js v16.9.0 or higher
- Discord application with bot token and client ID  
  [Create on Developer Portal](https://discord.com/developers/applications)

---

## 📂 Project Structure

```
image-bot/
├── index.js        # Bot logic
├── .env            # Environment variables (not committed)
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## 🛠️ Setup

### 1. Clone & Install

```bash
git clone https://github.com/unknownzop/ImageBot.git
cd ImageBot
npm install discord.js dotenv express
```

### 2. Create `.env`

Place a `.env` file in the root directory:

```env
DISCORD_TOKEN=your-bot-token
CLIENT_ID=your-client-id
```

### 3. Run the Bot

```bash
node index.js
```

---

## 💬 Usage

Invite the bot to your server and use the slash command:

```
/image prompt: an astronaut surfing a solar flare through deep space
```

After generation, the bot provides buttons to:

- 🔁 Redo — Generate a fresh image of the same prompt
- 🎨 Like Variations — Slightly remix the prompt for creative twists
- ❌ Delete — Remove the generated message

---

## 🔒 Privacy

This bot stores no data, logs no prompts, and tracks nothing. Prompts are used once and discarded. Everything runs client-side in Discord’s interface.

---

## 📄 License

MIT License
```  

Let me know when you're ready to style it further with shields, deploy buttons, or badges.
```
