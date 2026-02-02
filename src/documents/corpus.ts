import type { Document } from '../types'

export const documents: Document[] = [
  {
    id: 'sec-policy',
    title: 'Security Policy Handbook',
    pages: [
      {
        page: 1,
        content:
          'Purpose: This handbook defines the security posture for enterprise systems. Core principles include least privilege, zero trust, and defense-in-depth. All employees must complete security training within 30 days of hire.',
      },
      {
        page: 2,
        content:
          'Access Control: MFA is required for all privileged accounts. Passwords must be at least 14 characters and rotated every 90 days. Service accounts are reviewed quarterly.',
      },
      {
        page: 3,
        content:
          'Data Handling: Confidential data must be encrypted in transit and at rest. Approved storage includes the Secure Vault and encrypted S3 buckets. Data exfiltration is prohibited without security approval.',
      },
    ],
  },
  {
    id: 'onboarding',
    title: 'Employee Onboarding Guide',
    pages: [
      {
        page: 1,
        content:
          'Welcome! Day 1 includes account provisioning, badge pickup, and device imaging. New hires must acknowledge the Code of Conduct and Security Policy Handbook.',
      },
      {
        page: 2,
        content:
          'Tools Setup: Engineers receive access to Jira, Confluence, GitHub, and Slack. Access requests should be submitted through the IT Service Portal with manager approval.',
      },
      {
        page: 3,
        content:
          'Training: Required training includes privacy, security awareness, and secure coding. Completion is tracked in the Learning Management System.',
      },
    ],
  },
  {
    id: 'incident-response',
    title: 'Incident Response Runbook',
    pages: [
      {
        page: '1.1',
        content:
          'Severity Levels: SEV1 indicates customer impact or data risk. SEV2 indicates degraded service. SEV3 indicates minor issues. Escalation must occur within 15 minutes for SEV1.',
      },
      {
        page: '2.3',
        content:
          'Containment Steps: Isolate affected systems, revoke compromised credentials, and preserve forensic evidence. Use the incident bridge for coordination.',
      },
      {
        page: '3.2',
        content:
          'Post-Incident Review: Conduct a blameless retrospective within 5 business days. Document root cause, contributing factors, and follow-up actions.',
      },
    ],
  },
  {
    id: 'adr',
    title: 'Architecture Decision Records',
    pages: [
      {
        page: 'ADR-014',
        content:
          'Decision: Adopt service mesh for inter-service encryption and observability. Context: growing microservice count required standardized telemetry.',
      },
      {
        page: 'ADR-021',
        content:
          'Decision: Use event-driven architecture for billing updates. Consequences: improved resiliency, added complexity for schema evolution.',
      },
      {
        page: 'ADR-033',
        content:
          'Decision: Standardize on Postgres for transactional workloads. Alternatives considered included MySQL and DynamoDB.',
      },
    ],
  },
  {
    id: 'benefits-pto',
    title: 'Benefits & PTO Policy',
    pages: [
      {
        page: 1,
        content:
          'PTO Accrual: Full-time employees accrue 20 days of PTO annually. PTO must be submitted in the HR system at least 5 days in advance when possible.',
      },
      {
        page: 2,
        content:
          'Holidays: The company observes 12 paid holidays. Floating holidays can be used for regional or cultural events with manager approval.',
      },
      {
        page: 3,
        content:
          'Leave of Absence: Extended leave requests must be coordinated with HR and your manager. Medical leave may require documentation.',
      },
    ],
  },
]

export const getDocumentById = (documentId: string) =>
  documents.find((doc) => doc.id === documentId) ?? null