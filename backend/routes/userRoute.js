import express from 'express'
const router = express.Router()
import { profile, addJobs, deleteJob } from '../controllers/user.js'
import verifyUser from '../middleware/verifyUser.js'

router.route('/profile').get(verifyUser, profile)
router.route('/addJobs').post(verifyUser, addJobs)
router.route('/deleteJob/:id').delete(verifyUser, deleteJob)

export default router