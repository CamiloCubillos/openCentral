class Pila {
  constructor() {
    this.pilaData = [];
    this.head = null;
    this.tail = null;
  }

  push(element) {
    // Agrega un elemento a la cola de la pila
    this.pilaData.push(element);
    if ((this.tail === null) & (this.head === null)) {
      this.head = 0;
      this.tail = 0;
    } else {
      this.tail += 1;
    }
  }

  pop() {
    // Elimina el elemento posicionado en la cola de la pila
    if (this.tail === null) {
      return -1;
    } else {
      this.pilaData.slice(this.tail, 1);
      if (this.tail === 0) {
        this.tail = null;
        this.head = null;
      } else {
        this.tail -= 1;
      }
    }
  }

  peek() {
    // Retorna el elemento posicionado en la cola de la pila y lo ELIMINA de esta
    if (this.tail === null) {
      return null;
    } else {
      let lastElement = this.pilaData[this.tail];
      this.pop();
      return lastElement;
    }
  }

  view() {
    // Retorna SIN ELIMINAR el elemento posicionado en la cola de la pila
    return this.pilaData[this.tail];
  }

  size() {
    // Retorna la longitud de la pila
    if (this.tail === null) {
      return 0;
    } else {
      return this.tail + 1;
    }
  }

  isEmpty() {
    // Verifica si la pila está vacia o no
    if (this.head === null) {
      return true;
    } else {
      return false;
    }
  }

  clear() {
    // ELIMINA TODOS los elementos en la pila
    if (this.tail === null) {
      return 0;
    } else {
      this.pop();
      this.clear();
    }
  }
}

module.exports = Pila;
