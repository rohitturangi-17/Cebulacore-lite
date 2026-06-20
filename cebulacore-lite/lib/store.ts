import { create } from "zustand";
import { ChatMessage, RecommendationResult, WizardData } from "@/types";

interface AppState {
  wizardData: WizardData;
  wizardStep: number;
  setWizardField: <K extends keyof WizardData>(key: K, value: WizardData[K]) => void;
  resetWizard: () => void;
  setWizardStep: (step: number) => void;

  activeRecommendation: RecommendationResult | null;
  setActiveRecommendation: (rec: RecommendationResult | null) => void;

  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const initialWizardData: WizardData = {
  businessType: null,
  businessDescription: "",
  expectedUsers: 5000,
  growthRate: "steady",
  availability: null,
  budget: null,
  preferredProvider: null,
  complianceNeeds: [],
};

export const useAppStore = create<AppState>((set) => ({
  wizardData: initialWizardData,
  wizardStep: 0,
  setWizardField: (key, value) =>
    set((state) => ({ wizardData: { ...state.wizardData, [key]: value } })),
  resetWizard: () => set({ wizardData: initialWizardData, wizardStep: 0 }),
  setWizardStep: (step) => set({ wizardStep: step }),

  activeRecommendation: null,
  setActiveRecommendation: (rec) => set({ activeRecommendation: rec }),

  chatMessages: [],
  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  clearChat: () => set({ chatMessages: [] }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
