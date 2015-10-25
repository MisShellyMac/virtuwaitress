var express = require('express');
var router = express.Router();
var ordersController = require('../controllers/orders');

// POST /pay
router.post('/', function(req, res, next) {

  if (req.user === undefined)
  {
    // Nobody is signed in, so this is not a valid request.
    res.status(500).json([]);
    return;
  }

  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")("sk_test_nGwEpegVNPU4VAn68MPL4uNe");

  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 2000, // TODO: amount in cents
    currency: "usd",
    source: stripeToken,
    description: "Charge from Cohort Cafe"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.render('paymentFailure.ejs');
    }
    else {
      // The charge was successful
      res.render('paymentSuccess.ejs');

      // Use the controller directly.
      // We don't expose a pay API on the model because
      // we don't want anyone to be able to call it outside of the
      // Stripe verification

      //TODO: Fix bug once we have internet
      ordersController.pay(req.user.id, res);
    }
  });

});

module.exports = router;
