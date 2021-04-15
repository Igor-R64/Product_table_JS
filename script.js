const tableLauout = ``;

const elements = [{
    id: 1,
    count: 9,
    title: "Цитрамон",
    price: 5000000,
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

const button = (id) => `<button data-action="edit" data-id = ${id} class="btn btn-primary" style="width: 100px;"> Edit </button>`;
const delbutton = (id) => `<button data-action="delete" data-id = ${id} class="btn btn-danger" style="width: 100px;">Delete</button>`;
const searchbutton = () => `<button data-action="search" class="btn btn-info" style="width: 100px;"> Search </button>`;
const addbutton = () => `<button data-action="add" class="btn btn-primary" style="width: 100px;" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add New </button>`;
const addmodal = document.createElement('div');
addmodal.innerHTML = '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" id="modal"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Add New Element</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><label for="inputName" class="col-sm-2 col-form-label">Name</label><div class="col-sm-6"><input class="form-control" type="text" placeholder="Name"aria-label="default input example"></div><label for="inputName" class="col-sm-2 col-form-label">Count</label><div class="col-sm-4"><input class="form-control" type="text" placeholder="Count"aria-label="default input example"></div><label for="inputName" class="col-sm-2 col-form-label">Price</label><div class="col-sm-6"><input class="form-control" type="text" placeholder="Price"aria-label="default input example"></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
document.body.prepend(addmodal);




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
    <td><div class="d-flex justify-content-between" style="heigt: 100%;">${title}
    <span class="badge rounded-pill bg-secondary">${count}</span>
    </div></td>
    <td class="align-middle">${price}</td>
    <td><div class="d-flex justify-content-evenly">${button(id)} ${delbutton(id)} </div></td>
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

    x.addEventListener("click", tableHandler);

  }

  render(elements) {
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



function tableHandler(event) {
  const dataAttribute = event.target.dataset;

  if (dataAttribute.action === "edit" && !!dataAttribute.id) {
    console.log(`Нажата кнопка edit с id ${dataAttribute.id}`);
  } else if (dataAttribute.action === "delete" && !!dataAttribute.id){
    console.log(`Нажата кнопка delete с id ${dataAttribute.id}`);
  }

  console.log(dataAttribute);
}


const table = new Table(elements, "table");

table.initialize();