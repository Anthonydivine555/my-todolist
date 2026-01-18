let todoArray =JSON.parse (localStorage.getItem('todoArray')) || []

arrangeHtml();
  

// creates the html for each of the object in the array
function arrangeHtml() {
  if (todoArray.length === 0) {

     let blankText ='no list yet';
    const blankMessage = document.querySelector('.empty-message');
    blankMessage.innerHTML = blankText;

    document.querySelector('.container').style.display = "none"
    
  }else {
    let todoHTML = '';
  
    todoArray.forEach((todoObject) => {
      const {id, name, priority, deadline} = todoObject;

      console.log(id)
    
      const html =
      ` 
        <div class="tasks js-tasks-${id}">
            <span class="name js-name">${name}</span>
            <span class="priority js-priority">priority:${priority}</span>
            <span class="deadline js-deadline">${deadline}</span>
         
              <button class="js-delete-button" data-Todolist-id ="${id}">delete</button>
        </div>
      `
      todoHTML += html;
    });
    document.querySelector('.container').innerHTML = todoHTML;

    document.querySelectorAll('.js-delete-button').forEach((button) => {
      button.addEventListener('click', () => {

        const TodolistId = button.dataset.todolistId
        deleteTodolist(TodolistId);

        // todoArray.splice(index, 1)
        arrangeHtml();

      })
    })

  }
  saveTodoArray ();
}


// updating the arrray and pushing the information to the generated html

let timeout;

function displayingHtml() {
  const nameElement = document.querySelector('#input1')
  const name = nameElement.value;

  const priorityElement = document.querySelector('#top-priority')
  const priority = priorityElement.value;

  const dateElement = document.querySelector('#input2')
  const deadline = dateElement.value;

  const generatedId = Math.floor(Math.random() * 100);
  console.log(generatedId)

  if (dateElement.value == '' || priorityElement.value == '' || dateElement.value == '') {
        document.querySelector('.empty-input').innerHTML = 'please complete the input!'

        clearTimeout(timeout);

        timeout = setTimeout(() => {
          document.querySelector('.empty-input')
            .innerHTML = ''
        }, 2000)
      } else {

          todoArray.push({
          name: name,
          priority: priority,
          deadline: deadline,
          id: generatedId
        });


        // saveTodoArray ();

        if (todoArray) {
      const blankMessage = document.querySelector('.empty-message');
      blankMessage.innerHTML = '';

      document.querySelector('.container').style.display = "flex"
      
    } 

    arrangeHtml();


    dateElement.value = ''
    priorityElement.value = ''
    nameElement.value = ''

    }

      console.log(todoArray.id)
}

function saveTodoArray () { 
   localStorage.setItem('todoArray', JSON.stringify(todoArray));

}

function deleteTodolist(TodolistId) {
    let newlist = []

  todoArray.forEach((todoObject) => {
    if (todoObject.id != TodolistId) {
      newlist.push(todoObject)   
     }
  }) 
  todoArray = newlist;
  saveTodoArray ();
}



