'use client'

interface RichTextRendererProps {
  content: any
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !content.root) {
    return null
  }

  const renderNode = (node: any): React.ReactNode => {
    if (!node) return null

    // Renderizar nodos de texto
    if (node.type === 'text') {
      let text = node.text

      // Aplicar formato
      if (node.format) {
        if (node.format & 1) text = <strong key={node.text}>{text}</strong> // Bold
        if (node.format & 2) text = <em key={node.text}>{text}</em> // Italic
        if (node.format & 8) text = <code key={node.text}>{text}</code> // Code
      }

      return text
    }

    // Renderizar párrafos
    if (node.type === 'paragraph') {
      return (
        <p key={node.id || Math.random()}>
          {node.children?.map((child: any) => renderNode(child))}
        </p>
      )
    }

    // Renderizar headings
    if (node.type === 'heading') {
      const level = node.tag ? Math.min(Math.max(parseInt(node.tag.slice(1)), 1), 6) : 2
      const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <HeadingTag key={node.id || Math.random()}>
          {node.children?.map((child: any) => renderNode(child))}
        </HeadingTag>
      )
    }

    // Renderizar listas
    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={node.id || Math.random()}>
          {node.children?.map((child: any) => renderNode(child))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={node.id || Math.random()}>
          {node.children?.map((child: any) => renderNode(child))}
        </li>
      )
    }

    // Renderizar enlaces
    if (node.type === 'link') {
      return (
        <a
          key={node.id || Math.random()}
          href={node.url}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {node.children?.map((child: any) => renderNode(child))}
        </a>
      )
    }

    // Renderizar bloques de código
    if (node.type === 'code') {
      return (
        <pre key={node.id || Math.random()} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>{node.children?.map((child: any) => renderNode(child))}</code>
        </pre>
      )
    }

    // Renderizar citas
    if (node.type === 'quote') {
      return (
        <blockquote key={node.id || Math.random()} className="border-l-4 border-blue-500 pl-4 italic">
          {node.children?.map((child: any) => renderNode(child))}
        </blockquote>
      )
    }

    // Renderizar imágenes (upload)
    if (node.type === 'upload') {
      const imageData = node.value
      if (imageData && typeof imageData === 'object' && imageData.url) {
        return (
          <figure key={node.id || Math.random()} className="my-8">
            <img
              src={imageData.url}
              alt={imageData.alt || ''}
              className="w-full rounded-lg"
            />
            {imageData.caption && (
              <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {imageData.caption}
              </figcaption>
            )}
          </figure>
        )
      }
    }

    // Si tiene children, renderizarlos
    if (node.children) {
      return node.children.map((child: any) => renderNode(child))
    }

    return null
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {content.root.children?.map((node: any) => renderNode(node))}
    </div>
  )
}
