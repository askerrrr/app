const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.json());

router.get('/api/user')

module.exports = router;
