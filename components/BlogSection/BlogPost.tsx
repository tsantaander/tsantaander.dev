'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Post } from '@/types/payload-types'
import RichTextRenderer from './RichTextRenderer'

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }


  return (
    <article className="max-w-4xl mx-auto mt-20">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Volver a las publicaciones
        </Link>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tagObj, idx) => (
              <span
                key={idx}
                className="text-sm px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
              >
                {tagObj.tag}
              </span>
            ))}
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
          {/* Autor */}
          <div className="flex items-center gap-3">
            {typeof post.author === 'object' && post.author.avatar && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={
                    typeof post.author.avatar === 'object'
                      ? post.author.avatar.url
                      : ''
                  }
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {typeof post.author === 'object' ? post.author.name : 'Autor'}
              </p>
              <p className="text-sm">{formatDate(post.publishedDate)}</p>
            </div>
          </div>

          {/* Tiempo de lectura */}
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{post.readingTime} min de lectura</span>
            </div>
          )}
        </div>
      </motion.header>

      {/* Imagen destacada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12"
      >
        <Image
          src={
            typeof post.featuredImage === 'object'
              ? post.featuredImage.url
              : ''
          }
          alt={
            typeof post.featuredImage === 'object'
              ? post.featuredImage.alt
              : post.title
          }
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Excerpt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
          {post.excerpt}
        </p>
      </motion.div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <RichTextRenderer content={post.content} />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border-t border-gray-200 dark:border-gray-700 pt-8"
      >
        {/* Información del autor */}
        {typeof post.author === 'object' && post.author.bio && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Sobre el autor
            </h3>
            <div className="flex gap-4">
              {post.author.avatar && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={
                      typeof post.author.avatar === 'object'
                        ? post.author.avatar.url
                        : ''
                    }
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  {post.author.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.footer>
    </article>
  )
}
