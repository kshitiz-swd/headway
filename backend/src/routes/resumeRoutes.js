const express = require("express");
const router = express.Router();

const {
    createResume, getResumes, getResume, updateResume, deleteResume } = require("../controllers/resumeController");

const auth = require("../middleware/authMiddleware");

router.post('/', auth, createResume)

router.get('/', auth, getResumes)

router.get('/:id', auth, getResume)

router.put('/:id', auth, updateResume)

router.delete('/:id', auth, deleteResume)


module.exports = router;