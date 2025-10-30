import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  tag: HeadingTag
  id?: string
  className?: string
  children?: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({
  tag: Tag,
  id,
  className = '',
  children
}) => {
  const baseClasses = {
    h1: 'text-4xl font-bold mt-12 mb-6',
    h2: 'text-3xl font-bold mt-10 mb-5',
    h3: 'text-2xl font-semibold mt-8 mb-4',
    h4: 'text-xl font-semibold mt-6 mb-3',
    h5: 'text-lg font-medium mt-4 mb-2',
    h6: 'text-base font-medium mt-3 mb-2',
  }

  return React.createElement(
    Tag,
    { 
      id,
      className: `${baseClasses[Tag]} ${className}`.trim(),
      children
    }
  )
}

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children })
    const textString = Array.isArray(text) ? text.join('') : String(text || '')
    const id = textString.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    
    const tag = (node.tag || 'p').toLowerCase() as HeadingTag
    
    return React.createElement(Heading, {
      tag,
      id,
      children: text
    })
  }
}
