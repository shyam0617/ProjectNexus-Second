const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port=8000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:8000/Users')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the Mongoose schema for registrations
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile:String,
});

// Create the Mongoose model for registrations
const Registration = mongoose.model('Registration', registrationSchema);


// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  Registration.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log('Login success');
        // Send the user data back as JSON response
        res.status(200).json({ name: user.name, user: user.user, email: user.email });
      } else {
        console.log('Login failed');
        // If user not found, send a 404 status
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      // Send a 500 status for internal server error
      res.sendStatus(500);
    });
});
// #########################################################################################################
app.post('/register', async (req, res) => {
    console.log("hia");
    const { name, email, password,gender } = req.body;
  
    try {
      const existingUser = await Registration.findOne({ email }).exec();
      if (existingUser) {
        return res.status(400).send('User with this email already exists');
      }
  
      const registration = new Registration({
        name,
        email,
        password,
        mobile,
      });
      console.log("saved data");
      await registration.save();
      res.sendStatus(200);
    } catch (error) {
      console.error('Error during user registration:', error);
      res.sendStatus(500);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });