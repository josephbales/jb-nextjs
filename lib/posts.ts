import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { remark } from 'remark'
import html from 'remark-html'
import { format, parseISO } from 'date-fns'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'posts')

// TODO: fix this so that perhaps it used the same logic as getPostData below
export function getPostsForRSS() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const filename = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { engines: {yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object}})
    const content = matterResult.content

    // Combine the data with the id
    return {
      filename,
      ...(matterResult.data as { date: string; title: string, author: string }),
      content
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }).slice(0, 10)
}

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
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true}) // Pass raw HTML strings through.
    .use(rehypeStringify, {allowDangerousHtml: true}) // Serialize the raw HTML strings
    .process(matterResult.content)

  console.log(processedContent)

  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string, author: string })
  }
}
