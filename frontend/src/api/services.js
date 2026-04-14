import API from "./api"

//AUTH
export const signUp = (data) => API.post('/auth/register', data)

export const loginUser = (data) => API.post('/auth/login', data)

export const getUser = () => API.get('/auth/me')

export const logout = () => API.post('/auth/logout',)


//APPLICATIONS

export const createApplication = (data) => API.post('/applications', data)

export const getApplications = () => API.get('/applications')

export const getApplication = (id) => API.get(`/applications/${id}`)

export const updateApplication = (id, data) => API.put(`/applications/${id}`, data)

export const updateApplicationStatus = (id, status) => API.patch(`/applications/${id}/status`, { status })

export const deleteApplication = (id) => API.delete(`/applications/${id}`);

//RESUME

export const getResumes = () => API.get("/resumes");

export const getResume = (id) => API.get(`/resumes/${id}`);

export const createResume = (data) => API.post("/resumes", data);

export const updateResume = (id, data) => API.put(`/resumes/${id}`, data);

export const deleteResume = (id) => API.delete(`/resumes/${id}`);


//ANALYTICS

export const getStatusAnalytics = () => API.get("/analytics/status");

export const getPlatformAnalytics = () => API.get("/analytics/platforms");

export const getTimelineAnalytics = (range = "all") => API.get(`/analytics/timeline?range=${range}`);

export const getResumeAnalytics = () => API.get("/analytics/resumes");

export const getSummaryAnalytics = () => API.get("/analytics/summary");



//INSIGHT
export const getInsights = () => API.get('/insight')

//PIPELINE
export const getPipeline = () => API.get("/pipeline");


//SETTINGS
export const updateProfile = (data) => API.put("/users/profile", data);

export const changePassword = (data) => API.put("/users/password", data);

export const deleteAccount = (data) => API.delete("/users", { data });