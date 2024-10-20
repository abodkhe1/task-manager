const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));



// Session setup
app.use(session({
  secret: 'PROVEWAY',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://ajitbodkhe2017:FlyPKnR5DkwRsdqA@taskmanager.xsgn3.mongodb.net/?retryWrites=true&w=majority&appName=taskManager' })
}));




// User Authentication Middleware
// function isAuthenticated(req, res, next) {
//   if (req.session.userId) {
//     return next();
//   }
//   res.redirect('/login');
// }

// Routes
app.get('/', (req, res) => {
   // res.redirect('/login');  // This will render views/index.ejs
 res.render('login'); 
  });

// user routes
const UserRouter=require('./Routes/UserAuthenticationRoutes')
app.use('/', UserRouter);


// Tasks routes
const TaskRouter=require('./Routes/TaskRoutes');
app.use('/', TaskRouter);

// GET Categories - List categories
const CategoryRouter=require('./Routes/CategoryRoutes');
app.use('/', CategoryRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
