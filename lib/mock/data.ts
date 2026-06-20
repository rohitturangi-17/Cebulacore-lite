import type {
  CostComparisonEntry,
  DashboardStats,
  ActivityItem,
  ArchitectureDiagram,
  UserProfile,
} from "@/lib/types";

export const mockCostComparison: CostComparisonEntry[] = [
  { month: "Jan", aws: 980, azure: 1020, gcp: 940 },
  { month: "Feb", aws: 1010, azure: 1040, gcp: 965 },
  { month: "Mar", aws: 1045, azure: 1065, gcp: 990 },
  { month: "Apr", aws: 1085, azure: 1095, gcp: 1045 },
  { month: "May", aws: 1120, azure: 1130, gcp: 1080 },
  { month: "Jun", aws: 1085, azure: 1095, gcp: 1045 },
];

export const mockAnnualProjection: CostComparisonEntry[] = [
  { month: "2026", aws: 13020, azure: 13260, gcp: 12480 },
  { month: "2027", aws: 14150, azure: 14380, gcp: 13540 },
  { month: "2028", aws: 15330, azure: 15550, gcp: 14660 },
];

export const mockDashboardStats: DashboardStats = {
  totalRecommendations: 4,
  estimatedMonthlyCost: 1085,
  savedArchitectures: 3,
  aiUsagePercent: 64,
};

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    title: "Generated recommendation",
    description: "Real-Time Transaction Processing System for fintech workload",
    timestamp: "2026-06-15T16:45:00Z",
    type: "recommendation",
  },
  {
    id: "act-2",
    title: "Compared cloud costs",
    description: "AWS vs Azure vs GCP for SaaS multi-tenant backend",
    timestamp: "2026-06-13T10:12:00Z",
    type: "cost",
  },
  {
    id: "act-3",
    title: "Saved architecture",
    description: "Scalable E-Commerce Platform marked as saved",
    timestamp: "2026-06-12T09:40:00Z",
    type: "architecture",
  },
  {
    id: "act-4",
    title: "Asked Cebula",
    description: "\"What's the cheapest way to run a HIPAA-aligned backend?\"",
    timestamp: "2026-06-09T08:05:00Z",
    type: "chat",
  },
];

export const mockArchitectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "diagram-ecommerce",
    title: "Scalable E-Commerce Platform",
    nodes: [
      { id: "cdn", label: "CDN / Edge Cache", type: "network", x: 80, y: 60 },
      { id: "lb", label: "Load Balancer", type: "network", x: 80, y: 180 },
      { id: "app", label: "App Servers", type: "compute", x: 320, y: 180 },
      { id: "cache", label: "Redis Cache", type: "storage", x: 560, y: 100 },
      { id: "db", label: "PostgreSQL", type: "database", x: 560, y: 260 },
      { id: "queue", label: "Order Queue", type: "network", x: 320, y: 320 },
      { id: "ai", label: "Recommendation AI", type: "ai", x: 80, y: 320 },
    ],
    edges: [
      { from: "cdn", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache" },
      { from: "app", to: "db" },
      { from: "app", to: "queue" },
      { from: "queue", to: "ai" },
    ],
  },
  {
    id: "diagram-fintech",
    title: "Real-Time Transaction Processing System",
    nodes: [
      { id: "edge", label: "Edge / WAF", type: "security", x: 80, y: 80 },
      { id: "api", label: "API Layer", type: "network", x: 320, y: 80 },
      { id: "compute", label: "Transaction Service", type: "compute", x: 320, y: 220 },
      { id: "stream", label: "Event Stream", type: "network", x: 560, y: 220 },
      { id: "fraud", label: "Fraud Detection AI", type: "ai", x: 560, y: 80 },
      { id: "db", label: "Spanner / Aurora", type: "database", x: 320, y: 340 },
    ],
    edges: [
      { from: "edge", to: "api" },
      { from: "api", to: "compute" },
      { from: "compute", to: "stream" },
      { from: "stream", to: "fraud" },
      { from: "compute", to: "db" },
    ],
  },
];

export const mockUserProfile: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@cebulacore.dev",
  role: "Cloud Solutions Intern",
  organization: "CebulaCore Labs",
  plan: "pro",
};

export const suggestedChatPrompts: string[] = [
  "Recommend a cloud architecture for my SaaS app",
  "Estimate my monthly cost on AWS",
  "Compare AWS and Azure for an e-commerce store",
  "Design a highly available architecture for fintech",
];
