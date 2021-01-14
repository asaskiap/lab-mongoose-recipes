const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((self) => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made

        // create one new recipe

        return Recipe.create({
            title: 'new recipe',
            ingredients: 'banana',
            cuisine: 'simple'
        });

        // add an array of recipes

        // return Recipe.insertMany(data);

        //update a recipe

        // return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {
        //     duration: 100
        // });

        // delete a recipe

        // return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
    })
    .then((r) => {
        console.log('recipe successfully created! ');
        console.log(r);

        return mongoose.disconnect();
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });