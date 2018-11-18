let pg = require('pg');

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL || 'postrgresql://elpoeta:elpoeta@localhost:5432/test_login_db';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString,
});

class DB{
    static async findUserByEmail(email){
         try{

          const  { rows }  = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
     
          return rows[0];
         } 
          catch(e ){
            setImmediate(() => { throw e });
          }
          }
          static async findUserById(id){
            try{
   
             const  { rows }  = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
         
             return rows[0];
            } 
             catch(e ){
               setImmediate(() => { throw e });
             }
             }
             
          static async insertUser(user){
            try{
              console.log('dbinsU > ',user);
                const { rows } = await pool.query('INSERT INTO users (googleid, email, name, lastname, image, password) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [user.googleid,user.email,user.name,user.lastname,user.image,user.password]);
             
                return rows;
            
            } 
             catch(e ){
               setImmediate(() => { throw e });
             }
             }
   

      static async end(){
        try{

          pool.end();
          }catch( e ){
            setImmediate(() => {throw e});
      }
    
}
}
module.exports = DB;