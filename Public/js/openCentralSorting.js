class OpenCentralSorting {
  /*
    ESTA CLASE DEBE CONTENER METODOS PARA ORDENAR UN ARREGLO DE OBJETOS 'APP'.
    LOS OBJETOS 'APP' TENDRÁN LAS SIGUIENTES PROPIEDADES:

    {
        nombre // String
        autor // String
        descripcion // String
        version // String
        scoreAVG // Double
        descargas // Integer
        img // String 
        keywords // Array de Strings 
        mirrors // String 
    }

    SE DEBEN DE CREAR UN METODO DE ORDENAMIENTO PARA CADA UNO DE LOS SIGUIENTES CRITERIOS:
        
        * POR RELEVANCIA (De ese me encargo yo [Cristian Camilo] en la API, pero luego debe incluirse aqui también xD)
        * POR ORDEN ALFABETICO DEL NOMBRE DE LA APP
        * POR FILTROS (SE DEBE PASAR COMO ARGUMENTO UN ARREGLO DE FILTROS Y DEVOLVER UN ARRAY CON LAS APPS QUE TENGAN AL MENOS
                        UNO DE LOS FILTROS ENVIADOS EN SUS KEYWORDS)

    EN LA MEDIDA DE LO POSIBLE INTENTAR USAR ALGUNA DE LAS ESTRUCTURAS DE DATOS QUE YA DEFINIMOS Y QUE ESTÁRAN CONTENIDAS
    EN EL ARCHIVO CONTIGUO 'openCentralStructures.js'

    */

  sortByRelevance(array, searchKey) {
    let exactNameFoundApps = [];
    let nameFoundApps = [];
    let exactAuthorFoundApps = [];
    let authorFoundApps = [];
    let descriptionFoundApps = [];
    let keyWordFoundApps = [];

    for (let index = 0; index < array.length; index++) {
      console.log(array[index]);
      if (array[index].nombre == searchKey) {
        exactNameFoundApps.push(array[index]);
      } else if (array[index].autor == searchKey) {
        exactAuthorFoundApps.push(array[index]);
      } else if (array[index].nombre.substring(searchKey)) {
        nameFoundApps.push(array[index]);
      } else if (array[index].autor.substring(searchKey)) {
        authorFoundApps.push(array[index]);
      } else if (array[index].descripcion.substring(searchKey)) {
        descriptionFoundApps.push(array[index]);
      } else if (array[index].keywords.substring(searchKey)) {
        keyWordFoundApps.push(array[index]);
      }
    }

    return exactNameFoundApps
      .concat(nameFoundApps)
      .concat(exactAuthorFoundApps)
      .concat(authorFoundApps)
      .concat(descriptionFoundApps)
      .concat(keyWordFoundApps);
  }
}
