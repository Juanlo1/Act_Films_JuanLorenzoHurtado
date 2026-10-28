// npm init -y
// npm i express ejs
const express = require('express');
const path = require('path');
const app = express();
const port = 3012;

// Carga de datos 
const filmsData = require('./films.json');
const films = Array.isArray(filmsData) ? filmsData : Object.values(filmsData);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// RUTAS


// Ruta principal
app.get('/', (req, res) => {
  res.render('googlemovies.ejs');
});

// Ruta de busqueda 
app.get('/search', (req, res) => {
  const { pelis } = req.query;

  
  if (!pelis || pelis.trim() === '') {
    return res.redirect('/');
  }

  const query = pelis.trim();

  // Busqueda da igual mayusculas/minusculas
  const film = films.find(f => 
    f.Title && f.Title.toLowerCase() === query.toLowerCase()
  );

  if (film) {
    res.render('search.ejs', { film, query });
  } else {
    res.render('notfound.ejs', { query });
  }
});

// Ruta por defecto (404) para cualquier URL no registrada
app.use((req, res) => {
  res.status(404).send('<h1>Error página no encontrada</h1>');
});


// LEVANTAR EL SERVIDOR

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});