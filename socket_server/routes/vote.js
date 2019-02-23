var express = require('express');
var router = express.Router();

const _ = require('lodash');

module.exports = ({io, data}) => {
  router.post('/', (req, res, next) => {
    const {sender, answer} = req.body
    data[sender] = answer

    const reducer = _.reduce(data, (result, value, key) => {
      
      if (value === false){
        result['NO']++
      } else if (value === true){
        result['YES']++
      }

      return result
    }, {'NO': 0, 'YES': 0})
    io.emit("result", reducer)
    res.json({status: "success", reducer})
  })
  
  return router
};
