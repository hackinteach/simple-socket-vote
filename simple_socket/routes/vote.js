const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {io} = require('../socket');

let summary = []
io.on('connect', (socket)=>{
  socket.emit('init', summary)
})
/* GET users listing. */
router.post('/', function(req, res, next) {
  const {sender, answer} = req.body;
  if (!summary[answer]) {
    summary[answer] = []
  }
  summary.push({sender, answer})
  io.emit('summary', {sender, answer})
  res.json({status: "success"})
});

module.exports = router;
