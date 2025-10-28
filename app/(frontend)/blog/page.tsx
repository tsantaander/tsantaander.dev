import { Metadata } from 'next'
import BlogList from '@/components/BlogSection/BlogList'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Post } from '@/types/payload-types'

export const metadata: Metadata = {
  title: 'Blog | Tomás Santander',
  description: 'Artículos sobre desarrollo web, DevOps y tecnología',
}

async function getPosts() {
  try {
    const payload = await getPayload({ config })
    
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2,
      limit: 50,
    })

    return posts.docs as unknown as Post[]
  } catch (error) {
    console.error('Error al obtener posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-linear-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-5xl font-bold mt-20 mb-6 bg-radial from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Código, Creación y Conocimiento
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comparto mis experiencias, aprendizajes y conocimientos sobre desarrollo web, 
            DevOps y las últimas tecnologías.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <BlogList initialPosts={posts} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aún no hay publicaciones disponibles. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
