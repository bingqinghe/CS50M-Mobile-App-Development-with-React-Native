const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
	const new_todo = prompt('What do you want to add into your TODO list: ');
	addTODO(new_todo);
}

function getItem() {
	let li = document.createElement('li');
	li.setAttribute('class', classNames['TODO_ITEM']);
	let li_id = itemCountSpan.innerHTML;
	li.setAttribute('id', li_id);
	return li;
}

function getCHECKBOX(id) {
	let input = document.createElement('input');
	input.setAttribute('type', 'checkbox');
	input.setAttribute('id', 'checkbox' + id);
	input.setAttribute('class', classNames['TODO_CHECKBOX']);
	input.addEventListener('change', function() {
		if (this.checked) {
			uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1;
		} else {
			uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;
		}
	});
	return input;
}

function getSpan(todo_text) {
	let span = document.createElement('span');
	span.setAttribute('class', classNames['TODO_TEXT']);
	span.innerHTML = todo_text;
	return span;
}

function getDelete(id) {
	let delete_button = document.createElement('button');
	delete_button.setAttribute('class', classNames['TODO_DELETE']);
	delete_button.innerHTML = 'DELETE';
	delete_button.addEventListener('click', function() {
		itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1;
		if (!document.getElementById('checkbox' + id).checked) {
			uncheckedCountSpan.innerHTML = uncheckedCountSpan.innerHTML - 1;
		}
		list.removeChild(document.getElementById(id));
	});
	return delete_button;
}

function addTODO(todo_item) {
	let li = getItem();
	li.appendChild(getCHECKBOX(li.id));
	li.appendChild(getSpan(todo_item));
	li.appendChild(getDelete(li.id));
	list.appendChild(li);
	itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1;
	uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;
}
