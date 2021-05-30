class BaseModal {
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
  }