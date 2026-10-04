import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { renderMarkdownString } from './markdown.ts'

export interface Guide {
  slug: string
  title: string
  description: string
  md: string
}

const STOP = new Set(['a', 'an', 'and', 'the', 'in', 'for', 'of', 'to', 'how', 'we', 'your', 'when'])
const slugify = (s: string) => {
  const words = s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).slice(0, 10)
  while (words.length > 3 && STOP.has(words[words.length - 1])) words.pop()
  return words.join('-')
}

/** Splits business/sales/teardown-posts.md into one guide per "## (x) Title", using its "### Blog version" section. */
export async function loadGuides(): Promise<Guide[]> {
  let src = ''
  try {
    src = await readFile(path.join(process.cwd(), 'business', 'sales', 'teardown-posts.md'), 'utf8')
  } catch {
    return []
  }
  const parts = src.split(/^## \([a-z]\) /m).slice(1)
  return parts
    .map(part => {
      const title = part.split('\n')[0].trim()
      const blog = /^### Blog version\s*\n([\s\S]*?)(?=^### |(?![\s\S]))/m.exec(part)
      const md = (blog ? blog[1] : '').trim()
      const firstPara = md.split(/\n\s*\n/).find(p => p.trim() && !p.startsWith('#') && !p.startsWith('```')) || ''
      const description = firstPara.replace(/[*_`\[\]]/g, '').replace(/\(https?:[^)]+\)/g, '').trim().slice(0, 180)
      return { slug: slugify(title), title, description, md }
    })
    .filter(g => g.md.length > 200)
}

export async function renderGuide(g: Guide): Promise<string> {
  return renderMarkdownString(g.md)
}
