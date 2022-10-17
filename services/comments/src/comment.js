const express = require('express');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/post/:id/comments', async (req, res) => {
  const postID = { req };
  await res.json(`Comments for post ${postID}`);
})

app.listen(PORT);
