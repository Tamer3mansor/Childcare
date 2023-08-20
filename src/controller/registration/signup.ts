import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userModule = require('../../modules/user');
class signup {
  static id = 0;
  static async newUser(req: Request, res: Response) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, mobile, typeCode, password } = req.body;
    try {
      const user = await userModule.getUser(email);
      if (user) {
        res.status(400).json({ msg: "email exist" });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insert = await userModule.createUser(signup.id++, typeCode, name, hashedPassword, email, mobile);
    console.log(insert);

    if (insert)
      res.status(200).json({ msg: 'created' });
    else {
      res.status(500).json({ msg: 'error1' });
    }
    try {
      const token = jwt.sign({ userId: this.id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '24h',
      });

      res.status(201).json({ message: 'User created', token });
    } catch (error) {
      res.status(500).json({ msg: 'internal server error' })
    }

  }
};

module.exports = signup;