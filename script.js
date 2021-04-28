class Table {
  constructor(elements, idElemToRenderWithin) {
    this.elements = elements;
    this.idElemToRenderWithin = idElemToRenderWithin;
    this.sortingOrder = {
      orderByName: 'asc',
      orderByPrice: 'desc',
    }
  }

  initialize () {
    let x = document.getElementById(this.idElemToRenderWithin);
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable());
    this.renderTableBody(this.elements);
    x.addEventListener("click", this.tableHandler.bind(this));
  }

  renderTableHeader() {
    let x = document.getElementById(this.idElemToRenderWithin);
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable());
    x.addEventListener("click", this.tableHandler.bind(this));
  }

  renderTableBody (SortBody) {
    let x = document.getElementById('tbody');

    let SorteredElements;

    if(SortBody === 'byName'){
      SorteredElements = this.elements.sort((a, b) => a.title.localeCompare(b.title));
    } else if (SortBody === 'byPrice') {
      SorteredElements = this.elements.sort((a, b) => a.price - b.price);
    } else {
      SorteredElements = this.elements;
    }
    
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTableBody(SorteredElements));
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

  arrowUp() {
    let NameSort = document.getElementById("NameSort");
    let p = document.createElement('a');
    p.innerHTML = '&#11165;';
    NameSort.prepend(p);
  }

  arrowDel() {
    let NameSort = document.getElementById("NameSort");
    NameSort.replaceChild();
  }

  // &#11167;

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
      
    } else if (dataAttribute.action === "sortName"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
      
      this.cleaningTableBody();
      this.renderTableBody ("byName");
      this.arrowUp();
      this.arrowDel();


    } else if (dataAttribute.action === "sortPrice"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
      

      this.cleaningTableBody();
      this.renderTableBody ("byPrice");
      this.up();

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
                  <th><div class="d-flex justify-content-around" data-action="sortName" ><div>Name</div><div id="NameSort" data-action="sortName">  </div></div></th>
                  <th><div class="d-flex justify-content-around"><div>Price</div><div id="PriceSort" data-action="sortPrice"></div></div></th>
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

