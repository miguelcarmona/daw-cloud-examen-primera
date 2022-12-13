

/*Ejercicio 1: Desarrollo de los cambios de estilos. */
window.addEventListener("load", function(){
    document.querySelector('#botonWhite').addEventListener('click', function(){
        document.querySelector('#estilos').href = 'css/whitestyle.css';
    });
    document.querySelector('#botonBlack').addEventListener('click', function(){
        document.querySelector('#estilos').href = 'css/blackstyle.css';
    });
});


/* Ejercicio 2: Generar una funcion que haga mostrar la contraseña.*/
window.addEventListener("load", function(){
    
    document.querySelector('#checkboxPassword').addEventListener('change', function(){
        if( this.checked ) {
            document.querySelector('#inputPassword').type = 'text';
        } else {
            document.querySelector('#inputPassword').type = 'password';
        }
    });

});


/* Ejercicio 3: Comprobar contraseña vacía. */
function analizarContrasenia(){
    
    let password = document.querySelector('#inputPassword');
    
    if( password.value === null || password.value === '' ) {
        document.querySelector('#mensajePasswordEmpty').innerHTML = 'No se ha ingresado contraseña. Por favor, ingrese una contraseña';
    }
    else {
        quitarMensajePassVacia();
        analizarSecuencia();
    }

    return false;
}
 
 function quitarMensajePassVacia(){
      document.getElementById('mensajePasswordEmpty').innerHTML= (" ");
 }


/* Ejercicio 4: Reiniciar campos. */
function reset(){ 
    document.querySelector('#inputPassword').value = '';
    document.querySelector('#cantTotalCaracteres').innerHTML = '';
    document.querySelector('#cantNum').innerHTML = '';
    document.querySelector('#cantEspeciales').innerHTML = '';
    document.querySelector('#cantLetras').innerHTML = '';
    document.querySelector('#cantLetrasMinus').innerHTML = '';
    document.querySelector('#cantLetrasMayus').innerHTML = '';
    document.querySelector('#cantIguales').innerHTML = '';
    document.querySelector('#cantConsecutivos').innerHTML = '';
    document.querySelector('#cantDistintos').innerHTML = '';
    document.getElementById("secTipoNums").innerHTML = '';
    document.getElementById("secTipoNums").innerHTML = '';
    document.getElementById("secTipoLetras").innerHTML = '';
    document.getElementById("secTipoLetras").innerHTML = '';
    document.getElementById("secTipoEspeciales").innerHTML = '';
    document.getElementById("secTipoEspeciales").innerHTML = '';
    
}




function analizarSecuencia(){
    var secuenciaArmada=armarEstructuraCadena();
    var infoPasswordAnalizada=calcularCantidadesPassword(secuenciaArmada);
    mostrarInfoPassword(infoPasswordAnalizada);
    
}
function armarEstructuraCadena(){

     var cadenaIngresada= document.getElementById("inputPassword").value;
     var caracter,secuencia=[];
     var i=0;
    
     /* Ejercicio 5. */
    for( let j=0 ; j<cadenaIngresada.length ; j++ )
    {
        secuencia[j] = cadenaIngresada.charAt(j);
    }

    return secuencia;
     
 }

 

