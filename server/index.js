const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'mysql_db',
    password: 'password',
    database: 'stockdb',
})


app.post('/create',(req,res) => {
    const name = req.body.name
    const price = req.body.price
    const qty = req.body.qty

    db.query(
        'INSERT INTO products (name,price,qty) VALUES (?,?,?)',
        [name, price,qty],
        (err, result) => {
            if (err){
                console.log(err)
            } else{
                res.send("Values Inserted")
            }
        }
        )
})

app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    })
})


app.listen(3001, () => {console.log("your server is running")})