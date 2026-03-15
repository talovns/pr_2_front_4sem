const express = require('express');
const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Мышь', price: 1500 },
    { id: 3, name: 'Клавиатура', price: 3000 }
];

app.use(express.json());

// 1. Получение всех товаров (READ)
app.get('/products', (req, res) => {
    res.json(products);
});

// 2. Получение одного товара по id (READ)
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// 3. Добавление нового товара (CREATE)
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: Date.now(), 
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 4. Редактирование товара (UPDATE)
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    
    if (product) {
        const { name, price } = req.body;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// 5. Удаление товара (DELETE)
app.delete('/products/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter(p => p.id != req.params.id);
    
    if (products.length < initialLength) {
        res.send('Товар удален');
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});