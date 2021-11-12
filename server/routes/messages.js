const express=require('express');
const router = express.Router();
const pool = require('./../db');
const path= require('path');
const fs= require('fs');
const { route } = require('./users');

router.get('/', async (req,res) => {
  const allMessages= await pool.query(
    "SELECT * from messages;"
  );
  return res.send(JSON.stringify(allMessages.rows, null, 4));
});

router.get('/:room_key', async (req,res) => {
  const messagesByRoom = await pool.query(
    "SELECT * FROM messages WHERE room_key=$1 ORDER BY sent_on;",
    [ req.params.room_key ],
  );

  return res.send(JSON.stringify(messagesByRoom.rows, null, 4));
});

router.get('/count/:room_key', async(req,res) => {
  const countOfMessages = await  pool.query(
    "SELECT count(message) FROM messages WHERE room_key=$1;",
    [ req.params.room_key ]
  );

  return res.send(JSON.stringify(countOfMessages.rows, null, 4));
})

router.post('/',async (req,res) => {
  const messageInfo= req.body;
  console.log("MessageInfo",messageInfo);

  const createMessage = await pool.query(
    "INSERT INTO messages(room_key,sent_by,message) VALUES ($1,$2,$3);",
    [messageInfo.Room, messageInfo.sent_by, messageInfo.Message ],
  )
  return res.status(201).json("Message Created");
})


module.exports=router;