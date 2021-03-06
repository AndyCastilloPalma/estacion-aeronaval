//si se va a usar esta funcion para validar formularios en lo posible
// se recomienda cargar el script antes de los scripts siguientes:
//indentificaciones.js
//validation.js
ValorOriginal={}
function ValidarDatosFormulario(formulario,formModal) {
	var inputs = formulario.getElementsByTagName("input");
	mensaje="";
	formNoValido=false;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("requerido")!=null) {
			if(inputs[i].value.trim() == "" && inputs[i].type != "file"){
				var span = inputs[i].parentNode.getElementsByTagName("span");
				if (span.length>=1) {
					span=span[0]
					ValorOriginal[inputs[i].name] = span.innerHTML;
					span.innerHTML="Campo Vacío"
				};
				inputs[i].addEventListener("focus", function(){
					var span = this.parentNode.getElementsByTagName("span");
					if (span) {span[0].innerHTML=ValorOriginal[this.name]};
					this.parentNode.classList.remove("is-invalid");
				 })
				inputs[i].parentNode.classList.add("is-invalid");
				formNoValido=true;
				mensaje="Por favor asegúrese que no haya campos vacíos";
			}
		};
	};	
	if (!formNoValido) {
		var divs = formulario.getElementsByTagName("div")
		for (var i = 0; i < divs.length; i++) {
			if(divs[i].classList.contains("is-invalid")){
				mensaje="Por favor asegúrese que todos los datos estén correctos";
				formNoValido=true;
			}
		};
	};
	if (formNoValido) {
		if (!formModal) {
			swal({
			  	title: 'Formulario No Válido',
			  	type: 'error',
			  	text:mensaje,
			  	confirmButtonText: 'Ok',
			  	closeOnConfirm: false
			})
		}
		return false;
	};
	return true;
}