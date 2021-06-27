import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  // the service is the code that interacts with the db
  // and provides actual crud functionality
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  // Create
  async create(title: string, body: string): Promise<Todo> {
    try {
      const todo = new this.todoModel({
        id: uuidv4(),
        title: title,
        body: body,
      });
      await todo.save();
      return todo;
    } catch (err) {
      return err;
    }
  }

  async getAll(): Promise<Todo[]> {
    try {
      return await this.todoModel.findAll();
    } catch (err) {
      return err;
    }
  }

  // Read
  async findOne(id: string): Promise<Todo> {
    try {
      return await this.todoModel.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      return err;
    }
  }

  // Update
  async update(id: string, title: string, body: string): Promise<Todo> {
    try {
      const todo = await this.findOne(id);
      await todo.update({ title: title, body: body });
      return todo;
    } catch (err) {
      return err;
    }
  }

  // Remove
  async remove(id: string): Promise<string> {
    try {
      const todo = await this.findOne(id);
      await todo.destroy();
      return id;
    } catch (err) {
      return err;
    }
  }
}
