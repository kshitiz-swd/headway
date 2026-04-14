const express = require('express')
const auth = require('../middleware/authMiddleware')
const {getPipeline} = require('../controllers/pipelineController')

const router = express.Router()

router.get("/", auth, getPipeline)


module.exports = router