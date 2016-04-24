scraper = require('./index.js');

var github = {user: 'TulsaJS', repo: 'tulsajs.com', month: 'May', year: 2016}

scraper.getEventsInfo(github, function(results) {
  console.log(results)
})