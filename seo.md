# SEO.md — Borah Tour & Travels
## SEO, Local SEO, Google Search & AI Search Growth Blueprint

> **Purpose:** This document is the implementation specification for turning the Borah Tour & Travels website into a search-first travel platform targeting Meghalaya, Assam, Arunachal Pradesh/Tawang and Northeast India.
>
> **Important:** No SEO document can honestly guarantee a #1 ranking. Rankings depend on competition, relevance, quality, authority, location, crawlability, links, reviews, search intent and Google's systems. The goal of this plan is to maximize the site's ability to earn strong organic visibility, qualified traffic, local visibility and citations in AI-generated search experiences.

---

# 1. Website Understanding / SEO Positioning

The current website is a travel/tour operator site centered on Northeast India.

The supplied implementation already contains strong commercial entities and destinations, including:

- Borah Tour & Travels
- Meghalaya tours
- Assam tours
- Arunachal Pradesh / Tawang tours
- Guwahati pickup and airport transfers
- Cherrapunji / Sohra
- Shillong
- Dawki
- Mawlynnong
- Kaziranga National Park
- Umrangso
- Tawang
- Sela Pass
- Dirang
- Sangti Valley
- Bomdila
- Shergaon
- Nameri
- Custom/private itineraries
- Vehicles / private transportation
- Tour packages
- Traveler gallery
- Google Maps route information

The current code contains multiple package durations and detailed itineraries, which is a major SEO opportunity because itinerary-level information can satisfy long-tail searches. For example, the existing package data includes 1–7 day Meghalaya itineraries, 6–9 day Tawang/Arunachal itineraries and Assam/Kaziranga/Umrangso tours.

The website currently loads several CMS datasets client-side through `/api/packages`, `/api/places`, `/api/gallery`, `/api/vehicles` and `/api/settings`. This is an important technical SEO issue: commercially important text should be present in crawlable server-rendered HTML rather than depending exclusively on browser-side fetching.

---

# 2. Primary SEO Objective

## Primary commercial objective

Build topical authority around:

1. Meghalaya tour packages
2. Cherrapunji/Sohra tours
3. Shillong tours
4. Dawki and Mawlynnong tours
5. Tawang tours
6. Arunachal Pradesh tour packages
7. Sela Pass / Bum La Pass circuits
8. Assam tours
9. Kaziranga tours and safaris
10. Guwahati-to-Northeast travel
11. Private Northeast India tours
12. Custom Northeast India itineraries
13. Northeast India car rental / private vehicle services

## Secondary objective

Own informational searches that occur before the booking decision:

- best time to visit
- how many days are required
- itinerary planning
- route planning
- permit information
- travel costs
- travel distances
- road conditions
- weather
- places to visit
- family/adventure/honeymoon trip planning
- airport pickup information
- vehicle selection
- destination comparisons

## AI-search objective

Make the site an easily understandable source for:

- destination facts
- itinerary answers
- route answers
- practical travel guidance
- original local experience
- package details
- transportation information
- business identity
- trustworthy first-hand recommendations

Do not create content merely to "trick" AI systems. The strategy is to create excellent, clearly structured, original information that search engines and AI systems can confidently extract and cite.

---

# 3. Core SEO Strategy

The site should NOT try to rank every page for every keyword.

Instead, create a topical architecture:

```text
Northeast India Tours
│
├── Meghalaya Tours
│   ├── Meghalaya Tour Packages
│   ├── Shillong
│   ├── Cherrapunji / Sohra
│   ├── Dawki
│   ├── Mawlynnong
│   ├── Living Root Bridge
│   └── Meghalaya Itineraries
│
├── Arunachal Pradesh Tours
│   ├── Tawang
│   ├── Tawang Tour Packages
│   ├── Sela Pass
│   ├── Bum La Pass
│   ├── Dirang
│   ├── Sangti Valley
│   ├── Bomdila
│   └── Arunachal Itineraries
│
├── Assam Tours
│   ├── Guwahati
│   ├── Kaziranga
│   ├── Kaziranga Safari
│   ├── Umrangso
│   ├── Nameri
│   └── Assam Itineraries
│
├── Services
│   ├── Private Tours
│   ├── Custom Itineraries
│   ├── Airport Transfers
│   ├── Car Rental
│   └── Driver / Vehicle Services
│
└── Travel Guide
    ├── Best Time to Visit
    ├── Itinerary Guides
    ├── Costs
    ├── Permits
    ├── Routes
    ├── Weather
    └── Destination Guides
```

This structure gives Google a clear relationship between broad topics, destination pages, service pages, package pages and supporting informational content.

---

# 4. Keyword Research Framework

## Important keyword-research rule

Do not invent fake search-volume numbers.

The keyword list below is a **strategic keyword universe**, organized by likely intent and commercial value. Before assigning exact search-volume, CPC or difficulty numbers, validate the terms in:

- Google Keyword Planner
- Google Search Console
- Google Trends
- Ahrefs
- Semrush
- Ubersuggest
- Bing Webmaster Tools
- Actual Google autocomplete / related searches

Search volume changes over time and by geography. Use real first-party data whenever possible.

---

# 5. Keyword Priority System

Use this scoring model:

```text
Priority Score =
Commercial Intent
+ Relevance
+ Destination Specificity
+ Conversion Potential
+ Topical Authority Potential
- Competition
```

Score each keyword from 1–5.

### Tier A — Money Keywords

Highest conversion potential.

Examples:

- Meghalaya tour packages
- Meghalaya tour package
- Meghalaya holiday packages
- Meghalaya trip package
- Meghalaya private tour
- Meghalaya family tour package
- Meghalaya honeymoon package
- Cherrapunji tour package
- Shillong tour package
- Dawki tour package
- Tawang tour package
- Tawang tour package from Guwahati
- Arunachal Pradesh tour package
- Arunachal tour package
- Assam tour package
- Kaziranga tour package
- Kaziranga safari package
- Northeast India tour packages
- Northeast India private tour
- Northeast India holiday packages
- Guwahati to Meghalaya tour
- Guwahati to Tawang tour
- Guwahati to Kaziranga tour

### Tier B — High-Intent Long Tail

These are often easier to win than broad head terms.

- 3 days Meghalaya itinerary
- 4 days Meghalaya tour package
- 5 days Meghalaya itinerary
- 6 days Meghalaya trip
- 7 days Meghalaya itinerary
- Meghalaya itinerary from Guwahati
- Meghalaya private cab tour
- Meghalaya tour with private car
- Meghalaya tour with driver
- Shillong Cherrapunji Dawki package
- Cherrapunji Dawki Mawlynnong itinerary
- Meghalaya waterfalls tour
- Meghalaya living root bridge tour
- Tawang 6 days tour package
- Tawang 7 days itinerary
- Tawang 8 days itinerary
- Tawang 9 days itinerary
- Tawang Sela Pass Bum La Pass tour
- Tawang tour from Guwahati
- Tawang tour with private car
- Arunachal Pradesh private tour from Guwahati
- Kaziranga 2 day tour
- Kaziranga 3 day tour package
- Kaziranga safari from Guwahati
- Assam Kaziranga Umrangso tour
- Guwahati Kaziranga tour package

### Tier C — Informational

Use these for destination guides and supporting content.

- best time to visit Meghalaya
- best time to visit Cherrapunji
- best time to visit Shillong
- best time to visit Dawki
- best time to visit Tawang
- best time to visit Arunachal Pradesh
- best time to visit Kaziranga
- Meghalaya itinerary
- Tawang itinerary
- Assam itinerary
- Meghalaya places to visit
- places to visit in Cherrapunji
- places to visit in Shillong
- places to visit in Dawki
- places to visit in Mawlynnong
- places to visit in Tawang
- places to visit in Dirang
- places to visit in Kaziranga
- things to do in Meghalaya
- things to do in Tawang
- things to do in Kaziranga
- how to reach Meghalaya from Guwahati
- how to reach Tawang from Guwahati
- Guwahati to Tawang route
- Guwahati to Cherrapunji route
- Guwahati to Kaziranga distance
- Tawang permit information
- Bum La Pass permit
- Sela Pass travel information
- Meghalaya travel tips
- Arunachal Pradesh travel tips
- Assam travel tips

### Tier D — Local / Near-Me / Service Keywords

- tour operator in Guwahati
- travel agency in Guwahati
- Northeast India tour operator
- Meghalaya tour operator
- Meghalaya travel agency
- Tawang travel agency
- Arunachal Pradesh travel agency
- Assam travel agency
- private car rental Guwahati
- car rental for Meghalaya trip
- car rental for Tawang trip
- airport pickup Guwahati
- Guwahati airport transfer
- Guwahati airport to Shillong taxi
- Guwahati airport to Meghalaya tour
- Guwahati airport to Tawang tour

