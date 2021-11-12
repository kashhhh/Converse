const Pool=require('pg').Pool;

const pool= new Pool({
  user: "postgres",
  password: "6xAK5^mO",
  database: "chatapp",
  host: "localhost",
  post:5432
});

module.exports= pool;