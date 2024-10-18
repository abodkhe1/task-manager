const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

 // For serving CSS
app.use(express.static('public'));

// Session setup
app.use(session({
  secret: 'PROVEWAY',
  resave: false,
  saveUninitialized: false,
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
 res.render('index'); 
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
