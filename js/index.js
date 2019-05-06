/* DENNYS HUAMAN TRABAJO FINAL JAVASCRIPT*/

var calculadora = {
//1.- Asignamos variables auxiliares con las que trabajaremos
	visor: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	firstValue: 0,
	secondValue: 0,
	lastValor: 0,
	resultado: 0,
	ayudaTeclaIgual: false, // Variable que permitira el ingreso consecutivo de valores

	init: (function(){
		this.colocarEventosParaBotones(".tecla");
		this.colocarEventosParaFuncion();
	}),

	//2.- Eventos para formato de botones

	colocarEventosParaBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoReduceBoton;
			x[i].onmouseleave = this.eventoBotonFormaInicial;
		};
	},

	eventoReduceBoton: function(event){
		calculadora.ReduceBoton(event.target);
	},

	eventoBotonFormaInicial: function(event){
		calculadora.FormaInicialBoton(event.target);
	},

	//2.1.- estableciendo como cambiaran el formato de botones

	ReduceBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	FormaInicialBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	//2.2---Fin evento para formato de botones

	//3.- Eventos para hacer funcionar la calculadora

	colocarEventosParaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.mostrarResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresarOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
	},

	//3.1---Fin eventos de función calculadora

	//4.- Funciones para asignar teclas de calculadora

	borrarPantalla: function(){

	    this.valorPantalla = "0";
		this.operacion = "";
		this.firstValue = 0;
		this.secondValue = 0;
		this.resultado = 0;
		this.Operación = "";
		this.ayudaTeclaIgual = false;
		this.lastValor = 0;
		this.actualizarPantalla();
	},

	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.actualizarPantalla();
		}
	},

	ingresarDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.actualizarPantalla();
		}
	},

	ingresarNumero: function(valor){
		if (this.valorPantalla.length < 8) {

			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.actualizarPantalla();
		}
	},

	ingresarOperacion: function(oper){
		this.firstValue = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.ayudaTeclaIgual = false;
		this.actualizarPantalla();
	},

	mostrarResultado: function(){ // TECLA IGUAL

		if(!this.ayudaTeclaIgual){ //Primer vez que presiono igual
			this.secondValue = parseFloat(this.valorPantalla);
			this.lastValor = this.secondValue;

		//Calculo el resultado
			this.realizarOperacion(this.firstValue, this.secondValue, this.operacion);

		} else { //Siguientes veces que presiono igualrealizarOperacion
		//Calculo el resultado
		this.realizarOperacion(this.firstValue, this.lastValor, this.operacion);
		}

		//Almaceno el resultado como primer valor para poder seguir operando
		this.firstValue = this.resultado;

		//Borro el visor y lo reemplazo por el resultado
		this.valorPantalla = "";

		//verifico el largo del resultado para recortarlo si hace falta

		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}

		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor

		this.ayudaTeclaIgual = true;
		this.actualizarPantalla();

	},

	realizarOperacion: function(firstValue, secondValue, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(firstValue + secondValue);
			break;
			case "-":
				this.resultado = eval(firstValue - secondValue);
			break;
			case "*":
				this.resultado = eval(firstValue * secondValue);
			break;
			case "/":
				this.resultado = eval(firstValue / secondValue);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(firstValue));
		}
	},

	actualizarPantalla: function(){
		this.visor.innerHTML = this.valorPantalla;
	}

};

calculadora.init();
