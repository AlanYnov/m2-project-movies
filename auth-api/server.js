const express = require("express"),
  app = express();

require("dotenv").config();

const mongoose = require("mongoose");

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || 'userdb',
};

//Connect to database
try {
  mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
  console.log("Connected to db");
} catch (error) {
  console.log(error);
}

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoutes = require("./routes/user");
app.use('/api-auth', userRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