/* Funcion que suma cada caracter. */
function calcularCantidadesPassword(secuenciaArmada) {

    var infoPassword={
        cantTotalCaracteres : 0,
        cantCaracteresEspeciales:0,
        cantConsecutivos:0,
        cantDistintos:0,
        cantIguales:0,
        
        cantLetras:0,
        cantLetrasMayusculas:0,
        cantLetrasMinusculas:0,

        cantNum:0,
    }

    var i=0,cantIguales=0,cantConsecutivos=0,cantDistintos=0;
    var cantLetras=0,cantNum=0,cantCaracteresEspeciales=0;
    var cantLetrasMayusculas=0, cantLetrasMinusculas=0;
    
    var cantCaracteres=secuenciaArmada.length;
    
    // Recorremos todos los caracteres para sumar cada caso
    while( i < cantCaracteres -1 ){
        
        // Comprobamos si el carácter actual es igual al carácter siguiente
        if( sonIguales(secuenciaArmada[i],secuenciaArmada[i+1])) {
            cantIguales++;
        }
        else {
            
            //Comprobamos si son caracteres consecutivos (números o letras)
            if(sonConsecutivos(secuenciaArmada[i],secuenciaArmada[i+1])) {
                cantConsecutivos++;
            }
            else{
                cantDistintos++;
            }
        }

        // Si es una letra
        if(esLetra(secuenciaArmada[i])){

            if(esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else{
            if(esNumero(secuenciaArmada[i])){
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }
        i++;
    }

    if( i==cantCaracteres-1 ){ 
        if(esLetra(secuenciaArmada[i])){
            if(esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else{
            if(esNumero(secuenciaArmada[i])){
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }
    }

    
    infoPassword.cantTotalCaracteres = cantCaracteres;
    infoPassword.cantCaracteresEspeciales= cantCaracteresEspeciales;
    infoPassword.cantConsecutivos= cantConsecutivos;
    infoPassword.cantDistintos= cantDistintos;
    infoPassword.cantIguales= cantIguales;
        
    infoPassword.cantLetras= cantLetras;
    infoPassword.cantLetrasMayusculas=cantLetrasMayusculas;
    infoPassword.cantLetrasMinusculas=cantLetrasMinusculas;

    infoPassword.cantNum=cantNum;

    return infoPassword;
}

function sonIguales(elem1,elem2){
    /*Ejercicio 7: Comprobar que dos elementos sean iguales */
    if( elem1 === elem2 ) return true;
    else return false;
}

function sonConsecutivos(elem1,elem2){
    var consecutivos=false;
    
    if( esNumero(elem1) && esNumero(elem2)){
        
        if(consecutivosNumericos(elem1,elem2))
        { 
            
            consecutivos=true;
        }
    }
    else{
        if(esLetra(elem1) && esLetra(elem2))
            if(consecutivosLetras(elem1,elem2)){

                consecutivos=true;
            }
        
    }

    return consecutivos;

}

function esNumero(caracter){
    var esNum=false;
    var codCaracter=caracter.charCodeAt();

    if(codCaracter >= 48 && codCaracter <=57)
        esNum=true;

    return esNum;
}

function consecutivosNumericos(elem1,elem2){
    
    /*Ejercicio 8: Comprobar dos numeros consecutivos. */
    if( (parseInt(elem1) + 1) == parseInt(elem2) ) return true;
    else return false;
}


function esLetra(caracter){
    var codCaracter=caracter.charCodeAt();
    var letra=false;
    if((codCaracter >= 65 && codCaracter <=90) || ( codCaracter >= 97 && codCaracter <=122))
    {
        letra=true;
    }
    

    return letra;

}

function esLetraMayuscula(caracter){
    var codCaracter=caracter.charCodeAt();
    var esMayus=false;

    if(codCaracter >= 65 && codCaracter <=90)
        esMayus=true;

   return esMayus;
}

function consecutivosLetras(elem1,elem2){
    
    /*Ejercicio 8: Comprobar dos letras son consecutivas. */

    let elem1Char=elem1.charCodeAt();
    let elem2Char=elem2.charCodeAt();
    if( elem1Char+1 == elem2Char ) return true;
    else return false;

}

function mostrarInfoPassword(infoPassword){

    mostrarCantidadesAnalisis(infoPassword);

    var tipoSecuencia=analizarUnTipoSecuencia(infoPassword.cantNum,infoPassword.cantLetras,
        infoPassword.cantCaracteresEspeciales,infoPassword.cantTotalCaracteres);

    mostrarInfoTipoSecuencia(tipoSecuencia);

    var porcentajes=calcularPorcentaje(infoPassword);
    mostrarPorcentaje(porcentajes);

    var escala=determinarSeguridadPassword(calculoSeguridadPassword(infoPassword));
    mostrarSeguridadPassword(escala);
    
}

function mostrarCantidadesAnalisis(infoPassword){

 /*Ejercicio 6: Mostrar cantidades. */
 //let totales = calcularCantidadesPassword( armarEstructuraCadena() );

 console.log( infoPassword );
 
    document.querySelector('#cantTotalCaracteres').innerHTML = infoPassword.cantTotalCaracteres;
    document.querySelector('#cantNum').innerHTML = infoPassword.cantNum;
    document.querySelector('#cantEspeciales').innerHTML = infoPassword.cantCaracteresEspeciales;
    document.querySelector('#cantLetras').innerHTML = infoPassword.cantLetras;
    document.querySelector('#cantLetrasMinus').innerHTML = infoPassword.cantLetrasMinusculas;
    document.querySelector('#cantLetrasMayus').innerHTML = infoPassword.cantLetrasMayusculas;
    document.querySelector('#cantIguales').innerHTML = infoPassword.cantIguales;
    document.querySelector('#cantConsecutivos').innerHTML = infoPassword.cantConsecutivos;
    document.querySelector('#cantDistintos').innerHTML = infoPassword.cantDistintos;

}

function analizarUnTipoSecuencia(cantNum,cantLetras,cantEspeciales,cantCaracteres){

    var tipoSecuencia={
        tipoLetras : false,
        tipoNumeros:false,
        tipoEspeciales:false,
    }

    if(cantLetras == cantCaracteres)
    {
        tipoSecuencia.tipoLetras=true;
    }
    else
    {
        if(cantNum == cantCaracteres)
            tipoSecuencia.tipoNumeros=true;
        else
            if(cantEspeciales == cantCaracteres)
            tipoSecuencia.tipoEspeciales=true;
    }

    return tipoSecuencia;

}

function mostrarInfoTipoSecuencia(tipoSecuencia){
    if(tipoSecuencia.tipoNumeros == true)
    document.getElementById("secTipoNums").innerHTML = ("Si");
    else
        document.getElementById("secTipoNums").innerHTML = ("No");
    if(tipoSecuencia.tipoLetras == true)
        document.getElementById("secTipoLetras").innerHTML = ("Si");
    else
        document.getElementById("secTipoLetras").innerHTML = ("No");
    if(tipoSecuencia.tipoEspeciales == true)
        document.getElementById("secTipoEspeciales").innerHTML = ("Si");
    else
        document.getElementById("secTipoEspeciales").innerHTML = ("No");
}

function calcularPorcentaje(infoPassword){

    var porcentajesPassword={
        porcLetras : 0,
        porcNumeros: 0,
        porcEspeciales: 0,
    }

    var cantNums=infoPassword.cantNum,
    cantLetras=infoPassword.cantLetras,
    cantEspeciales=infoPassword.cantCaracteresEspeciales,
    cantCaracteres=infoPassword.cantTotalCaracteres;
    
    porcentajesPassword.porcNumeros=porcentaje(cantNums,cantCaracteres);    
    porcentajesPassword.porcLetras=porcentaje(cantLetras,cantCaracteres);
    porcentajesPassword.porcEspeciales=porcentaje(cantEspeciales,cantCaracteres);

    return porcentajesPassword; 

}

function porcentaje(parcial,total){
    /*Ejercicio 9: Calcular porcentajes.  */

    //return parcial*100/total ;
    //return Math.floor(parcial*100/total);
    return ( Math.round( (parcial*100/total)*100 )/100 ).toFixed(2);
}

function mostrarPorcentaje(porcentajes){
   
   /*Ejercicio 9: Mostrar porcentajes.  */
   document.querySelector('#secTipoNums').innerHTML = porcentajes.porcNumeros + '%';
   document.querySelector('#porcentajeNums').innerHTML = porcentajes.porcNumeros + '%';
   document.querySelector('#porcentajeNums').style.width = porcentajes.porcNumeros + '%';
   document.querySelector('#secTipoLetras').innerHTML = porcentajes.porcLetras + '%';
   document.querySelector('#porcentajeLetras').innerHTML = porcentajes.porcLetras + '%';
   document.querySelector('#porcentajeLetras').style.width = porcentajes.porcLetras + '%';
   document.querySelector('#secTipoEspeciales').innerHTML = porcentajes.porcEspeciales + '%';
   document.querySelector('#porcentajeEspeciales').innerHTML = porcentajes.porcEspeciales + '%';
   document.querySelector('#porcentajeEspeciales').style.width = porcentajes.porcEspeciales + '%';
    
}

function calculoSeguridadPassword(infoPassword){

    var promedio=0;
    /*Ejercicio 10. Calcular contraseña. */

    let cantTotalCaracteres = parseInt(infoPassword.cantTotalCaracteres);
    let cantNum = parseInt(infoPassword.cantNum);
    let cantCaracteresEspeciales = parseInt(infoPassword.cantCaracteresEspeciales);
    let cantLetras = parseInt(infoPassword.cantLetras);
    let cantLetrasMinusculas = parseInt(infoPassword.cantLetrasMinusculas);
    let cantLetrasMayusculas = parseInt(infoPassword.cantLetrasMayusculas);
    let cantIguales = parseInt(infoPassword.cantIguales);
    let cantConsecutivos = parseInt(infoPassword.cantConsecutivos);
    let cantDistintos = parseInt(infoPassword.cantDistintos);

    // De base multiplicamos la cantidad de caracteres por 4.
    promedio += cantTotalCaracteres * 4;

    // Multiplicamos por 4 si tenemos cifras numéricas.
    promedio += cantNum * 4 ;

    // Multiplicamos por 6 las cifras especiales.
    promedio += cantCaracteresEspeciales * 6 ;

    // Restamos las cifras consecutivas multiplicadas por 2.
    promedio -= cantConsecutivos * 2;

    // Restamos las cifras con cantidades iguales por 2 (cantIguales).
    promedio -= cantIguales * 2;


    /* Restaremos los puntos a la cantidad de letras o de números si la secuencia es de solo
       tipo número o tipo letra. */
    if( cantNum > 0 && cantLetras < 1 && cantCaracteresEspeciales < 1 ) {
        promedio -= cantNum;
    } else if( cantLetras > 0 && cantNum < 1 && cantCaracteresEspeciales < 1 ) {
        promedio -= cantLetras;
    }
    


    return promedio;
     
}



function determinarSeguridadPassword(promedioPassword){

    var promedio= calculoSeguridadPassword(promedioPassword);
    /*Ejercicio 11. Mostrar seguridad. */

    let escalaItensidad = 'Error al calcular';

    if( promedio < 30 ) {
        escalaItensidad = 'Muy débil';
    } else if( promedio <= 50 ) {
        escalaItensidad = 'Débil';
    } else if( promedio <= 75) {
        escalaItensidad = 'Fuerte';
    } else {
        escalaItensidad = 'Muy fuerte';
    }

    return escalaItensidad;
}

function mostrarSeguridadPassword(escalaItensidad){

    document.getElementById("seguridadPassword").innerHTML=escalaItensidad;

}


function mostrarAclaraciones(){
    document.getElementById('aclaraciones').innerHTML=
    "<p>"+
     "<ol>"+
        "<li>Los cáracteres son los números, letras y simbolos ( ! #  %  & ; , .). Los simbolos son todo aquello "+
        "que no son números y no son letras. </li>"+
        "<li>La cantidad de cáracteres se refiere a la longitud de la contraseña ingresada. </li>"+
        "<li> Los caraceteres especiales son aquellos que definimos previamente como simbolos.</li>"+
        "<li>La cantidad de iguales es la cantidad de veces que se repite un cáracter de forma consecutiva.<br>"+
         " Por ejemplo si ingresamos la siguiente contraseña:<br>aaa  en este caso hay dos cantidades de iguales "+
          "porque entre el primer par de aa es una cantidad de iguales y en el segundo par hay otra cantidad de iguales."+
          " En total hay dos cantidades de iguales.</li>"+
        "<li>La cantidad de distintos son la cantidad de pares de caracteres que son diferentes entre sí.</li>"+
        "<li>La cantidad de consecutivos son la cantidad de pares consecutivos. En el caso de los números, seria los numeros "+
        "consecutivos(no en orden) como por ejemplo 1234 son 3 pares de consecutivos pero 149 no son consecutivos. En el caso"+ 
        "de las letras, seria son letras en orden alfabetico pero teniendo en cuenta "+
        "abc son letras consecutivas pero aez no son consecutivas.</li>"+

    "</ol>"+
    "</p>";
  
}

mostrarAclaraciones();

