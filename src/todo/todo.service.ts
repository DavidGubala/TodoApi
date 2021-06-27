import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<string> {
    const todo = await this.findOne(id);
    await todo.destroy();
    return id;
  }

  async createTodo(title: string, body: string): Promise<Todo> {
    const todo = new Todo({
      title: title,
      body: body,
    });
    await todo.save();
    return todo;
  }

  async updateTodo(id: string, title: string, body: string): Promise<Todo> {
    const todo = await this.findOne(id);
    await todo.update({ title: title, body: body });
    return todo;
  }
}
