export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.cebulacore.io/v1";

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  recommendations: `${API_BASE_URL}/recommendations`,
  costEstimation: `${API_BASE_URL}/cost-estimation`,
  chat: `${API_BASE_URL}/chat`,
  architectures: `${API_BASE_URL}/architectures`,
};

export const mockDashboardStats = {
  totalRecommendations: 47,
  estimatedMonthlyCost: 2840,
  savedArchitectures: 12,
  aiUsagePercent: 68,
};

export const mockRecentActivity = [
  { id: "1", type: "recommendation", title: "E-commerce Platform Architecture", provider: "AWS", score: 94, time: "2 hours ago", status: "completed" },
  { id: "2", type: "cost", title: "SaaS Application Cost Analysis", provider: "Azure", score: 87, time: "5 hours ago", status: "completed" },
  { id: "3", type: "architecture", title: "Microservices Setup", provider: "GCP", score: 91, time: "1 day ago", status: "completed" },
  { id: "4", type: "recommendation", title: "Data Pipeline Architecture", provider: "AWS", score: 89, time: "2 days ago", status: "completed" },
  { id: "5", type: "chat", title: "AI Assistant Consultation", provider: "Multi-cloud", score: null, time: "3 days ago", status: "completed" },
];

export const mockCostData = {
  monthly: [
    { month: "Jan", aws: 2400, azure: 2800, gcp: 2100 },
    { month: "Feb", aws: 2200, azure: 2600, gcp: 1950 },
    { month: "Mar", aws: 2600, azure: 3000, gcp: 2300 },
    { month: "Apr", aws: 2800, azure: 3200, gcp: 2500 },
    { month: "May", aws: 2500, azure: 2900, gcp: 2200 },
    { month: "Jun", aws: 2700, azure: 3100, gcp: 2400 },
    { month: "Jul", aws: 3000, azure: 3400, gcp: 2700 },
    { month: "Aug", aws: 2900, azure: 3300, gcp: 2600 },
    { month: "Sep", aws: 3100, azure: 3500, gcp: 2800 },
    { month: "Oct", aws: 2840, azure: 3150, gcp: 2520 },
    { month: "Nov", aws: 0, azure: 0, gcp: 0 },
    { month: "Dec", aws: 0, azure: 0, gcp: 0 },
  ],
  estimates: {
    aws: { monthly: 2840, annual: 34080, setup: 1200 },
    azure: { monthly: 3150, annual: 37800, setup: 800 },
    gcp: { monthly: 2520, annual: 30240, setup: 1000 },
  },
};

export const mockRecommendation = {
  id: "rec_001",
  title: "Scalable E-commerce Platform",
  score: 94,
  provider: "AWS",
  architecture: "Microservices with Container Orchestration",
  description: "A highly available, fault-tolerant architecture optimized for e-commerce workloads with auto-scaling capabilities.",
  awsServices: [
    { name: "Amazon EKS", purpose: "Container orchestration", cost: "$180/mo", tier: "primary" },
    { name: "Amazon RDS Aurora", purpose: "Managed relational database", cost: "$240/mo", tier: "primary" },
    { name: "Amazon CloudFront", purpose: "CDN & edge delivery", cost: "$45/mo", tier: "secondary" },
    { name: "Amazon ElastiCache", purpose: "In-memory caching", cost: "$95/mo", tier: "secondary" },
    { name: "Amazon S3", purpose: "Object storage", cost: "$25/mo", tier: "support" },
    { name: "AWS WAF", purpose: "Web application firewall", cost: "$35/mo", tier: "support" },
  ],
  azureServices: [
    { name: "Azure AKS", purpose: "Container orchestration", cost: "$195/mo", tier: "primary" },
    { name: "Azure SQL Managed", purpose: "Managed database", cost: "$260/mo", tier: "primary" },
    { name: "Azure Front Door", purpose: "CDN & load balancing", cost: "$55/mo", tier: "secondary" },
    { name: "Azure Cache for Redis", purpose: "In-memory caching", cost: "$110/mo", tier: "secondary" },
  ],
  gcpServices: [
    { name: "Google GKE", purpose: "Container orchestration", cost: "$170/mo", tier: "primary" },
    { name: "Cloud SQL", purpose: "Managed database", cost: "$230/mo", tier: "primary" },
    { name: "Cloud CDN", purpose: "Content delivery", cost: "$40/mo", tier: "secondary" },
    { name: "Memorystore", purpose: "In-memory caching", cost: "$90/mo", tier: "secondary" },
  ],
};

export const mockChatMessages = [
  {
    id: "1",
    role: "assistant" as const,
    content: "Hello! I'm your CebulaCore AI Assistant. I can help you design cloud architectures, compare services, and estimate costs. What would you like to explore today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

export const suggestedQuestions = [
  "What's the best architecture for a high-traffic SaaS app?",
  "Compare Kubernetes offerings across AWS, Azure, and GCP",
  "How do I optimize costs for a startup with limited budget?",
  "What database should I use for real-time analytics?",
  "Explain the trade-offs between serverless and containers",
];

export const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@techcorp.io",
  role: "Senior Cloud Architect",
  organization: "TechCorp Solutions",
  plan: "Pro",
  avatar: "AC",
  joinedDate: "March 2024",
  recommendationsCount: 47,
  architecturesCount: 12,
};
