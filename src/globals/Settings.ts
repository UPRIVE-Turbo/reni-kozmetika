import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Beállítások',
  admin: {
    group: 'Beállítások',
  },
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
    {
      type: 'group',
      name: 'branding',
      label: 'Logó / márkanév',
      admin: { description: 'A fejléc és lábláb logójának két része (pl. "RENI" + "Kozmetika").' },
      fields: [
        {
          name: 'namePrimary',
          type: 'text',
          label: 'Márkanév — kiemelt rész',
          defaultValue: 'RENI',
        },
        {
          name: 'nameSecondary',
          type: 'text',
          label: 'Márkanév — kiegészítő rész',
          defaultValue: 'Kozmetika',
        },
      ],
    },
    {
      type: 'group',
      name: 'navigation',
      label: 'Navigáció',
      fields: [
        {
          name: 'links',
          type: 'array',
          label: 'Menüpontok',
          admin: { description: 'A fejléc menüpontjai, az oldalon belüli szekciókra mutatva.' },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Felirat',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Hivatkozás (pl. #szolgaltatasok)',
              required: true,
            },
          ],
          defaultValue: [
            { label: 'Szolgáltatások', href: '#szolgaltatasok' },
            { label: 'Rólam', href: '#bemutatkozas' },
            { label: 'Galéria', href: '#galeria' },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Fejléc CTA gomb felirata',
          defaultValue: 'Időpontfoglalás',
        },
        {
          name: 'mobileCtaLabel',
          type: 'text',
          label: 'Mobil menü CTA felirata',
          defaultValue: 'Időpontot kérek',
        },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Lábláb',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright szöveg',
          defaultValue: '© 2026 Mészárosné Rött Renáta. Minden jog fenntartva.',
        },
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'Keresőoptimalizálás (SEO)',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta cím',
          defaultValue: 'RENI Kozmetika | Szépség és Önbizalom | Győr, Adyváros',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta leírás',
          defaultValue:
            'Professzionális kozmetikai kezelések, arcápolás Győrben, Adyvárosban. Foglaljon időpontot Mészárosné Rött Renátához.',
        },
      ],
    },
  ],
}
