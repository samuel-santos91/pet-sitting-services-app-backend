import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

import db from "../data/database";

const router = express.Router();

dotenv.config();

const database = process.env.MYSQL_ADDON_DB!;

//LIST OF SITTERS
router.get("/customer/sitters", async (req: Request, res: Response) => {
  const existingSitter = await db.query(
    `SELECT id, first_name, last_name, summary, hour_rate, day_rate FROM ${database}.sitters_info;`
  );
  return res.json({ existingSitter });
});

//STORE IN SERVER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//POST IN DATABASE
router.post(
  "/customer/post",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const userRequest = [
      req.body.user,
      req.body.pet,
      req.body.care,
      req.body.sitter,
      req.body.message,
      req.file?.path,
    ];
    await db.query(
      `INSERT INTO ${database}.users_requests (user, pet, care_type, sitter, message, image_path) VALUES (?)`,
      [userRequest]
    );
    console.log(req.body);
    console.log(req.file);
    res.send("request added");
  }
);

export default router;