---

# 6. Destination + Commercial Keyword Matrix

## Meghalaya

### Primary
- Meghalaya tour packages
- Meghalaya tour package
- Meghalaya trip
- Meghalaya holiday package
- Meghalaya private tour

### Secondary
- Meghalaya family tour
- Meghalaya honeymoon trip
- Meghalaya adventure tour
- Meghalaya 3 day package
- Meghalaya 5 day package
- Meghalaya 7 day package
- Meghalaya itinerary from Guwahati
- Meghalaya tour from Guwahati

### Supporting
- Meghalaya waterfalls
- Meghalaya caves
- living root bridge Meghalaya
- Dawki river
- Mawlynnong
- Cherrapunji
- Shillong

---

## Cherrapunji / Sohra

### Primary
- Cherrapunji tour package
- Cherrapunji trip package
- Cherrapunji tour from Guwahati
- Cherrapunji Meghalaya tour

### Secondary
- Cherrapunji 2 day itinerary
- Cherrapunji 3 day itinerary
- Cherrapunji waterfalls tour
- Cherrapunji cave tour
- Cherrapunji Dawki tour
- Cherrapunji Mawlynnong tour

### Supporting
- Nohkalikai Falls
- Seven Sisters Falls
- Mawsmai Cave
- Arwah Cave
- Wei Sawdong
- Dainthlen Falls
- Kynrem Falls

---

## Shillong

### Primary
- Shillong tour package
- Shillong trip package
- Shillong Meghalaya tour
- Shillong tour from Guwahati

### Secondary
- Shillong Cherrapunji tour
- Shillong Dawki tour
- Shillong family tour
- Shillong sightseeing package

---

## Dawki / Mawlynnong

### Primary
- Dawki tour package
- Dawki Meghalaya tour
- Dawki Shillong tour
- Mawlynnong tour package

### Secondary
- Dawki river tour
- Umngot River tour
- Dawki Mawlynnong Cherrapunji package
- Dawki boating tour
- living root bridge tour

---

## Tawang

### Primary
- Tawang tour package
- Tawang trip package
- Tawang tour from Guwahati
- Tawang Arunachal Pradesh tour
- Arunachal Pradesh tour package

### Secondary
- Tawang 6 day tour
- Tawang 7 day tour
- Tawang 8 day tour
- Tawang 9 day tour
- Tawang Sela Pass tour
- Tawang Bum La Pass tour
- Tawang private tour
- Tawang family tour

### Supporting
- Tawang Monastery
- Bum La Pass
- Madhuri Lake
- Sela Pass
- Sela Lake
- Nuranang Falls
- Dirang
- Sangti Valley
- Bomdila
- Shergaon

---

## Assam

### Primary
- Assam tour package
- Assam travel package
- Assam holiday package
- Assam private tour

### Secondary
- Kaziranga tour package
- Kaziranga safari package
- Kaziranga tour from Guwahati
- Kaziranga 2 day tour
- Kaziranga 3 day tour
- Assam Kaziranga tour
- Assam Kaziranga Umrangso tour

### Supporting
- Guwahati
- Kaziranga National Park
- Umrangso
- Panimur Waterfall
- Nameri National Park
- Assam tea gardens

---

# 7. Search Intent Mapping

Every target page must have one dominant intent.

| Intent | Example Query | Best Page Type |
|---|---|---|
| Transactional | Meghalaya tour package | Package/category |
| Commercial | Best Meghalaya tour operator | Service/category |
| Local | tour operator in Guwahati | Local/service |
| Informational | best time to visit Meghalaya | Guide |
| Route | Guwahati to Tawang | Route guide |
| Itinerary | 7 day Meghalaya itinerary | Itinerary guide/package |
| Destination | things to do in Tawang | Destination guide |
| Service | private car for Meghalaya | Service page |
| Comparison | Meghalaya vs Sikkim | Comparison guide |
| Cost | Meghalaya trip cost | Cost guide |
| Safety/logistics | Tawang permit requirements | Practical guide |

Never force a commercial package page to answer every informational query.

---

# 8. Recommended URL Architecture

Use short, permanent, human-readable URLs.

## Core pages

```text
/
 /about
 /contact
 /tours
 /meghalaya
 /assam
 /arunachal-pradesh
 /tawang
 /services
 /vehicles
 /gallery
 /travel-guide
```

## Destination pages

```text
/meghalaya/shillong
/meghalaya/cherrapunji
/meghalaya/dawki
/meghalaya/mawlynnong
/meghalaya/living-root-bridge

/arunachal-pradesh/tawang
/arunachal-pradesh/dirang
/arunachal-pradesh/sangti-valley
/arunachal-pradesh/bomdila
/arunachal-pradesh/sela-pass

/assam/guwahati
/assam/kaziranga
/assam/umrangso
/assam/nameri
```

## Service pages

```text
/services/private-tours
/services/custom-itineraries
/services/guwahati-airport-transfer
/services/car-rental
/services/private-driver
```

## Package pages

Do NOT rely exclusively on modal dialogs.

Every important package should have its own crawlable URL:

```text
/tours/meghalaya/1-day-express
/tours/meghalaya/2-days-1-night
/tours/meghalaya/3-days-2-nights
/tours/meghalaya/4-days-3-nights
/tours/meghalaya/5-days-4-nights
/tours/meghalaya/6-days-5-nights
/tours/meghalaya/7-days-6-nights

/tours/tawang/6-days-5-nights
/tours/tawang/7-days-6-nights
/tours/tawang/8-days-7-nights
/tours/tawang/9-days-8-nights

/tours/assam/kaziranga-2-days
/tours/assam/kaziranga-3-days
/tours/assam/5-days-kaziranga-umrangso
/tours/assam/6-days-kaziranga-umrangso
```

Use stable slugs. Do not change them every season.

---

# 9. CRITICAL TECHNICAL SEO ISSUE: CLIENT-SIDE DATA

The current home component uses browser-side `fetch()` calls to retrieve:

```text
/api/packages
/api/places
/api/gallery
/api/vehicles
/api/settings
```

This is acceptable for application functionality, but SEO-critical package content should not depend on this alone.

## Required architecture

Use Next.js server-side data fetching for indexable content.

Preferred:

```text
MongoDB / CMS
      ↓
Server-side data layer
      ↓
Next.js Server Component
      ↓
HTML generated before crawler receives page
      ↓
Google / Bing / AI crawlers
```

Interactive filters can remain client-side.

### Do this

```tsx
// Server Component
const packages = await getPackages();
return <PackageGrid packages={packages} />;
```

Then:

```tsx
// Client Component
"use client";

export function PackageFilters({ packages }) {
  // filtering, animations, modals
}
```

The important package titles, descriptions, itinerary text, links and headings should already exist in the initial HTML.

Google can render JavaScript, but server-side rendering is still preferable for speed, accessibility, reliable crawling and other crawlers that do not execute JavaScript.

---

# 10. Do Not Hide SEO Content Inside Modals

Current architecture uses:

```text
PackageDetailModal
TripWizardModal
```

Use modals for conversion UX.

Do not make them the only place where package information exists.

Bad:

```text
Google sees:
Package title
Button

Full itinerary exists only after click
```

Better:

```text
Google sees:
H1
Intro
Package overview
Duration
Route
Highlights
Day-by-day itinerary
FAQ
Related tours
Book CTA
```

Then the modal can provide a fast interactive booking experience.

---

# 11. Page Template: Package Page

Every package page should contain:

```text
Breadcrumb
H1
Short unique introduction
Hero image
Trip summary
Duration
Route
Starting point
End point
Best for
Group size
Activity level
Transport
Accommodation information
Highlights
Day-by-day itinerary
Important inclusions
Exclusions
Permit information where relevant
Best time to travel
Travel notes
FAQ
Traveler reviews where genuine
Related packages
Related destination guides
Strong booking CTA
```

## Example H1

```text
7-Day Meghalaya Tour Package from Guwahati
```

## Supporting copy

```text
Explore Shillong, Cherrapunji, the Double Decker Living Root Bridge,
Dawki and Mawlynnong on a 7-day private Meghalaya itinerary from Guwahati.
```

Do not repeat the same paragraph across 20 package pages.

---

# 12. Page Template: Destination Page

Example:

```text
/meghalaya/cherrapunji
```

Structure:

