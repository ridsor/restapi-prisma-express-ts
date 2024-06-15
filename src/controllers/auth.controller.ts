import { Request, Response } from "express";
import { getUserByEmail, signup } from "../services/auth.service";

export default class AuthController {
  static async signup(req: Request, res: Response) {
    const body = req.body;

    if (typeof body.name === "undefined" || typeof body.email === "undefined")
      return res.status(400).json({
        status: false,
        message: "Some fields are missing",
      });

    const user = await getUserByEmail(body.email);
    if (user)
      return res.status(400).json({
        status: false,
        message: "Email is already exists",
      });

    const result = await signup(body);

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: result,
    });
  }
}
