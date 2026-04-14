const mongoose = require('mongoose');
const Application = require('../models/Application');

const getInsights = async (req, res) => {
    try {

        const now = new Date();

        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        const thisMonthApps = await Application.countDocuments({
            user: req.userId,
            applicationDate: { $gte: startOfThisMonth }
        });

        const lastMonthApps = await Application.countDocuments({
            user: req.userId,
            applicationDate: {
                $gte: startOfLastMonth,
                $lte: endOfLastMonth
            }
        });

        const calcChange = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return (((current - previous) / previous) * 100).toFixed(1);
        };

        const thisMonthInterviews = await Application.countDocuments({
            user: req.userId,
            status: "Interviewing",
            applicationDate: { $gte: startOfThisMonth }
        });

        const lastMonthInterviews = await Application.countDocuments({
            user: req.userId,
            status: "Interviewing",
            applicationDate: {
                $gte: startOfLastMonth,
                $lte: endOfLastMonth
            }
        });

        const thisMonthOffers = await Application.countDocuments({
            user: req.userId,
            status: "Offered",
            applicationDate: { $gte: startOfThisMonth }
        });

        const lastMonthOffers = await Application.countDocuments({
            user: req.userId,
            status: "Offered",
            applicationDate: {
                $gte: startOfLastMonth,
                $lte: endOfLastMonth
            }
        });

        const thisMonthRejections = await Application.countDocuments({
            user: req.userId,
            status: "Rejected",
            applicationDate: { $gte: startOfThisMonth }
        });

        const lastMonthRejections = await Application.countDocuments({
            user: req.userId,
            status: "Rejected",
            applicationDate: {
                $gte: startOfLastMonth,
                $lte: endOfLastMonth
            }
        });

        const totalApplications = await Application.countDocuments({
            user: req.userId
        });

        const interviews = await Application.countDocuments({
            user: req.userId,
            status: "Interviewing"
        });

        const offers = await Application.countDocuments({
            user: req.userId,
            status: "Offered"
        });

        const interviewRate = totalApplications
            ? ((interviews / totalApplications) * 100).toFixed(1)
            : 0;

        const offerRate = totalApplications
            ? ((offers / totalApplications) * 100).toFixed(1)
            : 0;

        const bestPlatform = await Application.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.userId) } },
            { $group: { _id: "$platform", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        res.status(200).json({
            applications: {
                value: thisMonthApps,
                change: calcChange(thisMonthApps, lastMonthApps)
            },
            interviews: {
                value: thisMonthInterviews,
                change: calcChange(thisMonthInterviews, lastMonthInterviews)
            },
            offers: {
                value: thisMonthOffers,
                change: calcChange(thisMonthOffers, lastMonthOffers)
            },
            rejections: {
                value: thisMonthRejections,
                change: calcChange(thisMonthRejections, lastMonthRejections)
            },
            interviewRate,
            offerRate,
            bestPlatform: bestPlatform[0]?._id || null
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getInsights };