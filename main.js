// Author @pabloalvessb and @davidgm17

// Al cargar el navegador (la ventana)
window.onload = function() {
	// Busca un elemento con el id "TOC"
	let toc = document.getElementById('TOC');

	// Si no se encuentra dicho elemento se crea uno
	if (!toc) {
		toc = document.createElement('div');
		toc.id = 'TOC';
	}
	// Rellenamos el elmento
	this.fillTOC(toc);
	// Insertamos el elemento al principio del body
	document.body.insertBefore(toc, document.body.firstChild);
};

// Funcion que rellena el div "TOC"
function fillTOC(toc) {
	// Creamos una lista a partir de los headers del html
	let headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
	// creamos un objeto Index a partir del largo de la lista anterior
	let currentIndex = new Index(headers.length);

	// Iteramos el array de las cabeceras
	headers.forEach((header) => {
		// Obtiene el número del header(h2->2)
		let headerNumber = header.tagName.substring(1);
		// Actualiza Index según el número anterior
		currentIndex.updateValue(headerNumber);
		// Guarda el valor del indice formateado
		let headerIndex = currentIndex.toString();
		// Crea un "div" para introducir en el elemento "TOC"
		let indexTitle = document.createElement('div');
		// Añade la clase TOCEntry y TOCLevelN (donde N es headerNumber) al div creado anteriormente
		indexTitle.setAttribute('class', 'TOCEntry TOCLevel' + headerNumber);
		// Crea la etiqueta "a" para título del indice (link)
		let link = document.createElement('a');
		// Añade al link el título del header como texto
		link.text = header.textContent;
		// Añade al link la ruta al id del header que proximamente crearemos
		link.href = '#' + headerIndex;
		// Crea el elemento span donde indicaremos el indice del header
		let span = document.createElement('span');
		// Añade la clase "TOCSectNum" al span para ocultarlo
		span.setAttribute('class', 'TOCSectNum');
		// Añadimos el indice formateado al span y al id del header
		span.innerHTML = header.id = headerIndex;
		// Insertamos el elemento span anterior al principio del header
		header.insertBefore(span, header.firstChild);
		// Insertamos el link en el titulo (al final) que irá en el elemento "TOC"
		indexTitle.appendChild(link);
		// Añadimos el título del indice al final del div "TOC"
		toc.appendChild(indexTitle);
	});
}

// Objeto index para administrar el indice de nuestra página
function Index(headersLenght) {
	this.value = new Array(headersLenght);
	this.value.fill(0);
}

// Actualiza el valor a partir del número de header que se vaya a introducir en el indice
Index.prototype.updateValue = function(headerNumber) {
	let auxIndex = headerNumber - 1;
	this.value[auxIndex]++;
	for (let i = auxIndex; i < this.value.length; i++) {
		if (i > auxIndex) this.value[i] = 0;
	}
};

// Formatea el valor del indice para mostrarlo en el html
Index.prototype.toString = function() {
	let result = String(this.value[0]);
	for (let i = 1; i < this.value.length; i++) {
		if (this.value[i] != 0) result += '.' + this.value[i];
	}
	return result;
};
