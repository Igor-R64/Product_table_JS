class AddEditModal extends BaseModal {
    constructor(...args) {
      super(...args);
      this.elementsToEdit = {
        id: null,
        title: '',
        count: '',
        price: '',
      };
    }


    cleaningModal() {
      let mbody = document.getElementById("modaladd");
      mbody.remove();
    }

    open(element) {
      if (element) {
        this.elementsToEdit = element;
      } else {
        this.elementsToEdit = {
          id: null,
          title: '',
          count: '',
          price: '',
        }
      }
      this.renderModal();
    }
  
    close() {
      this.cleaningModal();
    }

    clearError() {
      const errortitle = document.getElementById('errortitle');
      const errorprice = document.getElementById('errorprice');
      const errorcount = document.getElementById('errorcount');
      if(errortitle.classList.contains('d-block')){
        errortitle.classList.remove('d-block');
      }
      if(errorprice.classList.contains('d-block')){
        errorprice.classList.remove('d-block');
      }
      if(errorcount.classList.contains('d-block')){
        errorcount.classList.remove('d-block');
      }
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
        // this.clearInput();
        this.close();
      }
      else if (atribute.action === 'Yes') {

        this.clearError();
        let form = document.forms.addform; 
        let title = form.elements.title.value;
        let price = +form.elements.price.value;
        let count = +form.elements.count.value; 


        const titleRegexp = /[А-Яа-яА-яA-ZA-za-z]/;
        const numbereRegexp = /^(?!0)\d+$/;

        const isTitleValid = titleRegexp.test(title);
        const isPriceeValid = numbereRegexp.test(price);
        const isCounteValid = numbereRegexp.test(count);



        if (isTitleValid && isPriceeValid && isCounteValid) {
          this.close();
          this.clearInput();
          this.callback({
            id: this.elementsToEdit.id,
            title: title,
            price: price,
            count: count,
        });
        } else {
          const errortitle = document.getElementById('errortitle');
          const errorprice = document.getElementById('errorprice');
          const errorcount = document.getElementById('errorcount');
          !isTitleValid ? (errortitle.classList.add('d-block')) : null;
          !isPriceeValid ? (errorprice.classList.add('d-block')) : null;
          !isCounteValid ? (errorcount.classList.add('d-block')) : null;
        }

      }
    }
  
  
  
    makeHtmlForModal() {
  
      return `<div id='modaladd' class="modal d-flex" >
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adding a new item</h5>
                <button data-action="No" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id ='body'>
            <form class="row g-3 " name="addform" id ='binput'>
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
      </form>
        </div>
    </div>
  </div>
  </div>
  `;
    }             
  }