```text
H1: Cherrapunji (Sohra), Meghalaya Travel Guide

Intro
Quick facts
How to reach
Best time to visit
Top places
Waterfalls
Caves
Living root bridges
Recommended number of days
Sample itineraries
Where to stay
How to travel locally
Approximate travel times
Local practical tips
Weather
Frequently asked questions
Related packages
Related destinations
Book custom trip
```

Create genuinely useful information that a traveler can use even before contacting the company.

---

# 13. Homepage SEO

The homepage should target the broadest brand + regional intent.

## Recommended title

```text
Meghalaya, Tawang & Northeast India Tour Packages | Borah Tour & Travels
```

If this is too long after testing pixel width, use:

```text
Northeast India Tour Packages | Meghalaya & Tawang Tours
```

## Recommended meta description

```text
Explore private Meghalaya, Tawang, Assam and Northeast India tours from Guwahati. Custom itineraries, local drivers, airport transfers and curated travel packages.
```

## Recommended H1

```text
Private Northeast India Tours from Guwahati
```

Alternative:

```text
Explore Meghalaya, Tawang & Assam with Local Travel Experts
```

Only use one H1.

---

# 14. Homepage Content Sections

The homepage should visibly contain crawlable text for:

### H1
Primary positioning.

### H2: Meghalaya Tours

Mention:

- Shillong
- Cherrapunji
- Dawki
- Mawlynnong
- living root bridges
- waterfalls
- caves

### H2: Tawang & Arunachal Pradesh Tours

Mention:

- Tawang
- Sela Pass
- Bum La Pass
- Madhuri Lake
- Dirang
- Sangti Valley
- Bomdila

### H2: Assam Tours

Mention:

- Guwahati
- Kaziranga
- wildlife safaris
- Umrangso
- Nameri

### H2: Private & Custom Northeast India Tours

Explain the service.

### H2: Popular Tour Packages

Link directly to package URLs.

### H2: Travel Guide

Link to useful guides.

### H2: Why Travel With Borah Tour & Travels?

Use real differentiators only.

---

# 15. Internal Linking Strategy

Internal linking is one of the highest-priority structural improvements.

Every important page should receive internal links.

## Example

Homepage:

```text
Meghalaya Tours
→ /meghalaya

Cherrapunji Tour
→ /meghalaya/cherrapunji

7-Day Meghalaya Tour
→ /tours/meghalaya/7-days-6-nights

Tawang Tours
→ /arunachal-pradesh/tawang

Kaziranga Tours
→ /assam/kaziranga
```

## Destination → package

```text
/meghalaya/cherrapunji
        ↓
/tours/meghalaya/3-days-2-nights
        ↓
/tours/meghalaya/5-days-4-nights
```

## Package → guide

```text
/tours/tawang/7-days-6-nights
        ↓
/travel-guide/tawang-permits
/travel-guide/best-time-to-visit-tawang
/travel-guide/how-to-reach-tawang
```

## Guide → commercial page

Every useful guide should contain relevant contextual links to packages.

Avoid:

```text
Read more → click here
```

Prefer:

```text
Explore our 7-day Meghalaya tour from Guwahati
```

Anchor text should describe the destination or service naturally.

---

# 16. Breadcrumbs

Implement visible breadcrumbs:

```text
Home
→ Meghalaya
→ Cherrapunji
→ 3-Day Cherrapunji Tour
```

Also implement `BreadcrumbList` structured data.

Do not create breadcrumbs solely for SEO. They should represent the actual information hierarchy.

---

# 17. Structured Data Strategy

Use JSON-LD.

## Global

Use:

- Organization
- LocalBusiness when appropriate
- WebSite
- WebPage

## Package pages

Use structured data that accurately describes the page and its content.

Do not invent schema types merely because they sound relevant.

## Destination pages

Use:

- WebPage
- BreadcrumbList
- Place / tourist destination concepts where appropriate through Schema.org, while validating what Google actually supports for search features.

## Blog / guide pages

Use:

- Article
- BreadcrumbList

## Images

Provide image metadata where useful.

## Reviews

Only mark up genuine reviews that are actually visible on the page.

Do not fabricate:

```json
"ratingValue": "5"
```

Do not aggregate reviews copied from Google, TripAdvisor or other sites as if they were your own.

Do not create fake testimonials.

Google's structured-data policies can remove rich-result eligibility when markup violates guidelines.

---

# 18. Organization JSON-LD Blueprint

Replace placeholders with real verified business data.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://YOURDOMAIN.com/#organization",
  "name": "Borah Tour & Travels",
  "url": "https://YOURDOMAIN.com/",
  "logo": "https://YOURDOMAIN.com/logo.png",
  "sameAs": [
    "VERIFIED_SOCIAL_PROFILE_URL"
  ]
}
```

For a genuine physical/local business, use the most appropriate LocalBusiness subtype and provide only real information:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://YOURDOMAIN.com/#localbusiness",
  "name": "Borah Tour & Travels",
  "url": "https://YOURDOMAIN.com/",
  "telephone": "REAL_BUSINESS_PHONE",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "REAL_ADDRESS",
    "addressLocality": "REAL_CITY",
    "addressRegion": "REAL_STATE",
    "postalCode": "REAL_PIN",
    "addressCountry": "IN"
  }
}
```

Never invent address, telephone, rating, opening hours or coordinates.

---

# 19. Metadata Rules

Every indexable page must have:

- unique title
- unique meta description
- canonical URL
- one clear H1
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter/X card data where useful
- meaningful URL
- indexable HTML
- relevant internal links

## Title formula

```text
[Primary Topic] | [Location/Benefit] | Borah Tour & Travels
```

Examples:

```text
Meghalaya Tour Packages from Guwahati | Borah Tour & Travels
Tawang Tour Packages from Guwahati | Borah Tour & Travels
Kaziranga Tour Packages & Safari | Borah Tour & Travels
Cherrapunji Tour Packages | Meghalaya | Borah Tour & Travels
```

Avoid titles like:

```text
Home
Welcome
Best Tour
Travel
Borah
```

---

# 20. Meta Description Rules

Target roughly 140–160 characters as a practical starting point, but prioritize usefulness over an exact character count.

Formula:

```text
What you offer + destination + differentiator + action
```

Example:

```text
Plan private Meghalaya tours from Guwahati covering Shillong, Cherrapunji, Dawki and Mawlynnong with custom itineraries and local transport.
```

Do not stuff keywords:

```text
Best Meghalaya tour Meghalaya package Meghalaya trip Meghalaya travel
```

---

# 21. Canonicalization

Every indexable page should have one preferred canonical URL.

Example:

```text
https://example.com/tours/meghalaya/7-days-6-nights
```

Canonical should not point every page to the homepage.

Do not create multiple indexable versions through:

```text
?sort=
?filter=
?region=
?duration=
```

If filter pages contain no unique search value, keep them non-indexable or canonicalize appropriately.

The canonical is a hint, not an absolute command.

---

# 22. Faceted Navigation / Filters

The current UI contains region and duration filters.

Do NOT automatically create thousands of crawlable URLs for:

```text
?region=meghalaya
?region=meghalaya&duration=short
?region=assam&duration=grand
...
```

unless those pages have real unique search demand and unique content.

Recommended:

```text
Canonical landing pages:
 /meghalaya
 /assam
 /arunachal-pradesh
```

Keep UI filtering client-side when it is only a browsing feature.

If a filtered state deserves SEO traffic, create a real landing page.

---

# 23. Sitemap

Create:

```text
/sitemap.xml
```

Include only canonical URLs that should appear in search results.

Prefer automatically generated sitemap content from the database/CMS.

Recommended sitemap groups:

```text
pages
destinations
packages
guides
```

If the site grows significantly, use sitemap indexes.

Never include:

- API URLs
- admin pages
- internal dashboard pages
- login pages
- duplicate filter URLs
- noindex pages
- temporary URLs
- test pages

---

# 24. Robots.txt

Create:

```text
/robots.txt
```

Conceptual example:

```txt
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/

Sitemap: https://YOURDOMAIN.com/sitemap.xml
```

Do not blindly disallow JavaScript/CSS/image resources needed to render the page.

Test the actual result after deployment.

---

# 25. Indexing Policy

## Index

- homepage
- destination pages
- package pages
- service pages
- useful travel guides
- legitimate location pages
- about/contact pages

## Usually noindex

- admin
- dashboard
- login
- internal search results
- empty filter combinations
- temporary campaign pages
- duplicate parameter URLs
- internal APIs

---

# 26. JavaScript SEO

Because this is a Next.js application:

### Prefer

