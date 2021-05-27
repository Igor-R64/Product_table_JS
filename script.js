const table = new Table(elements, "table");

const deleteModal = new DeleteModal('rendermod',table.delete.bind(table));

const addEditModal = new AddEditModal('rendermod',table.addEdit.bind(table));


table.initialize();

deleteModal.renderModal();