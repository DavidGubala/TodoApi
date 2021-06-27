import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize'; // importing orm to use with postgresql
import { GraphQLModule } from '@nestjs/graphql'; //importing graphql
import { TodoModule } from './todo/todo.module'; //Custom Modules
import { DateScalar } from './customScalars/DateScalar'; //Custom Scalars (date)
import { GraphQLDefinitionsFactory } from '@nestjs/graphql'; //Custom Scalar Types
import { Todo } from './todo/todo.model';

@Module({
  imports: [
    // importing 'modules' into main app module
    // modules are from NestJS
    // Sequelize, GraphQL, and TodoModule(custom)
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todoapi',
      autoLoadModels: true,
      synchronize: true,
      models: [Todo],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}

//Below code I copied from https://docs.nestjs.com/graphql/scalars#schema-first
// fixes type for custom scalar 'Date' used for Todo
const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'Date',
  },
  watch: true,
  emitTypenameField: true,
});
