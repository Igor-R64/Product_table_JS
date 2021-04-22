
// const elem = document.getElementById("1");
    
// elem.style.backgroundColor = 'blue';

class Table {
  constructor(elements, idElemToRenderWithin) {
    this.elements = elements;
    this.idElemToRenderWithin = idElemToRenderWithin;
    this.sortingOrder = {
      orderByName: 'asc',
      orderByPrice: 'desc',
    }
  }

  render() {
    let x = document.getElementById(this.idElemToRenderWithin);

    const sorteredElements = this.elements.sort(el => el.title)

    x.insertAdjacentHTML("afterbegin", this.makeHtmlForTable(this.elements));

    x.addEventListener("click", this.tableHandler.bind(this));

  }



  cleaning() {
    let div = document.getElementById("table");
    let container = document.querySelector(".container");
    div.removeChild(container);
  }

  
  

  tableHandler = function(event) {
    const dataAttribute = event.target.dataset;
  
    if (dataAttribute.action === "edit" && !!dataAttribute.id) {
      console.log(`Нажата кнопка edit с id ${dataAttribute.id}`);
    } else if (dataAttribute.action === "delete" && !!dataAttribute.id){
      console.log(`Нажата кнопка delete с id ${dataAttribute.id}`);
      this.elements = [ ... this.elements.filter(el => el.id !=dataAttribute.id)];

      this.cleaning();

      this.render();

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
      
    } else if (dataAttribute.action === "sort"){
      
      this.sortingOrder.orderByName = this.sortingOrder.orderByName === 'asc' ? 'desc' : 'asc';
      
      this.cleaning();

      this.render();

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
                <tr class="table-primary">
                  <th><div class="d-flex justify-content-around"><div>Name</div><div id="1" data-action="sort">1</div></div></th>
                  <th><div class="d-flex justify-content-around"><div>Price</div></div></th>
                  <th>Action</th>
                </tr>             
                ${resultHtml}
              </table>
          </div>
        </div>
    </div>
 `;
  
  }
 
  
 
}



const table = new Table(elements, "table");

table.render();