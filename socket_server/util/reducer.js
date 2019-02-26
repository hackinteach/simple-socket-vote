const _ = require('lodash')

module.exports = function(data){  
  const a = _.reduce(data, (result, value, key) => { 
    result[value] = (result[value] || 0) + 1
    return result
  }, {})

  return a
}