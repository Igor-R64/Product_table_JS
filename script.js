const tableLauout = ``;

const elements = [{
    id: 1,
    count: 9,
    title: "Цитрамон",
    price: 50,
  },
  {
    id: 2,
    count: 5,
    title: "Аспирин",
    price: 60,
  },
  {
    id: 3,
    count: 3,
    title: "теанин",
    price: 160,
  },
  {
    id: 4,
    count: 1,
    title: "Метамфетамин",
    price: 1160,
  },
];

const button = (id) => `<button data-action="edit" id = ${id} class="btn btn-primary" style="width: 100px;"> Edit </button>`;
const delbutton = () => `<button data-action="delete" class="btn btn-danger" style="width: 100px;">Delete</button>`;
const searchbutton = () => `<button data-action="search" class="btn btn-info" style="width: 100px;"> Search </button>`;
const addbutton = () => `<button data-action="add" class="btn btn-primary" style="width: 100px;"> Add New </button>`;

const searchline = () => `<div class="d-flex justify-content-evenly p-4">
<input type="text" class="form-control" placeholder="Search..." aria-label="City" style="width: 70%;">
${searchbutton()} ${addbutton()}
</div>`;

const makeRow = ({
  id,
  count,
  title,
  price
}) => `
<tr>
    <td class="d-flex justify-content-between">${title}
    <span class="badge rounded-pill bg-secondary">${count}</span>
    </td>
    <td class="align-middle">${price}</td>
    <td class="d-flex justify-content-evenly">${button(id)} ${delbutton()} </td>
  </tr>
`;

class Table {
  constructor(elements, idElemToRenderWithin) {
    this.elements = elements;
    this.idElemToRenderWithin = idElemToRenderWithin;
  }

  initialize() {
    let x = document.getElementById(this.idElemToRenderWithin);

    x.insertAdjacentHTML("afterbegin", this.render(this.elements));
  }

  render(elements) {
    let resultHtml = "";

    elements.forEach((el) => {
      resultHtml = resultHtml + makeRow(el);
    });

    return `
    <div class = "container">
      <div class = "row">
        <div class = "col-2"> </div>
          <div class = "col-8">
    ${searchline()}
              <table class="table table-bordered table-secondary"">
              <tr class="table-primary">
    <th>Name</th>
    <th>Price</th>
    <th>Action</th>
  </tr>             
   ${resultHtml}
              </table>
          </div>
        </div>
    </div>;
 `;
  }

  
}


class Button {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }

  edit() {
    console.log("Edit");
  }

  delete() {
    console.log("Delete");
  }

  search() {
    console.log("Search");
  }

  add() {
    console.log("Add New");
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  };
}


const table = new Table(elements, "table");

table.initialize();