# ๐TodoList
- ๋ฐ๋๋ผ ์๋ฐ์คํฌ๋ฆฝํธ ํ ์ด ํ๋ก์ ํธ
- ์ค๋ ํ๋ฃจ์ ๊ธฐ๋ถ์ ์ด๋ชจ์ง๋ก ์ ํํ  ์ ์์ผ๋ฉฐ daily, weekly, monthly, yearly ๋จ์๋ก ํ  ์ผ์ ๊ธฐ๋กํ๋ ํฌ๋๋ฆฌ์คํธ
- JS ๋ฌธ๋ฒ์ค ์นดํ๋ฉ๋ด ์ฑ ๋ง๋ค๊ธฐ ๊ฐ์๋ฅผ ์๊ฐํ๋ฉด์ ๊ธฐ๋ฅ์ ๋ณ๊ฒฝ ๋ฐ ์ถ๊ฐํ์ฌ ๋ง๋ค์์ต๋๋ค

<br/><br/>

# ๐๊ธฐ๊ฐ
- 2021.12.10 ~ 2021-12.20

<br/><br/>

# ๐์์
<img width="100%" src="https://user-images.githubusercontent.com/84527643/146718137-5a321291-3ed5-4e68-b6c0-c3f0630c434c.gif"/>
<img width="100%" src= "https://user-images.githubusercontent.com/84527643/146722075-350279eb-31f6-491c-93c2-52a9feb2f383.PNG"/>

<br/><br/>

# โจ์คํ๋ฐฉ๋ฒ 
```
//๋ฐฑ ์๋ฒ ์คํ
$ git clone https://github.com/yunred/TodoList-server.git
$ git npm install
$ git npm start

```
๋ฐฑ์๋ ์๋ฒ๋ ๊ธฐ์กด JS๋ฌธ๋ฒ์ค ์นดํ๋ฉ๋ด ์ฑ ๋ง๋ค๊ธฐ ์ฝ๋๋ฅผ ์์ ํ ์ฝ๋์๋๋ค.

<br/><br/><br/>


# ๐จAPI
ํ  ์ผ ์์ฑํ๊ธฐ
- POST
  - /api/category/:category/todo

์นดํ๊ณ ๋ฆฌ ๋ณ ํ  ์ผ ๋ฆฌ์คํธ ๋ถ๋ฌ์ค๊ธฐ
- GET
  - /api/category/:category/todo

ํ  ์ผ ์์ 	
- PUT	
  - /api/category/:category/todo/:todoId

ํ  ์ผ ์๋ฃ ์ฒ๋ฆฌ
- PUT
  - /api/category/:category/todo/:todoId/done

ํ  ์ผ ์ญ์ 
- DELETE
  - /api/category/:category/todo/:todoId
