import express from 'express'
import {  creatStudents, getAllStudents, loginUser,getUserById, updateUser, deleteUser } from '../controller/user-controller.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router ()

router.post ('/register', creatStudents)
router.get ('/', protect, getAllStudents)
router.get ('/:id', getUserById)
router.post ('/login', loginUser)
router.put ('/update/:id', updateUser)
router.delete ('/delete/:id', deleteUser)

export default router