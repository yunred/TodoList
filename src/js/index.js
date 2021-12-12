//TODO 할 일 추가
// - 할 일을 입력받고 엔터키 입력으로 추가 ✔
// - 할 일을 입력받고 버튼을 클릭하면 추가 ✔
// - 만약 입력값이 빈값이라면 추가되지 않음 ✔
// - 추가되는 할 일의 마크업은 <ul id="daily-todo-list"></ul> 안에 삽입해야 함 ✔
// - 할 일이 추가되면 input은 빈값으로 초기화 ✔
// - 총 할 일 개수를 count하여 상단에 보여줌 ✔

const $ = selector => document.querySelector(selector); //한줄로 써서 해당 부분을 바로 return
function App() {
  const updateTodoCount = () => {
    const todoCount = $('#daily-todo-list').querySelectorAll('li').length; //querySelectorAll을 사용해서 ul태그 안의 모든 li태그를 가져옴
    $('.todo-count').innerText = `총 ${todoCount} 개`;
  };

  $('#daily-todo-list').addEventListener('click', e => {
    if (e.target.classList.contains('todo-remove-button')) {
      const remove = confirm('삭제하시겠습니까?');
      if (remove) {
        e.target.closest('li').remove(); // e.target.closest('li')는 li태그를 통으로 가져옴
        updateTodoCount();
      } else return;
    }
    if (e.target.classList.contains('todo-edit-button')) {
      //수정버튼을 누른 곳에서 제일 가까운 li태그로 타고 올라가서 span태그 선택
      const $todoText = e.target.closest('li').querySelector('.todo-text');

      //prompt return값이 수정할 값 //innerText는 element에 있는 text값
      const renamedTodoText = prompt('할 일 수정', $todoText.innerText);
      $todoText.innerText = renamedTodoText;
    }
  });

  //submit 이벤트가 발생했을 때 form태그 자동으로 전송되는 것을 막아줌
  $('#daily-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  const onSubmit = function () {
    if ($('#daily-todo').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const dailytodo = $('#daily-todo').value;
    const todoItemTemplate = dailytodo => {
      return `
    <li>
      <span class="todo-text">${dailytodo}</span>
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
    </li>
    `;
    }; //사용자가 입력한 할 일을 인자로 받아와서 li태그에 넣음
    $('#daily-todo-list').insertAdjacentHTML(
      'beforeend',
      todoItemTemplate(dailytodo)
    );
    updateTodoCount();
    $('#daily-todo').value = ''; //value값 조정
  };

  //확인 버튼 클릭 시
  $('#daily-form-submit-button').addEventListener('click', onSubmit);

  //엔터 키 입력 시
  $('#daily-todo').addEventListener('keypress', e => {
    if (e.key !== 'Enter') {
      return;
    }
    onSubmit();
  });
}

App();
