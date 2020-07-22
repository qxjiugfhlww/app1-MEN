const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const todoRoutes = require('./routes/todos');
// const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype->access');


const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
  // handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://xiaoji0w:FF11ff@cluster0.5lkqb.mongodb.net/todos', {
        useNewUrlParser: true,
        useFindAndModify: false
      })
    app.listen(PORT, () => {
      console.log('Server started...');
    })
  } catch (e) {
    console.log(e);
  }
}

start();