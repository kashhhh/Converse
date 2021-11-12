const express= require('express');
const app=express();
const pool = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const PORT= process.env.PORT || 5000;

app.use(cors({
  origin: '*'
}))

app.use((req,res,next) => {
  res.setHeader("Content-Type",'application/json');
  next();
});

app.use(express.json());
app.use(formData.parse());

app.use("/users", require('./routes/users.js'));
app.use("/connections", require('./routes/connections.js'));
app.use("/messages", require('./routes/messages.js'));

app.listen(PORT, () => {
  console.log(PORT);
})
