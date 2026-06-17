import type { GlobalConfig } from 'payload'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Oldal tartalom',
  admin: {
    group: 'Tartalom',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero szekció',
      admin: { description: 'A nyitóképernyő tartalma, a legtetején.' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Felirat a cím felett',
          defaultValue: 'Győr, Adyváros',
        },
        {
          name: 'titleLine1',
          type: 'text',
          label: 'Cím — 1. sor',
          defaultValue: 'Ahol a',
        },
        {
          name: 'titleWord1',
          type: 'text',
          label: 'Cím — kiemelt (dőlt) szó',
          defaultValue: 'szépség',
        },
        {
          name: 'titleConnector',
          type: 'text',
          label: 'Cím — kötőszó a két kiemelt szó között',
          defaultValue: 'és',
        },
        {
          name: 'titleWord2',
          type: 'text',
          label: 'Cím — kiemelt (rózsaszín, aláhúzott) szó',
          defaultValue: 'önbizalom',
        },
        {
          name: 'titleLine2',
          type: 'text',
          label: 'Cím — utolsó sor',
          defaultValue: 'találkozik.',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Alcím / leíró szöveg',
          defaultValue:
            'Személyre szabott arcápolás és professzionális kozmetikai kezelések egy nyugodt, nőies környezetben, Győr szívében.',
        },
        {
          name: 'ctaPrimaryLabel',
          type: 'text',
          label: 'Fő gomb felirata',
          defaultValue: 'Időpontot foglalok',
        },
        {
          name: 'ctaSecondaryLabel',
          type: 'text',
          label: 'Másodlagos gomb felirata',
          defaultValue: 'Kezelések',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Háttérkép',
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Kép alternatív szövege',
          defaultValue: 'Hölgy arcápolási kezelés közben egy nyugodt szalon környezetben',
        },
        {
          name: 'ratingScore',
          type: 'text',
          label: 'Értékelés szám',
          defaultValue: '5.0 / 5.0',
        },
        {
          name: 'ratingLabel',
          type: 'text',
          label: 'Értékelés szöveg',
          defaultValue: 'Kiváló',
        },
      ],
    },
    {
      type: 'group',
      name: 'about',
      label: 'Bemutatkozás szekció',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          label: 'Kis felirat a cím felett',
          defaultValue: 'Üdvözlöm,',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Mészárosné Rött Renáta',
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Cím — kiemelt (dőlt) rész',
          defaultValue: 'vagyok.',
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Bemutatkozó szövegbekezdések',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Bekezdés',
              required: true,
            },
          ],
          defaultValue: [
            {
              text: 'Szenvedélyem az arcápolás és az a folyamat, ahogy a bőr megfelelő törődéssel visszanyeri természetes szépségét és ragyogását. Számomra a kozmetika nem csupán egy szakma, hanem hivatás: célom, hogy minden vendégem önbizalommal telve és kipihenten távozzon tőlem.',
            },
            {
              text: 'Munkám során prémium minőségű, klinikailag igazolt hatóanyagokkal dolgozom. Folyamatosan képzem magam, hogy a legújabb bőrterápiás eljárásokat és technikákat alkalmazhassam a kezelések során, legyen szó problémás bőr kezeléséről vagy anti-aging terápiákról.',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Fotó',
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Kép alternatív szövege',
          defaultValue: 'Mészárosné Rött Renáta, kozmetikus mosolyog',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Kiemelt számok (pl. tapasztalat)',
          maxRows: 2,
          admin: { description: 'Legfeljebb 2 elem — a design egy elválasztóvonalat tartalmaz.' },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Szám / érték',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Felirat',
              required: true,
            },
          ],
          defaultValue: [
            { value: '10+', label: 'Év tapasztalat' },
            { value: '100%', label: 'Szakértelem' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'servicesSection',
      label: 'Szolgáltatások szekció fejléce',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Személyre Szabott',
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Cím — kiemelt (dőlt) sor',
          defaultValue: 'Kezelések',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Leíró szöveg',
          defaultValue:
            'Minden arcbőr más törődést igényel. Szolgáltatásaim fókuszában az egészséges, ragyogó bőr elérése áll, prémium hatóanyagokkal.',
        },
        {
          name: 'footnote',
          type: 'text',
          label: 'Lábjegyzet a lista alatt',
          defaultValue:
            'Minden kezelést alapos bőrdiagnosztika előz meg. A teljes árlista a szalonban tekinthető meg.',
        },
      ],
    },
    {
      type: 'group',
      name: 'gallerySection',
      label: 'Galéria szekció fejléce',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Cím',
          defaultValue: 'A Lenyugvás',
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Cím — kiemelt (dőlt) rész',
          defaultValue: 'Szigete',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Alcím',
          defaultValue: 'Pillantson be a szalon hangulatába',
        },
      ],
    },
    {
      type: 'group',
      name: 'contactSection',
      label: 'Időpontfoglalás / Kapcsolat szekció fejléce',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Ideje a',
        },
        {
          name: 'headingHighlight',
          type: 'text',
          label: 'Cím — kiemelt (dőlt, rózsaszín) rész',
          defaultValue: 'megújulásnak',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Leíró szöveg az űrlap felett',
          defaultValue:
            'Adja meg adatait, és hamarosan felveszem Önnel a kapcsolatot a pontos időpont egyeztetése céljából.',
        },
        {
          name: 'availabilityHeading',
          type: 'text',
          label: 'Elérhetőség blokk címe',
          defaultValue: 'Elérhetőség',
        },
      ],
    },
  ],
}
