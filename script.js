class Table {
  constructor(elements, idElemToRenderWithin) {
    this.elements = elements;
    this.idElemToRenderWithin = idElemToRenderWithin;
    this.sortingOrder = {
      orderByName: 'asc',
      orderByPrice: 'desc'
    }
  }

  initialize () {
    this.renderTableHeader(this.elements);
    this.renderTableBody(this.elements);
  }

  renderTableHeader() {
    let x = document.getElementById(this.idElemToRenderWithin);
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable());
    x.addEventListener("click", this.tableHandler.bind(this));
  }

  renderTableBody (SortBody, elements) {

    let elem = elements || this.elements;

    let x = document.getElementById('tbody');

    let SorteredElements;
    let SomeUsers;
    let Search = document.getElementById("searchinput");

    if (elements === 'Search') {

      SomeUsers = this.elements.filter(el => el.title.includes(Search.value));

    } else if(SortBody === 'byName'){

      SorteredElements = elem.sort((a, b) => a.title.localeCompare(b.title));

      this.sortingOrder.orderByName === 'desc' ? SorteredElements : SorteredElements.reverse();

    } else if (SortBody === 'byPrice') {
      SorteredElements = elem.sort((a, b) => a.price - b.price);

      this.sortingOrder.orderByPrice === 'asc' ? SorteredElements : SorteredElements.reverse();

    } else {

      SorteredElements = elem;
    }
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTableBody(SorteredElements));
    // x.insertAdjacentHTML("afterbegin", this.makeHtmlForTableBody(SomeUsers));  //заменил SorteredElements.
  }

  renderTableBodySearch (elements) {

    let elem = elements || this.elements;

    let x = document.getElementById('tbody');
    let SomeUsers;
    let Search = document.getElementById("searchinput");

    if (elements === 'Search') {

      SomeUsers = this.elements.filter(el => el.title.includes(Search.value));

    } else {

      SomeUsers = elem;
    }
     x.insertAdjacentHTML("afterbegin", this.makeHtmlForTableBody(SomeUsers));
  }


  cleaning() {
    let div = document.getElementById("table");
    let container = document.querySelector(".container");
    div.removeChild(container);
  }

  cleaningTableBody() {
    let tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}
  }

  showArrow(direction, id) {
    let NameSort = document.getElementById(id);
    let p = document.createElement('a');
    p.innerHTML = direction === 'asc' ? '&#11167;': '&#11165;';
    NameSort.prepend(p);
  }

  deleteArrow(name) {
    let Sort = document.getElementById(name);
    while (Sort.firstChild) {
      Sort.removeChild(Sort.firstChild);
    }
  }


  changeArrowSortingDirection (sortedBy,sortingOrder) {
    if (sortedBy === 'sortName') {
      this.deleteArrow("PriceSort");
      this.deleteArrow("NameSort");
      this.showArrow(this.sortingOrder.orderByName, "NameSort");

    } else if (sortedBy === 'sortPrice') {
      this.deleteArrow("NameSort");
      this.deleteArrow("PriceSort");
      this.showArrow(this.sortingOrder.orderByPrice, "PriceSort");
    }
  }

  // nameSearch() {
  //   let Search = document.getElementById("searchinput");
  //   let someUsers = this.elements.filter(el => el.title.includes(Search.value));
  //   console.log(someUsers);
  // }


  tableHandler = function(event) {
    const dataAttribute = event.target.dataset;
  
    if (dataAttribute.action === "edit" && !!dataAttribute.id) {
      console.log(`Нажата кнопка edit с id ${dataAttribute.id}`);
    } else if (dataAttribute.action === "delete" && !!dataAttribute.id){
      console.log(`Нажата кнопка delete с id ${dataAttribute.id}`);
      this.elements = [ ... this.elements.filter(el => el.id !=dataAttribute.id)];
      
      this.cleaningTableBody();
      this.renderTableBody ();

    } else if (dataAttribute.action === "add") {

      const a = +prompt('Количество','');
      const b = prompt('Название','');
      const c = +prompt('Цена','');
      const length = this.elements.length;

    this.elements = [
      ...this.elements,
      {
        id: length +1,
        count: a,
        title: b,
        price: c,
      },
    ];

    this.cleaningTableBody();
    this.renderTableBody ();
      
    } else if (dataAttribute.action === "search") {

    this.cleaningTableBody();
    this.renderTableBodySearch("Search");
      
    } else if (dataAttribute.action === "sortName"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
  
      this.cleaningTableBody();
      this.renderTableBody ("byName");
      this.changeArrowSortingDirection(dataAttribute.action, this.sortingOrder);

    } else if (dataAttribute.action === "sortPrice"){
      
      this.sortingOrder.orderByPrice = this.sortingOrder.orderByPrice === 'desc' ? 'asc' : 'desc';
      
      this.cleaningTableBody();
      this.renderTableBody ("byPrice");
      this.changeArrowSortingDirection(dataAttribute.action, this.sortingOrder);
      
     

      console.log(this.elements);
    }
  
    console.log(dataAttribute);

  }

  makeHtmlForTable() {

    return `
    <div class = "container" id = "button">
      <div class = "row">
        <div class = "col-2"> </div>
          <div class = "col-8">
              ${searchline()}
              <table class="table table-bordered table-secondary align-middle">
              <thead>
                <tr class="table-primary">
                  <th><div class="d-flex justify-content-around" data-action="sortName" ><div data-action="sortName">Name</div><div id="NameSort" >  </div></div></th>
                  <th><div class="d-flex justify-content-around" data-action="sortPrice" ><div data-action="sortPrice">Price</div><div id="PriceSort" data-action="sortPrice"></div></div></th>
                  <th>Action</th>
                </tr>  
                </thead>    
                <tbody id='tbody'>
                </tbody>       
              </table>
          </div>
        </div>
    </div>
 `;
  } 

  makeHtmlForTableBody(elements) {
    let resultHtml = "";
   
    elements.forEach((el) => {
      resultHtml = resultHtml + makeRow(el);
    });

    return resultHtml;
  } 
}

const table = new Table(elements, "table");

table.initialize();

