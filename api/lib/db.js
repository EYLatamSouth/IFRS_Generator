const mongoose = require('mongoose');
const { colors, log } = require("mercedlogger");

require('dotenv-safe').config();

mongoose.connect(process.env.MONGODB_URL, { 
    // poolSize: 10,
    authSource: "admin",
    // user: "root",
    // pass: "example",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  log.cyan('DB STATUS', 'connected successfully'); 
});