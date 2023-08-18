const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.get('/follower-count', async (req, res) => {
  try {
    const response = await fetch('https://livecounts.io/twitch-live-follower-counter/wavydavyttv');
    const html = await response.text();

    // Extract the follower count using regex
    const followerCountMatch = html.match(/<span class="odometer-value">(\d+)<\/span>/);
    const followerCount = followerCountMatch ? followerCountMatch[1] : 'N/A';

    res.json({ followerCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch follower count' });
  }
});

module.exports = app;
