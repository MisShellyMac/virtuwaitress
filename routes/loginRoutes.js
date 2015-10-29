// load up the user model
var users = require('../models/users');
var approvedSocialMedia = require('../models/approvedSocialMedia');

module.exports = function(app, passport) {

    // =====================================
    // MENU PAGE
    // =====================================
    app.get('/menu', function(req, res) {
        approvedSocialMedia.getAllApprovedSocialMediaDirectly(function(result) {
          console.log(result);
          res.render('menu.ejs', {
            username : req.user === undefined ? "Guest" : req.user.username,
            loginOrLogoutLink : req.user === undefined ? "/login" : "/logout",
            user_id : req.user === undefined ? 0 : req.user.id,
            socialMediaItems: result
          });
      });
    });

    // =====================================
    // RATING PAGE
    // =====================================
    app.get('/rating', function(req, res) {
      res.render('rating.ejs', {
          username : req.user === undefined ? "Guest" : req.user.username,
          user_id : req.user === undefined ? 0 : req.user.id
      });
    });

    // =====================================
    // ORDER PAGE
    // =====================================
    app.get('/order', function(req, res) {
      res.render('order.ejs', {
        username : req.user === undefined ? "Guest" : req.user.username,
        user_id : req.user === undefined ? 0 : req.user.id
      });
    });

    // =====================================
    // ADMIN DASHBOARD: MAIN PAGE
    // =====================================
    app.get('/admin', dashboardAuthenticationCheck, function(req, res) {
      res.render('dashboard.ejs', {
          user : req.user, // get the user out of session and pass to template
          message : null
      });
    });

    // =====================================
    // ADMIN DASHBOARD: SOCIAL MEDIA PAGE
    // =====================================
    app.get('/socialMedia', dashboardAuthenticationCheck, function(req, res) {

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
          //  console.log(tweets);
          for (var i = 0; i < tweets.statuses.length; i++)
          {
            var tweet = tweets.statuses[i];
            liveSocialMediaItems.push({
              type: "twitter",
              text: tweet.text,
              username: tweet.user.screen_name,
              image_url_https: tweet.user.profile_image_url_https
            });
          }

          // this will return results searching for the hashtag of the business
          client.get('search/tweets', {q: '#cohortcafe'}, function(error, tweets, response){
          //  console.log(tweets);
          for (var i = 0; i < tweets.statuses.length; i++)
          {
            var tweet = tweets.statuses[i];
            liveSocialMediaItems.push({
              type: "twitter",
              text: tweet.text,
              username: tweet.user.screen_name,
              image_url_https: tweet.user.profile_image_url_https
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
                  image_url: gram.user.profile_picture.replace('http://', 'https://')
                });
              }

              res.render('socialMedia.ejs', {
                  user : req.user, // get the user out of session and pass to template
                  message : null,
                  liveSocialMediaItems : liveSocialMediaItems
              });
            }); // End of instagram get
          }); // End of 2nd twitter get
        }
      }); // End of 1st twitter get
    });

    // =====================================
    // ADMIN DASHBOARD: HISTORY
    // =====================================
    app.get('/history', dashboardAuthenticationCheck, function(req, res) {
      res.render('history.ejs', {
          user : req.user // get the user out of session and pass to template
      });
    });

    // =====================================
    // ADMIN DASHBOARD: HISTORY
    // =====================================
    app.get('/analytics', dashboardAuthenticationCheck, function(req, res) {
      res.render('analytics.ejs', {
          user : req.user // get the user out of session and pass to template
      });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin', // redirect to the secure dashboard section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', signupAuthenticationCheck, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', signupAuthenticationCheck, function(req, res) {

      var username = req.body.username;
      var password = req.body.password;

      // find a user whose username is the same as the form's username
  		// we are checking to see if the user trying to login already exists
      users.findOne(username, function(err, user) {
        console.log("RETURNED: " + user);
        // check to see if theres already a user with that username
        if (user) {
          res.render('dashboard.ejs', {
              user : req.user, // the same old user (not the new one)
              message : 'That username is already taken.'
          });
        } else {
          // if there is no user with that username
          // create the user
          users.create(username, password, false /*isAdmin*/,
            function(err, user) {
              var failureMessage = null;
              if (err) {
                failureMessage = 'Unknown error: ' + err;
              }
              // The user has been created
              res.render('dashboard.ejs', {
                  user : req.user, // the same old user (not the new one)
                  message : failureMessage
              });
            }
          );
        }
      });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function dashboardAuthenticationCheck(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.isadmin)
        return next();
    else if (req.isAuthenticated())
      res.redirect('/');
    else
      res.redirect('/login');
}

function signupAuthenticationCheck(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.isadmin)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
