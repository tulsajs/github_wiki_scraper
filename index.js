var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');

//function to scrape github wiki pages for TulsaJS Events.
function getEventsInfo(github) {
  return new Promise(function (resolve, reject) {
    request(`https://github.com/${github.user}/${github.repo}/wiki/${github.month}-${github.year}-Meeting`, function (error, response, html) {
      if (error) reject(error);
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        if($('.gh-header-title').html() != 'Home') {
          var wikiPage = {};
          wikiPage.topics = [];
          wikiPage.title = $('.gh-header-title').html();
          wikiPage.when = $('p > strong:contains("When")').next().html();
          wikiPage.time = $('p > strong:contains("Time")').next().html();
          wikiPage.meetup = $('p > strong:contains("Meetup")').next().html();
          wikiPage.meetupId = $('p > strong:contains("Meetup-id")').next().html();
          wikiPage.whereName = $('p > strong:contains("Where-Name")').next().html();
          wikiPage.wherePlace = $('p > strong:contains("Where-Place")').next().html();
          $('p > strong:contains("Topics")').parent().next().children('li').each(function(li){
            wikiPage.topics.push($(this).text());
          })
          wikiPage.url = `https://github.com/${github.user}/${github.repo}/wiki/${github.month}-${github.year}-Meeting`;
          wikiPage.success = true;
        } else {
          var wikiPage = {error: 'Event Not Planned!'}
        }
        resolve(wikiPage);
      }
    });
  });
}

module.exports = {getEventsInfo};
