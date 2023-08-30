import { promises } from "node:dns";

const DataBase = require('../DataBase/connection')
class user {
    user() { }
    static async createUser(id: number, code: number, name: string, password: string, email: string, mobile: string) {
        // let result = 10;
        let result = await DataBase.query(
            `INSERT into childcare.user 
            (user_id, userType_code, user_name, password, email, mobile_number) 
            VALUES 
            (?,?,?,?,?,?)`,
            [id, code, name, password, email, mobile], (err, rows) => {
                // console.log(err, rows, rows.affectedRows);
                if (err) {
                    console.log("non");
                    return err;
                }
                else {
                    console.log("done");
                    return rows;
                }
            }
        )
        return result;
    }

    static async getUser(email: string) {

// let result = await DataBase.query("SELECT * FROM childcare.user where email =?", [email], function (err, result, fields) {

        //     if (err) return err;
        //     else
        //         return result;

        // });
        // return result;
        return new Promise(function (resolve, reject) {
            DataBase.query(
                "SELECT * FROM childcare.user where email =?", [email],
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows[0]);
                    }

                })
        });
    }
    static editUser(name: string, password: string, email: string, mobile: string) {
        DataBase.query('update table childcare.user set  user_name = ? ,  password = ? email = ? mobile_number = ? where email= ?', [name, password, email, mobile, email], (err: any, rows: any) => {
            if (err) throw err;
            if (err) { return err }
            else { return rows[0] }
        })

    };

    static deleteUser(email) {
        DataBase.query('delete from  childcare.user where email = ?', [email], (err: any, rows: any) => {
            if (err) throw err;
            if (err) { return err }
            else { return rows[0] }
        })

    }
    static alterEnable(enable: boolean) {
        DataBase.query('alter table childcare.user modify column enable = ?', [enable], (err: any, rows: any) => {
            if (err) throw err;
            if (err) { return err }
            else { return rows[0] }
        })
    }

}
module.exports = user;