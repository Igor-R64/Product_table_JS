class DeleteModal {
    constructor(idElemToRenderWithin, callback) {
      this.idElemToRenderWithin = idElemToRenderWithin;
      this.idElemToDelete = null;
      this.callback = callback;
    }
  
    renderModal() {
      let x = document.getElementById(this.idElemToRenderWithin);
      x.insertAdjacentHTML("afterbegin", this.makeHtmlForModal());
      x.addEventListener("click", this.modalHandler.bind(this));
      x.addEventListener("click", this.modalCloseHandler.bind(this));
      // x.addEventListener("keypress", this.modalCloseEscHandler.bind(this));
    }
  
    open(id) {
      this.idElemToDelete = id;
      modal.classList.add('d-flex');
    }
  
    close() {
      modal.classList.remove('d-flex');
    }
  
    modalHandler(e) {
      const atribute = e.target.dataset;
  
      if(atribute.action === 'No') {
        this.close();
      }
      else if (atribute.action === 'Yes') {
        this.callback(this.idElemToDelete);
        this.close();
      }
    }
  
    modalCloseHandler(e) {
      const atribute = e.target; 
      if(atribute === modal) {
        this.close();
      }
    }
  
    // modalCloseEscHandler(e) {
    //   const atribute = e.keyCode; 
    //   if(atribute === 27) {
    //     this.close();
    //   }
    // }
  
    makeHtmlForModal() {
  
      return `<div id='modal' class="modal" >
      <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Are you sure?</h5>
              <button data-action="No" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <p>Are you sure you want to perform this action?</p>
          </div>
          <div class="modal-footer">
              <button data-action="Yes" type="button" class="btn btn-outline-danger" style="width: 150px;">Yes</button>
              <button data-action="No" type="button" class="btn btn-outline-secondary" style="width: 150px;">No</button>
          </div>
      </div>
  </div>
  </div>
  `;
    }
  
  }