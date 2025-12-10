'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ImageWithSkeleton from './ImageWithSkeleton'
import { motion } from 'motion/react'
import type { Post } from '@/types/payload-types'

interface BlogListProps {
  initialPosts?: Post[]
}

export default function BlogList({ initialPosts = [] }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [loading, setLoading] = useState(!initialPosts.length)

  useEffect(() => {
    if (!initialPosts.length) {
      fetchPosts()
    }
  }, [initialPosts.length])

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        '/api/posts?where[status][equals]=published&sort=-publishedDate&depth=2'
      )
      const data = await response.json()
      setPosts(data.docs)
    } catch (error) {
      console.error('Error al cargar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Skeleton de imagen */}
            <div className="relative h-48 w-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-size-[200%_100%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-300 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            {/* Skeleton de contenido */}
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No hay publicaciones disponibles aún.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <Link href={`/blog/${post.slug}`}>
            {/* Imagen destacada */}
            <div className="relative h-48 w-full overflow-hidden">
              <ImageWithSkeleton
                src={
                  typeof post.featuredImage === 'object'
                    ? (post.featuredImage.sizes?.card?.url || post.featuredImage.url)
                    : ''
                }
                alt={
                  typeof post.featuredImage === 'object'
                    ? post.featuredImage.alt
                    : post.title
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Contenido */}
            <div className="p-6">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tagObj, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      {tagObj.tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Título */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Autor y fecha */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {/* Avatar del autor */}
                  {typeof post.author === 'object' && post.author.avatar && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <ImageWithSkeleton
                        src={
                          typeof post.author.avatar === 'object'
                            ? (post.author.avatar.sizes?.thumbnail?.url || post.author.avatar.url)
                            : ''
                        }
                        alt={post.author.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        skeletonClassName="rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {typeof post.author === 'object'
                        ? post.author.name
                        : 'Autor'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.publishedDate)}
                    </p>
                  </div>
                </div>

                {/* Tiempo de lectura */}
                {post.readingTime && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {post.readingTime} min
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  )
}
