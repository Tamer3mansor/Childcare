import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userModule = require("../../modules/user");

class logIn {

  static async login(req: Request, res: Response) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }


    const { email, password } = req.body;

    const user = await userModule.getUser(email);

    if (user.email) {

      bcrypt.compare(password, user.password, function (err, result) {
        console.log(password, user.password);

        console.log(err, result);

        if (result == true) {
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "24h" }
          );
          res.cookie('childCare', token, { maxAge: 900000, httpOnly: true })
          console.log(token);

          res.status(200).json({ msg: "done" });
        }
        else {
          res.status(400).json({ msg: "error " });
        }
      });
    }


  }
}
module.exports = logIn;
