const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware.js')

const {
    getStatusAnalytics,
    getTimelineAnalytics,
    getPlatformAnalytics,
    getResumeAnalytics,
    getSummaryAnalytics
} = require("../controllers/analyticsController.js")

router.get('/status', auth, getStatusAnalytics)
router.get('/timeline', auth, getTimelineAnalytics)
router.get('/platforms', auth, getPlatformAnalytics)
router.get('/resumes', auth, getResumeAnalytics)
router.get('/summary', auth, getSummaryAnalytics)

module.exports = router;