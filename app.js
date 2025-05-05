const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '.')));


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase());
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({mensaje: `Usuario no econtrado`});
    }
})

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    nuevoUsuario.id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (usuario) {
        usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
        res.json({ mensaje: `Usuario ${nombre} eliminado` });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`API de Street Fighter escuchando en http://localhost:${port}`);
});


