const button = (id) => `<button data-action="edit" data-id = ${id} class="btn btn-primary" style="width: 100px;"> Edit </button>`;
const delbutton = (id) => `<button data-action="delete" data-id = ${id} class="btn btn-danger" style="width: 100px;">Delete</button>`;
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
      <td><div class="d-flex justify-content-between" style="heigt: 100%;">${title}
      <span class="badge rounded-pill bg-secondary">${count}</span>
      </div></td>
      <td class="align-middle">${price}</td>
      <td><div class="d-flex justify-content-evenly">${button(id)} ${delbutton(id)} </div></td>
    </tr>
  `;

  

  const ups = () => `&#11165;`;

