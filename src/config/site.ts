/**
 * Every word on the page lives here. Edit this file to make the template yours.
 *
 * The product below ("Signalpost") is a made-up example so the page reads like a
 * real one. Replace the name, copy, prices and links with your own.
 */

export type IconName = "pulse" | "merge" | "bell" | "lock" | "clock" | "plug";

export type Feature = {
  title: string;
  body: string;
  icon: IconName;
};

/** One screen of the pinned product story. Shown while its step is in view. */
export type StoryScreen = {
  title: string;
  status: string;
  lines: string[];
};

export type TourTab = {
  /** Short, lowercase, no spaces. Used for the tab ids. */
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  preview: { caption: string; rows: { label: string; value: string }[] };
};

export type Tier = {
  name: string;
  /** Price per month when billed monthly. Use 0 for a free tier. */
  monthly: number;
  /** Price per month when billed yearly. */
  yearly: number;
  summary: string;
  features: string[];
  cta: string;
  /** The tier you want most people to pick. Only one should be true. */
  highlighted?: boolean;
};

export const site = {
  name: "Signalpost",
  /** Used in the browser tab, search results and social cards. */
  title: "Signalpost: weekly updates written from the work you already did",
  tagline: "Status updates your team actually reads.",
  description:
    "Signalpost turns commits, tickets and calendar time into a short weekly update for your team and your boss. Review it, edit a line, send it.",
  /** Your production address, no trailing slash. Used for the sitemap, robots and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  contactEmail: "hello@example.com",

  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Tour", href: "#tour" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    headline: ["Your week,", "already written."],
    subhead:
      "Signalpost reads the work you shipped and drafts a five line update. You check it in a minute and send it before standup.",
    primaryCta: "Join the waitlist",
    secondaryCta: { label: "See how it works", href: "#how" },
    note: "Free while in beta. No card needed.",
  },

  logos: {
    caption: "Placeholder logos. Swap in the teams that use your product. The row pauses when you hover or focus it.",
    names: ["Logo one", "Logo two", "Logo three", "Logo four", "Logo five", "Logo six"],
  },

  features: {
    heading: "Less writing about work. More work.",
    intro:
      "Every feature exists to get a clear update out the door with less effort than a status meeting.",
    items: [
      {
        title: "Drafts from real activity",
        body: "Connect your repo and tracker. Signalpost groups what changed and writes it in plain sentences.",
        icon: "pulse",
      },
      {
        title: "One update per team",
        body: "Individual notes roll up into one team summary, so managers read one page instead of twelve.",
        icon: "merge",
      },
      {
        title: "Nudges, not nagging",
        body: "A single reminder on the day you choose. If your draft is ready, it says so. If not, it stays quiet.",
        icon: "bell",
      },
      {
        title: "Private by default",
        body: "Drafts are visible only to you until you send them. Nothing is shared without a click.",
        icon: "lock",
      },
      {
        title: "Two minute reviews",
        body: "Each line links back to its source. Keep it, edit it, or drop it with one key.",
        icon: "clock",
      },
      {
        title: "Sends where people read",
        body: "Post to email, Slack or a shared page. Pick per team, change it any time.",
        icon: "plug",
      },
    ] satisfies Feature[],
  },

  how: {
    heading: "From scattered work to a sent update",
    intro: "Scroll through one week. The screen on the left follows along.",
    steps: [
      {
        title: "Connect your tools",
        body: "Sign in with your repo host and tracker. Read only access, revocable at any time.",
        screen: {
          title: "Connections",
          status: "2 of 2 connected",
          lines: ["Code host: read only", "Issue tracker: read only", "Calendar: optional, off"],
        },
      },
      {
        title: "Get a draft on Friday",
        body: "Signalpost writes five lines from your week and flags anything it was unsure about.",
        screen: {
          title: "Draft for Friday",
          status: "Ready, 1 line to check",
          lines: [
            "Shipped the new billing page to all teams.",
            "Fixed the export bug three customers reported.",
            "Check: was the search spike resolved?",
          ],
        },
      },
      {
        title: "Review and send",
        body: "Fix a word, add context, press send. Your team gets one tidy update.",
        screen: {
          title: "Sent to Team Atlas",
          status: "Delivered to email and chat",
          lines: ["5 lines, 2 links to tickets", "Read by 7 people", "Next draft: Friday at 9:00"],
        },
      },
    ] satisfies { title: string; body: string; screen: StoryScreen }[],
  },

  tour: {
    heading: "A closer look",
    intro: "Pick a part of the product. Use the arrow keys to move between tabs.",
    tabs: [
      {
        id: "drafts",
        label: "Drafts",
        title: "Drafts that cite their sources",
        body: "Every line in a draft links back to the commit, ticket or meeting it came from, so reviewers can check it in one click.",
        points: ["Grouped by project", "Unsure lines are flagged", "Edit in place"],
        preview: {
          caption: "Draft, week 42",
          rows: [
            { label: "Billing page shipped", value: "3 commits" },
            { label: "Export bug fixed", value: "1 ticket" },
            { label: "Search spike", value: "Check" },
          ],
        },
      },
      {
        id: "rollups",
        label: "Roll ups",
        title: "One page for the whole team",
        body: "Individual drafts roll up into a single team summary. Managers read one page instead of twelve.",
        points: ["Per team and cross team", "Highlights first", "Links to each person's notes"],
        preview: {
          caption: "Team Atlas, week 42",
          rows: [
            { label: "Updates in", value: "6 of 7" },
            { label: "Shipped", value: "4 items" },
            { label: "Blocked", value: "1 item" },
          ],
        },
      },
      {
        id: "delivery",
        label: "Delivery",
        title: "Sends where people already read",
        body: "Post to email, a chat channel or a shared page. Choose per team and change it whenever you like.",
        points: ["Email, chat or a page", "Quiet hours respected", "Read receipts, opt in"],
        preview: {
          caption: "Delivery settings",
          rows: [
            { label: "Email", value: "On" },
            { label: "Chat channel", value: "#atlas" },
            { label: "Shared page", value: "Off" },
          ],
        },
      },
    ] satisfies TourTab[],
  },

  pricing: {
    heading: "Simple pricing that grows with your team",
    intro: "Prices are per workspace. Change or cancel whenever you like.",
    yearlyNote: "Save about 20 percent",
    currency: "$",
    tiers: [
      {
        name: "Solo",
        monthly: 0,
        yearly: 0,
        summary: "For one person keeping their own record.",
        features: ["Weekly drafts", "Two connected tools", "Email delivery"],
        cta: "Start free",
      },
      {
        name: "Team",
        monthly: 24,
        yearly: 19,
        summary: "For teams that want one update instead of a meeting.",
        features: [
          "Everything in Solo",
          "Team roll up summaries",
          "Slack and shared page delivery",
          "Unlimited connected tools",
        ],
        cta: "Join the waitlist",
        highlighted: true,
      },
      {
        name: "Company",
        monthly: 89,
        yearly: 72,
        summary: "For several teams and the people who read all of them.",
        features: [
          "Everything in Team",
          "Cross team digest",
          "Single sign on",
          "Priority support",
        ],
        cta: "Talk to us",
      },
    ] satisfies Tier[],
  },

  testimonials: {
    heading: "What early users say",
    /** Short lines for the moving quote row. Replace with real, permitted quotes. */
    marquee: [
      "Placeholder: standup got shorter.",
      "Placeholder: I finally read the team update.",
      "Placeholder: the links back to tickets save me an hour.",
      "Placeholder: setup took five minutes.",
      "Placeholder: no more Sunday night status writing.",
      "Placeholder: our manager stopped asking for reports.",
    ],
    disclaimer: "Placeholder quotes. Replace them with real, permitted quotes before you launch.",
    items: [
      {
        quote:
          "Placeholder: our Friday status meeting became a two minute read. Replace this with a real customer quote.",
        name: "Customer name",
        role: "Role, Company",
      },
      {
        quote: "Placeholder: I stopped writing updates from memory on Sunday night.",
        name: "Customer name",
        role: "Role, Company",
      },
      {
        quote: "Placeholder: the links back to each ticket are what sold our managers.",
        name: "Customer name",
        role: "Role, Company",
      },
    ],
  },

  faq: {
    heading: "Questions, answered",
    items: [
      {
        q: "Is it really free during the beta?",
        a: "Yes. Everyone on the waitlist gets full access to the Team plan while we are in beta, and we will tell you well before anything changes.",
      },
      {
        q: "What does Signalpost read?",
        a: "Only the tools you connect, with read only access. It reads titles, status changes and commit messages, not your private messages.",
      },
      {
        q: "Can I edit the draft before it goes out?",
        a: "Always. Nothing is sent without you pressing send, and every line can be edited or removed.",
      },
      {
        q: "Do you train models on my data?",
        a: "No. Your data is used only to write your drafts and is deleted when you disconnect a tool.",
      },
      {
        q: "How do I cancel?",
        a: "From the billing page, in one click. Your account stays active until the end of the period you paid for.",
      },
    ],
  },

  finalCta: {
    heading: "Get your Friday back.",
    body: "Join the waitlist and we will send you an invite as soon as a spot opens.",
  },

  waitlist: {
    emailLabel: "Work email",
    placeholder: "you@company.com",
    button: "Join the waitlist",
    busy: "Adding you",
    success: "You are on the list. We will email you when your invite is ready.",
    duplicate: "You are already on the list. We will be in touch.",
    errorGeneric: "Something went wrong on our side. Please try again in a minute.",
  },

  footer: {
    blurb: "Weekly updates written from the work you already did.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Contact", href: "mailto:hello@example.com" },
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
    credit: { label: "Built from Leo's starter by Replore", href: "https://replore.cardzo.co.in" },
  },
};

export type Site = typeof site;
