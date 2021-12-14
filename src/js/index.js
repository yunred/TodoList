import { $ } from './utils/dom.js';
import store from './store/index.js';

function App() {
  this.todoItem = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  };
  this.currentCategory = 'daily'; //현재의 카테고리도 상태값으로 관리, default값:daily

  this.init = () => {
    if (store.getLocalStorage()) {
      this.todoItem = store.getLocalStorage();
    }
    todoRender();
    initEventListeners();
  };

  const updateTodoCount = () => {
    const itemCount = this.todoItem[this.currentCategory].length;
    $('.todo-count').innerText = `총 ${itemCount} 개`;
  };

  const todoRender = () => {
    const template = this.todoItem[this.currentCategory]
      .map((item, index) => {
        return `
    <li data-todo-id="${index}" >
      <span class="todo-text" ${item.done ? 'done' : ''}>${item.text}</span>
      <button
        type="button"
        class="todo-done-button"
        >
      ✔
      </button>
      <button
        type="button"
        class="todo-edit-button"
        >
      수정
      </button>
      <button
      type="button"
      class="todo-remove-button"
        >
      삭제
      </button>
    </li>`;
      })
      .join('');
    $('#todo-text-list').innerHTML = template;
    updateTodoCount();
  };

  const addTodo = () => {
    if ($('#todo-text').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const todoText = $('#todo-text').value;
    this.todoItem[this.currentCategory].push({ text: todoText }); //push를 이용해 새로운 객체를 추가함
    //상태가 변경됐을 때 localStorage에 바로 저장하고 읽어옴
    store.setLocalStorage(this.todoItem);
    //여러개의 item들이 렌더링 되어야 해서 map을 이용해 그 아이템별로 HTML 마크업을 만들 수 있게 함
    todoRender();
    $('#todo-text').value = '';
  };

  const editTodo = e => {
    const todoId = e.target.closest('li').dataset.todoId;
    const $todoText = e.target.closest('li').querySelector('.todo-text');
    const renamedTodoText = prompt('할 일 수정', $todoText.innerText);
    this.todoItem[this.currentCategory][todoId].text = renamedTodoText;
    store.setLocalStorage(this.todoItem);
    todoRender();
  };

  const removeTodo = e => {
    const remove = confirm('삭제하시겠습니까?');
    if (remove) {
      const todoId = e.target.closest('li').dataset.todoId;
      this.todoItem[this.currentCategory].splice(todoId, 1);
      store.setLocalStorage(this.todoItem);
      todoRender();
    } else return;
  };

  const doneTodo = e => {
    const todoId = e.target.closest('li').dataset.todoId;
    this.todoItem[this.currentCategory][todoId].done =
      !this.todoItem[this.currentCategory][todoId].done;
    store.setLocalStorage(this.todoItem);
    todoRender();
  };

  const initEventListeners = () => {
    //버튼 클릭 시
    $('#todo-text-list').addEventListener('click', e => {
      if (e.target.classList.contains('todo-remove-button')) {
        removeTodo(e);
        return;
      }
      if (e.target.classList.contains('todo-edit-button')) {
        editTodo(e);
        return;
      }
      if (e.target.classList.contains('todo-done-button')) {
        doneTodo(e);
        return;
      }
    });

    //submit 이벤트가 발생했을 때 form태그 자동으로 전송되는 것을 막아줌
    $('#todo-form').addEventListener('submit', e => {
      e.preventDefault();
    });

    //확인 버튼 클릭 시
    $('#todo-form-submit-button').addEventListener('click', addTodo);

    //엔터 키 입력 시
    $('#todo-text').addEventListener('keypress', e => {
      if (e.key !== 'Enter') {
        return;
      }
      addTodo();
    });

    $('nav').addEventListener('click', e => {
      const isCategoryButton =
        e.target.classList.contains('todo-category-name');
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} Plan`;
        todoRender();
      }
    });
  };
}

const app = new App(); //app이라는 객체 생성
app.init(); // app에서 init  메서드 불러옴
