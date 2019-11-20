
// Instalar servidor expresso
const express = require ('expresso');
caminho const = require ('caminho');

const app = express ();

// Serve apenas os arquivos estáticos do diretório dist
app.use (express.static (__ dirname + '/ dist / <name-of-app>'));

app.get ('/ *', função (req, res) {
    
res.sendFile (path.join (__ dirname + '/ dist / <name-of-app> /index.html'));
});

// Inicie o aplicativo ouvindo na porta Heroku padrão
app.listen (process.env.PORT || 8080);