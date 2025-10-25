import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPost from '@/components/BlogSection/BlogPost'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Post } from '@/types/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as unknown as Post) || null
  } catch (error) {
    console.error('Error al obtener post:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: `${post.title} | Blog - Tomás Santander`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: typeof post.featuredImage === 'object' ? post.featuredImage.url : '',
          alt: post.title,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <BlogPost post={post} />
      </div>
    </main>
  )
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 100,
    })

    return posts.docs.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error al generar rutas estáticas:', error)
    return []
  }
}
