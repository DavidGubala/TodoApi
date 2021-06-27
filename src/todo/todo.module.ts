import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
