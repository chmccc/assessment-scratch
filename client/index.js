window.onload = () => {
  // ONLOAD WRAPPER BEGINS
  console.log('doc loaded. jquery loaded?: ', typeof $ !== 'undefined');
  // function that fires on form submission
  $('#new-todo-form').submit((event) => {
    event.preventDefault();
    console.log('form submit fired.');
    const text = $('textarea').val();
    console.log(text);
    if ($('textarea').val() !== '') {
      const newTodoItem = $(`<div class="to-do-item"><p>${text}</p></div>`);
      $('#to-do-list').append(newTodoItem);
    }
  });


  // ONLOAD WRAPPER ENDS
}