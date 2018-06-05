window.onload = () => {
  // ONLOAD WRAPPER BEGINS

  console.log('doc loaded. jquery loaded?: ', typeof $ !== 'undefined');

  // AJAX call to retrieve all todos from DB
  function getTodos() {
    $.get('http://localhost:8004/todos', (data, status) => {
      console.log(status);
      if (status === 'success') {
        renderTodos(data);
      } else {
        $('#right-container').append('<p>Failed to get to-dos!</p>'); // --> append adds an element to the selected element
      }
    });
  }
  
  function renderTodos(data) {
    $('#to-do-list').empty(); // --> empty removes all child elements from the selected element
    data.forEach((todoObj) => {
      const newTodo = $(`<div id=${todoObj.id} class="to-do-item"><span>${todoObj.text}</span><button class="remove" >Remove</button></div>`);
      $('#to-do-list').append(newTodo);
    });
  }

  function postNewTodo(text) {
    $.post('/todos', {
      text,
    }, (result) => {
      console.log('POST request: ', result);
      getTodos();
    });
  }

  function removeTodo(id) {
    console.log('sending delete request for id ', id);
    $.ajax({ // --> jQuery does not have a shorthand DELETE or PUT method
      url: `/todos/${id}`,
      type: 'DELETE',
      success: (result) => {
        if (result === 'success') console.log('server deleted todo!');
      }
    });
    getTodos();
  }

  // initial call: request current todos
  getTodos();

  // EVENT HANDLERS/LISTENERS -----

  // function that fires on form submission
  $('#new-todo-form').submit((event) => { // --> .submit() listens for selected form submission
    event.preventDefault();
    console.log('form submit fired.');
    const text = $('textarea').val(); // --> .val() with no argument gets value
    console.log(text);
    if ($('textarea').val() !== '') {
      postNewTodo(text);
      $('textarea').val(''); // --> .val() with argument sets value
    } else if ($('#warn').length === 0) {
      $('#left-container').append('<div id="warn">Please enter some text! (Click to dismiss.)</div>');
    }
  });

  // function that removes an item from to-do list on click
  $(document).on('click', '.remove', (event) => { // --> .on() is the default listener
    console.log('remove click heard! event: ', event);
    removeTodo(event.target.parentElement.id);
  });

  $(document).on('click', '#warn', (event) => {
    $('#warn').remove(); // --> .remove() completely removes the selected element from the DOM
  });

  // ONLOAD WRAPPER ENDS
}