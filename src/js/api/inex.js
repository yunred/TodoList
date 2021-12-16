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

export default TodoApi;
