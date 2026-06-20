import { ChatMessage, RecommendationResult, WizardData } from "@/types";
import { generateCostSeries, generateRecommendation } from "@/lib/mock-data";

/**
 * Base URL for the CebulaCore API. Swap the mock implementations below for
 * real `fetch` calls against these endpoints once the backend is live.
 *
 *   POST /auth/login
 *   POST /auth/register
 *   POST /recommendations
 *   POST /cost-estimation
 *   POST /chat
 *   GET  /architectures
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.cebulacore.dev";

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  organization?: string;
}

export interface AuthResponse {
  token: string;
  user: { name: string; email: string };
}

export interface CostEstimationPayload {
  businessType: WizardData["businessType"];
  monthlyBaseline: { AWS: number; Azure: number; GCP: number };
}

export interface ChatPayload {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

export const api = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    // POST `${API_BASE_URL}/auth/login`
    return delay({ token: "mock-token", user: { name: "Alex Rivera", email: payload.email } });
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    // POST `${API_BASE_URL}/auth/register`
    return delay({ token: "mock-token", user: { name: payload.name, email: payload.email } });
  },

  async getRecommendation(payload: WizardData): Promise<RecommendationResult> {
    // POST `${API_BASE_URL}/recommendations`
    return delay(generateRecommendation(payload), 1400);
  },

  async getCostEstimation(payload: CostEstimationPayload) {
    // POST `${API_BASE_URL}/cost-estimation`
    return delay(generateCostSeries(payload.monthlyBaseline), 900);
  },

  async sendChatMessage(payload: ChatPayload): Promise<ChatResponse> {
    // POST `${API_BASE_URL}/chat`
    return delay({ reply: mockChatReply(payload.message) }, 1100);
  },

  async getArchitectures() {
    // GET `${API_BASE_URL}/architectures`
    return delay([], 500);
  },
};

function mockChatReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("cost") || lower.includes("estimate")) {
    return "For a mid-traffic workload, expect roughly $2,800–$4,200/mo depending on provider and redundancy. Open Cost Comparison for a month-by-month breakdown across AWS, Azure, and GCP.";
  }
  if (lower.includes("aws") && lower.includes("azure")) {
    return "AWS tends to win on ecosystem breadth and managed-service maturity; Azure is often stronger if you're already on Microsoft 365 or need first-party hybrid connectivity. For a compliance-heavy workload, both are comparable — the deciding factor is usually your existing tooling.";
  }
  if (lower.includes("availability") || lower.includes(" ha ") || lower.includes("highly available")) {
    return "A highly available design typically spans at least two availability zones, uses a managed multi-AZ database, and puts a load balancer in front of redundant compute. I can generate a full architecture for this — open the Requirement Wizard and I'll factor in your specific traffic and budget.";
  }
  if (lower.includes("recommend") || lower.includes("architecture")) {
    return "I can put together a recommendation, but I'll need a few specifics first: your business type, expected users, availability needs, and budget. Head to the Requirement Wizard and I'll generate a scored architecture across AWS, Azure, and GCP.";
  }
  return "Got it. I can help with architecture recommendations, cost comparisons across AWS/Azure/GCP, or reasoning through a specific design decision — what would be most useful right now?";
}
