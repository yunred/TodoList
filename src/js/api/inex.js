const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: data ? JSON.stringify({ data }) : null,
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert('에러가 발생했습니다.');
    console.error(e);
  }
  return response.json();
};

const requestWithoutJson = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert('에러가 발생했습니다.');
    console.error(e);
  }
};

const TodoApi = {
  async getAllTodoByCategory(category) {
    return request(`${BASE_URL}/category/${category}/todo`);
  },
  async createTodo(category, text) {
    return request(
      `${BASE_URL}/category/${category}/todo`,
      HTTP_METHOD.POST({ text })
    );
  },
  async editTodo(category, todoId, text) {
    return request(
      `${BASE_URL}/category/${category}/todo/${todoId}`,
      HTTP_METHOD.PUT({ text })
    );
  },
  async toggleDoneTodo(category, todoId) {
    return request(
      `${BASE_URL}/category/${category}/todo/${todoId}/done`,
      HTTP_METHOD.PUT()
    );
  },
  async deleteTodo(category, todoId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/todo/${todoId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default TodoApi;
