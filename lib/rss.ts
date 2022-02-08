import { format, parseISO } from "date-fns";
import { Feed, FeedOptions } from "feed";
import fs from 'fs'

// TODO: maybe put this in another file and figure out what needs to go into this as far as post data is concerned
export function generateRSSFeed(posts: {filename: string, date: string, title: string, author:string, content: string}[]) {
    const baseUrl = 'https://josephbales.com';
    const author = {
      name: 'Joseph Bales',
      email: 'joey@josephbales.com',
      link: 'https://josephbales.com',
    };
  
    const feed = new Feed({
      title: 'Articles by Joseph Bales',
      description:
        "I'm just this guy that blogs every year or two.",
      id: baseUrl,
      link: baseUrl,
      language: 'en',
      feedLinks: {
        rss2: `${baseUrl}/feed.xml`,
      },
      author,
    } as FeedOptions);
  
    // Add each article to the feed
    posts.forEach((post) => {
      const date = parseISO(post.date)
      const url = `${baseUrl}/blog/${format(date, 'yyyy')}/${format(date, 'MM')}/${format(date, 'dd')}/${post.filename}`;
  
      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.content,
        author: [{name: post.author}],
        date: date,
      });
    });
  
    // Write the RSS output to a public file, making it
    // accessible at ashleemboyer.com/rss.xml
    fs.writeFileSync('public/feed.xml', feed.rss2());
  };