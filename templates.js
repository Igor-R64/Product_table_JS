const button = (id) => `<button data-action="edit" data-id = ${id} class="btn btn-outline-secondary" style="width: 100px;"> Edit </button>`;
const delbutton = (id) => `<button data-action="delete" data-id = ${id} class="btn btn-outline-danger" style="width: 100px;">Delete</button>`;
const searchbutton = () => `<button data-action="search" class="btn btn-outline-success" style="width: 100px;"> Search </button>`;
const addbutton = () => `<button data-action="add" class="btn btn-outline-warning" style="width: 100px;"> Add New </button>`;

const searchline = () => `<div class="d-flex justify-content-between p-4">
<input id="searchinput" type="text" class="form-control" placeholder="Search..." aria-label="City" style="width: 70%;">
${searchbutton()} ${addbutton()}
</div>`;


const makeRow = ({
    id,
    count,
    title,
    price
  }) => `
  <tr class="element">
      <td><div class="d-flex justify-content-between" style="heigt: 100%;">${title}
      <span class="badge rounded-pill bg-secondary">${count}</span>
      </div></td>
      <td class="align-middle">${price}</td>
      <td><div class="d-flex justify-content-evenly">${button(id)} ${delbutton(id)} </div></td>
    </tr>
  `;

  


