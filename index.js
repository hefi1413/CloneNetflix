const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());


const catalogo = [
  {
      id: 1,
      nome: "Jurassic Park",
      ano: 1993,
      genero: "Aventura",
      tipo: "filme",
      descricao:"As soon as it catches the scent of prey, Sharpedo will jet seawater from its backside, hurtling toward the target to attack at 75 mph.",
      imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/319.png",
  },
  {
    id: 2,
    nome: "O Demolidor",
    ano: 1994,
    genero: "Policial",
    tipo: "filme",
    descricao:"As soon as it catches the scent of prey, Sharpedo will jet seawater from its backside, hurtling toward the target to attack at 75 mph.",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/319.png",
  },
  {
    id: 3,
    nome: "Jurassic Park",
    ano: 1994,
    genero: "Aventura",
    tipo: "filme",
    descricao:"As soon as it catches the scent of prey, Sharpedo will jet seawater from its backside, hurtling toward the target to attack at 75 mph.",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/319.png",
  }
]




//Rotas //
app.get('/', (req, res) => {
  res.render('index');
});

app.post("/add",(req, res) => {
  const catalogo = req.body;
  filme.id = catalogo.length + 1;
  catalogo.push(filme);
  message = `Parabéns! Filme cadastrado com sucesso!`;
  setTimeout(() => {
      message = ""
  }, 5000);
  res.redirect("/");
})


app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id
  const filme = catalogo[id-1]
  res.render("detalhes.ejs", { filme:filme })
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro.ejs")
}); 


app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));