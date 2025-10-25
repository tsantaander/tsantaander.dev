export interface User {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: Media
  role: 'admin' | 'author'
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  alt: string
  caption?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
    tablet?: {
      url: string
      width: number
      height: number
    }
    desktop?: {
      url: string
      width: number
      height: number
    }
  }
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: Media
  content: any // Rich text content
  author: User
  publishedDate: string
  status: 'draft' | 'published'
  tags?: Array<{ tag: string; id?: string }>
  readingTime?: number
  createdAt: string
  updatedAt: string
}

export interface PaginatedPosts {
  docs: Post[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
