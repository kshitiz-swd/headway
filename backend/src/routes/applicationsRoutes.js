const express = require("express");
const router = express.Router();

const {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    updateStatus,
    deleteApplication
} = require("../controllers/applicationContoller");

const auth = require("../middleware/authMiddleware");


router.post("/", auth, createApplication);

router.get("/", auth, getApplications);

router.get("/:id", auth, getApplication);

router.put("/:id", auth, updateApplication);

router.patch("/:id/status", auth, updateStatus);

router.delete("/:id", auth, deleteApplication);


module.exports = router;