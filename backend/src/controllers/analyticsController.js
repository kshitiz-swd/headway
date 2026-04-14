const Application = require('../models/Application.js')
const Resume = require('../models/Resume.js')
const mongoose = require('mongoose')


const getStatusAnalytics = async (req, res) => {
    try {

        const stats = await Application.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.userId) }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    status: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({ data: stats });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getTimelineAnalytics = async (req, res) => {
  try {
    const range = req.query.range || "all";

    let startDate = null;
    const now = new Date();

    if (range === "7d") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    }

    if (range === "30d") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 30);
    }

    if (range === "6m") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 6);
    }

    const matchStage = {
      user: new mongoose.Types.ObjectId(req.userId),
    };

    if (startDate) {
      matchStage.applicationDate = { $gte: startDate };
    }

    // 🔥 Decide grouping format
    let format = "%Y-%m"; // monthly default

    if (range === "7d" || range === "30d") {
      format = "%Y-%m-%d"; // daily
    }

    const stats = await Application.aggregate([
      { $match: matchStage },

      {
        $group: {
          _id: {
            $dateToString: {
              format: format,
              date: "$applicationDate",
            },
          },
          count: { $sum: 1 },
        },
      },

      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },

      { $sort: { date: 1 } },
    ]);

    res.json({ data: stats });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPlatformAnalytics = async (req, res) => {
    try {

        const stats = await Application.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.userId) }
            },
            {
                $group: {
                    _id: "$platform",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({ data: stats });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getResumeAnalytics = async (req, res) => {
    try {
        const stats = await Application.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $group: {
                    _id: "$resume",

                    // ✅ total applications
                    applications: { $sum: 1 },

                    // 🔥 total interviews
                    interviews: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Interview"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "resumes",
                    localField: "_id",
                    foreignField: "_id",
                    as: "resumeData"
                }
            },
            {
                $unwind: "$resumeData"
            },
            {
                $project: {
                    _id: "$resumeData._id",
                    title: "$resumeData.title",
                    applications: 1,
                    interviews: 1
                }
            },
            {
                $sort: { applications: -1 }
            }
        ]);

        res.status(200).json({ data: stats });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSummaryAnalytics = async (req, res) => {
    try {

        const totalApplications = await Application.countDocuments({
            user: req.userId
        });

        const interviews = await Application.countDocuments({
            user: req.userId,
            status: "Interview"
        });

        const offers = await Application.countDocuments({
            user: req.userId,
            status: "Offer"
        });

        const rejected = await Application.countDocuments({
            user: req.userId,
            status: "Rejected"
        });

        res.status(200).json({
            data: {
                totalApplications,
                interviews,
                offers,
                rejected
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { getStatusAnalytics, getTimelineAnalytics, getPlatformAnalytics, getSummaryAnalytics, getResumeAnalytics }