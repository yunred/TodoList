# 📌TodoList
- 바닐라 자바스크립트 토이 프로젝트
- 오늘 하루의 기분을 이모지로 선택할 수 있으며 daily, weekly, monthly, yearly 단위로 할 일을 기록하는 투두리스트
- JS 문벅스 카페메뉴 앱 만들기 강의를 수강하면서 기능을 변경 및 추가하여 만들었습니다

<br/><br/>

# 📆기간
- 2021.12.10 ~ 2021-12.20

<br/><br/>

# 🎞영상
<img width="100%" src="https://user-images.githubusercontent.com/84527643/146718137-5a321291-3ed5-4e68-b6c0-c3f0630c434c.gif"/>
<img width="100%" src= "https://user-images.githubusercontent.com/84527643/146722075-350279eb-31f6-491c-93c2-52a9feb2f383.PNG"/>

<br/><br/>

# ✨실행방법 
```
//백 서버 실행
$ git clone https://github.com/yunred/TodoList-server.git
$ git npm install
$ git npm start

```
백엔드 서버는 기존 JS문벅스 카페메뉴 앱 만들기 코드를 수정한 코드입니다.

<br/><br/><br/>


# 🎨API
할 일 생성하기
- POST
  - /api/category/:category/todo

카테고리 별 할 일 리스트 불러오기
- GET
  - /api/category/:category/todo

할 일 수정	
- PUT	
  - /api/category/:category/todo/:todoId

할 일 완료 처리
- PUT
  - /api/category/:category/todo/:todoId/done

할 일 삭제
- DELETE
  - /api/category/:category/todo/:todoId
