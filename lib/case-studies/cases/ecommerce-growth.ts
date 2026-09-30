import type { CaseStudy } from "../types";

export const ecommerceGrowth: CaseStudy = {
  slug: "ecommerce-growth-system",
  name: "E-commerce Growth System",
  industry: "E-commerce & Retail",
  title: "From paid traffic to a connected customer lifecycle.",
  thesis:
    "How NairobiX would connect acquisition, the shopping experience, order communication, retention and measurement for a growing online retailer.",
  problem:
    "An online retailer attracts traffic through social media and ads, but checkout friction, manual order updates and no retention system mean much of that attention is lost.",
  areas: ["Digital", "Growth", "Automation"],
  solutionIds: ["web-digital-solutions", "digital-marketing", "business-automation", "growth-strategy"],
  focus: "Customer lifecycle",
  image: "/images/photography/digital-payment.webp",
  imageAlt: "A customer holding out a phone to pay at a card terminal on a white counter.",
  portrait: [
    {
      kind: "storefront",
      product: "Woven storage basket · Large",
      detail: "Handwoven sisal · 45cm",
      price: "KES 3,200",
      notes: ["Nairobi delivery: next working day", "Pay by mobile money or card", "Free returns within 7 days"],
    },
    {
      kind: "chat",
      contact: "Store · Business account",
      messages: [
        { from: "business", text: "Your order is on its way. Your rider, Kevin, will call when he's 10 minutes away.", tag: "Order update · automated" },
        { from: "customer", text: "Perfect, thank you!" },
      ],
    },
    {
      kind: "report",
      title: "Customer value by first channel · layout",
      rows: [
        { label: "Search", share: 0.75 },
        { label: "Instagram", share: 0.5 },
        { label: "TikTok", share: 0.35 },
      ],
    },
  ],
  context: {
    paragraphs: [
      "Consider a Nairobi-based online retailer selling home and lifestyle products. It has an online store, an active Instagram and TikTok presence, and a WhatsApp number customers use to ask about sizes, stock and delivery. Customers pay by mobile money or card; Nairobi orders go out by rider, and orders to other towns by courier.",
      "Growth so far has come from content that people share and from paid social campaigns. Traffic is healthy. The team is busy — much of it answering the same questions, confirming orders and sending delivery updates by hand.",
      "What the business doesn't have is a view of its customers over time: who bought once and never returned, who buys every season, and which channels find the customers worth having.",
    ],
    assumptions: [
      { label: "Team", value: "6–12 people across buying, marketing, customer service and fulfilment" },
      { label: "Where customers come from", value: "Instagram, TikTok, paid social, search, word of mouth" },
      { label: "Payments", value: "Mobile money and card" },
      { label: "Current tools", value: "An online store platform, the WhatsApp Business app, spreadsheets" },
    ],
    works: [
      "Products people want and share",
      "A recognisable brand on social media",
      "A store that takes orders reliably",
      "Customer service that customers like",
    ],
    manual: [
      "Answering the same stock, sizing and delivery questions on WhatsApp",
      "Confirming orders and sending delivery updates one by one",
      "Reconciling payments against orders",
      "Remembering who the loyal customers are",
    ],
  },
  problemIntro:
    "Growth has mostly meant buying more traffic. Looked at as a system, the business pays to acquire a customer and then lets most of the relationship end at the first order.",
  problemLayers: [
    {
      layer: "Marketing",
      issue: "Campaigns are judged on clicks and platform-reported purchases.",
      effect: "Decisions rest on partial data, and on first orders rather than customers.",
    },
    {
      layer: "Experience",
      issue: "Product pages don't answer delivery, sizing and returns questions, so buyers leave to ask on WhatsApp.",
      effect: "Friction appears exactly at the moment of intent.",
    },
    {
      layer: "Checkout",
      issue: "Checkout is longer than it needs to be on a phone, and abandoned checkouts receive nothing, or a generic email.",
      effect: "Demand that reached the till is lost.",
    },
    {
      layer: "Communication",
      issue: "Order confirmations and delivery updates are sent by hand.",
      effect: "An inconsistent experience and a heavy daily workload.",
    },
    {
      layer: "Retention",
      issue: "Customer information is split between the store, WhatsApp and a spreadsheet.",
      effect: "Repeat purchases depend on customers remembering the brand.",
    },
    {
      layer: "Measurement",
      issue: "There is no view of customer value over time.",
      effect: "The business cannot tell which channels find valuable customers.",
    },
  ],
  opportunity: {
    statement:
      "The opportunity is to treat the first order as the beginning of a relationship — and to measure the business by customers, not just transactions.",
    paragraphs: [
      "Acquisition is the most expensive part of a retail business's growth, and it is the part the business controls least. Every improvement after acquisition — a clearer product page, a shorter checkout, a reliable delivery update, a well-timed second purchase — makes every shilling of marketing worth more.",
      "The design therefore works backwards from the customer's second order: what would have to be true for a first-time buyer to come back without being paid to?",
    ],
    focus: ["Attention", "Convert", "Deliver", "Retain", "Measure"],
  },
  system: {
    intro:
      "The proposed architecture has eight layers, following the customer from first impression to repeat purchase, with measurement closing the loop. Select a layer to explore it.",
    layers: [
      {
        id: "acquisition",
        name: "Acquisition",
        what: "Social content, paid campaigns and search, with tagged links and purchase tracking set up correctly.",
        why: "Channel decisions need to be based on customers acquired, not on clicks.",
        carries: "Source and campaign for every visit and order.",
        next: "Visitors land on product pages built to answer their questions.",
      },
      {
        id: "product",
        name: "Product experience",
        what: "Product pages that answer delivery time, sizing, materials and returns up front, with a WhatsApp link that carries the product.",
        why: "Every question a page answers is one fewer reason to leave it.",
        carries: "Product viewed, and questions asked.",
        next: "The shopper adds to cart and checks out.",
      },
      {
        id: "checkout",
        name: "Checkout",
        what: "A short, mobile-first checkout with mobile money and card, and delivery options stated clearly.",
        why: "Most shoppers are on phones; every extra step is a chance to abandon.",
        carries: "Order, payment status and delivery details.",
        next: "Order communication begins; abandoned checkouts enter recovery.",
      },
      {
        id: "communication",
        name: "Order communication",
        what: "Automated confirmation, dispatch and delivery updates, on the channel the customer chose.",
        why: "Reliable updates reduce “where is my order?” messages and build trust for the next purchase.",
        carries: "Order status and delivery events.",
        next: "Delivered orders move into post-purchase care.",
      },
      {
        id: "customer",
        name: "Customer record",
        what: "One profile per customer: orders, first channel, preferences and messaging consent.",
        why: "Retention is impossible if the business doesn't know who its customers are.",
        carries: "Purchase history, value and consent status.",
        next: "Segments feed retention.",
      },
      {
        id: "retention",
        name: "Retention",
        what: "Post-purchase care, reminders for replenishable products and occasional consented offers, sent to relevant segments.",
        why: "A second order from an existing customer usually costs less to win than a first order from someone new.",
        carries: "Segment, message and response.",
        next: "Returning customers re-enter the purchase path.",
      },
      {
        id: "service",
        name: "Service",
        what: "WhatsApp support with the customer's order history visible to whoever replies.",
        why: "Good service is part of retention — and it is faster when context is on screen.",
        carries: "Conversations, issues and resolutions.",
        next: "Issue patterns inform product pages and operations.",
      },
      {
        id: "measurement",
        name: "Measurement",
        what: "Repeat purchase rate, customer value by first channel and cohort views over time.",
        why: "It shows what a customer is actually worth, and which channels find the valuable ones.",
        carries: "Everything above, over time.",
        next: "Budget moves toward the channels that produce lasting customers.",
      },
    ],
  },
  beforeAfter: {
    before: [
      "Store admin",
      "Instagram direct messages",
      "WhatsApp on one phone",
      "Payment statements",
      "Rider calls and courier slips",
      "A spreadsheet of “good customers”",
    ],
    beforeNote: "Each tool holds a fragment of the customer. None holds the relationship.",
    after: ["Acquisition", "Product experience", "Checkout", "Order updates", "Customer record", "Retention", "Service", "Measurement"],
    afterNote: "A lifecycle, not a transaction — measured end to end.",
  },
  journey: [
    {
      stage: "Discover",
      customer: "A customer sees a woven basket in an Instagram video and taps through.",
      business: "The tagged link records the campaign that brought her.",
    },
    {
      stage: "Explore",
      customer: "The product page tells her the size, the material, when it would arrive and how returns work.",
      business: "The questions that used to arrive on WhatsApp are answered on the page.",
      fragment: {
        kind: "storefront",
        product: "Woven storage basket · Large",
        detail: "Handwoven sisal · 45cm × 40cm",
        price: "KES 3,200",
        notes: ["Nairobi delivery: next working day", "Pay by mobile money or card", "Free returns within 7 days"],
      },
    },
    {
      stage: "Ask",
      customer: "She wants to know if it comes in natural colour, and taps the WhatsApp button on the page.",
      business: "The message arrives with the product named, and whoever replies can see it.",
    },
    {
      stage: "Buy",
      customer: "Checkout takes a minute on her phone. She pays by mobile money.",
      business: "The order and payment are recorded against her customer profile.",
    },
    {
      stage: "Receive",
      customer: "She gets a confirmation, a dispatch message and a note from the rider before arrival.",
      business: "Each update is triggered by the order's status — nobody types them.",
      fragment: {
        kind: "chat",
        contact: "Store · Business account",
        messages: [
          { from: "business", text: "Order confirmed — thank you! We'll message you when it's dispatched.", tag: "Automated" },
          { from: "business", text: "Your order is on its way. Kevin will call when he's 10 minutes away.", tag: "Automated" },
        ],
      },
    },
    {
      stage: "Care",
      customer: "A week later: a short note on caring for sisal, and an easy way to report any problem.",
      business: "Post-purchase care goes to delivered orders in this category.",
    },
    {
      stage: "Return",
      customer: "Two months later, a new collection she'd like — sent because she opted in and bought from that range.",
      business: "A consented, relevant message to a small segment — not a blast to everyone.",
      fragment: {
        kind: "record",
        title: "Customer · Njeri W.",
        stage: "Returning",
        rows: [
          ["First channel", "Instagram · spring campaign"],
          ["Orders", "2 · home & storage"],
          ["Messaging consent", "Yes · WhatsApp"],
          ["Segment", "Home — seasonal"],
        ],
      },
    },
    {
      stage: "Service",
      customer: "When a delivery runs late, she gets an honest update before she has to ask.",
      business: "Delivery exceptions create a task for the service team, with the order on screen.",
    },
    {
      stage: "Measure",
      customer: "She has become a repeat customer.",
      business: "Reporting shows customer value by first channel — and the Instagram campaign that found her looks different now.",
      fragment: {
        kind: "report",
        title: "Repeat customers by first channel · layout",
        rows: [
          { label: "Search", share: 0.7 },
          { label: "Instagram", share: 0.55 },
          { label: "Paid social", share: 0.3 },
        ],
      },
    },
  ],
  technology: {
    intro:
      "The store platform, the ad accounts and WhatsApp are already in place in a business like this. The work is configuring them properly and connecting them around the customer record.",
    items: [
      {
        keys: ["shopify"],
        name: "Shopify",
        capability: "Commerce platform",
        role: "Store, checkout, orders and the core customer record.",
        reason: "A mature commerce platform with the checkout, customer and order data the rest of the system builds on.",
        layer: "Product · Checkout · Customer record",
      },
      {
        keys: ["meta"],
        name: "Meta — Instagram & Facebook",
        capability: "Social acquisition",
        role: "Content, paid campaigns and purchase signals sent back to the ad platform.",
        reason: "Where much of the demand starts; accurate purchase signals let campaigns optimise for buyers.",
        layer: "Acquisition · Measurement",
      },
      {
        keys: ["google"],
        name: "Google Analytics & Search",
        capability: "Analytics & search",
        role: "Site behaviour, funnel drop-off and search campaigns for high-intent products.",
        reason: "Shows where shoppers abandon the path, independently of any single ad platform.",
        layer: "Acquisition · Measurement",
      },
      {
        keys: ["whatsapp"],
        name: "WhatsApp Business Platform",
        capability: "Messaging",
        role: "Order updates as utility templates, service conversations and consented marketing messages.",
        reason: "Customers prefer it; connected to the store, updates can run from order status.",
        layer: "Communication · Service · Retention",
      },
      {
        keys: ["figma"],
        name: "Figma",
        capability: "Design",
        role: "Designing the product page and mobile checkout improvements before they reach the store.",
        reason: "Changes to the buying path can be tested with the team before customers see them.",
        layer: "Product experience · Checkout",
      },
    ],
  },
  automation: {
    intro:
      "Retail automation is mostly about status: when an order, a checkout or a delivery changes state, the right message or task follows. People handle the exceptions.",
    workflows: [
      {
        name: "Order to delivery",
        steps: [
          { kind: "Trigger", text: "An order is paid." },
          { kind: "Rule", text: "Payment is confirmed and the delivery address is complete; if not, flag for the service team." },
          { kind: "Action", text: "Send an order confirmation and create a fulfilment task." },
          { kind: "Notification", text: "The fulfilment team sees the order in its queue." },
          { kind: "Follow-up", text: "Send dispatch and delivery updates as the order status changes." },
          { kind: "Human", text: "The team resolves stock, address and delivery exceptions." },
          { kind: "Measure", text: "Track order-to-dispatch time and delivery exceptions." },
        ],
      },
      {
        name: "Abandoned checkout",
        steps: [
          { kind: "Trigger", text: "A checkout is started but not completed within an hour." },
          { kind: "Rule", text: "The customer has consented to messages and hasn't purchased since." },
          { kind: "Action", text: "Send one reminder with a link back to the cart, by email or an approved WhatsApp template." },
          { kind: "Notification", text: "Carts above a set value are flagged to the service team." },
          { kind: "Follow-up", text: "No further reminders unless the customer responds." },
          { kind: "Human", text: "For flagged carts, a person offers help — sizing, delivery, payment." },
          { kind: "Measure", text: "Track recovered checkouts, and opt-outs, so reminders never become spam." },
        ],
      },
    ],
  },
  outcomes: [
    { title: "Fewer questions at the moment of intent", text: "Product pages answer what shoppers need to know to buy." },
    { title: "Recovered demand", text: "Abandoned checkouts receive a single, useful reminder — and high-value ones a human offer of help." },
    { title: "Reliable order communication", text: "Every customer receives the same confirmation and delivery updates, without manual typing." },
    { title: "One view of the customer", text: "Orders, channel, preferences and consent in one record." },
    { title: "Repeat purchases by design", text: "Retention runs as a system, not as a memory." },
    { title: "Channel decisions on customer value", text: "Budget can follow the channels that find lasting customers." },
    { title: "Time back for the team", text: "Less routine messaging, more time for product, content and service." },
    { title: "Respectful marketing", text: "Consent is recorded and honoured, so messages stay welcome." },
  ],
  measurement: [
    {
      group: "Acquisition",
      metrics: [
        { name: "Sessions and orders by source", definition: "Where first orders come from." },
        { name: "Cost per first order", definition: "For paid channels." },
      ],
    },
    {
      group: "Conversion",
      metrics: [
        { name: "Product view → add to cart", definition: "By product and source." },
        { name: "Checkout → paid", definition: "And where in checkout shoppers leave." },
        { name: "Checkout recovery", definition: "Share of abandoned checkouts recovered." },
      ],
    },
    {
      group: "Operations",
      metrics: [
        { name: "Order-to-dispatch time", definition: "From payment to handover to rider or courier." },
        { name: "Delivery exceptions", definition: "Late, failed or damaged deliveries." },
        { name: "Service response time", definition: "For WhatsApp questions and issues." },
      ],
    },
    {
      group: "Customer",
      metrics: [
        { name: "Repeat purchase rate", definition: "Customers who buy again within a set period, such as 90 days." },
        { name: "Customer value by first channel", definition: "What customers found by each channel spend over time." },
        { name: "Returns and reasons", definition: "What product pages or operations should fix." },
      ],
    },
    {
      group: "System",
      metrics: [
        { name: "Message delivery and opt-outs", definition: "Template failures and unsubscribe rates." },
        { name: "Consent coverage", definition: "Customers with a recorded messaging preference." },
      ],
    },
  ],
  human: {
    intro:
      "A retail brand lives in its taste, its voice and how it treats people when something goes wrong. The system takes the routine off the team so those things get more attention, not less.",
    image: "/images/photography/pexels-darlene-alderson-7971343.jpg",
    imageAlt: "A person working at a laptop by a window, beside a large leafy plant.",
    assists: [
      { system: "Automation", does: "sends confirmations, updates and reminders when order status changes." },
      { system: "The customer record", does: "puts history and preferences in front of whoever replies." },
      { system: "Measurement", does: "shows which channels and products build lasting customers." },
    ],
    decisions: [
      "Which products to buy, and which to promote",
      "How to handle a delayed or damaged delivery",
      "When a refund or an exception is the right call",
      "The brand's voice in every template",
      "When a customer needs a person, not a message",
    ],
  },
  build: [
    { component: "Strategy", text: "The customer lifecycle map and a measurement plan built around repeat customers." },
    { component: "Digital", text: "Product page and mobile checkout improvements that answer questions before they're asked." },
    { component: "CRM", text: "One customer record with consent, segments and purchase history." },
    { component: "Automation", text: "Order communication, checkout recovery and post-purchase care." },
    { component: "Analytics", text: "Purchase tracking per channel, cohorts and customer value over time." },
    { component: "AI — later", text: "Answering common product questions from the catalogue, with a clear handover to the team.", later: true },
  ],
  lesson:
    "In this scenario, the retailer doesn't need more traffic first. It needs the traffic it already buys to turn into customers who come back.",
  insights: ["your-website-is-not-a-brochure", "marketing-sales-crm-one-system", "what-to-automate-first"],
};
