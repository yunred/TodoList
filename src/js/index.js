import { $ } from './utils/dom.js';
import store from './store/index.js';
// [요구사항] - 서버와의 통신을 통한 메뉴 관리
// - 서버에 새로운 할 일이 추가될 수 있도록 요청
// - 서버에 카테고리별 메뉴리스트를 불러옴
// - 서버에 메뉴가 수정될 수 있도록 요청
// - 서버에 메뉴의 품절상태가 토들 형식으로 변환될 수 있도록 요청
// - 서버에 메뉴가 삭제될 수 있도록 요청

const Base_URL = 'http://localhost:3000/api';

const TodoApi = {
  async getAllTodoByCategory(category) {
    const response = await fetch(`${Base_URL}/category/${category}/todo`);
    return response.json();
  },
};

function App() {
  this.todoItem = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  };
  this.currentCategory = 'daily'; //현재의 카테고리도 상태값으로 관리, default값:daily

  this.init = async () => {
    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //앱을 실행했을 때 카테고리 별 할 일 리스트 불러오는 작업

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

  const addTodo = async () => {
    if ($('#todo-text').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const todoText = $('#todo-text').value;

    await fetch(`${Base_URL}/category/${this.currentCategory}/todo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ text: todoText }),
    }).then(response => {
      return response.json();
    });

    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //받아온 전체 데이터 todoItem[this.currentCategory]에 추가
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
