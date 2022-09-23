import type { NextPage } from 'next'
import BookItem, { Book } from '../../components/BookItem'


interface Props {
  book: Book
}

const BookPage: NextPage<Props> = ({ book }) => (
    <BookItem book={book} />
)

export default BookPage

export async function getServerSideProps(ctx) {
  const { bid } = ctx.params;
  const res = await fetch(`${process.env.API_HOST}/api/books/${bid}`)
  const json = await res.json()
  return {
    props: {
      book: json.book
    }
  }
}
