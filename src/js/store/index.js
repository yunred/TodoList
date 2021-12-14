const store = {
  setLocalStorage(todoItem) {
    localStorage.setItem('todoItem', JSON.stringify(todoItem));
    //todoItem의 object형태 그대로 저장할 수 없고, localStorage는 문자열로만 저장해야 함
    //JSON.stringify()를 이용해서 해당 JSON 객체를 문자열로 저장할 수 있음
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('todoItem')); //문자열로 저장된 데이터를 JSON 객체로 변환
  },
};

export default store;
