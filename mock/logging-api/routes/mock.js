var express = require('express');
var router = express.Router();

/* POST logging api. */
router.post('/logging', function(req, res, next) {
  console.log("Request Body: " + JSON.stringify(req.body));

  if (!req.body.level) {
    console.error("no level");
    res.sendStatus(400);
    return;
  }
  if (!req.body.timestamp) {
    console.error("no timestamp");
    res.sendStatus(400);
    return;
  }
  if (!req.body.message) {
    console.error("no message");
    res.sendStatus(400);
    return;
  }

  console.log(`[${req.body.level}] ${req.body.timestamp} - ${req.body.message}`);
  res.status(200);
  res.json({});
});

module.exports = router;
