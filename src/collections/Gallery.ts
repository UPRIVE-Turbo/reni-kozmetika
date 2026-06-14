import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['image', 'alt', 'order'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kép',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternatív szöveg',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sorrend',
      defaultValue: 0,
    },
  ],
}
