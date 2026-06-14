# RENI Kozmetika — Weboldal Specifikáció

**Típus:** Egyoldalas magyar nyelvű landing page
**Iparág:** Kozmetika | **Város:** Győr
**Web státusz:** Csak Facebook (nincs weboldal)
**Elérhetőség:** Tel: +36 30 964 8446 | Email: meszarosnerottrenata@gmail.com | Cím: Ifjúság körút 83, Győr

---

Készíts egy magyar nyelvű, egyoldalas landing page-et egy kozmetikai stúdiónak:

AZ ÜZLET ADATAI:
- Név: RENI Kozmetika
- Cím: Ifjúság körút 83, Győr (Adyváros)
- Telefon: +36 30 964 8446
- Email: meszarosnerottrenata@gmail.com
- Profil: Kozmetikai kezelések, arcápolás

DESIGN:
- Stílus: Modern, meleg, nőies
- Színek: Bordó (#7B3C4A) fejlécekhez, halvány rózsaszín (#F4A5A5) kiemelésekhez, krém (#FFF8F0) háttérhez, sötétbarna (#3D2817) szöveghez
- Betűtípus: Elegáns, olvasható (pl. Lora címekhez, Open Sans szöveghez)

FELÉPÍTÉS (egyetlen görgethető oldal):
1. Hero szekció: "RENI Kozmetika — Győr, Adyváros", szlogen ("Szépség és önbizalom"), CTA gomb
2. Szolgáltatások: Kozmetikai kezelések felsorolása rövid leírással
3. Bemutatkozás: Renáta bemutatása, tapasztalat, képzettségek
4. Galéria: 4-6 kép placeholder
5. Időpontfoglalás űrlap: Név, telefon, kívánt szolgáltatás, kívánt időpont, üzenet
6. Elérhetőség: Telefon, email, cím, nyitvatartás, Google Maps
7. Lábléc: Facebook, telefon, cím, © 2026

HANGNEM: Kedves, bizalomkeltő, professzionális.

TECHNIKAI: Mobilbarát, reszponzív.

---

## Technikai követelmények
- **Stack:** Next.js 14+ (App Router) + Payload CMS 3.x (Postgres / @payloadcms/db-postgres) + Tailwind CSS
- **Nyelv:** Magyar (HU)
- **Hosting:** Vercel-kompatibilis
- **Responsive:** Mobile-first
- **SEO:** Meta tagek, Open Graph, magyar title/description
- **Űrlap:** Payload CMS form submission → submissions collection
- **Térkép:** Google Maps embed (Győr)

## Payload CMS Collections (Postgres adapter)
- `services` — Szolgáltatások (név, leírás, ár, ikon)
- `gallery` — Galéria képek (kép, alt, sorrend)
- `submissions` — Űrlap beküldések (név, telefon, email, üzenet, szolgáltatás, időpont)
- `settings` — Globális (cégnév, telefon, cím, nyitvatartás, social linkek)
