
//funcion para desplegar y ocultar las pantallas de inicio 
function desplegarInicio(){
    startScreen.classList.toggle("cerrada")
}

//funcion para desplegar y ocultar la pantalla de siguiente nivel

function desplegarSiguiente(){
    nextScreen.classList.toggle("cerrada")
}

//funcion para desplegar y ocultar la pantalla de perdida
function desplegarUltima(){
    lastScreen.classList.toggle("cerrada")
}


//funcion para desplegar el menu de ayuda en el nivel facil
function desplegarMenu(){
    menuNiveles.classList.toggle("desplegado");
}


//funcion para comprobar que ya se acabaron las cartasd el tablero
function terminar(){
    let cartasTotales = document.querySelectorAll(".c")
    let cartasAbiertas = document.querySelectorAll(".completa")
    if(cartasTotales.length == cartasAbiertas.length){
        if(hardMode == true){
            clearInterval(tiempoDisponible);
        }
        desplegarSiguiente();
    }
}

function activarTiempo(){
    minutos= Math.round(tiempo/60)
    segundos = tiempo%60;
    tiempoDisponible = setInterval(() => {
        segundos--;
        if(segundos === -1){
            if(minutos==0){
                clearInterval(tiempoDisponible);
                desplegarUltima();
            } else if(minutos > 0){
            segundos = 59;
            minutos--;
            }
        }
        if(minutos<10){
            minutero.innerHTML="0"+minutos;
        } else{
            minutero.innerHTML=minutos;
        }
        if(segundos<10){
            segundero.innerHTML=`0`+segundos;
        } else {
            segundero.innerHTML= segundos;
        }
    }, 1300);
}

//funcion para repartir las cartas de nivel 1, 2 y 3
function repartirCartasNivel(){
    nivel++;
    if(nivel ==1){
        repartirCartas(array1);
        if(hardMode==true){tiempo=25;vidas =7; activarTiempo()}
    } else if(nivel==2){
        repartirCartas(array2);
        if(hardMode==true){tiempo+=35 ; vidas+=11;activarTiempo()}
    } else if(nivel ==3){
        repartirCartas(array3);
        if(hardMode==true){tiempo+=45; vidas+=14;activarTiempo()}
    }
}

// funciones de los botones de avanze en modo facil;
function avanzarNivel1(){
    repartirCartas(array1);
    desplegarMenu();
}
function avanzarNivel2(){
    repartirCartas(array2);
    desplegarMenu();
}
function avanzarNivel3(){
    repartirCartas(array3);
    desplegarMenu();
}

//funcion para que sirva el boton de next en la pantalla de vitoria

function siguienteNivel(){
    
    if(hardMode == true){
    tiempo=(minutos*60)+(segundos);
    }

    repartirCartasNivel();
    
    nextScreen.classList.add("cerrada");
    lastScreen.classList.add("cerrada");
}

//funcion para que sirvan los botones de return
function volverInicio(){
    timer.style.display = "visible";
    lifes.style.display = "visible";
    menu.style.display = "visible";
    nivel=0;
    vidas = 0;
    tiempo = 0;
    hardMode=false;
    desplegarInicio();

    //esto es solo para que se quiten las pantallas, se me olvido antes jaja por eso las deje asi
    nextScreen.classList.add("cerrada")
    lastScreen.classList.add("cerrada")
}




function repartirCartas(array){
    mesa.innerHTML = " " ; 
    arrayPrivado= array.concat(array);
    let arrayMix = arrayPrivado.sort(function(){return 0.5-Math.random()})

    let fragmentos = document.createDocumentFragment();
    for(let i of arrayMix){
        const c = document.createElement("DIV");
        c.classList.add("c");

        const card = document.createElement("DIV")
        card.classList.add("card");

        const back = document.createElement("DIV");
        back.classList.add("back");
        back.innerHTML = i;
        card.appendChild(back);
        c.appendChild(card);
        fragmentos.appendChild(c);
        }
    
    
    mesa.appendChild(fragmentos);
    let cartas = document.querySelectorAll(".card");
    
    cartas.forEach(function(elemento){elemento.addEventListener("click",abrir)})
    
}


function abrir(){
    this.classList.add("abierta");
    let cartas = document.querySelectorAll(".abierta")
    if(cartas.length>1){
        if(cartas[0].firstChild.innerHTML === cartas[1].firstChild.innerHTML){
            setTimeout(
                function(){
                cartas.forEach(
                function(el){ el.classList.add('completa');
                el.classList.remove("abierta")
                terminar();
                })},400)
        }else{
            if(hardMode== true){
                
            vidas--;
                if(vidas==0){
                    desplegarUltima();
                }
            lifes.innerHTML = vidas;
            }

            setTimeout(
                function(){
                cartas.forEach(function(el){
                el.classList.remove("abierta")
                })},400)
        }
    }
}


function activarEasy(){
    desplegarInicio();
    timer.style.display = "none"
    lifescube.style.display = "none"
    repartirCartasNivel();
}
function activarHard(){
    desplegarInicio();
    menu.style.display= "none";
    hardMode=true;
    repartirCartasNivel();
    lifes.innerHTML = vidas;
}
