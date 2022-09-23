import { memo, FC } from 'react'
import Link from 'next/link'
import { areEqual, FixedSizeList as List } from 'react-window'
import BookItem, { Book } from './BookItem'

interface Props {
  books: Book[];
}

const Books: FC<Props> = memo(({books}) => (
  <List height={500} itemCount={books.length} itemSize={500} width={800}>
    {({ index, style }) => {
      const { id } = books[index];
      return (
        <Link href={`/books/${id}`}>
          <a style={style}>
            <BookItem book={books[index]} />
          </a>
        </Link>
      );
    }}
  </List>
), areEqual)

export default Books
