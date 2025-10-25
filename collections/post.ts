import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL amigable para la publicación (ej: mi-primer-post)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Descripción corta',
      admin: {
        description: 'Resumen breve que aparecerá en la lista de publicaciones',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen destacada',
      admin: {
        description: 'Imagen principal de la publicación',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenido',
      admin: {
        description: 'Contenido completo de la publicación (soporta imágenes)',
      },
      editor: lexicalEditor({}),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Autor',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Fecha de publicación',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Borrador',
          value: 'draft',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
      ],
      label: 'Estado',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Tiempo de lectura (minutos)',
      admin: {
        description: 'Tiempo estimado de lectura en minutos',
      },
    },
  ],
}
