import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    try {
      return await this.todoModel.findAll();
    } catch (err) {
      return err;
    }
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findOne({
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
    const todo = new this.todoModel({
      id: uuidv4(),
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
