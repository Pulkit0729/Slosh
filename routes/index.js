const router = require("express").Router();
router.use('/blog', require('./blog'));
router.use('/', require('./auth'));
module.exports = router;
