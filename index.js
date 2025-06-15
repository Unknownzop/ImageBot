const express = require('express');
const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require('discord.js');

const DISCORD_TOKEN = 'your-bot-token-here';
const CLIENT_ID = 'your-application-id-here';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register global slash command
const commands = [
  new SlashCommandBuilder()
    .setName('image')
    .setDescription('Generate an image from a text prompt')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Describe the image you want')
        .setRequired(true))
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash command registered globally');
  } catch (err) {
    console.error('❌ Error registering slash command:', err);
  }
})();

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand() && interaction.commandName === 'image') {
    const prompt = interaction.options.getString('prompt');
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${seed}`;

    const embed = new EmbedBuilder()
      .setTitle('🖼️ Your Image')
      .setDescription(prompt)
      .setImage(imageUrl);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`variation|${prompt}`).setLabel('Like Variations').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(`redo|${prompt}`).setLabel('Redo').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('delete').setLabel('Delete').setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'delete') {
      await interaction.message.delete().catch(() => {});
      return;
    }

    const [action, prompt] = interaction.customId.split('|');
    const seed = Math.floor(Math.random() * 1000000);
    const modifiedPrompt = action === 'variation' ? `${prompt}, variation` : prompt;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(modifiedPrompt)}?nologo=true&seed=${seed}`;

    const embed = new EmbedBuilder()
      .setTitle('🖼️ New Image')
      .setDescription(prompt)
      .setImage(imageUrl);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`variation|${prompt}`).setLabel('Like Variations').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(`redo|${prompt}`).setLabel('Redo').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('delete').setLabel('Delete').setStyle(ButtonStyle.Danger)
    );

    await interaction.deferUpdate();
    await interaction.followUp({ embeds: [embed], components: [row] });
  }
});

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

// Express server to keep app alive
const app = express();
app.get('/', (_, res) => res.send('Image Bot is running.'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));
