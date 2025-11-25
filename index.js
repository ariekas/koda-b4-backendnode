const mainRouter = require('./src/routers')
const express = require("express");
const app = express();
app.use(express.json());


app.use(("/"), mainRouter)

app.get("/", (req, res) => {
  res.json({
    Success: true,
    Messange: "Back end Running",
  });
});


// const products = [
//     {
//         id: 1,
//         name: "Coffe susu",
//         price : 25000
//     }
// ]

// function getProductById(id){
//     return products.filter(item => item.id === id)[0]
// }

// app.get("/product/:id",(req, res)=> {
//     cosnt (id) = req.params

//     res.json({
//         Success: true,
//         Message: "Success getting product id",
//         data: getProductById(id)
//     })
// })
app.listen(8080, () => {
  console.log("Back end Running on port http://localhost:8080");
});
