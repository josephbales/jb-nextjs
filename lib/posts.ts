import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { remark } from 'remark'
import html from 'remark-html'
import { format, parseISO } from 'date-fns'
import { Feed, FeedOptions } from 'feed'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { engines: {yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object}})

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents, { engines: {yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object}})
    const dateObj = matterResult.data as { date: string }
    const date = parseISO(dateObj.date)
    return {
      params: {
        year: format(date, 'yyyy'),
        month: format(date, 'MM'),
        day: format(date, 'dd'),
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { engines: {yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object}})

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string, author: string })
  }
}

// TODO: maybe put this in another file and figure out what needs to go into this as far as post data is concerned
export function generateRSSFeed(articles: any[]) {
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
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  } as FeedOptions);

  // Add each article to the feed
  articles.forEach((post) => {
    const {
      content,
      fileName,
      meta: { date, description, title },
    } = post;
    const url = `${baseUrl}/${fileName}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content,
      author: [author],
      date: new Date(date),
    });
  });

  // Write the RSS output to a public file, making it
  // accessible at ashleemboyer.com/rss.xml
  fs.writeFileSync('public/feed.xml', feed.rss2());
};