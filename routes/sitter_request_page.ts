import express, { Request, Response } from "express";
import dotenv from "dotenv";

import db from "../data/database";

const router = express.Router();

dotenv.config();

const database = process.env.DATABASE_NAME!;

//LIST OF REQUESTS
router.get("/sitter/requests", async (req: Request, res: Response) => {
  const userRequests = await db.query(
    `SELECT id, user, pet, image_path, care_type, sitter, message, status, created_at FROM ${database}.users_requests;`
  );
  return res.json({ userRequests });
});

//ACCEPT OR REJECT
router.post("/sitter/request_answer", async (req: Request, res: Response) => {
  await db.query(
    `UPDATE ${database}.users_requests SET status = ? WHERE id = ?`,
  [req.body.answer, parseInt(req.body.request_id)]
  );
  return res.send("Sent");
});

export default router;
