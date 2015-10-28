// load up the user model
var users = require('../models/users');
var socialMedia = require('../models/socialMedia');

module.exports = function(app, passport) {
    // =====================================
    // ADMIN DASHBOARD PAGE
    // =====================================
    app.get('/socialmedia', function(req, res) {

      var Twitter = require('twitter');

      var liveSocialMediaItems = [];

      var client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET
      });
    //this will return the result of tweets with mentions to @business
      client.get('search/tweets', {q: '@cohortcafe'}, function(error, tweets, response){
        if (tweets == null)
        {
          // In case of error, render the page without the live social media items
          res.render('dashboard.ejs', {
              user : req.user, // get the user out of session and pass to template
              message : null,
              liveSocialMediaItems : []
          });
        }
        else
        {
          for (var i = 0; i < tweets.statuses.length; i++)
          {
            var tweet = tweets.statuses[i];
            liveSocialMediaItems.push({
              type: "twitter",
              text: tweet.text,
              username: tweet.user.screen_name,
              image_url: tweet.user.profile_image_url
            });
          }

          // this will return results searching for the hashtag of the business
          client.get('search/tweets', {q: '#cohortcafe'}, function(error, tweets, response){
          for (var i = 0; i < tweets.statuses.length; i++)
          {
            var tweet = tweets.statuses[i];
            liveSocialMediaItems.push({
              type: "twitter",
              text: tweet.text,
              username: tweet.user.screen_name,
              image_url: tweet.user.profile_image_url
            });
          }

          var ig = require('instagram-node').instagram();


          ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
          ig.use({ client_id: process.env.INSTAGRAM_CLIENT_ID,
                   client_secret: process.env.INSTAGRAM_CLIENT_SECRET });

          // there is no current api endpoint for @mentions for instagram. It would be up to the individual businesses/users to possibly repost grams that they were mentioned in so that it would then be visible to api call in future as a post by the business/user.

            ig.tag_media_recent('cohortcafe', function(err, medias, pagination, remaining, limit) {
            //  console.log(medias);
              for (var i = 0; i < medias.length; i++)
              {
                var gram = medias[i];
                liveSocialMediaItems.push({
                  type: "instagram",
                  text: gram.caption.text,
                  username: gram.user.username,
                  image_url: gram.user.profile_picture
                });
              }

              res.render('socialmedia.ejs', {
                  user : req.user, // get the user out of session and pass to template
                  message : null,
                  liveSocialMediaItems : liveSocialMediaItems
              });
            }); // End of instagram get
          }); // End of 2nd twitter get
        }
      }); // End of 1st twitter get
    });
  };
