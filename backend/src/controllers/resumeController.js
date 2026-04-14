const Resume = require('../models/Resume.js');

const createResume = async (req, res) => {
    try {
        const { title, fileUrl, isDefault } = req.body;
        const user = req.userId

        const existingResume = await Resume.findOne({
            user,
            fileUrl
        });

        if (existingResume) {
            return res.status(400).json({
                message: "This resume already exists"
            });
        }

        const resume = await Resume.create({
            user,
            title,
            fileUrl,
            isDefault
        });
        if (isDefault) {
            await Resume.updateMany({ user }, { isDefault: false });
        }


        await resume.save()
        res.status(201).json({
            success: true,
            data: resume
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getResumes = async (req, res) => {
    const user = req.userId
    try {
        const resume = await Resume.find({ user: user })
        res.status(200).json({
            data: resume
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const getResume = async (req, res) => {
    try {

        const resume = await Resume.findOne({ _id: req.params.id, user: req.userId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ data: resume });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateResume = async (req, res) => {
    try {

        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ data: resume });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteResume = async (req, res) => {
    try {

        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createResume, getResumes, getResume, updateResume, deleteResume };