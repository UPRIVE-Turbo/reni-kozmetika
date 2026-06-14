import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'service', 'preferredDate', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Név',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonszám',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'service',
      type: 'text',
      label: 'Kívánt szolgáltatás',
    },
    {
      name: 'preferredDate',
      type: 'text',
      label: 'Kívánt időpont',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Üzenet',
    },
  ],
}
