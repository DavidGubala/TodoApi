import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

/*
  Here we run tests against the service to see if we are 
  communicating with the database properly
*/

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    service = new TodoService(Todo);
  });

  describe('GetAllTodos-Service', () => {
    it('should get an array of todos', () => {
      let result;
      jest.spyOn(service, 'getAll').mockImplementation(() => result);
      const data = result.data.todos;
      expect(data);
      expect(data[0].id);
      expect(data[0].title);
      expect(data[0].body);
    });
  });
});
