import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
/*
Tried to make e2e tests but they continue to fail 
may check out later
*/
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('GraphQL-createTodo', () =>{
    it('createTodo', () => {
      // Create Todo Test
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: 'createOwner',
          variables: {
            title: 'Testing Todo',
            body: 'This is a test of the todo system',
          },
          query: `
            mutation createTodo($title: String!, $body: String!) {
              createTodo(title: $title, body: $body) {
                id
                title
                body
              }
            }
          `,
        })
        .expect(({ body }) => {
          const data = body.data.createTodo;
          expect(data.id);
          expect(data.title);
          expect(data.body);
        })
        .expect(200);
    });
  });
});
