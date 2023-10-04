const express = require ("express")
import Routes from "./src/network"

const app = express();
const example = function(){
    console.log("Estoy a la escucha")
}

app.listen(
    9000,
    example
)