```text
Server Components
SSR
Static generation
Incremental regeneration
Server-side CMS retrieval
```

for SEO content.

### Use Client Components for

```text
Filters
Modals
Animations
Forms
Interactive maps
Carousels
WhatsApp UI
```

Do not make the entire page a giant Client Component if the page can be split into server and client components.

---

# 27. Image SEO

The site has significant visual content, which is valuable for travel search.

Every meaningful image should have:

- descriptive filename
- accurate alt text
- width
- height
- modern compression
- responsive sizing
- appropriate loading behavior

## Bad

```text
IMG_92837.jpg
```

## Better

```text
nuranang-jung-waterfall-tawang-arunachal-pradesh.jpg
```

## Bad alt

```text
image
travel
```

## Better

```text
Nuranang Waterfall near Tawang, Arunachal Pradesh
```

Do not put keywords into alt text that are not visually present.

---

# 28. Next.js Image Optimization

Use:

```tsx
<Image
  src="/img/tawang/tawang.png"
  alt="Tawang landscape in Arunachal Pradesh"
  width={1200}
  height={800}
  priority
/>
```

Use `priority` only for above-the-fold critical images.

Do not set every image to priority.

Lazy-load below-the-fold images.

---

# 29. Hero Video Optimization

The homepage currently cycles multiple hero videos.

This can become a major performance problem.

Rules:

- do not let video block first contentful rendering
- use a poster image
- compress videos aggressively
- provide mobile-friendly behavior
- consider disabling background video on slow/mobile connections
- preload only what is genuinely needed
- avoid loading several large videos immediately
- use `prefers-reduced-motion`
- maintain readable text over video

The first screen should still communicate the business if the video fails to load.

---

# 30. Core Web Vitals

Target excellent:

### LCP

Keep the main hero content fast.

### INP

Avoid expensive JavaScript and long event handlers.

### CLS

Reserve image/video dimensions.

### Performance priorities

1. Server-render important content
2. Compress hero media
3. Optimize fonts
4. Reduce JavaScript
5. Lazy-load below-fold media
6. Avoid unnecessary third-party scripts
7. Cache CMS data
8. Use CDN/image optimization
9. Avoid huge client bundles
10. Test mobile, not just desktop

Use PageSpeed Insights and real-user data.

---

# 31. Mobile SEO

Travel users are heavily mobile-oriented.

The mobile page must provide:

- readable text
- large tap targets
- fast load
- sticky booking/contact CTA where appropriate
- click-to-call
- WhatsApp CTA
- easy itinerary scanning
- maps that do not dominate the page
- compressed media

Do not hide essential content on mobile.

---

# 32. Google Business Profile

This is a critical part of the local strategy.

Claim and verify the official Google Business Profile.

Maintain consistent:

```text
Business Name
Address
Phone
Website
Hours
Category
Services
Description
Photos
Social profiles
```

Google states that local ranking is primarily influenced by:

- relevance
- distance
- prominence

Complete and accurate business information helps relevance, while reviews and mentions across the web can contribute to prominence.

Never create fake locations.

Never create fake reviews.

Never stuff keywords into the business name.

---

# 33. NAP Consistency

NAP =

```text
Name
Address
Phone
```

Keep the exact legitimate business identity consistent across:

- website
- Google Business Profile
- Bing Places
- Facebook
- Instagram
- travel directories
- local directories
- tourism listings
- partner sites

If the official business name is:

```text
Borah Tour & Travels
```

do not randomly use:

```text
Borah Best Meghalaya Tour Package Guwahati
```

as the business name.

---

# 34. Reviews Strategy

Collect genuine customer reviews after real trips.

Ask customers to mention useful experience details naturally.

Good:

```text
"We booked a 6-day Meghalaya trip from Guwahati and visited Cherrapunji,
Dawki and Mawlynnong. The driver was punctual and the itinerary was easy to follow."
```

Do not tell every customer to paste the same keyword-filled sentence.

Respond to reviews naturally.

Respond to negative reviews professionally.

Never buy fake reviews.

---

# 35. Local Citations

Build legitimate citations on relevant sites.

Prioritize:

- Google Business Profile
- Bing Places
- Apple Business Connect where applicable
- local tourism directories
- Northeast tourism resources
- Assam tourism ecosystem
- Meghalaya tourism ecosystem
- Arunachal tourism ecosystem
- local chambers/associations where genuinely applicable
- reputable travel directories

Do not mass-submit to hundreds of low-quality spam directories.

Quality and consistency matter more than quantity.

---

# 36. Link Building Strategy

The objective is not "1000 backlinks."

The objective is relevant authority.

## High-value link sources

- local tourism organizations
- travel publications
- Northeast India publications
- regional newspapers
- travel bloggers
- photographers
- hotels/homestays
- activity operators
- destination websites
- local businesses
- universities/community organizations when relevant
- legitimate partner businesses

## Link-worthy assets

Create resources people naturally want to cite:

```text
Complete Meghalaya 7-Day Itinerary
Complete Tawang Route Guide
Guwahati to Tawang Road Guide
Meghalaya Waterfall Guide
Tawang Permit Guide
Kaziranga Safari Planning Guide
Northeast India Trip Planner
Meghalaya Travel Cost Calculator
Northeast India Route Map
```

---

# 37. Digital PR

Create original local stories.

Examples:

- seasonal road-condition updates
- Meghalaya waterfall accessibility updates
- Tawang travel condition updates
- local travel guides
- original route maps
- original photography
- responsible tourism initiatives
- local culture guides
- traveler safety checklists

Pitch genuinely useful information to journalists and travel publications.

Do not create fake "news."

---

# 38. E-E-A-T / Trust Strategy

Travel is a real-world service. Trust matters.

Create an About page with:

- business story
- who operates the tours
- service area
- years of experience if verifiable
- local knowledge
- driver/guide information where appropriate
- business registration details where appropriate
- contact information
- customer support
- booking process
- cancellation policy
- safety practices
- privacy policy
- terms

Use real people and real photos when appropriate.

---

# 39. First-Hand Experience

This should be a major competitive advantage.

For destination pages, add first-hand observations such as:

```text
Who this route is best for
What the road is actually like
How long the drive usually feels
What travelers commonly underestimate
What should be booked early
What depends on weather
What to carry
```

Only state these as facts if the business actually has experience/data supporting them.

---

# 40. AI Search Optimization

## Goal

Make content easy for AI systems to:

1. discover
2. crawl
3. understand
4. extract
5. attribute
6. cite

Google's current guidance emphasizes that standard SEO fundamentals remain important for generative search features.

There is no secret "AI SEO tag" that guarantees citations.

---

# 41. AI-Friendly Content Structure

For important questions, use this structure:

```text
H2: How many days do you need for Meghalaya?

Direct answer:
For a first Meghalaya trip, 5–7 days is a practical starting point.

Why:
...

Recommended itinerary:
Day 1:
Day 2:
...

Who should choose 3 days:
...

Who should choose 7 days:
...
```

AI systems can extract the direct answer without needing to interpret a huge paragraph.

---

# 42. Answer-First Writing

For informational content:

### Bad

```text
Meghalaya is a beautiful destination with many places...
```

### Better

```text
The ideal Meghalaya trip length depends on how many regions you want to cover.
For a first trip covering Shillong, Cherrapunji, Dawki and Mawlynnong,
5–7 days gives substantially more time than a one-day sightseeing trip.
```

Then explain the reasoning.

---

# 43. AI Citation-Worthy Content

Create original data and knowledge.

Examples:

```text
Borah's Meghalaya Route Planner
Borah's Tawang Route Planner
Borah's Northeast India Travel Checklist
Borah's Meghalaya Itinerary Database
Borah's Seasonal Destination Guide
```

Use clearly dated updates.

Example:

```text
Last updated: September 2026
```

Only display dates when the content was genuinely reviewed/updated.

---

# 44. AI Entity Consistency

Use the same names everywhere.

For example:

```text
Borah Tour & Travels
Meghalaya
Assam
Arunachal Pradesh
Tawang
Cherrapunji / Sohra
Guwahati
Kaziranga National Park
```

Make relationships explicit:

```text
Borah Tour & Travels
→ operates tours
→ Northeast India
→ pickup from Guwahati
→ Meghalaya
→ Assam
→ Arunachal Pradesh
```

This helps machines understand the business entity.

---

# 45. Entity Pages

Build strong entity/destination pages.

Example:

```text
/meghalaya/cherrapunji
```

should clearly explain:

```text
Cherrapunji
Also known as Sohra
Located in Meghalaya
Known for waterfalls, caves and living root bridges
Accessible from Shillong/Guwahati
Relevant Borah tours
```

