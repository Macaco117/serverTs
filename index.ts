const express = require ("express");
import exp from "constants";
import Routes from "./src/network";
import {init} from "./src/services/servicesLocator/composer"
import "./src/services/auth"

const app = express();
app.use(express.json());

init();

const example = function(){
    console.log("Estoy a la escucha")
}

app.listen(
    9000,
    example
)