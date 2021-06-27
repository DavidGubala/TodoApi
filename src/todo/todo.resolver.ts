import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';

@Resolver('Todo')
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // The Resolver interprets the Graphql Requests

  // Read all todos
  @Query('todos') //these have to take names from .graphql file
  async todos() {
    return this.todoService.getAll();
  }
  // Create
  @Mutation('createTodo')
  async createTodo(@Args('title') title: string, @Args('body') body: string) {
    return this.todoService.create(title, body);
  }
  // Update
  @Mutation('updateTodo')
  async updateTodo(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('body') body: string,
  ) {
    return this.todoService.update(id, title, body);
  }
  // Delete
  @Mutation('deleteTodo')
  async removeTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }
}
