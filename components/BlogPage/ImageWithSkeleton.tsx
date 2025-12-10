'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string
}

export default function ImageWithSkeleton({
  className,
  skeletonClassName,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Skeleton loader */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-size-[200%_100%]',
            skeletonClassName
          )}
        >
          {/* Icono de imagen placeholder */}
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
      )}
      <Image
        {...props}
        alt={alt}
        className={cn(
          className,
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          transitionProperty: 'opacity, transform',
          transitionDuration: '500ms, 300ms',
          transitionTimingFunction: 'ease-out, ease-out'
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}
