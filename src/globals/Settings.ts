import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Cégnév',
      defaultValue: 'RENI Kozmetika',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonszám',
      defaultValue: '+36 30 964 8446',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'meszarosnerottrenata@gmail.com',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Cím',
      defaultValue: 'Ifjúság körút 83, 9023 Győr',
    },
    {
      name: 'openingHours',
      type: 'textarea',
      label: 'Nyitvatartás',
      defaultValue: 'Kizárólag előzetes bejelentkezés alapján.',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook link',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram link',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps embed URL',
      defaultValue:
        'https://www.google.com/maps?q=Ifj%C3%BAs%C3%A1g+k%C3%B6r%C3%BAt+83%2C+Gy%C5%91r&output=embed',
    },
  ],
}
