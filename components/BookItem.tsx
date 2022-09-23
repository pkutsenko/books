import { FC } from 'react'
import styles from '../styles/Home.module.css'

export interface Book {
  author: string;
  coverImageUrl: string;
  id: string;
  pageCount: number
  publisher: string
  synopsis: string;
  title: string;
}

interface Props {
  book: Book;
}

const BookItem: FC<Props> = ({ book }) => {
  const {title, coverImageUrl, synopsis} = book
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <img src={coverImageUrl} className={styles.image}/>
      <p>{synopsis}</p>
    </div>
  )
}

export default BookItem
