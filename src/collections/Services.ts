import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'order'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Megnevezés',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Leírás',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Ár / időtartam',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Ikon (Phosphor icon név, pl. sparkle)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sorrend',
      defaultValue: 0,
    },
  ],
}
