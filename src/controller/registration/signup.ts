import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userModule = require('../../modules/user');
class signup {

  static async newUser(req: Request, res: Response) {
    //Check request errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //take params from routs 
    const { id, name, email, mobile, typeCode, password } = req.body;

    const user = await userModule.getUser(email);

    if (user != null && user != undefined) {
      return res.status(400).json({ msg: "email exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const insert = await userModule.createUser(id, typeCode, name, hashedPassword, email, mobile);
    console.log("insert", insert);

    if (insert) {

      try {
        const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
          expiresIn: '24h',
        });
        res.cookie('childCare', token, { maxAge: 900000, httpOnly: true })
        return res.status(201).json({ message: 'User created', token });
      } catch (error) {
        return res.status(500).json({ msg: 'internal server error ' })
      }
    }
    else {
      return res.status(500).json({ msg: 'error' });
    }


  }
};

module.exports = signup;