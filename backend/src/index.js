const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const applicationRoutes = require("./routes/applicationsRoutes.js");
const resumeRoutes = require("./routes/resumeRoutes.js")
const analyticsRoutes = require("./routes/analytics.js")
const pipelineRoutes = require('./routes/pipeline.js')
const insightRoutes = require('./routes/insights.js')
const userRoutes = require('./routes/userRoutes.js')

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors({ origin: ["http://localhost:5173", "https://headway-mocha.vercel.app/auth"], credentials: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use("/api/applications", applicationRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/pipeline", pipelineRoutes);
app.use("/api/insight", insightRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})