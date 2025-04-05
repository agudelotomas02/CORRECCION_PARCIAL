const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())


let products = [
    { "id": 1, "name": 'Camiseta', "price": 50000 },
    { "id": 35, "name": 'Pantalón', "price": 80000 },
    { "id": 3, "name": 'Zapatos', "price": 100000 }
  ];


app.get('/products', (req, res)=>{
    res.status(200).json(products);

});

app.get('/products/:id',(req,res) =>{
    console.log(`Petición recibida para ID: ${req.params.id}`);
    const productId= parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  
    res.json(product);
});

app.post('/products',(req,res)=>{
    const {id, name, price}=req.body;

    const verification = products.some(p => p.id === id);
    if (verification) {
      return res.status(400).json({ error: 'Ya existe un producto con ese ID' });
    }
  
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.listen(
    PORT,
    ()=> console.log(`It's alive on http://localhost:${PORT}`)
)

module.exports = app;