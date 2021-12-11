//TODO 할 일 추가
// - 할 일을 입력받고 엔터키 입력으로 추가 ✔
// - 할 일을 입력받고 버튼을 클릭하면 추가 ✔
// - 만약 입력값이 빈값이라면 추가되지 않음 ✔
// - 추가되는 할 일의 마크업은 <ul id="daily-todo-list"></ul> 안에 삽입해야 함 ✔
// - 할 일이 추가되면 input은 빈값으로 초기화 ✔
// - 총 할 일 개수를 count하여 상단에 보여줌 ✔

const $ = selector => document.querySelector(selector); //한줄로 써서 해당 부분을 바로 return
function App() {
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
      <span>${dailytodo}</span>
      <button
        type="button"
        >
      수정
      </button>
      <button
      type="button"
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
    const todoCount = $('#daily-todo-list').querySelectorAll('li').length; //querySelectorAll을 사용해서 모든 li태그를 가져옴
    $('.todo-count').innerText = `총 ${todoCount}`;
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

//TODO 할 일 수정
// - 할 일의 수정 버튼을 누르면 prompt창이 뜸
// - prompt 인터페이스에서 할 일을 입력받고, 확인버튼을 누르면 할 일이 수정됨
// -

//TODO 할 일 삭제
// - 할 일의 삭제버튼을 누르면 confirm창이 뜸
// - 확인 버튼을 클릭하면 할 일이 삭제됨
// - 총 할 일 갯수를 count하여 상단에 보여줌
