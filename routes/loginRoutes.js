// load up the user model
var users = require('../models/users');

module.exports = function(app, passport) {

    // =====================================
    // MENU PAGE
    // =====================================
    app.get('/menu', function(req, res) {
      res.render('menu.ejs', {
          username : req.user === undefined ? "Guest" : req.user.username
      });
    });

    // =====================================
    // ADMIN PAGE
    // =====================================
    app.get('/admin', dashboardAuthenticationCheck, function(req, res) {
      res.render('dashboard.ejs', {
          user : req.user, // get the user out of session and pass to template
          message : null
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
