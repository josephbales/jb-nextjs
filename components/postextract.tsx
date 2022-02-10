import { parseISO, format } from 'date-fns';

export default function Postextract({ dateString, extract }: { dateString: string, extract: string }) {
  const date = parseISO(dateString);
  return <p><span className="blog-list-date">{format(date, 'yyyy/MM/dd')}</span> - {extract}</p>;
}