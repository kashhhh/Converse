const express=require('express');
const router = express.Router();
const pool = require('./../db');

router.get('/', async (req,res) => {
  const allUsers= await pool.query(
    "SELECT * from users;"
  );
  return res.send(JSON.stringify(allUsers.rows, null, 4));
});

router.get('/:user_id', async (req,res) => {
  const user= await pool.query(
    "SELECT * from users where user_id=$1;",[req.params.user_id],
  );
  return res.send(JSON.stringify(user.rows, null, 4));
});

router.put('/:status/:user_id', async (req,res) => {
  const user= await pool.query(
    "UPDATE users SET status=$1 WHERE user_id=$2;",[ req.params.status,parseInt(req.params.user_id)],
  );
  console.log("Updated");
  return res.status(201).json("Status updated");
});

router.post('/',async (req,res) => {
  const messageInfo= req.body;
  console.log("MessageInfo",messageInfo);

  const createMessage = await pool.query(
    "INSERT INTO users(username,email,pwd) VALUES ($1,$2,$3);",
    [messageInfo.Username, messageInfo.Email, messageInfo.Pwd ],
  )
  return res.status(201).json("User Registered");
})

module.exports=router;