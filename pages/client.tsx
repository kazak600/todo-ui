import { useObserver } from 'mobx-react-lite'
import Link from 'next/link'
import { memo, useContext, useEffect, useState } from 'react'
import Page from '../component/Page'
import AddTodo from '../component/Todos/AddTodo'
import TodoList from '../component/Todos/List'
import { StoreContext } from '../stores'
import { ITodosStore } from '../stores/todos'

export default memo(() => {
  const [mounted, setMount] = useState(false)

  const { todosStore } = useContext(StoreContext)

  const getTodos = async () => {
    if (!todosStore.todos.length) {
      await todosStore.getTodos()
    }
  }

  useEffect(() => {
    if (!mounted) {
      setMount(true)
      getTodos()
    }
  }, [todosStore.todos, mounted])

  return useObserver(() => (
    <Page>
      <AddTodo />
      <TodoList />

      <br />
      <br />

      <h2>Expample with client side request page</h2>
      <Link href="/">
        <a>Navigate</a>
      </Link>
    </Page>
  ))
})
