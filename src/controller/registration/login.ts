import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userModule = require("../../modules/user");

class logIn {
  private static checkPassword = (userPassword: any, DataBasePassword: any) => {
    console.log(bcrypt.hash(userPassword, 10) == DataBasePassword);
    if (bcrypt.hash(userPassword, 10) == DataBasePassword) return 1;
    else return 0;
  };

  static login(req: Request, res: Response) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }


    const { email, password } = req.body;

    const user = userModule.getUser(email);
    console.log('user is ', user);

    if (user) {
      //check password
      if (logIn.checkPassword(password, user.password)) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "24h" }
        );
        res.cookie('childCare',token,{ maxAge: 900000, httpOnly: true})
        res.status(200).json({ msg: "done" });
      }
    } else {
      res.status(400).json({ msg: "User Not found" });
    }
  }
}
module.exports = logIn;
