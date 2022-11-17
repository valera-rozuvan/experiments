export type Todo = {
  id?: string;
  text: string;
  completed: boolean;
};

export interface AppState {
  todos: Todo[];
}
