const express = require('express')
const router = express.Router()
const StatsController = require('../controller/StatsController')

router.route('/')
.all(StatsController.getAllStats)

module.exports = router