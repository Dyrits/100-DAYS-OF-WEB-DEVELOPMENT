const todoFormElement = document.querySelector('#todo-management form');
const todosListElement = document.getElementById('todos-list');

const url = "http://localhost:3000/todos/";

let editedTodoElement;

async function loadTodos() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const { todos } = await response.json();
      for (const todo of todos) { createTodoListItem(todo.text, todo._id); }
    } else { alert("The data couldn't be retrieved."); }
  } catch (error) {
    console.error(error);
    alert('Something went wrong!');
  }
}

function createTodoListItem(todoText, todoId) {
  const newTodoItemElement = document.createElement('li');
  newTodoItemElement.dataset.todoid = todoId;
  const todoTextElement = document.createElement('p');
  todoTextElement.textContent = todoText;
  const editTodoButtonElement = document.createElement('button');
  editTodoButtonElement.textContent = 'Edit';
  editTodoButtonElement.addEventListener('click', startTodoEditing);
  const deleteTodoButtonElement = document.createElement('button');
  deleteTodoButtonElement.textContent = 'Delete';
  deleteTodoButtonElement.addEventListener('click', deleteTodo);
  const todoActionsWrapperElement = document.createElement('div');
  todoActionsWrapperElement.appendChild(editTodoButtonElement);
  todoActionsWrapperElement.appendChild(deleteTodoButtonElement);
  newTodoItemElement.appendChild(todoTextElement);
  newTodoItemElement.appendChild(todoActionsWrapperElement);
  todosListElement.appendChild(newTodoItemElement);
}

async function createTodo(todoText) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ text: todoText, }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      const todoId = data._id;
      createTodoListItem(todoText, todoId);
    } else { alert("The dodo couldn't be created."); }
  } catch (error) {
    console.error(error);
    alert('Something went wrong!');
  }
}

async function updateTodo(newTodoText) {
  const todoId = editedTodoElement.dataset.todoid;
  try {
    const response = await fetch(url + todoId, {
      method: "PATCH",
      body: JSON.stringify({ text: newTodoText, }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      editedTodoElement.firstElementChild.textContent = newTodoText;
      todoFormElement.querySelector("input").value = String();
      editedTodoElement = null;
    } else { alert("The todo couldn't be updated."); }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
}

async function deleteTodo(event) {
  const clickedButtonElement = event.target;
  const todoElement = clickedButtonElement.parentElement.parentElement;
  const todoId = todoElement.dataset.todoid;
  try {
    const response = await fetch(url + todoId, { method: "DELETE" });
    console.log(response);
    response.ok ? todoElement.remove() : alert("The todo couldn't be deleted.");
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
}

function saveTodo(event) {
  event.preventDefault();
  const formInput = new FormData(event.target);
  const enteredTodoText = formInput.get('text');
  !editedTodoElement ? createTodo(enteredTodoText) : updateTodo(enteredTodoText);
}

function startTodoEditing(event) {
  const clickedButtonElement = event.target;
  editedTodoElement = clickedButtonElement.parentElement.parentElement; // the <li>
  const currentText = editedTodoElement.firstElementChild.textContent;
  todoFormElement.querySelector('input').value = currentText;
}

todoFormElement.addEventListener('submit', saveTodo);

loadTodos();