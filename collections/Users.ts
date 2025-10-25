import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografía',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de perfil',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Autor',
          value: 'author',
        },
      ],
      label: 'Rol',
    },
  ],
}
