const express=require('express');
const router = express.Router();
const pool = require('./../db');

router.get('/', async (req,res) => {
  const allConnections= await pool.query(
    "SELECT c.*,u.username,u.status,u.created_on FROM users AS u INNER JOIN connections AS c ON c.other_user=u.USER_ID order by c.msg_status, u.status desc;"
  );
  return res.send(JSON.stringify(allConnections.rows, null, 4));
});

router.get('/:user_id', async (req,res) => {
  const user= await pool.query(
    "SELECT c.*,u.username,u.status,u.created_on FROM users AS u INNER JOIN connections AS c ON c.other_user=u.USER_ID where c.user_id=$1 order by c.msg_status desc, u.status desc;",[req.params.user_id],
  );
  return res.send(JSON.stringify(user.rows, null, 4));
});

router.get('/:room_key/:user_id', async (req,res) => {
  const connection = await pool.query(
    "SELECT * FROM connections WHERE room_no=$1 AND user_id=$2;",
    [ req.params.room_key, parseInt(req.params.user_id) ],
  );
  return res.send(JSON.stringify(connection.rows, null, 4));
})

router.put('/:status/:room_key/:user_id/', async (req,res) => {
  const msg_status =await pool.query(
    "UPDATE connections SET msg_status=$1 WHERE room_no = $2 AND user_id=$3;",
    [ req.params.status, req.params.room_key, parseInt(req.params.user_id) ],
  );
  return res.status(201).json("Message Status updated");
})

router.post('/', async(req,res) => {
  const details = req.body;
  console.log(details);
   const insertConnection = await pool.query(
     "INSERT INTO connections(user_id,room_no,msg_status,other_user) VALUES ($1, $2, $3, $4);",
      [ parseInt(details.user_id), details.room, details.msg_status, parseInt(details.other_user)  ]
   );
   const insertConnectionAgain = await pool.query(
    "INSERT INTO connections(user_id,room_no,msg_status,other_user) VALUES ($1, $2, $3, $4);",
     [ parseInt(details.other_user), details.room, details.msg_status,parseInt(details.user_id)  ]
  );
  return res.status(201).json("Connection Created");
  
});

module.exports=router;