Do not publish inaccurate or outdated facts merely to increase keyword coverage.

---

# 46. FAQ Strategy

FAQs are useful for users and AI retrieval.

Do not create 100 generic FAQs.

Create questions travelers actually ask.

Examples:

```text
How many days are enough for Meghalaya?
How do I travel to Meghalaya from Guwahati?
Can I book a private Meghalaya tour?
Is Dawki included in Meghalaya packages?
How many days are needed for Tawang?
How do I reach Tawang from Guwahati?
What is included in a Tawang tour?
Is Bum La Pass subject to permit and weather?
How long is the Guwahati to Kaziranga drive?
Can you arrange airport pickup in Guwahati?
Can I customize the itinerary?
```

The answer must be genuinely useful.

---

# 47. FAQ Schema Warning

Do not assume FAQ structured data automatically produces a Google rich result.

Google's FAQ rich-result availability has changed. Use FAQ content primarily because it helps users and creates clear question-answer information, not because of a guaranteed SERP enhancement.

---

# 48. Travel Guide Content Cluster

Build at least these clusters.

## Meghalaya cluster

```text
Ultimate Meghalaya Travel Guide
Best Time to Visit Meghalaya
How to Reach Meghalaya from Guwahati
Meghalaya 3-Day Itinerary
Meghalaya 5-Day Itinerary
Meghalaya 7-Day Itinerary
Meghalaya Travel Cost
Best Waterfalls in Meghalaya
Best Caves in Meghalaya
Cherrapunji Travel Guide
Dawki Travel Guide
Mawlynnong Travel Guide
Shillong Travel Guide
Living Root Bridge Guide
```

## Tawang cluster

```text
Complete Tawang Travel Guide
Best Time to Visit Tawang
How to Reach Tawang from Guwahati
Tawang 6-Day Itinerary
Tawang 7-Day Itinerary
Tawang 9-Day Itinerary
Tawang Travel Cost
Sela Pass Guide
Bum La Pass Guide
Madhuri Lake Guide
Dirang Travel Guide
Sangti Valley Guide
```

## Assam cluster

```text
Complete Assam Travel Guide
Guwahati Travel Guide
Kaziranga Travel Guide
Best Time to Visit Kaziranga
Kaziranga Safari Guide
Kaziranga 2-Day Itinerary
Kaziranga 3-Day Itinerary
Umrangso Travel Guide
Nameri Travel Guide
Assam Wildlife Guide
```

---

# 49. Content Quality Rules

Every article must contain at least several of:

- original photos
- original observations
- exact route information
- practical travel details
- itinerary examples
- maps where useful
- transport information
- realistic limitations
- seasonal considerations
- clear author/business identity
- update date
- sources for factual claims
- internal links
- relevant packages

Avoid AI-generated filler.

Do not publish 500 pages where every page is the same template with destination names swapped.

---

# 50. Avoid Programmatic SEO Spam

Do NOT generate:

```text
Best Meghalaya Tour in Delhi
Best Meghalaya Tour in Mumbai
Best Meghalaya Tour in Bangalore
...
```

with identical copy.

Instead, create location pages only when there is a real service/market reason and unique content.

Good:

```text
Meghalaya Tours from Guwahati
```

Potentially good if actually served:

```text
Meghalaya Tours from Kolkata
```

Only if the company genuinely serves that market and can provide useful unique information.

---

# 51. Package Content Uniqueness

The existing package data has several overlapping itineraries.

That is normal for products, but SEO pages need differentiation.

For every package, add:

```text
Best for
Why choose this duration
Pace
What you see
What you don't see
Who should not choose it
Recommended season
Transport style
Customisation options
```

This creates meaningful differences between:

```text
3-day Meghalaya
5-day Meghalaya
7-day Meghalaya
```

rather than just changing the number of days.

---

# 52. Commercial Conversion SEO

Organic traffic is useless if users cannot convert.

Each SEO landing page should have:

```text
Call
WhatsApp
Request Custom Plan
Get Itinerary
Check Availability
```

Keep contact information visible.

For package pages:

```text
Plan This Trip
Customize This Itinerary
Talk to a Travel Expert
```

Use descriptive CTA text.

---

# 53. Contact Information

Create a dedicated contact page.

Include:

- business name
- phone
- WhatsApp
- email
- address if public/appropriate
- business hours
- Google Maps
- service area
- response expectations
- booking process

Use the same legitimate information as the Google Business Profile.

---

# 54. About Page

Recommended H1:

```text
About Borah Tour & Travels
```

Sections:

```text
Who We Are
Where We Operate
What We Specialize In
Our Approach to Private Tours
Our Drivers / Local Team
How We Plan Trips
Why Travelers Choose Us
Contact Us
```

Add real evidence.

---

# 55. Author / Reviewer System

For travel guides, consider:

```text
Written by:
Borah Tour & Travels

Reviewed by:
[Real person / travel specialist]
```

Only use real people.

Add a short author profile where appropriate.

Do not manufacture credentials.

---

# 56. Freshness System

Travel information changes.

Add:

```text
Last reviewed: September 2026
```

when genuinely reviewed.

Recheck:

- road information
- permits
- entry rules
- safari rules
- opening hours
- accommodation details
- seasonal conditions
- prices
- contact information

Do not change the date without changing/reviewing the content.

---

# 57. Google Search Console

Set up:

```text
Google Search Console
```

Verify the domain.

Submit:

```text
/sitemap.xml
```

Monitor:

- impressions
- clicks
- CTR
- average position
- indexed pages
- excluded pages
- crawl errors
- Core Web Vitals
- queries
- pages
- country
- device

---

# 58. Search Console Keyword Loop

Every month:

```text
1. Export queries.
2. Find impressions with low clicks.
3. Improve title.
4. Improve meta description.
5. Improve page answer.
6. Add missing sections.
7. Improve internal links.
8. Build relevant authority.
9. Recheck performance.
```

High-impression / low-CTR pages are often the fastest optimization opportunities.

---

# 59. Bing Webmaster Tools

Also configure:

- Bing Webmaster Tools
- sitemap
- indexing monitoring
- URL inspection

Bing visibility can also contribute to discovery in Microsoft-powered search experiences.

---

# 60. Google Analytics

Track:

```text
page_view
package_view
whatsapp_click
phone_click
email_click
custom_trip_start
custom_trip_submit
booking_intent
vehicle_view
map_interaction
```

Recommended event names:

```text
generate_lead
contact_whatsapp
contact_phone
request_custom_trip
view_package
```

Use meaningful conversion events.

---

# 61. Conversion Funnel

Track:

```text
Organic impression
      ↓
Google click
      ↓
Landing page
      ↓
Package interaction
      ↓
WhatsApp / Phone / Form
      ↓
Lead
      ↓
Booking
```

Do not optimize only for traffic.

Optimize for qualified leads and bookings.

---

# 62. Search Performance Dashboard

Create a monthly dashboard with:

| Metric | Target |
|---|---|
| Organic clicks | Increasing |
| Organic impressions | Increasing |
| Indexed pages | Healthy |
| Non-branded clicks | Increasing |
| Branded searches | Increasing |
| CTR | Improving |
| Top 3 keywords | Increasing |
| Top 10 keywords | Increasing |
| Leads from organic | Increasing |
| WhatsApp clicks | Increasing |
| Phone clicks | Increasing |
| Core Web Vitals | Good |
| Crawl errors | Near zero |
| Manual actions | Zero |

---

# 63. Technical SEO Checklist

## Crawlability

- [ ] robots.txt exists
- [ ] sitemap.xml exists
- [ ] important pages return 200
- [ ] no accidental noindex
- [ ] no accidental robots blocking
- [ ] important links use real `<a href>` links
- [ ] no broken internal links
- [ ] no infinite URL generation
- [ ] canonical URLs are correct

## Indexability

- [ ] unique titles
- [ ] unique descriptions
- [ ] one H1
- [ ] crawlable body content
- [ ] server-rendered important content
- [ ] canonical
- [ ] sitemap inclusion

## Performance

- [ ] optimized hero image
- [ ] compressed videos
- [ ] optimized fonts
- [ ] lazy images
- [ ] minimal JS
- [ ] caching
- [ ] CDN
- [ ] mobile performance

---

# 64. HTML Semantics

Use semantic HTML.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Use:

```html
<a href="/tours/meghalaya/7-days-6-nights">
  7-Day Meghalaya Tour Package
</a>
```

instead of:

```html
<div onClick={...}>
  7-Day Meghalaya Tour Package
</div>
```

