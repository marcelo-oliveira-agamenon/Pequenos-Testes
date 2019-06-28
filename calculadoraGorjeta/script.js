function calcularGorjeta() {
	var qtdGorjeta = document.getElementById('valorConta').value;
	var qualiServico = document.getElementById('qualiServico').value;
	var qtdPessoas = document.getElementById('qtdPessoas').value;

	if (qtdGorjeta === "" || qualiServico == 0) {
		alert("Insira valores no campo!");
		return;
	}

	if (qtdPessoas === "" || qtdPessoas <= 1) {
		qtdPessoas = 1;
		document.getElementById('cada').style.display = "none";
	} else {
		document.getElementById('cada').style.display = "block";
	}

	var total = (qtdGorjeta * qualiServico) / qtdPessoas;
	total = Math.round(total * 100) / 100;
	total = total.toFixed(2);

	document.getElementById('totalGorjeta').style.display = "block";
	document.getElementById('gorjeta').innerHTML = total;
	console.log(qualiServico);
}

document.getElementById('totalGorjeta').style.display = "none";
document.getElementById('cada').style.display = "none";

document.getElementById('calcular').onclick = function() {
	calcularGorjeta();
};

