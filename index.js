var request = require('request');
var cheerio = require('cheerio');

//function to scrape github wiki pages for TulsaJS Events.
function getEventsInfo(user, repo, month, year) {
  request(`https://github.com/${user}/${repo}/wiki/${month}-${year}-Meeting`, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      if($('.gh-header-title').html() != 'Home') {
        var wikiPage = {};
        wikiPage.title = $('.gh-header-title').html();
        wikiPage.when = $('p > strong:contains("When")').next().html();
        wikiPage.time = $('p > strong:contains("Time")').next().html();
        wikiPage.whereName = $('p > strong:contains("Where-Name")').next().html();
        wikiPage.wherePlace = $('p > strong:contains("Where-Place")').next().html();
        wikiPage.topics = $('p > strong:contains("Topics")').parent().next().html();
        wikiPage.success = true;
      } else {
        var wikiPage = {error: 'Event Not Planned!'}
      }
      console.log(wikiPage)
      return wikiPage
    }
  });
}

module.exports = {getEventsInfo};