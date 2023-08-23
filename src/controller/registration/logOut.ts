import { Request, Response } from "express";
import { validationResult } from "express-validator";
const userModule = require("../../modules/user");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class logOut {
    static logOut(req: Request, res: Response) {
        req.cookie.childCare = " ";

    }
};