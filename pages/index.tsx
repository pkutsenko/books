import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react';
import styles from '../styles/Home.module.css'
import { FormEventHandler, useEffect, useState } from 'react'
import Books from '../components/Books'
import { Book } from '../components/BookItem'
import debounce from 'lodash/debounce'


interface Props {
  books: Book[];
}

const Home: NextPage<Props> = ({ books: initialBooks }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const debounced = useRef(debounce((newValue) => {
    if (!newValue) return
    setLoading(true)
    fetch(`/api/books?q=${newValue}`).then(data => data.json()).then(({books}) => {
      setBooks(books)
      setLoading(false)
    })
  }, 500))

  useEffect(() => debounced.current(search), [search])

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Books</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <input onInput={handleInput} value={search} className={styles.input} placeholder="Search..." />
        </div>
        {loading && 'Loading...'}
        {!loading && <div className={styles.grid}>
          <Books books={books} />
        </div>}
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.API_HOST}/api/books`)
  const json = await res.json()
  return {
    props: {
      books: json.books
    }
  }
}

export default Home
