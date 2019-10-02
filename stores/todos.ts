import { action, computed, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react-lite'
import { API_URL } from '../config'
import { apiCaller } from '../lib/apiCaller'
import { isServer } from '../lib/isServer'

useStaticRendering(isServer)

export interface ITodo {
  id: number
  label: string
  createdAt?: string
  completed: boolean
  isLoading?: boolean
}

export interface ITodosStore {
  todos: ITodo[]
  status: string
  getTodos: () => void
  removeTodo: (id: ITodo['id']) => void
  toggleTodo: (id: ITodo['id']) => void
  addTodo: (label: ITodo['label']) => void
  remainingTodo: () => ITodosStore['todos']
}

export class TodosStore {
  @observable public todos: ITodo[] = []
  @observable public status: string = ''

  constructor(initialData: Partial<ITodosStore> = {}) {
    this.todos = initialData.todos || []
    this.status = initialData.status || ''

    this.getTodos = this.getTodos.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }

  @action public async getTodos() {
    this.status = 'request'
    try {
      const todos = await apiCaller({
        url: API_URL,
      })
      this.todos = todos.sort((a: ITodo, b: ITodo) => a.id - b.id).reverse()
      this.status = 'success'
    } catch (e) {
      this.status = 'error'
      this.todos = []
    }
  }

  @action public async addTodo(label: ITodo['label']) {
    this.todos = [
      { label, id: +new Date(), completed: false, isLoading: true },
      ...this.todos,
    ]

    await apiCaller({
      url: API_URL,
      method: 'POST',
      body: { label },
    })

    await this.getTodos()
  }

  @action public async removeTodo(id: number) {
    this.todos = this.todos.map(t =>
      t.id === id ? { ...t, isLoading: true } : t,
    )

    await apiCaller({
      url: API_URL,
      method: 'DELETE',
      body: { id },
    })

    await this.getTodos()
  }

  @action public async toggleTodo(id: number) {
    this.todos = this.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    )

    const targetTodo = this.todos.find(t => t.id === id)

    if (targetTodo) {
      await apiCaller({
        url: API_URL,
        method: 'PUT',
        body: { id: targetTodo.id, completed: targetTodo.completed },
      })
    }

    await this.getTodos()
  }

  @computed public get remainingTodo() {
    return this.todos.filter(t => t.completed)
  }
}
