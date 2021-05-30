class BaseModal {
    constructor(idElemToRenderWithin, callback) {
        this.idElemToRenderWithin = idElemToRenderWithin;
        this.callback = callback;
    }
  
    renderModal() {
        let x = document.getElementById(this.idElemToRenderWithin);
        x.insertAdjacentHTML("afterbegin", this.makeHtmlForModal());
        x.addEventListener("click", this.modalHandler.bind(this));
        x.addEventListener("click", this.modalCloseHandler.bind(this));
      }

      open(id) {
        this.idElemToDelete = id;
        modal.classList.add('d-flex');
      }
    
      close() {
        modal.classList.remove('d-flex');
      }

      modalCloseHandler(e) {
        const atribute = e.target;
        const modaladd = document.querySelector('.modal');
        if(atribute === modaladd) {
          this.close();
        }
      }

}