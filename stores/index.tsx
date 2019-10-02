import { useStaticRendering } from 'mobx-react-lite'
import { createContext } from 'react'
import { isServer } from '../lib/isServer'
import { ITodosStore, TodosStore } from './todos'

export interface IRootStore {
  todosStore: ITodosStore
}

useStaticRendering(isServer)

const StoreContext = createContext<any | null>(null)

let rootStore = {}

function initializeStore(initialData?: IRootStore) {
  const stores = {
    todosStore: new TodosStore(initialData ? initialData.todosStore : {}),
  }
  if (isServer) {
    return stores
  }
  if (!Object.keys(rootStore).length) {
    rootStore = stores
  }

  return rootStore
}

export { StoreContext, initializeStore }
