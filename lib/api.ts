import type {
  RequirementInput,
  ArchitectureRecommendation,
  CostComparisonEntry,
  ChatMessage,
  ArchitectureDiagram,
} from "@/lib/types";
import { mockRecommendations } from "@/lib/mock/recommendations";
import { mockCostComparison, mockArchitectureDiagrams } from "@/lib/mock/data";

/**
 * Centralized API client for CebulaCore Lite.
 *
 * This file is the single integration point between the frontend and a
 * future backend. Every function currently returns mocked data after a
 * simulated network delay. Swap the implementation of each function to
 * call API_BASE_URL once a real backend is available — page and component
 * code should not need to change.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.cebulacore.dev/v1";

function delay<T>(value: T, ms = 600): Promise<T> {
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
  user: {
    name: string;
    email: string;
  };
}

export interface CostEstimationPayload {
  provider: "aws" | "azure" | "gcp" | "all";
  requirement: RequirementInput;
}

/**
 * POST /auth/login
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return delay({
    token: "mock-jwt-token",
    user: { name: "Alex Rivera", email: payload.email },
  });
}

/**
 * POST /auth/register
 */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  return delay({
    token: "mock-jwt-token",
    user: { name: payload.name, email: payload.email },
  });
}

/**
 * POST /recommendations
 */
export async function createRecommendation(
  input: RequirementInput
): Promise<ArchitectureRecommendation> {
  const match =
    mockRecommendations.find((r) => r.businessType === input.businessType) ??
    mockRecommendations[0];
  return delay(match, 900);
}

export async function listRecommendations(): Promise<ArchitectureRecommendation[]> {
  return delay(mockRecommendations);
}

/**
 * POST /cost-estimation
 */
export async function estimateCost(
  _payload: CostEstimationPayload
): Promise<CostComparisonEntry[]> {
  return delay(mockCostComparison, 700);
}

/**
 * POST /chat
 */
export async function sendChatMessage(
  message: string,
  _history: ChatMessage[]
): Promise<ChatMessage> {
  const responses = [
    "Based on your traffic profile, I'd lean toward a managed container service paired with a multi-AZ database for resilience.",
    "For that budget range, a serverless compute layer keeps costs proportional to actual usage rather than paying for idle capacity.",
    "AWS and Azure land within about 3% of each other here — the bigger difference is in managed database pricing at your scale.",
    "A high-availability setup typically adds 20-30% to baseline cost in exchange for multi-zone redundancy and automated failover.",
  ];
  const content = responses[Math.floor(Math.random() * responses.length)];
  return delay(
    {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content,
      timestamp: new Date().toISOString(),
    },
    1100
  );
}

/**
 * GET /architectures
 */
export async function listArchitectures(): Promise<ArchitectureDiagram[]> {
  return delay(mockArchitectureDiagrams);
}

export async function getArchitecture(id: string): Promise<ArchitectureDiagram | undefined> {
  return delay(mockArchitectureDiagrams.find((d) => d.id === id));
}
