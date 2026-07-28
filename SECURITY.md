# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for
receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Please report security vulnerabilities by email to **sachin.sapkota.dev@gmail.com**.

You should receive a response within 48 hours. If for some reason you do not,
please follow up via email to ensure we received your message.

We ask that you:

- Provide a clear description of the vulnerability
- Include steps to reproduce the issue
- Share the potential impact if exploited
- Allow us reasonable time to address the issue before public disclosure

## What to Expect

When you report a vulnerability, we will:

1. Confirm receipt of your report within 48 hours
2. Provide an initial assessment within 5 business days
3. Keep you informed of progress as we work on a fix
4. Notify you when the fix is deployed

## Security Measures

- All traffic is served over HTTPS
- Security headers are set via Cloudflare and `_headers`
- Firebase Authentication uses industry-standard protocols
- Stripe payments are PCI-compliant
- Server-side validation is performed on all API endpoints
- Environment variables for secrets are never committed to the repository
