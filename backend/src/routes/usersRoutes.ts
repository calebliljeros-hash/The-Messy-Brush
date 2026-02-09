import { Router } from 'express'
import {User} from '../models'
import { authenticateToken } from "../middleware/auth";

const router = Router()
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // get all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("No users" );
  }
});

export default router