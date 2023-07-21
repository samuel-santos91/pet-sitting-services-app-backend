import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import db from "../data/database";

const router = express.Router();

dotenv.config();

///////////////////////////////////////////////

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server");
});

////////////////////////////////////////////////

//SIGN UP
router.post("/sign-up", async (req: Request, res: Response) => {
  const email = req.body.email;
  const existingUser = await db.query(
    "SELECT * FROM heroku_d1337da861f75bf.users_info WHERE email = ?",
    [email]
  );

  const existingSitter = await db.query(
    "SELECT * FROM heroku_d1337da861f75bf.sitters_info WHERE email = ?",
    [email]
  );

  if (
    (Array.isArray(existingUser[0]) && existingUser[0].length > 0) ||
    (Array.isArray(existingSitter[0]) && existingSitter[0].length > 0)
  ) {
    console.log("User exists");
    return res.status(400).send("Email already exists");
  } else {
    console.log("User does not exist");
  }

  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12); // NUMBER 12 IS THE SALT (INCREASES THE SECURITY)

  if (req.body.type === "customer") {
    const userData = [
      req.body.firstName,
      req.body.lastName,
      email,
      hashedPassword,
      req.body.type,
    ];
    await db.query(
      "INSERT INTO heroku_d1337da861f75bf.users_info (first_name, last_name, email, password, type) VALUES (?)",
      [userData]
    );
  } else if (req.body.type === "sitter") {
    const sitterData = [
      req.body.firstName,
      req.body.lastName,
      email,
      hashedPassword,
      req.body.type,
      req.body.summary,
      req.body.hourRate,
      req.body.dayRate,
    ];
    await db.query(
      "INSERT INTO heroku_d1337da861f75bf.sitters_info (first_name, last_name, email, password, type, summary, hour_rate, day_rate) VALUES (?)",
      [sitterData]
    );
  }

  res.send("added");
});

//////////////////////////////////////////////////////

//SIGN IN
router.post("/log-in", async (req: Request, res: Response) => {
  const registeredUser = (await db.query(
    "SELECT * FROM heroku_d1337da861f75bf.users_info WHERE email = ?",
    [req.body.email]
  )) as RowDataPacket[];

  const registeredSitter = (await db.query(
    "SELECT * FROM heroku_d1337da861f75bf.sitters_info WHERE email = ?",
    [req.body.email]
  )) as RowDataPacket[];

  if (Array.isArray(registeredUser[0]) && registeredUser[0].length > 0) {
    console.log("Email exists");

    const hashedPassword = registeredUser[0][0].password;
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      hashedPassword
    );
    if (passwordMatch) {
      console.log("Logged in successfully");
      const id = registeredUser[0][0].id;
      const token = jwt.sign({ id }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });
      return res.json({ Login: true, token, registeredUser });
    } else {
      console.log("Invalid password");
      return res.json("Invalid password");
    }
  } else if (Array.isArray(registeredSitter[0]) && registeredSitter[0].length > 0) {
    console.log("Email exists");

    const hashedPassword = registeredSitter[0][0].password;
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      hashedPassword
    );
    if (passwordMatch) {
      console.log("Logged in successfully");
      const id = registeredSitter[0][0].id;
      const token = jwt.sign({ id }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });
      return res.json({ Login: true, token, registeredSitter });
    } else {
      console.log("Invalid password");
      return res.json("Invalid password");
    }
  } else {
    console.log("Email does not exist");
    return res.json("Email does not exist");
  }
});

/////////////////////////////////////////////////////////

//AUTH PAGES
interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.slice(7);

    if (!token) {
      throw new Error();
    }
    (req as CustomRequest).token = jwt.verify(token, process.env.SECRET_KEY!);

    next();
  } catch (err) {
    res.status(401).json("Please authenticate");
  }
};

router.get("/customer", auth, (req: Request, res: Response) => {
  return res.json({ Login: true });
});

router.get("/sitter", auth, (req: Request, res: Response) => {
  return res.json({ Login: true });
});

export default router;
