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

// Own DataStructures

class OCPageCollection {
  constructor(_items) {
    this.index = 0;
    this.items = new OCList();
    this.pages = new OCList();

    this.fillItems(_items);
    this.dividePages();

    this.currentPage = this.pages.data[0];
    this.beforePages = new OCStack();
    this.afterPages = new OCQueue(this.pages.slice(1, this.pages.size()));
  }

  fillItems(_items) {
    for (let i = 0; i < _items.size(); i++) {
      this.items.push(_items.getAt(i));
    }
  }

  dividePages() {
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

    console.log("CURRENT PAGE IS EMPTY" + currentPage.isEmpty());
    console.log(currentPage);

    if (!currentPage.isEmpty()) {
      let currentPageClone = currentPage.cloneJSON();
      currentPage.clear();
      this.pages.push(currentPageClone);
      currentPageItems = 0;
    }
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

  print() {
    console.log(this.pages);
  }
}

let itemData = [
  {
    id: 1,
    first_name: "Leola",
    last_name: "Hallmark",
    email: "lhallmark0@purevolume.com",
    gender: "Genderfluid",
    ip_address: "90.86.230.146",
  },
  {
    id: 2,
    first_name: "Calla",
    last_name: "Klimontovich",
    email: "cklimontovich1@google.es",
    gender: "Bigender",
    ip_address: "153.67.159.107",
  },
  {
    id: 3,
    first_name: "Ian",
    last_name: "Folbig",
    email: "ifolbig2@shareasale.com",
    gender: "Bigender",
    ip_address: "100.194.241.50",
  },
  {
    id: 4,
    first_name: "Reilly",
    last_name: "Sterman",
    email: "rsterman3@utexas.edu",
    gender: "Polygender",
    ip_address: "195.199.173.69",
  },
  {
    id: 5,
    first_name: "Oralie",
    last_name: "Gilhouley",
    email: "ogilhouley4@upenn.edu",
    gender: "Female",
    ip_address: "120.49.28.17",
  },
  {
    id: 6,
    first_name: "Olenka",
    last_name: "Gowman",
    email: "ogowman5@163.com",
    gender: "Female",
    ip_address: "114.232.148.253",
  },
  {
    id: 7,
    first_name: "Judie",
    last_name: "Lampe",
    email: "jlampe6@amazon.com",
    gender: "Non-binary",
    ip_address: "15.247.159.167",
  },
  {
    id: 8,
    first_name: "Ira",
    last_name: "Silvers",
    email: "isilvers7@uol.com.br",
    gender: "Bigender",
    ip_address: "170.204.171.155",
  },
  {
    id: 9,
    first_name: "Chrisy",
    last_name: "Lomb",
    email: "clomb8@bluehost.com",
    gender: "Polygender",
    ip_address: "92.103.153.118",
  },
  {
    id: 10,
    first_name: "Irma",
    last_name: "Dales",
    email: "idales9@canalblog.com",
    gender: "Polygender",
    ip_address: "228.37.249.136",
  },
  {
    id: 11,
    first_name: "Irma",
    last_name: "Dales",
    email: "idales9@canalblog.com",
    gender: "Polygender",
    ip_address: "228.37.249.136",
  },
  {
    id: 12,
    first_name: "Irma",
    last_name: "Dales",
    email: "idales9@canalblog.com",
    gender: "Polygender",
    ip_address: "228.37.249.136",
  },
  {
    id: 13,
    first_name: "Irma",
    last_name: "Dales",
    email: "idales9@canalblog.com",
    gender: "Polygender",
    ip_address: "228.37.249.136",
  },
  {
    id: 14,
    first_name: "Irma",
    last_name: "Dales",
    email: "idales9@canalblog.com",
    gender: "Polygender",
    ip_address: "228.37.249.136",
  },
];

let itemDataList = new OCList();

for (let i = 0; i < itemData.length; i++) {
  itemDataList.push(itemData[i]);
}
