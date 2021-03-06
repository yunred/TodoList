import { $ } from './utils/dom.js';
import TodoApi from './api/index.js';

function App() {
  this.todoItem = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  };
  this.currentCategory = 'daily'; //현재의 카테고리도 상태값으로 관리, default값:daily

  this.init = async () => {
    todoRender();
    initEventListeners();
  };

  const updateTodoCount = () => {
    const itemCount = this.todoItem[this.currentCategory].length;
    $('.todo-count').innerText = `총 ${itemCount} 개`;
  };

  const todoRender = async () => {
    this.todoItem[this.currentCategory] = await TodoApi.getAllTodoByCategory(
      this.currentCategory
    ); //받아온 전체 데이터 todoItem[this.currentCategory]에 추가
    const template = this.todoItem[this.currentCategory]
      .map(item => {
        return `
    <li data-todo-id="${item.id}" >
      <div>
        <button
          type="button"
          class="todo-done-button"
          />
          ${item.isDone ? '✔' : '　'}
          </button>
        <span class="todo-text ${item.isDone ? 'done' : ''}">${item.text}</span>
      </div>    
      <div>    
        <button
          type="button"
          class="todo-edit-button todo-list-button"
          >
        수정
        </button>
        <button
        type="button"
        class="todo-remove-button todo-list-button"
          >
        삭제
        </button>
      </div>  
    </li>`;
      })
      .join('');
    $('#todo-text-list').innerHTML = template;
    updateTodoCount();
  };
  const isDuplicate = e =>{
    const duplicatedItem = this.todoItem[this.currentCategory].find(
      item => item.text === e
    );
    if (duplicatedItem) {
      alert('이미 등록된 할 일입니다.');
      return 1;
    }
  }
  const addTodo = async () => {
    if ($('#todo-text').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const todoText = $('#todo-text').value;
    if(isDuplicate(todoText) === 1) {
      $('#todo-text').value = '';
      return;
    }
    await TodoApi.createTodo(this.currentCategory, todoText); //todoItem 생성
    todoRender();
    $('#todo-text').value = '';
  };

  const editTodo = async e => {
    const todoId = e.target.closest('li').dataset.todoId;
    const $todoText = e.target.closest('li').querySelector('.todo-text');
    const renamedTodoText = prompt('할 일 수정', $todoText.innerText);
    if(isDuplicate(renamedTodoText)===1) return;
    await TodoApi.changeTodo(this.currentCategory, todoId, renamedTodoText);
    todoRender();
  };

  const removeTodo = async e => {
    const remove = confirm('삭제하시겠습니까?');
    if (remove) {
      const todoId = e.target.closest('li').dataset.todoId;
      await TodoApi.deleteTodo(this.currentCategory, todoId);
      todoRender();
    } else return;
  };

  const doneTodo = async e => {
    const todoId = e.target.closest('li').dataset.todoId;
    await TodoApi.toggleDoneTodo(this.currentCategory, todoId);
    todoRender();
  };

  const changeCategory = e => {
    const isCategoryButton = e.target.classList.contains('todo-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} Plan`;
      todoRender();
    }
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

    //감정버튼 선택 시
    $('#select-emotion').addEventListener('click', e=> {
      if(e.target.classList.contains('emotion')){
        if(!e.target.classList.contains('selected')){
          let emotions = document.querySelectorAll('.emotion');
          [].forEach.call(emotions, function(el){
            el.classList.remove('selected');
          })
          e.target.classList.add('selected');
          return;
        }if(e.target.classList.contains('selected')){
          e.target.classList.remove('selected');
        }
      }
    })

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

    $('nav').addEventListener('click', changeCategory);
  };
}

const app = new App(); //app이라는 객체 생성
app.init(); // app에서 init  메서드 불러옴
