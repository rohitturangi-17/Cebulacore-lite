import {
  ArchitectureBlueprint,
  BudgetRange,
  BusinessType,
  CostMonthPoint,
  DashboardActivity,
  ProviderPlan,
  RecommendationResult,
  SavedArchitecture,
  WizardData,
} from "@/types";

export const businessTypeLabels: Record<BusinessType, string> = {
  ecommerce: "E-commerce",
  saas: "SaaS Platform",
  healthcare: "Healthcare",
  fintech: "FinTech",
  media: "Media & Streaming",
  other: "Other",
};

export const budgetLabels: Record<BudgetRange, string> = {
  "under-1k": "Under $1,000 / mo",
  "1k-5k": "$1,000 – $5,000 / mo",
  "5k-20k": "$5,000 – $20,000 / mo",
  "20k-plus": "$20,000+ / mo",
};

/* ----------------------------- Architecture blueprints ----------------------------- */

export const architectureBlueprints: Record<BusinessType, ArchitectureBlueprint> = {
  ecommerce: {
    id: "bp-ecommerce",
    name: "E-commerce storefront",
    description: "Auto-scaling storefront with managed checkout, search, and CDN edge caching.",
    nodes: [
      { id: "cdn", label: "CDN / Edge Cache", category: "network", x: 80, y: 80 },
      { id: "lb", label: "Load Balancer", category: "network", x: 80, y: 200 },
      { id: "web", label: "Web Frontend (ECS)", category: "compute", x: 280, y: 200 },
      { id: "api", label: "Checkout API (Lambda)", category: "compute", x: 480, y: 140 },
      { id: "search", label: "Search Service", category: "compute", x: 480, y: 260 },
      { id: "db", label: "Orders DB (RDS)", category: "data", x: 680, y: 140 },
      { id: "cache", label: "Session Cache (Redis)", category: "data", x: 680, y: 260 },
      { id: "queue", label: "Order Events Queue", category: "integration", x: 880, y: 200 },
    ],
    edges: [
      { from: "cdn", to: "lb" },
      { from: "lb", to: "web" },
      { from: "web", to: "api" },
      { from: "web", to: "search" },
      { from: "api", to: "db" },
      { from: "api", to: "cache" },
      { from: "api", to: "queue" },
    ],
  },
  saas: {
    id: "bp-saas",
    name: "Multi-tenant SaaS backend",
    description: "Containerized API with tenant isolation, async workers, and managed Postgres.",
    nodes: [
      { id: "gw", label: "API Gateway", category: "network", x: 80, y: 180 },
      { id: "auth", label: "Auth Service", category: "compute", x: 280, y: 80 },
      { id: "core", label: "Core API (Kubernetes)", category: "compute", x: 280, y: 220 },
      { id: "worker", label: "Background Workers", category: "compute", x: 480, y: 320 },
      { id: "db", label: "Postgres (Multi-AZ)", category: "data", x: 480, y: 180 },
      { id: "blob", label: "Object Storage", category: "data", x: 680, y: 100 },
      { id: "metrics", label: "Observability Stack", category: "integration", x: 680, y: 260 },
    ],
    edges: [
      { from: "gw", to: "auth" },
      { from: "gw", to: "core" },
      { from: "core", to: "db" },
      { from: "core", to: "worker" },
      { from: "core", to: "blob" },
      { from: "worker", to: "metrics" },
    ],
  },
  healthcare: {
    id: "bp-healthcare",
    name: "HIPAA-aligned patient platform",
    description: "Encrypted, segmented architecture with audit logging and private connectivity.",
    nodes: [
      { id: "waf", label: "WAF / Private VPN", category: "network", x: 80, y: 150 },
      { id: "portal", label: "Patient Portal", category: "compute", x: 280, y: 80 },
      { id: "fhir", label: "FHIR API Service", category: "compute", x: 280, y: 240 },
      { id: "records", label: "Encrypted Records DB", category: "data", x: 480, y: 240 },
      { id: "audit", label: "Audit Log Store", category: "data", x: 480, y: 360 },
      { id: "kms", label: "Key Management", category: "security", x: 680, y: 300 },
      { id: "backup", label: "Cross-Region Backup", category: "data", x: 680, y: 150 },
    ],
    edges: [
      { from: "waf", to: "portal" },
      { from: "waf", to: "fhir" },
      { from: "fhir", to: "records" },
      { from: "fhir", to: "audit" },
      { from: "records", to: "kms" },
      { from: "records", to: "backup" },
    ],
  },
  fintech: {
    id: "bp-fintech",
    name: "Real-time payments platform",
    description: "Event-driven ledger with fraud scoring and strict consistency guarantees.",
    nodes: [
      { id: "edge", label: "API Edge / Rate Limiter", category: "network", x: 80, y: 180 },
      { id: "txn", label: "Transaction Service", category: "compute", x: 280, y: 100 },
      { id: "fraud", label: "Fraud Scoring (ML)", category: "compute", x: 280, y: 260 },
      { id: "ledger", label: "Ledger DB (Strong Consistency)", category: "data", x: 480, y: 100 },
      { id: "stream", label: "Event Stream", category: "integration", x: 480, y: 260 },
      { id: "vault", label: "Secrets Vault", category: "security", x: 680, y: 180 },
      { id: "reporting", label: "Reporting Warehouse", category: "data", x: 880, y: 180 },
    ],
    edges: [
      { from: "edge", to: "txn" },
      { from: "txn", to: "ledger" },
      { from: "txn", to: "fraud" },
      { from: "fraud", to: "stream" },
      { from: "ledger", to: "vault" },
      { from: "stream", to: "reporting" },
    ],
  },
  media: {
    id: "bp-media",
    name: "Streaming & content delivery",
    description: "Global CDN with adaptive bitrate transcoding and tiered storage.",
    nodes: [
      { id: "cdn", label: "Global CDN", category: "network", x: 80, y: 150 },
      { id: "api", label: "Catalog API", category: "compute", x: 280, y: 80 },
      { id: "transcode", label: "Transcoding Pipeline", category: "compute", x: 280, y: 260 },
      { id: "store", label: "Tiered Media Storage", category: "data", x: 480, y: 260 },
      { id: "db", label: "Metadata DB", category: "data", x: 480, y: 80 },
      { id: "analytics", label: "Viewer Analytics", category: "integration", x: 680, y: 170 },
    ],
    edges: [
      { from: "cdn", to: "api" },
      { from: "api", to: "db" },
      { from: "cdn", to: "transcode" },
      { from: "transcode", to: "store" },
      { from: "api", to: "analytics" },
    ],
  },
  other: {
    id: "bp-other",
    name: "General-purpose web platform",
    description: "Flexible baseline architecture suited to most early-stage products.",
    nodes: [
      { id: "lb", label: "Load Balancer", category: "network", x: 100, y: 160 },
      { id: "app", label: "App Service", category: "compute", x: 320, y: 160 },
      { id: "db", label: "Managed Database", category: "data", x: 540, y: 100 },
      { id: "cache", label: "Cache Layer", category: "data", x: 540, y: 220 },
    ],
    edges: [
      { from: "lb", to: "app" },
      { from: "app", to: "db" },
      { from: "app", to: "cache" },
    ],
  },
};

