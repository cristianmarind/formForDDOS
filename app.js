const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

const uri = 'mongodb+srv://cristianmarind:8pGiU0PaqFMH6vPv@comunicaciones.84qcb.mongodb.net/?retryWrites=true&w=majority&appName=comunicaciones';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

client.connect()
    .then(() => {
        console.log('Conexión establecida con MongoDB');
        app.locals.db = client.db('myDatabase'); // Reemplaza 'myDatabase' con el nombre de tu base de datos
    })
    .catch(err => console.error('Error al conectarse a la base de datos:', err));

// Crear usuario
app.post('/api/users', async (req, res) => {
    const { nombre, email, mensaje } = req.body; // Agregar mensaje al cuerpo
    const usersCollection = app.locals.db.collection('users'); // Colección para usuarios

    try {
        const result = await usersCollection.insertOne({ nombre, email, mensaje }); // Guardar mensaje
        res.status(201).send({ message: 'Usuario creado', userId: result.insertedId });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el usuario', error });
    }
});

// Consultar usuarios
app.get('/api/users', async (req, res) => {
    const usersCollection = app.locals.db.collection('users'); // Colección para usuarios

    try {
        const users = await usersCollection.find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error al consultar usuarios', error });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
