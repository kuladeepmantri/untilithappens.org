# untilithappens.org

Cyber safety website focused on prevention, response, and recovery.

## What is included

- Actionable threat briefings (`/threats`)
- Digital footprint audit workflow (`/check-footprint`)
- Platform hardening playbooks (`/protect`)
- Learning path and real incident lessons (`/learn`, `/real-stories`)
- Incident response + reporting routes (`/get-help`, `/report`)
- Legal pages (`/privacy`, `/terms`)

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js

## Run locally

Prerequisite: Node.js 18+

```bash
npm install
npm run dev
```

## Notes

- The app is configured for static export (`next.config.js` uses `output: 'export'`).
- Headline threat metrics are linked to primary public sources in page content.