Google can discover links from standard crawlable anchors more reliably.

---

# 65. Heading Hierarchy

Good:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Bad:

```text
H1
H4
H2
H6
H3
```

Do not choose headings merely because of font size.

---

# 66. URL Rules

Use:

```text
/meghalaya-tour-packages
```

not:

```text
/page?id=7821
```

Use lowercase.

Use hyphens.

Avoid unnecessary dates unless the content is genuinely date-specific.

Avoid keyword stuffing:

```text
/best-cheap-top-meghalaya-tour-package-trip
```

Prefer:

```text
/meghalaya-tour-packages
```

---

# 67. Open Graph

Every major page should have:

```text
og:title
og:description
og:image
og:url
og:type
```

Package pages should use the package's strongest image.

Destination pages should use destination-specific images.

---

# 68. Social Proof

Add real:

- traveler photographs
- traveler stories
- reviews
- testimonials
- trip completion evidence

Use the existing traveler gallery strategically.

Create captions that identify:

```text
Destination
Trip/package
Approximate date if appropriate
```

Only publish information with customer permission.

---

# 69. Video SEO

For original travel videos:

- descriptive title
- description
- destination
- itinerary context
- transcript when practical
- captions
- thumbnail
- video sitemap where justified
- embed on relevant destination pages

Example:

```text
Tawang Travel Guide: Sela Pass to Tawang Road Trip
```

rather than:

```text
Tawang video
```

---

# 70. Map SEO

The current site includes Google Maps embeds for:

- Guwahati
- Tawang
- Sela Pass
- Sangti Valley
- Kaziranga
- Cherrapunji
- Dawki

Keep maps for users, but do not treat an iframe as the primary source of destination text.

Write the destination information in HTML around the map.

---

# 71. Destination Route Pages

High-potential route pages:

```text
/route/guwahati-to-meghalaya
/route/guwahati-to-cherrapunji
/route/guwahati-to-dawki
/route/guwahati-to-kaziranga
/route/guwahati-to-tawang
/route/dirang-to-tawang
```

Only create pages when each route has substantial unique information.

Each route page:

```text
distance
typical drive duration
major stops
road context
recommended stops
best time
transport options
sample itinerary
maps
related packages
FAQ
```

---

# 72. Seasonal SEO

Travel searches are seasonal.

Build content around:

### Meghalaya

- monsoon Meghalaya
- Meghalaya in winter
- Meghalaya in summer
- waterfall season
- road conditions

### Tawang

- winter Tawang
- Tawang snowfall
- best time for Tawang
- Sela Pass winter
- Bum La Pass travel season

### Kaziranga

- Kaziranga safari season
- Kaziranga opening season
- best time for rhino safari
- Kaziranga monsoon closure

All time-sensitive claims must be verified before publication.

---

# 73. Pricing SEO

The current package implementation uses:

```text
Contact Owner
```

instead of fixed prices.

This can be acceptable if pricing varies.

However, users frequently search for:

```text
Meghalaya trip cost
Tawang tour cost
Kaziranga tour cost
```

Create transparent cost guides.

Example:

```text
Meghalaya Trip Cost: What Affects the Price?
```

Explain:

- number of days
- vehicle type
- number of travelers
- accommodation
- season
- itinerary
- permits
- activities

Never publish fake "from ₹X" prices.

---

# 74. Programmatic Package SEO

Because package data exists in the CMS, build dynamic SEO metadata from each package.

Pseudo-logic:

```ts
export async function generateMetadata({ params }) {
  const pkg = await getPackage(params.slug);

  return {
    title: `${pkg.title} | Borah Tour & Travels`,
    description: buildDescription(pkg),
    alternates: {
      canonical: `/tours/${pkg.region}/${pkg.slug}`
    }
  };
}
```

The metadata should be unique for every package.

---

# 75. Dynamic Sitemap

Generate URLs from the CMS/database.

Pseudo:

```ts
export default async function sitemap() {
  const packages = await getPackages();
  const destinations = await getDestinations();

  return [
    {
      url: "https://YOURDOMAIN.com/",
      lastModified: new Date()
    },
    ...packages.map((pkg) => ({
      url: `https://YOURDOMAIN.com/tours/${pkg.slug}`,
      lastModified: pkg.updatedAt
    }))
  ];
}
```

Only include pages intended for indexing.

---

# 76. Structured Data Validation

After implementation:

1. Validate JSON-LD.
2. Test the rendered URL.
3. Use Google's Rich Results Test where applicable.
4. Use Search Console URL Inspection.
5. Check actual rendered HTML.
6. Verify no duplicate schema.
7. Verify schema matches visible content.

Structured data does not guarantee a rich result.

---

# 77. AI Crawler / robots Policy

Do not block legitimate search crawlers accidentally.

Before changing robots rules, understand which crawler is being affected.

Keep the site's primary content accessible to normal search crawlers.

Do not assume that adding an `llms.txt` file guarantees AI visibility. Treat it as optional documentation, not as a replacement for crawlable HTML, good information architecture and standard SEO.

---

# 78. Content Update Calendar

## Weekly

- add/update photos
- respond to reviews
- publish one useful travel post or update
- check lead funnel

## Monthly

- update Search Console analysis
- improve 5–10 pages
- add internal links
- update old guides
- build 2–5 legitimate relationships/backlinks
- check technical errors

## Quarterly

- full technical audit
- content gap analysis
- competitor analysis
- backlink audit
- Core Web Vitals review
- destination content refresh
- package content refresh

---

# 79. 90-Day Execution Plan

## Days 1–14: Technical Foundation

### P0

- [ ] establish final domain
- [ ] configure metadata
- [ ] create robots.txt
- [ ] create sitemap
- [ ] canonical URLs
- [ ] Search Console
- [ ] Analytics
- [ ] Bing Webmaster Tools
- [ ] fix indexability
- [ ] split server/client components
- [ ] server-render package content
- [ ] create crawlable package URLs
- [ ] optimize hero media
- [ ] optimize images

---

## Days 15–30: Commercial Pages

Create:

```text
/meghalaya
/assam
/arunachal-pradesh
/tawang
/services/private-tours
/services/custom-itineraries
/services/guwahati-airport-transfer
/services/car-rental
```

Create destination pages:

```text
Shillong
Cherrapunji
Dawki
Mawlynnong
Tawang
Dirang
Sangti Valley
Kaziranga
Umrangso
Guwahati
```

---

## Days 31–60: Package SEO

Create unique crawlable package pages.

Prioritize:

1. Meghalaya 3-day
2. Meghalaya 5-day
3. Meghalaya 7-day
4. Tawang 6-day
5. Tawang 7-day
6. Tawang 9-day
7. Kaziranga 2-day
8. Kaziranga 3-day
9. Assam 5-day
10. Assam 6-day

Every page gets:

- unique H1
- unique intro
- itinerary
- FAQs
- metadata
- schema
- internal links
- booking CTA

---

## Days 61–90: Authority

Publish:

```text
Meghalaya Ultimate Guide
Tawang Ultimate Guide
Kaziranga Ultimate Guide
Meghalaya 7-Day Itinerary
Tawang 7-Day Itinerary
Guwahati to Tawang Guide
Meghalaya Trip Cost Guide
Tawang Permit Guide
Best Time to Visit Meghalaya
Best Time to Visit Tawang
```

Start digital PR and relationship-based link building.

---

# 80. Priority Levels

## P0 — Do immediately

- crawlability
- sitemap
- robots
- canonical
- unique metadata
- server rendering
- package URLs
- internal links
- Google Business Profile
- Search Console
- Analytics
- Core Web Vitals

## P1 — High impact

- destination pages
- package pages
- service pages
- travel guides
- reviews
- original photos
- schema
- local citations
- internal linking system

## P2 — Growth

- digital PR
- route guides
- calculators
- original datasets
- video SEO
- advanced content clusters
- partnerships

---

# 81. Competitor Research Process

Do this manually for the top 10 results for each major query.

Record:

```text
Keyword
Ranking URL
Domain
Title
H1
Word count
Content sections
Unique information
Backlinks
Reviews
Business Profile strength
Internal links
Page speed
Images
Schema
Destination coverage
Pricing transparency
Trust signals
```

Then ask:

```text
What does every competitor have?
What does nobody have?
What can Borah provide from actual experience?
What question does the searcher still have?
```

The last question is especially important.

---

# 82. Content Gap Strategy

If competitors have:

```text
"Meghalaya 7 day itinerary"
```

do not publish another generic itinerary.

Create:

```text
Meghalaya 7-Day Itinerary from Guwahati
with realistic route sequencing,
drive times,
alternative plans,
family/adventure variants,
cost factors,
packing guidance,
and local practical notes.
```

Only include information that can be supported.

---

# 83. Avoid These SEO Mistakes

Never:

- keyword stuff
- buy fake reviews
- buy spam backlinks
- create doorway pages
- copy competitor content
- copy tourism board text
- create hundreds of thin pages
- hide text
- use fake schema
- invent ratings
- invent awards
- invent credentials
- use misleading prices
- create fake locations
- automatically index every filter
- block CSS/JS required for rendering
- make package content accessible only through modals
- use identical metadata on every page
- change URLs unnecessarily
- generate AI filler at scale

---

# 84. Recommended Site Navigation

Primary navigation:

```text
Home
Meghalaya
Tawang & Arunachal
Assam
Tour Packages
Services
Travel Guide
About
Contact
```

Desktop and mobile navigation should link to real URLs.

Avoid a navigation system where everything only triggers JavaScript state changes.

---

# 85. Footer Architecture

Footer should contain crawlable links:

```text
Meghalaya Tours
Shillong Tours
Cherrapunji Tours
Dawki Tours
Mawlynnong Tours

