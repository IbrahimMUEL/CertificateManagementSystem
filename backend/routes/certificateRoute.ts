import express from "express";
import { createCertificate } from "../controllers/certificateController.js";
// We will create a router object
const router = express.Router();
router.post("/create", createCertificate);
// We will export the router
export default router;
