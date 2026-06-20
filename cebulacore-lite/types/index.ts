export type BusinessType =
  | "ecommerce"
  | "saas"
  | "healthcare"
  | "fintech"
  | "media"
  | "other";

export type AvailabilityTier = "standard" | "high" | "mission-critical";

export type BudgetRange = "under-1k" | "1k-5k" | "5k-20k" | "20k-plus";

export type CloudProviderId = "aws" | "azure" | "gcp" | "no-preference";

export interface WizardData {
  businessType: BusinessType | null;
  businessDescription: string;
  expectedUsers: number;
  growthRate: "flat" | "steady" | "rapid";
  availability: AvailabilityTier | null;
  budget: BudgetRange | null;
  preferredProvider: CloudProviderId | null;
  complianceNeeds: string[];
}

export interface ServiceItem {
  name: string;
  category: string;
  purpose: string;
}

export interface ProviderPlan {
  provider: "AWS" | "Azure" | "GCP";
  monthlyCost: number;
  services: ServiceItem[];
  fitScore: number; // 0-100
}

export interface RecommendationResult {
  id: string;
  title: string;
  businessType: BusinessType;
  confidenceScore: number; // 0-100
  recommendationScore: number; // 0-100
  summary: string;
  reasoning: string[];
  plans: ProviderPlan[];
  recommendedProvider: "AWS" | "Azure" | "GCP";
  createdAt: string;
}

export interface CostMonthPoint {
  month: string;
  AWS: number;
  Azure: number;
  GCP: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ArchitectureNodeData {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface ArchitectureBlueprint {
  id: string;
  name: string;
  description: string;
  nodes: ArchitectureNodeData[];
  edges: ArchitectureEdge[];
}

export interface SavedArchitecture {
  id: string;
  name: string;
  businessType: BusinessType;
  provider: "AWS" | "Azure" | "GCP";
  monthlyCost: number;
  updatedAt: string;
}

export interface DashboardActivity {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
  icon: "recommendation" | "cost" | "architecture" | "chat";
}
