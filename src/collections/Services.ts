import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Szolgáltatások',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'order'],
  },
  access: {
    read: () => true,
  },
  orderable: true,
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
      admin: {
        description: 'Phosphor ikon neve, pl. "sparkle", "drop", "flower-lotus", "eye".',
      },
    },
  ],
}
