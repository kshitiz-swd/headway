const Application = require("../models/Application");


const createApplication = async (req, res) => {
    try {
        const application = new Application({
            ...req.body,
            user: req.userId
        });
        await application.save();

        res.status(201).json(application);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Failed to create application" });
    }
};



const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.userId
        }).populate("resume", "title").sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
};



const getApplication = async (req, res) => {
    try {

        const application = await Application.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch application" });
    }
};



const updateApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            req.body,
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: "Failed to update application" });
    }
};



const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(application);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update status" });
    }
};



const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete application" });
    }
};

module.exports = {
    createApplication, getApplications, getApplication, updateApplication, updateStatus, deleteApplication
};