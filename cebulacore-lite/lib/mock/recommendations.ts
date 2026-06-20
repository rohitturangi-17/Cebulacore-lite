import type { ArchitectureRecommendation } from "@/lib/types";

export const mockRecommendations: ArchitectureRecommendation[] = [
  {
    id: "rec-ecommerce-01",
    title: "Scalable E-Commerce Platform",
    businessType: "ecommerce",
    recommendationScore: 92,
    confidenceScore: 88,
    summary:
      "A globally distributed storefront architecture built for traffic spikes during sales events, with caching at the edge and an event-driven checkout pipeline.",
    reasoning: [
      "Expected traffic shows seasonal spikes, so autoscaling compute and a CDN layer reduce both latency and origin load.",
      "Checkout and inventory updates benefit from an event-driven pattern to keep order processing consistent during peak load.",
      "A managed relational database handles transactional integrity for orders, paired with a cache layer for product catalog reads.",
    ],
    services: {
      aws: [
        { name: "CloudFront", category: "CDN", description: "Edge caching for product pages and static assets", monthlyCostEstimate: 180 },
        { name: "EC2 Auto Scaling", category: "Compute", description: "Scales storefront servers with demand", monthlyCostEstimate: 420 },
        { name: "RDS for PostgreSQL", category: "Database", description: "Transactional store for orders and inventory", monthlyCostEstimate: 310 },
        { name: "ElastiCache (Redis)", category: "Cache", description: "Session and catalog caching", monthlyCostEstimate: 140 },
        { name: "SQS", category: "Messaging", description: "Decouples order processing from checkout", monthlyCostEstimate: 35 },
      ],
      azure: [
        { name: "Azure Front Door", category: "CDN", description: "Global edge routing and caching", monthlyCostEstimate: 190 },
        { name: "App Service", category: "Compute", description: "Hosts the storefront application", monthlyCostEstimate: 400 },
        { name: "Azure Database for PostgreSQL", category: "Database", description: "Managed transactional database", monthlyCostEstimate: 320 },
        { name: "Azure Cache for Redis", category: "Cache", description: "Catalog and session caching", monthlyCostEstimate: 145 },
        { name: "Service Bus", category: "Messaging", description: "Order event queueing", monthlyCostEstimate: 40 },
      ],
      gcp: [
        { name: "Cloud CDN", category: "CDN", description: "Edge caching for global storefront traffic", monthlyCostEstimate: 170 },
        { name: "Compute Engine MIG", category: "Compute", description: "Managed instance group with autoscaling", monthlyCostEstimate: 410 },
        { name: "Cloud SQL for PostgreSQL", category: "Database", description: "Managed relational database", monthlyCostEstimate: 300 },
        { name: "Memorystore", category: "Cache", description: "Redis-compatible caching layer", monthlyCostEstimate: 135 },
        { name: "Pub/Sub", category: "Messaging", description: "Order event distribution", monthlyCostEstimate: 30 },
      ],
    },
    estimatedMonthlyCost: { aws: 1085, azure: 1095, gcp: 1045 },
    createdAt: "2026-06-12T09:30:00Z",
  },
  {
    id: "rec-saas-01",
    title: "Multi-Tenant SaaS Backend",
    businessType: "saas",
    recommendationScore: 89,
    confidenceScore: 85,
    summary:
      "A multi-tenant backend with isolated data per customer, container-based services for independent scaling, and managed authentication.",
    reasoning: [
      "Multi-tenancy favors containerized services so individual tenant workloads can scale independently without overprovisioning.",
      "Managed authentication reduces engineering overhead for sign-up, SSO, and session handling.",
      "A managed Postgres instance with per-tenant schemas balances isolation with operational simplicity at this budget tier.",
    ],
    services: {
      aws: [
        { name: "ECS Fargate", category: "Compute", description: "Serverless containers for tenant services", monthlyCostEstimate: 380 },
        { name: "Cognito", category: "Auth", description: "Managed authentication and SSO", monthlyCostEstimate: 60 },
        { name: "RDS for PostgreSQL", category: "Database", description: "Per-tenant schema isolation", monthlyCostEstimate: 290 },
        { name: "API Gateway", category: "Networking", description: "Tenant-aware API routing", monthlyCostEstimate: 75 },
        { name: "S3", category: "Storage", description: "Tenant file and export storage", monthlyCostEstimate: 50 },
      ],
      azure: [
        { name: "Azure Container Apps", category: "Compute", description: "Scales containers per tenant load", monthlyCostEstimate: 370 },
        { name: "Azure AD B2C", category: "Auth", description: "Customer identity and access management", monthlyCostEstimate: 65 },
        { name: "Azure Database for PostgreSQL", category: "Database", description: "Managed multi-tenant database", monthlyCostEstimate: 300 },
        { name: "API Management", category: "Networking", description: "Tenant routing and rate limiting", monthlyCostEstimate: 90 },
        { name: "Blob Storage", category: "Storage", description: "Tenant document storage", monthlyCostEstimate: 45 },
      ],
      gcp: [
        { name: "Cloud Run", category: "Compute", description: "Autoscaling containers per tenant", monthlyCostEstimate: 360 },
        { name: "Identity Platform", category: "Auth", description: "Managed customer identity", monthlyCostEstimate: 55 },
        { name: "Cloud SQL for PostgreSQL", category: "Database", description: "Multi-tenant relational database", monthlyCostEstimate: 285 },
        { name: "Apigee", category: "Networking", description: "API management for tenants", monthlyCostEstimate: 95 },
        { name: "Cloud Storage", category: "Storage", description: "Tenant file storage", monthlyCostEstimate: 40 },
      ],
    },
    estimatedMonthlyCost: { aws: 855, azure: 870, gcp: 835 },
    createdAt: "2026-06-10T14:05:00Z",
  },
  {
    id: "rec-healthcare-01",
    title: "HIPAA-Aligned Patient Records Platform",
    businessType: "healthcare",
    recommendationScore: 90,
    confidenceScore: 82,
    summary:
      "A compliance-conscious architecture with encrypted storage, network isolation, and detailed audit logging for patient data workflows.",
    reasoning: [
      "Patient data workloads call for private networking and encryption at rest and in transit as a baseline, not an add-on.",
      "Audit logging needs to be continuous and tamper-resistant to support compliance reviews.",
      "A managed database with automated backups reduces the operational burden of meeting recovery point objectives.",
    ],
    services: {
      aws: [
        { name: "VPC with Private Subnets", category: "Networking", description: "Network isolation for patient data services", monthlyCostEstimate: 90 },
        { name: "EC2 (encrypted EBS)", category: "Compute", description: "Application servers with encrypted volumes", monthlyCostEstimate: 350 },
        { name: "RDS for PostgreSQL (encrypted)", category: "Database", description: "Encrypted patient records store", monthlyCostEstimate: 410 },
        { name: "CloudTrail", category: "Audit", description: "Continuous audit logging", monthlyCostEstimate: 45 },
        { name: "KMS", category: "Security", description: "Key management for encryption", monthlyCostEstimate: 25 },
      ],
      azure: [
        { name: "Virtual Network", category: "Networking", description: "Isolated network for sensitive workloads", monthlyCostEstimate: 85 },
        { name: "Virtual Machines (encrypted disks)", category: "Compute", description: "Encrypted application compute", monthlyCostEstimate: 360 },
        { name: "Azure SQL Database (TDE)", category: "Database", description: "Transparent data encryption for records", monthlyCostEstimate: 420 },
        { name: "Azure Monitor + Log Analytics", category: "Audit", description: "Audit trail and monitoring", monthlyCostEstimate: 50 },
        { name: "Key Vault", category: "Security", description: "Centralized key and secrets management", monthlyCostEstimate: 30 },
      ],
      gcp: [
        { name: "VPC (private)", category: "Networking", description: "Isolated network perimeter", monthlyCostEstimate: 80 },
        { name: "Compute Engine (CMEK)", category: "Compute", description: "Compute with customer-managed encryption keys", monthlyCostEstimate: 345 },
        { name: "Cloud SQL (encrypted)", category: "Database", description: "Encrypted patient data store", monthlyCostEstimate: 400 },
        { name: "Cloud Audit Logs", category: "Audit", description: "Immutable audit trail", monthlyCostEstimate: 40 },
        { name: "Cloud KMS", category: "Security", description: "Key management service", monthlyCostEstimate: 25 },
      ],
    },
    estimatedMonthlyCost: { aws: 920, azure: 945, gcp: 890 },
    createdAt: "2026-06-08T11:20:00Z",
  },
  {
    id: "rec-fintech-01",
    title: "Real-Time Transaction Processing System",
    businessType: "fintech",
    recommendationScore: 94,
    confidenceScore: 90,
    summary:
      "A low-latency, highly available transaction pipeline with multi-AZ redundancy, strong consistency guarantees, and real-time fraud signal processing.",
    reasoning: [
      "Mission-critical availability requirements point to multi-AZ deployment with automated failover rather than single-instance hosting.",
      "Transaction integrity calls for a strongly consistent database rather than an eventually-consistent store.",
      "Real-time fraud detection benefits from a streaming layer that processes events as transactions occur.",
    ],
    services: {
      aws: [
        { name: "EC2 Multi-AZ Auto Scaling", category: "Compute", description: "Redundant compute across availability zones", monthlyCostEstimate: 680 },
        { name: "Aurora PostgreSQL (Multi-AZ)", category: "Database", description: "Strongly consistent transactional database", monthlyCostEstimate: 590 },
        { name: "Kinesis Data Streams", category: "Streaming", description: "Real-time transaction event processing", monthlyCostEstimate: 210 },
        { name: "WAF + Shield", category: "Security", description: "Application-layer protection", monthlyCostEstimate: 120 },
        { name: "Route 53", category: "Networking", description: "Low-latency DNS failover", monthlyCostEstimate: 15 },
      ],
      azure: [
        { name: "VM Scale Sets (zone-redundant)", category: "Compute", description: "Redundant compute across zones", monthlyCostEstimate: 690 },
        { name: "Azure SQL (zone redundant)", category: "Database", description: "Strongly consistent managed database", monthlyCostEstimate: 600 },
        { name: "Event Hubs", category: "Streaming", description: "Real-time event ingestion", monthlyCostEstimate: 220 },
        { name: "Azure Front Door + WAF", category: "Security", description: "Edge protection and routing", monthlyCostEstimate: 130 },
        { name: "Traffic Manager", category: "Networking", description: "DNS-based failover routing", monthlyCostEstimate: 20 },
      ],
      gcp: [
        { name: "Compute Engine (regional MIG)", category: "Compute", description: "Zone-redundant managed instance group", monthlyCostEstimate: 670 },
        { name: "Cloud Spanner", category: "Database", description: "Globally consistent transactional database", monthlyCostEstimate: 650 },
        { name: "Pub/Sub + Dataflow", category: "Streaming", description: "Real-time fraud signal processing", monthlyCostEstimate: 230 },
        { name: "Cloud Armor", category: "Security", description: "DDoS and WAF protection", monthlyCostEstimate: 110 },
        { name: "Cloud DNS", category: "Networking", description: "Low-latency failover routing", monthlyCostEstimate: 15 },
      ],
    },
    estimatedMonthlyCost: { aws: 1615, azure: 1660, gcp: 1675 },
    createdAt: "2026-06-15T16:45:00Z",
  },
];

export function getRecommendationById(id: string) {
  return mockRecommendations.find((r) => r.id === id);
}
