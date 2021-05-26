class AddEditModal {
    constructor(idElemToRenderWithin, callback) {
      this.idElemToRenderWithin = idElemToRenderWithin;
      this.callback = callback;
      this.elementsToEdit = {
        id: null,
        title: '',
        count: '',
        price: '',
      };
    }
  
    renderModal() {
      let x = document.getElementById(this.idElemToRenderWithin);
      x.insertAdjacentHTML("afterbegin", this.makeHtmlForAddModal());
      x.addEventListener("click", this.modalHandler.bind(this));
      x.addEventListener("click", this.modalCloseHandler.bind(this));
      this.renderModalBody();
    }

    renderModalBody() {
      let x = document.getElementById('body');
      x.insertAdjacentHTML("afterbegin", this.makeHtmlForAddModalBody());
    }

    cleaningModalBody() {
      let mbody = document.getElementById("binput");
      mbody.remove();
    }



  
    open(elements) {
      if (elements) {
        this.elementsToEdit = elements;
      }
       modaladd.classList.add('d-flex');
      this.cleaningModalBody();
      this.renderModalBody();
      
    }
  
    close() {
      modaladd.classList.remove('d-flex');
    }

    clearError() {
      errortitle.classList.remove('d-block');
      errorprice.classList.remove('d-block');
      errorcount.classList.remove('d-block');
    }

    clearInput() {
      let form = document.querySelectorAll('.form-control');
      form.forEach(item => {
      item.value = "";
      });
    }

      
    
  
    modalHandler(e) {
      const atribute = e.target.dataset;
  
      if(atribute.action === 'No') {
        this.close();
        this.clearError();
        this.clearInput();
      }
      else if (atribute.action === 'Yes') {

        this.clearError();
      

        let form = document.forms.addform; 
        let title = form.elements.title.value;
        let price = form.elements.price.value;
        let count = form.elements.count.value; 


        const titleRegexp = /[А-Яа-яА-яA-ZA-za-z]/;
        const numbereRegexp = /[0-9]/;

        const isTitleValid = titleRegexp.test(title);
        const isPriceeValid = numbereRegexp.test(price);
        const isCounteValid = numbereRegexp.test(count);



        if (isTitleValid && isPriceeValid && isCounteValid) {
          this.close();
          this.clearError();
          this.clearInput();
          this.callback({
            // id: this.elementsToEdit.id,
            title: title,
            price: price,
            count: count,
        });
        } else {
          !isTitleValid ? (errortitle.classList.add('d-block')) : null;
          !isPriceeValid ? (errorprice.classList.add('d-block')) : null;
          !isCounteValid ? (errorcount.classList.add('d-block')) : null;
        }

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
                <h5 class="modal-title">Adding a new item</h5>
                <button data-action="No" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id ='body'>
                
        </div>
    </div>
  </div>
  </div>
  `;
    }


    makeHtmlForAddModalBody() {

      return  `<form class="row g-3 " name="addform" id ='binput'>
      <div class="mb-3 w-75 ">
          <div class="col-auto"> 
              <label for="title" class="form-label">Name</label>
          </div>
          <div class="col-auto">
              <input type="title" name="title" class="form-control"  maxlength="30" placeholder="Enter the title" required value = '${this.elementsToEdit.title}'  > </div>
              <div id='errortitle'class="invalid-feedback">The name must consist of English letters, no more than 30 characters long</div>
          </div>
          <div class="mb-3 w-75">
              <label for="price" class="form-label">Price</label>
              <input type="price" name="price" class="form-control"  maxlength="7" placeholder="Enter price" required value = '${this.elementsToEdit.price}' ></div>
              <div id='errorprice' class="invalid-feedback">The price must consist of characters from 0-9, no more than 7 characters</div>
          <div class="mb-3 w-75">
              <label for="count" class="form-label">Count</label>
              <input type="count" name="count" class="form-control" maxlength="4" placeholder="Enter quantity" required value = '${this.elementsToEdit.count}' ></div>
               <div id='errorcount' class="invalid-feedback">The number must consist of characters from 0-9, no more than 4 characters</div>
          </div>
        <div class="modal-footer">
  <button data-action="Yes" type="submit" class="btn btn-outline-secondary" style="width: 150px;">Add</button>
</div>
</form>`;

    }
             
  
  }