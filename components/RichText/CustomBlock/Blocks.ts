import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}

export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'javascript',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'Rust', value: 'rust' },
        { label: 'Go', value: 'go' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'Bash', value: 'bash' },
      ],
    },
    {
      name: 'filename',
      type: 'text',
      admin: {
        placeholder: 'ejemplo.ts',
      },
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export const ImageGalleryBlock: Block = {
  slug: 'imageGallery',
  interfaceName: 'ImageGalleryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}

export const EmbedBlock: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'https://youtube.com/watch?v=...',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: '1:1', value: '1/1' },
      ],
    },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        placeholder: 'CEO, Company Name',
      },
    },
  ],
}

export const PostTechnologies: Block = {
  slug: 'PostTechnologies',
  interfaceName: 'PostTechnologiesBlock',
  labels: {
    singular: 'Technologies Orb',
    plural: 'Technologies Orbs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Título opcional para mostrar sobre el orbe de tecnologías',
      },
    },
    {
      name: 'showTitle',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar título',
    },
    {
      name: 'centerIcon',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: 'Logo Personalizado', value: 'custom' },
        { label: 'Next.js', value: 'nextjs' },
        { label: 'React', value: 'react' },
        { label: 'TypeScript', value: 'typescript' },
      ],
      admin: {
        description: 'Icono a mostrar en el centro del orbe',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 7,
      defaultValue: [
        { technology: 'nextjs' },
        { technology: 'react' },
        { technology: 'typescript' },
      ],
      fields: [
        {
          name: 'technology',
          type: 'select',
          required: true,
          options: [
            { label: 'Next.js', value: 'nextjs' },
            { label: 'React', value: 'react' },
            { label: 'Shadcn UI', value: 'shadcn' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Supabase', value: 'supabase' },
            { label: 'TanStack Query', value: 'tanstack' },
            { label: 'PostgreSQL', value: 'postgresql' },
            { label: 'Tailwind CSS', value: 'tailwind' },
            { label: 'Git', value: 'git' },
            { label: 'GraphQL', value: 'graphql' },
            { label: 'Python', value: 'python' },
            { label: 'MongoDB', value: 'mongodb' },
            { label: 'Docker', value: 'docker' },
          ],
        },
      ],
    },
  ],
}