export type CloudProvider = "aws" | "azure" | "gcp";

export type BusinessType =
  | "ecommerce"
  | "saas"
  | "healthcare"
  | "fintech"
  | "media"
  | "other";

export type AvailabilityTier = "standard" | "high" | "mission-critical";

export type BudgetRange = "under-1k" | "1k-5k" | "5k-20k" | "20k-plus";

export interface RequirementInput {
  businessType: BusinessType;
  expectedUsers: number;
  availability: AvailabilityTier;
  budgetRange: BudgetRange;
  preferredProvider: CloudProvider | "no-preference";
}

export interface ServiceItem {
  name: string;
  category: string;
  description: string;
  monthlyCostEstimate: number;
}

export interface ArchitectureRecommendation {
  id: string;
  title: string;
  businessType: BusinessType;
  recommendationScore: number;
  confidenceScore: number;
  summary: string;
  reasoning: string[];
  services: {
    aws: ServiceItem[];
    azure: ServiceItem[];
    gcp: ServiceItem[];
  };
  estimatedMonthlyCost: {
    aws: number;
    azure: number;
    gcp: number;
  };
  createdAt: string;
}

export interface CostComparisonEntry {
  month: string;
  aws: number;
  azure: number;
  gcp: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: "compute" | "storage" | "database" | "network" | "security" | "ai";
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface DashboardStats {
  totalRecommendations: number;
  estimatedMonthlyCost: number;
  savedArchitectures: number;
  aiUsagePercent: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "recommendation" | "cost" | "architecture" | "chat";
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization: string;
  plan: "free" | "pro" | "enterprise";
}
