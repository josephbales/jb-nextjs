import { parseISO, format } from 'date-fns'
import Link from 'next/link'

export default function Postlink({ id, dateString, title }: { id: string, dateString: string, title: string }) {
  const date = parseISO(dateString)
  return (
    <summary><Link href={`/blog/${format(date, 'yyyy')}/${format(date, 'MM')}/${format(date, 'dd')}/${id}`}><a>{title}</a></Link></summary>
  )
}