/* ----------------------------- Recommendation engine (mock) ----------------------------- */

const serviceCatalog: Record<BusinessType, Record<"AWS" | "Azure" | "GCP", ProviderPlan>> = {
  ecommerce: {
    AWS: {
      provider: "AWS",
      monthlyCost: 2840,
      fitScore: 92,
      services: [
        { name: "CloudFront", category: "Network", purpose: "Global edge caching for storefront assets" },
        { name: "ECS Fargate", category: "Compute", purpose: "Auto-scaling containerized storefront" },
        { name: "Aurora PostgreSQL", category: "Data", purpose: "Orders and inventory data" },
        { name: "ElastiCache", category: "Data", purpose: "Cart and session caching" },
        { name: "SQS", category: "Integration", purpose: "Order event processing" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 3010,
      fitScore: 85,
      services: [
        { name: "Azure Front Door", category: "Network", purpose: "Global routing and edge cache" },
        { name: "App Service", category: "Compute", purpose: "Storefront hosting" },
        { name: "Azure SQL Database", category: "Data", purpose: "Orders and inventory data" },
        { name: "Azure Cache for Redis", category: "Data", purpose: "Cart and session caching" },
        { name: "Service Bus", category: "Integration", purpose: "Order event processing" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 2705,
      fitScore: 88,
      services: [
        { name: "Cloud CDN", category: "Network", purpose: "Global edge caching for storefront assets" },
        { name: "Cloud Run", category: "Compute", purpose: "Auto-scaling containerized storefront" },
        { name: "Cloud SQL", category: "Data", purpose: "Orders and inventory data" },
        { name: "Memorystore", category: "Data", purpose: "Cart and session caching" },
        { name: "Pub/Sub", category: "Integration", purpose: "Order event processing" },
      ],
    },
  },
  saas: {
    AWS: {
      provider: "AWS",
      monthlyCost: 4120,
      fitScore: 90,
      services: [
        { name: "EKS", category: "Compute", purpose: "Multi-tenant container orchestration" },
        { name: "RDS PostgreSQL (Multi-AZ)", category: "Data", purpose: "Primary tenant data store" },
        { name: "S3", category: "Data", purpose: "File and export storage" },
        { name: "API Gateway", category: "Network", purpose: "Tenant-aware request routing" },
        { name: "CloudWatch", category: "Integration", purpose: "Metrics, logs, and alerting" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 3960,
      fitScore: 89,
      services: [
        { name: "AKS", category: "Compute", purpose: "Multi-tenant container orchestration" },
        { name: "Azure Database for PostgreSQL", category: "Data", purpose: "Primary tenant data store" },
        { name: "Blob Storage", category: "Data", purpose: "File and export storage" },
        { name: "API Management", category: "Network", purpose: "Tenant-aware request routing" },
        { name: "Azure Monitor", category: "Integration", purpose: "Metrics, logs, and alerting" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 3845,
      fitScore: 86,
      services: [
        { name: "GKE Autopilot", category: "Compute", purpose: "Multi-tenant container orchestration" },
        { name: "Cloud SQL for PostgreSQL", category: "Data", purpose: "Primary tenant data store" },
        { name: "Cloud Storage", category: "Data", purpose: "File and export storage" },
        { name: "Apigee", category: "Network", purpose: "Tenant-aware request routing" },
        { name: "Cloud Operations Suite", category: "Integration", purpose: "Metrics, logs, and alerting" },
      ],
    },
  },
  healthcare: {
    AWS: {
      provider: "AWS",
      monthlyCost: 5680,
      fitScore: 94,
      services: [
        { name: "PrivateLink + VPN", category: "Network", purpose: "Private, auditable connectivity" },
        { name: "ECS on Fargate", category: "Compute", purpose: "FHIR API hosting" },
        { name: "RDS (encrypted, Multi-AZ)", category: "Data", purpose: "Patient records storage" },
        { name: "KMS", category: "Security", purpose: "Key management for encryption at rest" },
        { name: "CloudTrail", category: "Integration", purpose: "Immutable audit logging" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 5510,
      fitScore: 93,
      services: [
        { name: "Azure Private Link", category: "Network", purpose: "Private, auditable connectivity" },
        { name: "Azure Health Data Services", category: "Compute", purpose: "Native FHIR API hosting" },
        { name: "Azure SQL (encrypted)", category: "Data", purpose: "Patient records storage" },
        { name: "Key Vault", category: "Security", purpose: "Key management for encryption at rest" },
        { name: "Azure Monitor + Log Analytics", category: "Integration", purpose: "Immutable audit logging" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 5395,
      fitScore: 87,
      services: [
        { name: "Cloud VPN", category: "Network", purpose: "Private, auditable connectivity" },
        { name: "Cloud Run", category: "Compute", purpose: "FHIR API hosting" },
        { name: "Cloud SQL (CMEK encrypted)", category: "Data", purpose: "Patient records storage" },
        { name: "Cloud KMS", category: "Security", purpose: "Key management for encryption at rest" },
        { name: "Cloud Audit Logs", category: "Integration", purpose: "Immutable audit logging" },
      ],
    },
  },
  fintech: {
    AWS: {
      provider: "AWS",
      monthlyCost: 6240,
      fitScore: 91,
      services: [
        { name: "API Gateway + WAF", category: "Network", purpose: "Rate-limited, protected ingress" },
        { name: "Lambda", category: "Compute", purpose: "Transaction processing" },
        { name: "Aurora (strong consistency)", category: "Data", purpose: "Ledger of record" },
        { name: "Kinesis", category: "Integration", purpose: "Real-time fraud event streaming" },
        { name: "Secrets Manager", category: "Security", purpose: "Credential and key rotation" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 6105,
      fitScore: 88,
      services: [
        { name: "Front Door + WAF", category: "Network", purpose: "Rate-limited, protected ingress" },
        { name: "Azure Functions", category: "Compute", purpose: "Transaction processing" },
        { name: "Cosmos DB (strong consistency)", category: "Data", purpose: "Ledger of record" },
        { name: "Event Hubs", category: "Integration", purpose: "Real-time fraud event streaming" },
        { name: "Key Vault", category: "Security", purpose: "Credential and key rotation" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 5980,
      fitScore: 85,
      services: [
        { name: "Cloud Armor", category: "Network", purpose: "Rate-limited, protected ingress" },
        { name: "Cloud Functions", category: "Compute", purpose: "Transaction processing" },
        { name: "Cloud Spanner", category: "Data", purpose: "Ledger of record" },
        { name: "Pub/Sub", category: "Integration", purpose: "Real-time fraud event streaming" },
        { name: "Secret Manager", category: "Security", purpose: "Credential and key rotation" },
      ],
    },
  },
  media: {
    AWS: {
      provider: "AWS",
      monthlyCost: 4490,
      fitScore: 90,
      services: [
        { name: "CloudFront", category: "Network", purpose: "Global content delivery" },
        { name: "MediaConvert", category: "Compute", purpose: "Adaptive bitrate transcoding" },
        { name: "S3 (tiered storage)", category: "Data", purpose: "Master and delivery copies" },
        { name: "DynamoDB", category: "Data", purpose: "Catalog metadata" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 4365,
      fitScore: 86,
      services: [
        { name: "Azure CDN", category: "Network", purpose: "Global content delivery" },
        { name: "Media Services", category: "Compute", purpose: "Adaptive bitrate transcoding" },
        { name: "Blob Storage (tiered)", category: "Data", purpose: "Master and delivery copies" },
        { name: "Cosmos DB", category: "Data", purpose: "Catalog metadata" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 4210,
      fitScore: 89,
      services: [
        { name: "Cloud CDN", category: "Network", purpose: "Global content delivery" },
        { name: "Transcoder API", category: "Compute", purpose: "Adaptive bitrate transcoding" },
        { name: "Cloud Storage (tiered)", category: "Data", purpose: "Master and delivery copies" },
        { name: "Firestore", category: "Data", purpose: "Catalog metadata" },
      ],
    },
  },
  other: {
    AWS: {
      provider: "AWS",
      monthlyCost: 1180,
      fitScore: 84,
      services: [
        { name: "Elastic Beanstalk", category: "Compute", purpose: "Managed app hosting" },
        { name: "RDS", category: "Data", purpose: "Relational data storage" },
      ],
    },
    Azure: {
      provider: "Azure",
      monthlyCost: 1230,
      fitScore: 82,
      services: [
        { name: "App Service", category: "Compute", purpose: "Managed app hosting" },
        { name: "Azure SQL Database", category: "Data", purpose: "Relational data storage" },
      ],
    },
    GCP: {
      provider: "GCP",
      monthlyCost: 1145,
      fitScore: 83,
      services: [
        { name: "App Engine", category: "Compute", purpose: "Managed app hosting" },
        { name: "Cloud SQL", category: "Data", purpose: "Relational data storage" },
      ],
    },
  },
};

function budgetMultiplier(budget: BudgetRange | null): number {
  switch (budget) {
    case "under-1k":
      return 0.55;
    case "1k-5k":
      return 0.85;
    case "5k-20k":
      return 1.1;
    case "20k-plus":
      return 1.4;
    default:
      return 1;
  }
}

export function generateRecommendation(data: WizardData): RecommendationResult {
  const businessType = data.businessType ?? "other";
  const catalog = serviceCatalog[businessType];
  const multiplier = budgetMultiplier(data.budget);

  const scaledPlans: ProviderPlan[] = (["AWS", "Azure", "GCP"] as const).map((p) => {
    const base = catalog[p];
    let fitScore = base.fitScore;
    if (data.preferredProvider === p.toLowerCase()) fitScore = Math.min(99, fitScore + 5);
    if (data.availability === "mission-critical") fitScore = Math.min(99, fitScore + (p === "AWS" ? 2 : 0));
    return {
      ...base,
      monthlyCost: Math.round((base.monthlyCost * multiplier) / 5) * 5,
      fitScore,
    };
  });

  const ranked = [...scaledPlans].sort((a, b) => b.fitScore - a.fitScore);
  const winner = ranked[0];

  const confidenceScore = Math.min(
    98,
    70 +
      (data.businessType ? 8 : 0) +
      (data.availability ? 6 : 0) +
      (data.budget ? 6 : 0) +
      (data.preferredProvider && data.preferredProvider !== "no-preference" ? 6 : 0)
  );

  const reasoning: string[] = [
    `Business type "${businessTypeLabels[businessType]}" maps to a ${
      businessType === "healthcare" || businessType === "fintech" ? "compliance-sensitive" : "growth-oriented"
    } workload profile.`,
    `Expected load of ${data.expectedUsers.toLocaleString()} users with ${data.growthRate} growth favors managed, auto-scaling compute over self-managed clusters.`,
    data.availability === "mission-critical"
      ? "Mission-critical availability requirement pushes the design toward multi-AZ data stores and redundant network paths."
      : data.availability === "high"
      ? "High-availability requirement suggests at least multi-AZ deployment for primary data stores."
      : "Standard availability needs allow a leaner, single-region baseline to control cost.",
    `${winner.provider} scored highest on fit (${winner.fitScore}/100) for this combination of workload shape, compliance needs, and budget tier.`,
  ];

  return {
    id: `rec_${Date.now()}`,
    title: `${businessTypeLabels[businessType]} architecture on ${winner.provider}`,
    businessType,
    confidenceScore,
    recommendationScore: winner.fitScore,
    summary: `Based on your requirements, CebulaCore recommends a ${winner.provider}-first architecture with managed compute, a multi-AZ data tier, and event-driven integration — estimated at ${formatUSD(
      winner.monthlyCost
    )}/mo.`,
    reasoning,
    plans: scaledPlans,
    recommendedProvider: winner.provider,
    createdAt: new Date().toISOString(),
  };
}

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/* ----------------------------- Cost comparison series ----------------------------- */

export function generateCostSeries(base: { AWS: number; Azure: number; GCP: number }): CostMonthPoint[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let aws = base.AWS * 0.6;
  let azure = base.Azure * 0.6;
  let gcp = base.GCP * 0.6;
  return months.map((month, i) => {
    aws += base.AWS * 0.035 * (1 + i * 0.04);
    azure += base.Azure * 0.032 * (1 + i * 0.035);
    gcp += base.GCP * 0.03 * (1 + i * 0.03);
    return {
      month,
      AWS: Math.round(aws),
      Azure: Math.round(azure),
      GCP: Math.round(gcp),
    };
  });
}

/* ----------------------------- Dashboard mock data ----------------------------- */

export const recentActivity: DashboardActivity[] = [
  {
    id: "act-1",
    label: "Recommendation generated",
    detail: "SaaS Platform architecture on AWS — 92% confidence",
    timestamp: "2 hours ago",
    icon: "recommendation",
  },
  {
    id: "act-2",
    label: "Cost comparison run",
    detail: "Compared AWS vs Azure vs GCP for FinTech workload",
    timestamp: "Yesterday",
    icon: "cost",
  },
  {
    id: "act-3",
    label: "Architecture exported",
    detail: "Healthcare blueprint exported as PNG",
    timestamp: "2 days ago",
    icon: "architecture",
  },
  {
    id: "act-4",
    label: "AI Assistant session",
    detail: "Asked Cebula to design an HA architecture for e-commerce",
    timestamp: "3 days ago",
    icon: "chat",
  },
];

export const savedArchitectures: SavedArchitecture[] = [
  { id: "sa-1", name: "Storefront v2", businessType: "ecommerce", provider: "AWS", monthlyCost: 2840, updatedAt: "2 days ago" },
  { id: "sa-2", name: "Core Platform", businessType: "saas", provider: "GCP", monthlyCost: 3845, updatedAt: "5 days ago" },
  { id: "sa-3", name: "Patient Records", businessType: "healthcare", provider: "Azure", monthlyCost: 5510, updatedAt: "1 week ago" },
];

export const suggestedChatQuestions = [
  "Recommend a cloud architecture for my business",
  "Estimate my monthly cost on AWS",
  "Compare AWS and Azure for a SaaS workload",
  "Design a highly available architecture",
];

export const testimonials = [
  {
    name: "Priya N.",
    role: "Founder, early-stage SaaS",
    quote:
      "We had three engineers arguing about AWS vs GCP for two weeks. CebulaCore gave us a defensible answer in an afternoon.",
  },
  {
    name: "Marcus T.",
    role: "VP Engineering, fintech",
    quote:
      "The reasoning summary is what sold our compliance team — it's not a black box, it shows its work.",
  },
  {
    name: "Elena R.",
    role: "Platform Lead, healthcare startup",
    quote:
      "Cost comparison alone paid for itself. We moved one workload and saved real money in the first quarter.",
  },
];

export const features = [
  {
    title: "Requirement-aware recommendations",
    description: "Answer five questions about your business and get an architecture matched to your actual constraints, not a generic template.",
  },
  {
    title: "Three-way cost comparison",
    description: "See AWS, Azure, and GCP pricing side by side, projected across the year, before you commit to a provider.",
  },
  {
    title: "Transparent AI reasoning",
    description: "Every recommendation ships with the reasoning behind it, so you can explain it to your team or your auditors.",
  },
  {
    title: "Advisory-only, always",
    description: "CebulaCore never touches your infrastructure. It reads your requirements and hands back a plan — nothing is deployed on your behalf.",
  },
];

export const aiWorkflowSteps = [
  { title: "Describe your business", detail: "Tell Cebula your business type, expected users, and constraints." },
  { title: "Cebula reasons over the request", detail: "It weighs availability, compliance, and budget against provider catalogs." },
  { title: "Review the architecture", detail: "Get a scored recommendation across AWS, Azure, and GCP with full reasoning." },
  { title: "Compare and decide", detail: "Drill into cost projections and adjust before you act." },
];
