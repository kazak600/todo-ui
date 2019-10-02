import { useCallback, useContext, useRef } from 'react'
import { StoreContext } from '../../stores'
import { ITodosStore } from '../../stores/todos'
import styles from './styles.scss'

export default function AddTodo() {
  const {
    todosStore: { addTodo },
  } = useContext(StoreContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const onAddTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (inputRef.current && inputRef.current.value) {
      addTodo(inputRef.current.value)
      inputRef.current.value = ''
    }
  }, [])

  return (
    <form onSubmit={onAddTodo} className={styles['add-todo']}>
      <h1>Todo list</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Write something..."
        className={styles['add-todo__input']}
      />
      <button className={styles['add-todo__button']}>Add New Todo</button>
    </form>
  )
}
