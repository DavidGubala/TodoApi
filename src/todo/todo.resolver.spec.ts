import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';

/*
  Here we run tests against the Resolver to see if the graphql endpoint
  is set up properly to exchange data.
*/

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoResolver],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
