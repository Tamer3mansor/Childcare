const DataBase = require('../DataBase/connection')
class user {
    static id = 1;
    user() {
    }
    static createUser(id: number, code: number, name: string, password: string, email: string, mobile: string) {



        DataBase.query(
            `INSERT into childcare.user 
            (user_id, userType_code, user_name, password, email, mobile_number) 
            VALUES 
            (2,3,"tamer","sad","bad@gmail","0101")`,
            [], (err, result) => {
                console.log(id, code, name, password, email, mobile, err, result);
                if (!err)
                    return result
                else
                    return err;
            }
        )
    }
    static getUser(email: string) {
        DataBase.query('select * from user where email = ?', [email], (err, result) => {
            if (!err)
                return result;
            else
                return err;
        }

        )
    }

}
module.exports = user;