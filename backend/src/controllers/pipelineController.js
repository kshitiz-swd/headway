const Application = require('../models/Application')


const getPipeline = async (req, res) => {
    try {
        const user = req.userId
        const applications = await Application.find({ user })      

        const pipeline = {
            Applied: [],
            Offered: [],
            Rejected: [],
            Interviewing: []
        }
        applications.forEach(app => {
            if (pipeline[app.status])
                pipeline[app.status].push(app)
        })

        res.status(200).json({ data: pipeline })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getPipeline }