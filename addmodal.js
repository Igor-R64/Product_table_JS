class AddModal {
    constructor(idElemToRenderWithin, callback) {
      this.idElemToRenderWithin = idElemToRenderWithin;
      this.callback = callback;
    }
  
    renderModal() {
      let x = document.getElementById(this.idElemToRenderWithin);
      x.insertAdjacentHTML("afterbegin", this.makeHtmlForAddModal());
      x.addEventListener("click", this.modalHandler.bind(this));
      x.addEventListener("click", this.modalCloseHandler.bind(this));
    }
  
    open() {
      modaladd.classList.add('d-flex');
    }
  
    close() {
      modaladd.classList.remove('d-flex');
    }
  
    modalHandler(e) {
      const atribute = e.target.dataset;
  
      if(atribute.action === 'No') {
        this.close();
      }
      else if (atribute.action === 'Yes') {
        let form = document.forms.addform; 
        let title = form.elements.title.value;
        let price = form.elements.price.value;
        let count = form.elements.count.value; 
  
        this.callback({
            title: title,
            price: price,
            count: count,
        });
        this.close();
      }
    }
  
    modalCloseHandler(e) {
      const atribute = e.target; 
      if(atribute === modaladd) {
        this.close();
      }
    }
  
    makeHtmlForAddModal() {
  
      return `<div id='modaladd' class="modal" >
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adding a new item.</h5>
                <button data-action="No" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="row g-3 " name="addform">
                    <div class="mb-3 w-75 ">
                        <div class="col-auto"> 
                            <label for="title" class="form-label">Name</label>
                        </div>
                        <div class="col-auto">
                            <input type="title" name="title" class="form-control"> </div>
                      </div>
                      <div class="mb-3 w-75">
                        <label for="price" class="form-label">Price</label>
                        <input type="price" name="price" class="form-control">
                      </div>
                      <div class="mb-3 w-75">
                        <label for="count" class="form-label">Count</label>
                        <input type="count" name="count" class="form-control">
                      </div>
                
            </div>
            <div class="modal-footer">
                <button data-action="Yes" type="submit" class="btn btn-outline-secondary" style="width: 150px;">Add</button>
            </div>
            </form>
        </div>
    </div>
  </div>
  </div>
  `;
    }
  
  }