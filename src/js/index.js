import { $ } from './utils/dom.js';
import store from './store/index.js';
// [요구사항] - 서버와의 통신을 통한 메뉴 관리
// - 서버에 새로운 할 일이 추가될 수 있도록 요청
// - 서버에 카테고리별 메뉴리스트를 불러옴
// - 서버에 메뉴가 수정될 수 있도록 요청
// - 서버에 메뉴의 품절상태가 토들 형식으로 변환될 수 있도록 요청
// - 서버에 메뉴가 삭제될 수 있도록 요청

const BASE_URL = 'http://localhost:3000/api';

const TodoApi = {
  async getAllTodoByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/todo`);
    return response.json();
  },
  async createTodo(category, text) {
    const response = await fetch(`${BASE_URL}/category/${category}/todo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ text }), //{text: text}
    });
    if (!response.ok) {
      console.error('에러가 발생했습니다.');
    }
    return response.json();
  },
  async editTodo(category, todoId, text) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/todo/${todoId}`,
      {
        method: `PUT`,
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }
    );
    if (!response.ok) {
      console.error(response);
    }
    return response.json();
  },
  async toggleDoneTodo(category, todoId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/todo/${todoId}/done`,
      {
        method: 'PUT',
      }
    );
    if (!response.ok) {
      console.error(response);
    }
  },
  async deleteTodo(category, todoId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/todo/${todoId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      console.error(response);
    }
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
      .map(item => {
        return `
    <li data-todo-id="${item.id}" >
      <span class="todo-text" ${item.isDone ? 'done' : ''}>${item.text}</span>
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
    await TodoApi.createTodo(this.currentCategory, todoText); //todoItem 생성
    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //받아온 전체 데이터 todoItem[this.currentCategory]에 추가
    todoRender();
    $('#todo-text').value = '';
  };

  const editTodo = async e => {
    const todoId = e.target.closest('li').dataset.todoId;
    const $todoText = e.target.closest('li').querySelector('.todo-text');
    const renamedTodoText = prompt('할 일 수정', $todoText.innerText);
    await TodoApi.editTodo(this.currentCategory, todoId, renamedTodoText);
    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //받아온 전체 데이터 todoItem[this.currentCategory]에 추가
    todoRender();
  };

  const removeTodo = async e => {
    const remove = confirm('삭제하시겠습니까?');
    if (remove) {
      const todoId = e.target.closest('li').dataset.todoId;
      await TodoApi.deleteTodo(this.currentCategory, todoId);
      this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
        this.currentCategory
      );
      todoRender();
    } else return;
  };

  const doneTodo = async e => {
    const todoId = e.target.closest('li').dataset.todoId;
    await TodoApi.toggleDoneTodo(this.currentCategory, todoId);
    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //받아온 전체 데이터 todoItem[this.currentCategory]에 추가
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

    $('nav').addEventListener('click', async e => {
      const isCategoryButton =
        e.target.classList.contains('todo-category-name');
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} Plan`;
        this.todoItem[this.currentCategory] =
          await TodoApi.getAllTodoByCategory(this.currentCategory);
        todoRender();
      }
    });
  };
}

const app = new App(); //app이라는 객체 생성
app.init(); // app에서 init  메서드 불러옴
