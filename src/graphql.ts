
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Todo {
    id: string;
    title?: string;
    body?: string;
    createdAt?: Date;
    updatedaAt?: Date;
}

export interface IQuery {
    todos(): Todo[] | Promise<Todo[]>;
}

export interface IMutation {
    createTodo(title?: string, body?: string): Todo | Promise<Todo>;
    updateTodo(id: string, title?: string, body?: string): Todo | Promise<Todo>;
    deleteTodo(id: string): string | Promise<string>;
}
