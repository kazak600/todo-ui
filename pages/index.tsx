import { useObserver } from 'mobx-react-lite'
import Link from 'next/link'
import { memo, useContext } from 'react'
import Page from '../component/Page'
import AddTodo from '../component/Todos/AddTodo'
import TodoList from '../component/Todos/List'
import { StoreContext } from '../stores'
import { ITodosStore } from '../stores/todos'

const MainPage = () => {
  return useObserver(() => (
    <Page>
      <AddTodo />
      <TodoList />
      <br />
      <br />
      <h2>Example with server side request page</h2>
      <Link href="/client">
        <a>Navigate</a>
      </Link>
    </Page>
  ))
}

MainPage.getInitialProps = async ({
  mobxStore: { todosStore },
}: {
  mobxStore: { todosStore: ITodosStore }
}) => {
  if (!todosStore.todos.length) {
    await todosStore.getTodos()
  }
  return {}
}

export default MainPage
