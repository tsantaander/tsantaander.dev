import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  const slug = typeof value !== 'string' && value.slug

  if (relationTo === 'posts') {
    return `/blog/${slug}`
  } else if (relationTo === 'pages') {
    return `/${slug}`
  } else if (relationTo === 'users') {
    return `/users/${slug}`
  } else {
    return `/${slug}`
  }
}
