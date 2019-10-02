import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { isServer } from '../lib/isServer'
import { initializeStore, IRootStore, StoreContext } from '../stores'

if (!isServer) {
  NProgress.configure({ speed: 300, minimum: 0.3 })

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
}

export default class MyMobxApp extends App<any> {
  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}
    const initialStoreData = initializeStore()
    ctx.mobxStore = initialStoreData

    // Provide the store to getInitialProps of pages
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, initialStoreData })
    }

    return {
      pageProps,
      initialStoreData,
    }
  }

  public mobxStore: IRootStore

  constructor(props: any) {
    super(props)
    this.mobxStore = isServer
      ? props.initialStoreData
      : initializeStore(props.initialStoreData)
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Todos</title>
        </Head>
        <StoreContext.Provider value={this.mobxStore}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </>
    )
  }
}
