var express = require('express');
var router = express.Router();
const outputReducer = require('../util/reducer')

const _ = require('lodash');

module.exports = ({io, data}) => {
  router.post('/', (req, res) => {
    const {sender, answer} = req.body
    data[sender] = answer
    const reducer = outputReducer(data)
    io.emit("result", reducer)
    res.json({status: "success"})
  })

  router.get('/', (req, res, next) => {
    const reducer = outputReducer(data)
    res.json(reducer)
  })
  
  return router
};
