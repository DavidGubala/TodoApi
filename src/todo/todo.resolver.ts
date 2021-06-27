import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';

@Resolver('Todo')
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query('todos') //these have to take names from .graphql file
  async todos() {
    return this.todoService.getAllTodos();
  }

  @Mutation('createTodo')
  async createTodo(@Args('title') title: string, @Args('body') body: string) {
    return this.todoService.createTodo(title, body);
  }

  @Mutation('updateTodo')
  async updateTodo(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('body') body: string,
  ) {
    return this.todoService.updateTodo(id, title, body);
  }

  @Mutation('deleteTodo')
  async removeTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }
}
