import classNames from 'classnames'
import { observer, useObserver } from 'mobx-react-lite'
import moment from 'moment'
import NProgress from 'nprogress'
import { useContext } from 'react'
import { isServer } from '../../lib/isServer'
import { StoreContext } from '../../stores'
import { ITodo, ITodosStore } from '../../stores/todos'
import { Loader } from './Loader'
import styles from './styles.scss'

function TodoList() {
  const {
    todosStore: { todos, toggleTodo, removeTodo, status, remainingTodo },
  } = useContext(StoreContext)

  const isLoading = (status === 'request' && !todos.length) || status === ''

  if (isLoading && !isServer) {
    NProgress.start()
  } else {
    NProgress.done()
  }

  if (isLoading) {
    return <Loader />
  }

  if (!todos.length) {
    return <></>
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.map((t: ITodo, i: number) => (
        <li
          className={classNames({
            [styles['todo-list__item']]: true,
            [styles['todo-list__item--completed']]: t.completed,
            [styles['todo-list__item--loading']]: t.isLoading,
          })}
          key={t.id}
          title={`Created at: ${moment(t.createdAt).format(
            'DD MMM YYYY HH:mm',
          )}`}
        >
          <input
            type="checkbox"
            checked={t.completed}
            // tslint:disable-next-line: jsx-no-lambda
            onChange={() => toggleTodo(t.id)}
          />
          <span>{t.label}</span>
          <button
            className={styles['remove-todo']}
            // tslint:disable-next-line: jsx-no-lambda
            onClick={() => removeTodo(t.id)}
          >
            🗑
          </button>
        </li>
      ))}
      <br />
      <br />
      {`${remainingTodo.length} / ${todos.length} Left`}
    </ul>
  )
}

export default observer(TodoList)
