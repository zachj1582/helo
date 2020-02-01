require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  cors = require("cors"),
  session = require("express-session"),
  app = express(),
  ac = require("./controllers/authController"),
  pc = require('./controllers/postController'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

//middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("DB connected");
  app.listen(SERVER_PORT, () =>
    console.log(`Server running on ${SERVER_PORT}`)
  );
});

//endpoints
//auth
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.post('/auth/logout', ac.logout)
app.get('/auth/user', ac.getUser)

//posts
app.get('/api/posts/:id', pc.allPosts)
app.post('/api/post', pc.addPost)
