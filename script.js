
class Table {
  constructor(elements, idElemToRenderWithin) {
    this.elements = elements;
    this.idElemToRenderWithin = idElemToRenderWithin;
    this.sortingOrder = {
      orderByName: 'asc',
      orderByPrice: 'desc',
    }
  }

  // initialize () {

  //   let x = document.getElementById(this.idElemToRenderWithin);

  //   const sorteredElementsTitle = this.elements.sort((a, b) => a.title.localeCompare(b.title));

  //   x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable(sorteredElementsPrice));

  //   x.addEventListener("click", this.tableHandler.bind(this));
  // }



  renderTableHeader() {
    let x = document.getElementById(this.idElemToRenderWithin);
    const sorteredElementsTitle = this.elements.sort((a, b) => a.title.localeCompare(b.title));

    // const sorteredElementsPrice = this.elements.sort((a, b) => a.price - b.price);

    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable(sorteredElementsTitle));
    x.addEventListener("click", this.tableHandler.bind(this));
  }


  renderTableBody ( ) {
    this.cleaningTableBody();
    let x = document.getElementById(this.idElemToRenderWithin);
    const sorteredElementsPrice = this.elements.sort((a, b) => a.price - b.price);
    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTableBody(sorteredElementsPrice));
  }

  render() {
    // let x = document.getElementById(this.idElemToRenderWithin);
    // const sorteredElementsTitle = this.elements.sort((a, b) => a.title.localeCompare(b.title));
    // const sorteredElementsPrice = this.elements.sort((a, b) => a.price - b.price);
    // x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable(sorteredElementsPrice));
    // x.addEventListener("click", this.tableHandler.bind(this));
  }



  cleaning() {
    let div = document.getElementById("table");
    let container = document.querySelector(".container");
    div.removeChild(container);
  }

  cleaningTableBody() {
    // let div = document.getElementById("table");
    let tabbody = document.querySelector(".table>tbody");
    tabbody.remove();
  }

  // arrowUp() {
  //   const elem = document.getElementById("1");
  //   elem.style.cssText=`
  //     width: 32px; height: 32px;
  //     background: url('img/sorting_sprites.png') -62px -10px;
  // `;
  // }

  // arrowDown() {
  //   const elem1 = document.getElementById("1");
  //   elem1.style.cssText=`
  //     width: 32px; height: 32px;
  //     background: url('img/sorting_sprites.png') -10px -10px;
  // `;
  // }

  up() {
    let div = document.getElementById('1');
    div.insertAdjacentHTML('afterbegin', "&#11165;");
  }


  tableHandler = function(event) {
    const dataAttribute = event.target.dataset;
  
    if (dataAttribute.action === "edit" && !!dataAttribute.id) {
      console.log(`Нажата кнопка edit с id ${dataAttribute.id}`);
    } else if (dataAttribute.action === "delete" && !!dataAttribute.id){
      console.log(`Нажата кнопка delete с id ${dataAttribute.id}`);
      this.elements = [ ... this.elements.filter(el => el.id !=dataAttribute.id)];

      this.renderTableBody();
      

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

      console.log(this.elements);

      this.cleaning();

      this.render();
      
    } else if (dataAttribute.action === "sortName"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
      

      this.cleaning();

      
      this.render();
      
      this.arrowUp();

    } else if (dataAttribute.action === "sortPrice"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
      

      this.cleaning();

      
      this.render();
      
      this.test();


      console.log(this.elements);
    }
  
    console.log(dataAttribute);

  }

  makeHtmlForTable(elements) {

    let resultHtml = "";
   
    elements.forEach((el) => {
      resultHtml = resultHtml + makeRow(el);
    });


    return `
    <div class = "container" id = "button">
      <div class = "row">
        <div class = "col-2"> </div>
          <div class = "col-8">
              ${searchline()}
              <table class="table table-bordered table-secondary align-middle">
              <thead>
                <tr class="table-primary">
                  <th><div class="d-flex justify-content-around"><div>Name</div><div id="1" data-action="sortName" data-toggle-id = 'q'> &#11165; </div></div></th>
                  <th><div class="d-flex justify-content-around"><div>Price</div><div id="1" data-action="sortPrice">&#11167;</div></div></th>
                  <th>Action</th>
                </tr>  
                </thead>    
                <tbody id='tbody'>
                ${resultHtml}
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


    return `
       
                <tbody id='tbody'>
                ${resultHtml}
                </tbody>       
         
 `;
  } 

}



const table = new Table(elements, "table");

table.renderTableHeader();

