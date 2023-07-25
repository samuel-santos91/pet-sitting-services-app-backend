import express, { Request, Response } from "express";

import db from "../data/database";

const router = express.Router();

//LIST REQUESTS
router.get("/customer/requests", async (req: Request, res: Response) => {
  const userRequests = await db.query(
    "SELECT id, user, pet, care_type, sitter, message, status, created_at FROM sql6635153.users_requests;"
  );
  return res.json({ userRequests });
});

//DELETE REQUESTS
router.post("/customer/delete", async (req: Request, res: Response) => {
  await db.query("DELETE FROM sql6635153.users_requests WHERE id = (?)", [
    req.body.deleteId
  ]);
  return res.send("deleted");
});

export default router;
