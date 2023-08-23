const DataBase = require('../DataBase/connection')
class user {
    user() { }
    static createUser(id: number, code: number, name: string, password: string, email: string, mobile: string) {
        let result = 0;
        DataBase.query(
            `INSERT into childcare.user 
            (user_id, userType_code, user_name, password, email, mobile_number) 
            VALUES 
            ("?","?","?","?","?","?")`,
            [id, code, name, password, email, mobile], (err, rows) => {
                console.log(err, rows);
                if (err) {
                    console.log("non");
                    return err
                }
                else {
                    console.log("done");
                    return 1;
                }
            }
        )

    }
    static getUser(email: string) {
        DataBase.query(`select * from user where email =?`, [email], (err, rows) => {
            if (err) throw err;

            console.log(err, rows[0], err, rows);

            if (err) { return err }
            else { return rows[0] }
        });

    }
    static editUser(name: string, password: string, email: string, mobile: string) {
        DataBase.query('update table user set  user_name = ? ,  password = ? email = ? mobile_number = ? where email= ?', [name, password, email, mobile, email], (err: any, rows: any) => {
            if (err) throw err;


            if (err) { return err }
            else { return rows[0] }
        })

    };

    static deleteUser(string, email) {
        DataBase.query('delete from  user where email = ?', [email], (err: any, rows: any) => {
            if (err) throw err;


            if (err) { return err }
            else { return rows[0] }
        })

    }
    static alterEnable(enable: boolean) {
        DataBase.query('alter table user modify column enable = ?', [enable], (err: any, rows: any) => {
            if (err) throw err;


            if (err) { return err }
            else { return rows[0] }
        })
    }

}
module.exports = user;