const tableLauout = ``;

const elements = [
  {
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

const button = (id) => `<button id = ${id} class="btn btn-primary" style="width: 80px;"> Edit </button>`;
const delbutton = () => `<button class="btn btn-danger">Delete</button>`;

const makeRow = ({ id, title, price }) => `
<tr>
    <td>${title}</td><td>${price}</td><td class="d-flex justify-content-evenly">${button(id)} ${delbutton()} </td>
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

    return `<div class="d-flex justify-content-evenly p-4">
    <input type="text" class="form-control" placeholder="City" aria-label="City" style="width: 50%;">${delbutton()} ${delbutton()}
    </div>
 <table>${resultHtml}</table>`;
  }
}

const table = new Table(elements, "table");

table.initialize();
