// selectors 
const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const toDoList = document.querySelector('.todo-list');

// Load existing todos when page opens
document.addEventListener('DOMContentLoaded', getTodos);

// add todo
function addTodo(){
    const taskText = input.value.trim();
    if (taskText === ""){
        alert('Enter A Task Please');
        return;
    }
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    // create Li element
    const newToDo = document.createElement('li');
    newToDo.innerText = taskText;
    newToDo.classList.add('todo-text'); // CHANGED FROM 'todo-item'
    todoDiv.appendChild(newToDo)

    //create a check button 
    const checkedBtn = document.createElement('button');
    checkedBtn.innerHTML = '✔️';
    checkedBtn.classList.add('checked-btn');
    todoDiv.appendChild(checkedBtn);

    // create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // adding to local storage - FIXED FUNCTION NAME
    saveLocalTodos(taskText);

    //append to list
    toDoList.appendChild(todoDiv);
    input.value = "";
}

//save todos to local storage - FIXED SYNTAX
function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        // FIXED THIS LINE
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    // ADD THE NEW TODO TO ARRAY
    todos.push(todo);
    
    // SAVE BACK TO LOCALSTORAGE
    localStorage.setItem('todos', JSON.stringify(todos));
}

// GET TODOS FROM LOCALSTORAGE - YOU WERE MISSING THIS
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-text');
        todoDiv.appendChild(newToDo);

        const checkedBtn = document.createElement('button');
        checkedBtn.innerHTML = '✔️';
        checkedBtn.classList.add('checked-btn');
        todoDiv.appendChild(checkedBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑';
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn);

        toDoList.appendChild(todoDiv);
    });
}

// handles button click
button.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
});

// handles Enter key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        addTodo();
    }
});

// delete a todo, and check a todo using event delegation 
toDoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')){
        const todo = e.target.parentElement;
        removeLocalTodo(todo); // ADD THIS FUNCTION
        todo.remove();
    } else if (e.target.classList.contains('checked-btn')){
        const li = e.target.parentElement.querySelector('li');
        li.classList.toggle('completed');
    } else if (e.target.tagName === 'LI'){
        e.target.classList.toggle('completed');
    }
});

// ADD THIS FUNCTION - Remove from localStorage
function removeLocalTodo(todoElement){
    const todoText = todoElement.querySelector('li').innerText;
    let todos = JSON.parse(localStorage.getItem('todos'));
    
    // Remove the todo from array
    todos = todos.filter(todo => todo !== todoText);
    
    // Save back to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}