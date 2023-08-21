import { Request, Response } from "express";
import { validationResult } from "express-validator";
const userModule = require("../../modules/user");
import jwt from "jsonwebtoken";
class userProfile {
    private static async checkCookies(req: Request) {
        let token = req.cookie.childCare;
        let ver = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (ver) return 1;
        else return 0;
    }
    private static validate(req: Request) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return false;
        }
        else {
            return true;
        }
    }
    static async getUser(req: Request, res: Response) {
        let { email } = req.body;
        if (!userProfile.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!userProfile.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        let result = await userModule.getUser(email);
        if (result) {
            res.status(200).json({ msg: result });
        }
        else {
            res.status(500).json({ msg: "internal error" });

        }

    };
    static editUser() {

    };
    static deleteUser() {

    };
    static enableUser() {

    };
    static disableUser() {

    };


}