Tawang Tours
Arunachal Pradesh Tours
Sela Pass Tours
Dirang Tours

Assam Tours
Kaziranga Tours
Guwahati Tours
Umrangso Tours

Private Tours
Custom Itineraries
Airport Transfers
Car Rental

Travel Guide
About
Contact
Privacy
Terms
Cancellation Policy
```

Do not overload the footer with hundreds of keyword variations.

---

# 86. Legal / Trust Pages

Create:

```text
/privacy-policy
/terms-and-conditions
/cancellation-policy
/refund-policy
/contact
/about
```

Make policies understandable.

Travel businesses need trust.

---

# 87. Accessibility = SEO Support

Implement:

- meaningful alt text
- keyboard navigation
- visible focus
- sufficient contrast
- semantic headings
- accessible buttons
- form labels
- descriptive link text
- captions/transcripts for video

Accessibility is not a magic ranking factor, but it improves usability, content interpretation and overall quality.

---

# 88. Recommended Homepage Content Model

Use this order:

```text
1. Hero
   H1 + value proposition + CTA

2. Destination overview
   Meghalaya / Tawang / Assam

3. Popular packages

4. Why Borah Tour & Travels

5. Services

6. Route / destination explorer

7. Vehicles / private transport

8. Traveler photos / reviews

9. Travel guides

10. Custom trip CTA

11. FAQ

12. Contact / local business information
```

---

# 89. Package-to-Guide Internal Link Matrix

## Meghalaya

```text
Meghalaya packages
→ Meghalaya travel guide
→ Cherrapunji guide
→ Dawki guide
→ Mawlynnong guide
→ Shillong guide
→ Meghalaya 7-day itinerary
```

## Tawang

```text
Tawang packages
→ Tawang guide
→ Sela Pass guide
→ Bum La guide
→ Dirang guide
→ Tawang permit guide
→ Best time to visit Tawang
```

## Assam

```text
Assam packages
→ Kaziranga guide
→ Kaziranga safari guide
→ Guwahati guide
→ Umrangso guide
→ Best time to visit Kaziranga
```

---

# 90. Image Asset Naming Convention

Use:

```text
destination-place-subject-location.webp
```

Examples:

```text
tawang-monastery-arunachal-pradesh.webp
sela-pass-tawang-arunachal-pradesh.webp
dawki-umngot-river-meghalaya.webp
nohkalikai-falls-cherrapunji-meghalaya.webp
kaziranga-rhino-assam.webp
```

Do not rename files purely for SEO if the existing URL is already indexed unless redirects are implemented.

---

# 91. Technical Monitoring

Automate checks for:

```text
404 pages
500 pages
broken links
missing title
duplicate title
missing H1
duplicate H1
missing canonical
noindex mistakes
orphan pages
slow pages
oversized images
missing alt text
sitemap errors
robots errors
```

Run at least monthly.

---

# 92. Orphan Page Prevention

Every indexable page must be reachable through internal links.

No orphaned:

```text
package
destination
guide
service
```

pages.

Recommended minimum:

```text
Homepage → category → page
```

and at least one contextual link from another relevant page.

---

# 93. Pagination

If there are many packages:

Use crawlable pagination or a strong category architecture.

Avoid relying entirely on:

```text
Load more
```

if additional products are not otherwise discoverable.

Each important package should have its own URL.

---

# 94. Search Result CTR Optimization

For pages ranking positions 4–10:

Test:

### Title

Include:

```text
destination + service + differentiator
```

### Description

Include:

```text
answer + benefit + action
```

### Page content

Make the first visible content directly satisfy the search.

Do not manipulate CTR with misleading claims.

---

# 95. Brand Search Strategy

Grow searches for:

```text
Borah Tour & Travels
Borah Tours
Borah Tour Meghalaya
Borah Tour Tawang
```

Use consistent branding across:

- website
- Google Business Profile
- social profiles
- travel partnerships
- press
- reviews

Brand searches are a useful signal of growing awareness, though they should not be treated as a simple ranking hack.

---

# 96. Geographic Expansion

Only expand into a location when the business actually serves it.

Possible future structures:

```text
/tours-from-guwahati
/tours-from-kolkata
/tours-from-delhi
```

But each page needs unique value.

For example:

```text
How travelers from Kolkata reach Guwahati
Recommended flight/rail connection
Pickup process
Suggested itineraries
Travel duration
```

Do not create doorway pages.

---

# 97. Travel Industry Partnerships

Build partnerships with:

- homestays
- hotels
- cafes
- activity operators
- photographers
- local guides
- destination creators
- transportation providers
- tourism organizations

Where there is a genuine relationship, earn natural links and referrals.

---

# 98. Original Research Opportunities

High-authority content can come from real business data.

Examples:

```text
Most-requested Meghalaya itineraries
Most popular trip durations
Common traveler questions
Seasonal trip patterns
Popular Tawang routes
Average drive-time observations
Vehicle preference by group size
```

Only publish aggregated, privacy-safe data.

Do not expose customer personal information.

---

# 99. AI-Friendly Data Tables

Use tables for structured comparisons.

Example:

| Destination | Recommended Days | Main Highlights | Best For |
|---|---:|---|---|
| Cherrapunji | 2–3 | Waterfalls, caves | Nature |
| Dawki | 1–2 | Umngot River, Mawlynnong | Scenic trips |
| Tawang | 5–7+ | Monastery, Sela, Bum La | Mountains |
| Kaziranga | 2–3 | Wildlife safari | Wildlife |

Only use values that are reasonable and supportable.

---

# 100. Direct Answer Blocks

For high-intent pages, add a "Quick Answer" section.

Example:

```text
## Quick Answer

