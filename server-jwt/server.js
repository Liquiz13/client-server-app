const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/users');
const registrationRoutes = require('./app/routes/registration');
const passport = require('passport');
const index = require('./app/routes/index');
const SocketManager = require('./app/controllers/sockets');
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true")
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

app.use('/api/users', userRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api', index);

mongoose.connect('mongodb://localhost/social-web', function (err) {
  useMongoClient: true;
  { useNewUrlParser: true };
  if (err) throw err;
  console.log('Successfully connected');
});

require('./app/config/passport');

// TODO: убрал во всех кроме авторизации - иначе не дает ничего сделать...

app.use(passport.initialize())
app.use(passport.session())

const server = app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

const io = require('socket.io').listen(server);

io.on('connection', SocketManager)