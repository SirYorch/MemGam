//variables de cartas

let array1= ['😺','😸']//,'😹','😻','😾','🐶'];

let array1mas = ['🤮']//,'😡','🤡','🧐']

let array2= array1.concat(array1mas)

let array2mas = ['💀']//,'💩','🐸']

let array3 = array2.concat(array2mas)


//boton de facil
let easy = document.querySelector(".easy");


//boton de dificil
let hard = document.querySelector(".hard")


//menu de inicio
let startScreen = document.querySelector(".start");

//menu de siguiente nivel
let nextScreen = document.querySelector(".nextScreen");

//menu de perdida
let lastScreen = document.querySelector(".lose");

//menu de niveles modo facil
let menuNiveles = document.querySelector(".pantallaMenu");

//menu de victorio
let wonScreen = document.querySelector(".win");

//botones de modo facil
let lvl1 = document.querySelector(".uno")
let lvl2 = document.querySelector(".dos")
let lvl3 = document.querySelector(".tres")
let lvlret = document.querySelector(".returnMenu")

//botones de segundas pantallas;
    //pantallas de siguiente nivel
let nextLevel = document.querySelector(".next");


let returnButons =document.querySelectorAll(".return")

//mesa de juego
let mesa = document.querySelector(".container")

//variables de modos de juego

let timer = document.querySelector(".time")
let lifes = document.querySelector(".numeroVidas")
let lifescube = document.querySelector(".lifes")
let menu = document.querySelector(".menu")

let nivel = 0;

let vidas = 0;

let tiempo = 0;

let minutos= 0;
let segundos =0;
let minutero = document.querySelector(".minutero")
let segundero = document.querySelector(".segundero")

let hardMode =false;

let tiempoDisponible;
