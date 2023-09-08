easy.addEventListener("click",activarEasy);
hard.addEventListener("click",activarHard);
nextLevel.addEventListener('click',siguienteNivel);

returnButons.forEach(function(el){
    el.addEventListener("click",volverInicio)
})

menu.addEventListener("click",desplegarMenu)

lvl1.addEventListener("click",avanzarNivel1);
lvl2.addEventListener('click',avanzarNivel2);
lvl3.addEventListener('click',avanzarNivel3);
lvlret.addEventListener('click',returnInicio)