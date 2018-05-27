const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable append server.log!');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenence.hbs')
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screameIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  // response.send('<h1>Hello World, From Express!</h1>');
  // response.send({
  //   name: 'Roshan Paturkar',
  //   collegeDetails: {
  //     branch: 'CSE',
  //     sem: 'V Sem',
  //     tg: 'Miss. Nimbhorkar',
  //     classTeacher: 'Shweta Bondre',
  //     college: 'G. H. Raisoni College of Engineering, Nagpur.'
  //   },
  //   language: [
  //     'C',
  //     'C++',
  //     'JAVA',
  //     'Python',
  //     'Node'
  //   ]
  // });

  response.render('home.hbs', {
    pageTitle: 'Home Page!',
    message: 'Welcome to home!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page!',
    about: 'Roshan Paturkar 9890401440'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request!'
  });
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})
