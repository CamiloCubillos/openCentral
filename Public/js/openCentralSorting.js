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

    // ~~~ SORTING METHOD ~~~
    /* Implements the Quicksort SORTING algorithm itself; by default it orders from a "name" parameter,
      also validates it beforehand with the validateArrayAndObject method */
    quickSort(array, keyPropName) {
        return this.quickSortHelper(array, keyPropName, 0, array.length - 1);
    }
    
    // Creates and organizes partitions for Quicksort SORTING
    quickSortHelper(array, keyPropName, first, last) {
      if (first < last) {
        let splitPoint = this.partition(array, keyPropName, first, last);

        this.quickSortHelper(array, keyPropName, first, splitPoint - 1);
        this.quickSortHelper(array, keyPropName, splitPoint + 1, last);
      }
      return array;
    }

    // Finds an optimal value and organizes an array for Quicksort SORTING
    partition(array, keyPropName, first, last) {
      let pivotValue = array[first];

      let leftMark = first + 1;
      let rightMark = last;

      let done = false;

      while(!done) {
        while(leftMark <= rightMark && array[leftMark][keyPropName] <= pivotValue[keyPropName] ) {
          leftMark += 1;
        }

        while(array[rightMark][keyPropName]  >= pivotValue[keyPropName]  && rightMark >= leftMark) {
          rightMark -= 1;
        }

        if(rightMark < leftMark) {
          done = true;
        }
        else {
          let temp = array[leftMark];
          array[leftMark] = array[rightMark];
          array[rightMark] = temp;
        }
      }

      let temp = array[first];
      array[first] = array[rightMark];
      array[rightMark] = temp;

      return rightMark;
    }

    // ~~~ FILTERING METHOD ~~~
    // Obtains the first index of the FILTERRING method
    binarySearch(array, keyPropName, value) {
      let first = 0;    //left endpoint
      let last = array.length - 1;   //right endpoint
      let position = -1;
      let found = false;
      let middle;
   
      while (found === false && first <= last) {
          middle = Math.floor((first + last)/2);
          if (array[middle][keyPropName] === value) { // For NAME filtering
              found = true;
              position = middle;
          } else if (array[middle][keyPropName] > value) {  //if in lower half
              last = middle - 1;
          } else {  //in in upper half
              first = middle + 1;
          }

          /* if (array[middle][keyPropName] >= value) { // For AVG SCORE > 3 filtering
            found = true;
            position = middle;
        } else {  //in in lower half
            first = middle - 1;
        } */
      }

      while(position >= 0 && array[position][keyPropName] === value) // For NAME filtering
      // while(position >= 0 && array[position][keyPropName] >= value) // For AVG SCORE > 3 filtering
        position--;

      return position + 1;
  }

    // Executes the FILTERRING itself
    applyFilter(array, keyPropName, value) {

      let index = this.binarySearch(array, keyPropName, value);

      let filteredArray = [];
      while(index < array.length && array[index][keyPropName] === value) { // For NAME filtering
      // while(index < array.length && array[index][keyPropName] >= value) { // For AVG SCORE > 3 filtering
        filteredArray.push(array[index]);
        index++;
      }

      return filteredArray;
    }
}

/* */

// Obtains the JSON
let obtainArrayFromJSON = async function(url)
{
    return await fetch(url)
    .then(res => res.json(url));
}

<<<<<<< HEAD
// Validates id the arrays is not null and not empty and if the prop is valid
let validateArrayAndObject = function(array, keyPropName)
{
  if(array === null) {
    console.log("The array is null")
    return false;
  }
  else if(array.length === 0) {
    console.log("The array is empty.")
    return false;
  }
  else {
    let props = Object.getOwnPropertyNames(array[0]);
    
    if(props.includes(keyPropName)) {
      return true;
    }

    console.log("Property does not exist.")
    return false;
=======
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
>>>>>>> feature_searchSystem
  }
}

const main = async() => {

  var start = Date.now(); // For testing RUNTIME

  let originalArray = await obtainArrayFromJSON('./data/data_1000.json');

  let openCentralSorting = new OpenCentralSorting(); // Creates a new object to use its methods

  const property = 'nombre';
  const filter = 'Alpha';


  // Validates array for the 'name' objects
  if(validateArrayAndObject(originalArray, property)) {
    let quickSortResult = openCentralSorting.quickSort(originalArray, property);
    console.log(quickSortResult);
    
    let filteredArray = openCentralSorting.applyFilter(originalArray, property, filter);

    console.log(filteredArray);
  }

  var end = Date.now();
  console.log("Runtime: ", end - start, " ms");
}


main();
