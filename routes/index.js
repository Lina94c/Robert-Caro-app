const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render({ title: 'Express vamos por buen camino' });
});

module.exports = router;
