import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <span className="blog-list-date">{format(date, 'yyyy MM dd')}</span>
}