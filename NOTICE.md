# Notices and credits

This template's own code is original and released under the MIT licence (see `LICENSE`,
Copyright (c) 2026 Cardzo). No source code was copied from other starters.

## Projects studied for structure (no code copied)

We read these MIT licensed starters to compare section order, folder layout and how they
handle forms and metadata. Thank you to their authors.

- nextjs/saas-starter (MIT): https://github.com/nextjs/saas-starter
- ixartz/SaaS-Boilerplate (MIT): https://github.com/ixartz/SaaS-Boilerplate
- Blazity/next-saas-starter (MIT): https://github.com/Blazity/next-saas-starter

Design guidance followed: pbakaus/impeccable (Apache-2.0), https://github.com/pbakaus/impeccable.
We applied its written rules (type pairing, tinted neutrals, contrast, motion with one focal
moment, no eyebrow labels, no identical card grids). None of its files are included here.

## Runtime dependencies installed by npm

These are not bundled in this repository. `npm install` downloads them under their own licences.

| Package | Licence | Notes |
| --- | --- | --- |
| next, react, react-dom | MIT | |
| tailwindcss, @tailwindcss/postcss | MIT | |
| three | MIT | Hero 3D signal field |
| gsap (3.15.0) | GSAP Standard "No Charge" License (not MIT) | See below |

Fonts (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono) are served by `next/font` from
Google Fonts at build time and are licensed under the SIL Open Font License 1.1.

## GSAP licence: read this before you sell a site or template

GSAP is free, including for commercial work, but it is **not** open source under MIT. It
ships under the "Standard No Charge License" owned by Webflow, Inc.
Text: https://gsap.com/standard-license (effective and last modified 30 April 2025, as
mirrored at https://scancode-licensedb.aboutcode.org/gsap-standard-no-charge-2025.html).

What it allows, in summary (not legal advice):

- Use, reproduce, display and implement GSAP on any website, web app or digital interface,
  by any person or company, commercial or not, at no cost.

What it forbids:

- Using GSAP in a tool that lets people build visual animations without code, where that
  tool competes with Webflow's visual animation features ("Prohibited Uses"), unless Webflow
  gives written consent.
- Reverse engineering GSAP to build such a competing product.
- Removing or changing GSAP's copyright notices or branding in its files.

Other terms: Webflow keeps all rights in GSAP, can end the licence if you break it, and can
change the terms for future versions (versions you already have stay under the terms they
shipped with).

What this means for this template:

- Building and selling a website or landing page made with this template: allowed.
- Selling this template as a starting point for other people's websites: this is a normal
  website use, and the template does not include GSAP's code (npm installs it from the
  official package). We read this as allowed, but the licence does not mention templates
  directly. If you plan to resell at scale, confirm with Webflow or a lawyer.
- Turning this into a no-code animation builder: not allowed without Webflow's consent.
- If you need a pure MIT stack, remove GSAP: delete `src/components/scroll-motion.tsx`,
  remove the `gsap` import from `src/components/pricing.tsx` (prices then switch instantly),
  and run `npm uninstall gsap`. Everything else keeps working.
