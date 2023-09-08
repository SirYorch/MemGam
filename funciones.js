
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
    if(menuNiveles.classList.contains("desplegado")){
        let cartas = document.querySelectorAll(".card");cartas.forEach(function(elemento){elemento.removeEventListener("click",abrir)})
    } else {
        let cartas = document.querySelectorAll(".card");cartas.forEach(function(elemento){elemento.addEventListener("click",abrir)})
    }
}

//funciond para desplegar la pantalla de victoria
function desplegarWon(){
    wonScreen.classList.toggle("cerrada");
}



//funcion para comprobar que ya se acabaron las cartasd el tablero
function terminar(){
    let cartasTotales = document.querySelectorAll(".c")
    let cartasAbiertas = document.querySelectorAll(".completa")
    if(cartasTotales.length == cartasAbiertas.length){
        if(hardMode == true){
            clearInterval(tiempoDisponible);
        }
        if(nivel ==3 ){
            desplegarWon()
        } else {
        desplegarSiguiente();
    }
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
    else if(nivel ==4 ){
        desplegarWon();
    }
}

// funciones de los botones de avanze en modo facil;
function avanzarNivel1(){
    nivel=0;
    repartirCartasNivel();
    desplegarMenu();
}
function avanzarNivel2(){
    nivel=1;
    repartirCartasNivel();
    desplegarMenu();
}
function avanzarNivel3(){
    nivel=2;
    repartirCartasNivel();
    desplegarMenu();
}
function returnInicio(){
    desplegarMenu();
    volverInicio();
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
    timer.style.display = "flex";
    lifescube.style.display = "flex";
    menu.style.display = "flex";
    nivel=0;
    vidas = 0;
    tiempo = 0;
    hardMode=false;
    desplegarInicio();

    //esto es solo para que se quiten las pantallas, se me olvido antes jaja por eso las deje asi
    setTimeout(function(){
    nextScreen.classList.add("cerrada")
    lastScreen.classList.add("cerrada")
    wonScreen.classList.add("cerrada")},600
    )
}




function repartirCartas(array){
    mesa.innerHTML = " " ; 
    let arrayPrivado= array.concat(array);
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

    cartas.forEach(function(cartaBucle){
        cartaBucle.classList.add("abierta");
    })
    setTimeout(function(){
        cartas.forEach(function(cartaBucle){
            cartaBucle.classList.remove("abierta");
        })
    },1500)
    
    cartas.forEach(function(elemento){elemento.addEventListener("click",abrir)})
    
}


function abrir(){
    this.classList.add("abierta");
    let cartas = document.querySelectorAll(".abierta")
    if(cartas.length>1){
        let cartasAbiertas = document.querySelectorAll(".card");
        cartasAbiertas.forEach(function(elemento){elemento.removeEventListener("click",abrir)})
            
        if(cartas[0].firstChild.innerHTML === cartas[1].firstChild.innerHTML){
            setTimeout(
                function(){
                cartas[0].classList.remove("abierta")
                cartas[1].classList.remove("abierta")
                cartas[0].classList.add("completa")
                cartas[1].classList.add("completa")
                terminar();
                cartasAbiertas.forEach(function(elemento){elemento.addEventListener("click",abrir)})
                },400)
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
                cartasAbiertas.forEach(function(elemento){elemento.addEventListener("click",abrir)})
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