A 5–7 day Meghalaya trip is a practical choice for travelers who want
to combine Shillong, Cherrapunji, Dawki and Mawlynnong without rushing.
```

Then explain.

This improves scanability and makes the content easier for search systems to understand.

---

# 101. AI Search Content Rules

Every important informational article should answer:

```text
What?
Where?
When?
Why?
How?
How much?
How long?
Who is it for?
What are the alternatives?
What can go wrong?
What should I do next?
```

This creates comprehensive, decision-useful content.

---

# 102. Trustworthy AI Content Rules

When information can change:

```text
State the date checked.
State what may change.
Link to the relevant official authority when appropriate.
Avoid absolute claims.
```

Example:

```text
Permit requirements and road access can change due to government rules
or weather. Check the latest official guidance before travel.
```

---

# 103. Search Intent Cannibalization

Do not make:

```text
/meghalaya
/meghalaya-tour
/meghalaya-tour-package
/meghalaya-trip
/meghalaya-travel
```

all target exactly the same query with almost identical content.

Choose one primary commercial landing page.

Use the other pages only if they have distinct intent.

---

# 104. Keyword Cannibalization Audit

Quarterly:

Search:

```text
site:YOURDOMAIN.com Meghalaya tour
```

Check whether multiple pages are competing for the same phrase.

If two pages are substantially similar:

- merge
- redirect
- differentiate
- canonicalize
- or assign distinct intent

Do not blindly create more pages.

---

# 105. Search Engine Testing

After deployment:

```text
site:YOURDOMAIN.com
```

Check indexed pages.

Then inspect:

```text
site:YOURDOMAIN.com/meghalaya
site:YOURDOMAIN.com/tawang
site:YOURDOMAIN.com/tours/meghalaya/7-days-6-nights
```

Also use:

```text
Google Search Console → URL Inspection
```

Check:

```text
Crawled?
Indexed?
Canonical?
Rendered content?
Mobile?
```

---

# 106. Release Checklist

Before every SEO page goes live:

```text
[ ] URL is correct
[ ] title is unique
[ ] description is unique
[ ] H1 exists
[ ] content is useful
[ ] no keyword stuffing
[ ] canonical is correct
[ ] page is indexable
[ ] page is server-rendered
[ ] internal links exist
[ ] images optimized
[ ] alt text accurate
[ ] schema valid
[ ] CTA works
[ ] phone works
[ ] WhatsApp works
[ ] mobile works
[ ] page speed checked
[ ] sitemap includes URL
```

---

# 107. Minimum Launch Set

Before seriously pursuing rankings, the site should have at minimum:

### Commercial

```text
Homepage
Meghalaya landing page
Tawang/Arunachal landing page
Assam landing page
Tour packages
Private tour service
Custom itinerary service
Contact
About
```

### Destination

```text
Shillong
Cherrapunji
Dawki
Mawlynnong
Tawang
Dirang
Sela Pass
Kaziranga
Guwahati
Umrangso
```

### Guides

```text
Meghalaya guide
Tawang guide
Kaziranga guide
Meghalaya itinerary
Tawang itinerary
Guwahati to Tawang route
Best time to visit Meghalaya
Best time to visit Tawang
```

---

# 108. Recommended SEO Database Fields

Extend CMS objects.

## Package

```ts
{
  slug,
  title,
  seoTitle,
  metaDescription,
  h1,
  shortDescription,
  longDescription,
  region,
  destination,
  duration,
  route,
  highlights,
  itinerary,
  inclusions,
  exclusions,
  bestFor,
  activityLevel,
  groupSize,
  images,
  faq,
  updatedAt,
  published,
  canonicalUrl
}
```

## Destination

```ts
{
  slug,
  name,
  seoTitle,
  metaDescription,
  h1,
  introduction,
  location,
  bestTime,
  howToReach,
  thingsToDo,
  travelTips,
  faqs,
  images,
  relatedPackages,
  updatedAt,
  published
}
```

This gives the CMS control over SEO without hardcoding metadata into UI components.

---

# 109. Recommended CMS Admin SEO Controls

Admin should allow:

```text
SEO Title
Meta Description
Canonical
OG Image
Index / Noindex
Follow / Nofollow
H1
Intro
FAQ
Schema-specific fields
Last Reviewed
Author
Related Pages
```

Do not let non-technical users freely create thousands of indexable URLs.

---

# 110. SEO Governance

Assign one person to own:

```text
Technical SEO
Content
Google Business Profile
Reviews
Analytics
Search Console
Link building
```

Use a content approval process.

No page should be published merely because it contains keywords.

---

# 111. Monthly SEO Workflow

```text
Week 1
Technical audit
Search Console review
Index coverage review

Week 2
Content updates
New destination/guide content

Week 3
Internal linking
Digital PR
Partnership outreach

Week 4
CTR optimization
Conversion optimization
Performance report
```

---

# 112. Success Expectations

SEO is compounding.

A realistic sequence is:

```text
Technical foundation
        ↓
Indexation
        ↓
Long-tail rankings
        ↓
Destination authority
        ↓
Commercial rankings
        ↓
Local visibility
        ↓
Brand visibility
        ↓
AI/search citations
        ↓
Qualified leads
```

Do not judge the strategy solely by rankings during the first few weeks.

Track:

- indexed pages
- impressions
- queries
- clicks
- leads
- rankings
- reviews
- backlinks
- brand searches

---

# 113. Final Priority List

If development time is limited, implement these first:

## #1 — Server-render SEO content

Move package/destination content out of client-only fetching.

## #2 — Create individual package URLs

Do not keep all commercial content behind modals.

## #3 — Build destination landing pages

Meghalaya, Tawang/Arunachal, Assam and key destinations.

## #4 — Build strong internal linking

Homepage → destination → package → guide.

## #5 — Technical SEO

Sitemap, robots, canonical, metadata, indexability.

## #6 — Google Business Profile

Complete, verify, review and maintain it.

## #7 — Original travel guides

Create genuinely useful destination and itinerary content.

## #8 — Performance

Optimize the video-heavy homepage and image assets.

## #9 — Reviews and real-world trust

Collect genuine traveler feedback.

## #10 — Authority

Earn relevant local/travel backlinks and mentions.

---

# 114. Definition of Done

The SEO implementation is considered complete only when:

```text
✓ Important pages are crawlable
✓ Important content exists in server-rendered HTML
✓ Every commercial package has a URL
✓ Every important destination has a landing page
✓ Every page has unique metadata
✓ Canonicals are correct
✓ Sitemap is automated
✓ Robots is correct
✓ Internal linking is intentional
✓ Images are optimized
✓ Hero videos are performance-safe
✓ Schema is valid and truthful
✓ Google Search Console is configured
✓ Analytics conversion events are configured
✓ Google Business Profile is complete
✓ NAP is consistent
✓ Genuine reviews are being collected
✓ Content clusters are published
✓ Travel guides link to packages
✓ Packages link to guides
✓ No major keyword cannibalization exists
✓ No thin doorway pages exist
✓ No fake reviews/schema/backlinks are used
✓ Monthly SEO monitoring is active
```

---

# 115. Source / Policy Basis

This plan follows current Google Search guidance for:

- crawling and indexing
- JavaScript SEO
- canonicalization
- sitemaps
- structured data
- local business visibility
- review markup
- generative AI search optimization

Use the official Google Search Central and Google Business Profile documentation as the source of truth when Google changes its systems.

Key principles:

1. Search engines need crawlable, indexable content.
2. Server-rendered content is preferred for important content on JavaScript-heavy sites.
3. Canonical URLs should represent the preferred version of content.
4. Sitemaps should contain canonical URLs intended for search.
5. Structured data must match visible content and must not be fabricated.
6. Local visibility depends substantially on relevance, distance and prominence.
7. Genuine reviews and accurate business information matter for local trust and visibility.
8. AI-search optimization is fundamentally built on strong SEO, useful original content, clear information architecture and accessible content.
9. There is no legitimate guarantee of a #1 position.

---

# 116. Immediate Developer Task List

Copy this section directly into the development backlog.

## Sprint 1

```text
[ ] Convert homepage SEO-critical content to Server Components
[ ] Add proper Next.js metadata
[ ] Add canonical
[ ] Add robots.ts
[ ] Add sitemap.ts
[ ] Add Open Graph
[ ] Add Organization / LocalBusiness JSON-LD where applicable
[ ] Add BreadcrumbList
[ ] Audit all index/noindex rules
[ ] Audit internal links
[ ] Fix semantic anchor links
[ ] Add image dimensions and accurate alt text
[ ] Optimize hero videos
[ ] Run PageSpeed Insights
```

## Sprint 2

```text
[ ] Create /meghalaya
[ ] Create /assam
[ ] Create /arunachal-pradesh
[ ] Create /tawang
[ ] Create destination pages
[ ] Create service pages
[ ] Create package detail pages
[ ] Generate dynamic metadata from CMS
[ ] Generate dynamic sitemap from CMS
[ ] Add package structured data only where appropriate
```

## Sprint 3

```text
[ ] Publish Meghalaya guide cluster
[ ] Publish Tawang guide cluster
[ ] Publish Assam/Kaziranga guide cluster
[ ] Add FAQs
[ ] Add contextual internal links
[ ] Add genuine traveler reviews
[ ] Add original photography
[ ] Improve About page
[ ] Improve Contact page
```

## Sprint 4

```text
[ ] Google Business Profile optimization
[ ] Bing Webmaster Tools
[ ] Local citations
[ ] Digital PR
[ ] Partnership outreach
[ ] Search Console CTR optimization
[ ] Content gap analysis
[ ] Backlink audit
[ ] Monthly reporting
```

---

# 117. Final Strategic Principle

The goal is not to make Google believe the website is the best.

The goal is to **make the website actually become one of the most useful and trustworthy resources for planning travel across Northeast India**, and then make that usefulness extremely easy for search engines and AI systems to understand.

For Borah Tour & Travels, the strongest moat is:

```text
Real Northeast India expertise
+
Detailed itineraries
+
Original destination information
+
Real traveler experiences
+
Strong local business signals
+
Excellent technical SEO
+
Fast website
+
Deep internal linking
+
Consistent business identity
+
Useful first-hand travel content
```

That combination is substantially more defensible than keyword stuffing or publishing hundreds of thin AI-generated pages.
