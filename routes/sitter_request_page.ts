import express, { Request, Response } from "express";

import db from "../data/database";

const router = express.Router();

//LIST OF REQUESTS
router.get("/sitter/requests", async (req: Request, res: Response) => {
  const userRequests = await db.query(
    "SELECT id, user, pet, image_path, care_type, sitter, message, status, created_at FROM marketplace_app.users_requests;"
  );
  return res.json({ userRequests });
});

//ACCEPT OR REJECT
router.post("/sitter/request_answer", async (req: Request, res: Response) => {
  await db.query(
    "UPDATE marketplace_app.users_requests SET status = ? WHERE id = ?",
  [req.body.answer, parseInt(req.body.request_id)]
  );
  return res.send("Sent");
});

export default router;
