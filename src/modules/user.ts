const DataBase = require('../DataBase/connection')
class user {
    user(){
    }
    static createUser(id:number ,code:number ,name:string,password:string,email:string,mobile:string ){
        DataBase.query( 'insert into user (user_id, userType_code, user_name, password, email, mobile_number, created_on, created_by, update_by) value(?,?,?,?,?,?)',[id,code,name,password,email,mobile],(err,result)=>{
             if(!err)
             return 'one user inserted'
        }

        )
    }
    static getUser(email:string){
        DataBase.query( 'select email from user where (email = ?) ',[email],(err,result)=>{
             if(!err)
              return result;
            else
            return err;
        }

        )
    }
   
}
module.exports = user ;