// Primitive DataStructures

class OCList {
  constructor(_data) {
    if (_data) {
      this.data = [];
      _data.forEach((element) => {
        this.data.push(element);
      });
    } else {
      this.data = [];
    }
  }

  push(element) {
    this.data.push(element);
  }

  pushFront(element) {
    this.data;
  }

  pop() {
    if (!this.isEmpty()) {
      this.data.pop();
    }
  }

  popFront() {
    if (!this.isEmpty()) {
      this.data.splice(0, 1);
    }
  }

  getAt(index) {
    return this.data[index];
  }

  getFirst() {
    return this.data[0];
  }

  getLast() {
    return this.data[this.size() - 1];
  }

  size() {
    return this.data.length;
  }

  clear() {
    if (!(this.size() == 0)) {
      this.pop();
      this.clear();
    }
  }

  isEmpty() {
    if (this.size() == 0) {
      return true;
    } else {
      return false;
    }
  }

  cloneJSON() {
    let clone = JSON.parse(JSON.stringify(this.data));
    return clone;
  }

  slice(init, itemAmount) {
    return new OCList(this.data.slice(init, itemAmount));
  }

  mergeList(listB) {
    for (let i = 0; i < listB.size(); i++) {
      this.data.push(listB.getAt(i));
    }
  }
}

class OCStack {
  constructor() {
    this.pilaData = new OCList();
  }

  push(element) {
    this.pilaData.push(element);
  }

  pop() {
    this.pilaData.pop();
  }

  unstack(element) {
    if (this.size() > 0) {
      let lastElement = this.pilaData.getLast();
      this.pop();
      return lastElement;
    }
  }

  size() {
    return this.pilaData.size();
  }
}

class OCQueue {
  constructor(_list) {
    if (_list) {
      this.queueData = new OCList(_list.data);
    } else {
      this.queueData = new OCList();
    }
  }

  enqueue(element) {
    this.queueData.push(element);
  }

  enqueueFirst(element) {
    this.queueData.pushFront(element);
  }

  jumpTheQueue(element) {
    let jumpedItem = new OCList([element]);
    jumpedItem.mergeList(this.queueData);
    this.queueData = jumpedItem;
  }

  dequeue() {
    if (!this.queueData.isEmpty()) {
      let headOfQueue = this.queueData.getFirst();
      this.queueData.popFront();
      return headOfQueue;
    }
  }

  checkFirst() {
    if (!this.queueData.isEmpty()) {
      return this.queueData.getFirst();
    }
  }

  isEmpty() {
    return this.queueData.isEmpty();
  }
}

class OCNode {
  constructor() {
    OCNode: this.children = [];
  }
}

// Own DataStructures

class OCPageCollection {
  constructor(_items) {
    this.index = 0;
    this.items = new OCList();
    this.pages = new OCList();

    this.fillItems(_items);
    this.generatePages();
  }

  fillItems(_items) {
    for (let i = 0; i < _items.size(); i++) {
      this.items.push(_items.getAt(i));
    }
  }

  generatePages() {
    this.pages.clear();
    let currentPageItems = 0;
    let currentPage = new OCList();

    for (let i = 0; i < this.items.size(); i++) {
      currentPage.push(this.items.getAt(i));
      currentPageItems++;
      if (currentPageItems == 10) {
        let currentPageClone = currentPage.cloneJSON();
        currentPage.clear();
        this.pages.push(currentPageClone);
        currentPageItems = 0;
      }
    }

    if (!currentPage.isEmpty()) {
      let currentPageClone = currentPage.cloneJSON();
      currentPage.clear();
      this.pages.push(currentPageClone);
      currentPageItems = 0;
    }

    this.currentPage = this.pages.data[0];
    this.beforePages = new OCStack();
    this.afterPages = new OCQueue(this.pages.slice(1, this.pages.size()));
  }

  next() {
    if (this.index < this.pages.size()) {
      this.index++;
      this.beforePages.push(this.currentPage);
      this.currentPage = this.afterPages.dequeue();
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this.afterPages.jumpTheQueue(this.currentPage);
      this.currentPage = this.beforePages.unstack();
    }
  }
}

class OCNodeValidation extends OCNode {
  constructor() {
    super();
  }

  isValid() {
    let response = {
      status: true,
      errors: [],
    };
    for (let child of this.children) {
      if (child.isValid().status != true) {
        response.status = false;
        let errors = child.isValid().info;
        let inputData = {
          childID: child.input.id,
          errors: errors,
        };
        response.errors.push(inputData);
      }
    }
    return response;
  }
}

class OCNodeValidation_input extends OCNode {
  constructor(input) {
    super();
    this.input = input;
  }

  isValid() {
    let response = {
      status: true,
      info: [],
    };
    for (let child of this.children) {
      if (child.isValid().status != true) {
        response.status = false;
        response.info.push(child.isValid().info);
      }
    }
    return response;
  }
}

class OCNodeValidation_len extends OCNode {
  constructor(minLen, maxLen, data) {
    super();
    this.minLen = minLen;
    this.maxLen = maxLen;
    this.data = data;
  }

  isValid() {
    let response = {
      status: false,
      info: [],
    };
    if (this.data.length >= this.minLen) {
      if (this.data.length <= this.maxLen) {
        response.status = true;
      } else {
        response.info.push(
          `La contraseña debe tener como máximo ${this.maxLen} caracteres`
        );
      }
    } else {
      response.info.push(
        `La contraseña debe tener al menos ${this.minLen} caracteres`
      );
    }
    return response;
  }
}

class OCNodeValidation_forbiddenChars extends OCNode {
  constructor(forbiddenChars, data) {
    super();
    this.forbiddenChars = forbiddenChars;
    this.data = data;
  }

  isValid() {
    let response = {
      status: true,
      info: [],
    };
    for (let char of this.forbiddenChars) {
      if (this.data.includes(char)) {
        response.status = false;
        response.info.push(`No se permite el siguiente caracter: ${char}`);
      }
    }
    return response;
  }
}

class OCNodeValidation_emptiness extends OCNode {
  constructor(data) {
    super();
    this.data = data;
  }

  isValid() {
    let response = {
      status: null,
      info: [],
    };
    if (this.data != "") {
      response.status = true;
    } else {
      response.status = false;
      response.info.push("El campo está vacio.");
    }
    return response;
  }
}

class OCNodeValidation_format extends OCNode {
  constructor(regEx, data) {
    super();
    this.regEx = regEx;
    this.data = data;
  }

  isValid() {
    let response = {
      status: true,
      info: [],
    };
    if (this.data.match(this.regEx)) {
      response.status = true;
    } else {
      response.status = false;
      response.info.push("Formato invalido");
    }
    return response;
  }
}

class OCNodeValidation_email extends OCNodeValidation_format {
  constructor(data) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    super(re, data);
  }
}

class OCNodeValidation_password extends OCNodeValidation_format {
  constructor(data) {
    const re = /(?=.*[!@#$%^&*])/;
    super(re, data);
  }
}

class OCNodeValidation_username extends OCNodeValidation_format {
  constructor(data) {
    const re = /^[a-zA-Z0-9_]+$/;
    super(re, data);
  }
}

class OCNodeValidation_verifyPassword extends OCNode {
  constructor(data, data2) {
    super();
    this.data = data;
    this.data2 = data2;
  }

  isValid() {
    let response = {
      status: true,
      info: [],
    };
    if (this.data == this.data2) {
      response.status = true;
    } else {
      response.status = false;
      response.info.push("Las contraseñas no coinciden.");
    }
    return response;
  }
}
