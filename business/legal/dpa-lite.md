> **Template, not legal advice. Have a lawyer in your state review before use.**

# Data Processing Addendum (Lite)

This Data Processing Addendum ("DPA") forms part of the Master Services Agreement dated [MSA DATE] (the "MSA") between [CLIENT LEGAL NAME] ("Client", the controller or business) and [YOUR LEGAL NAME OR BUSINESS ENTITY], d/b/a ShipReady ("Provider", the processor or service provider). It applies only when Provider processes personal data on Client's behalf while performing the services. If this DPA conflicts with the MSA on data protection, this DPA controls.

**Note for the owner:** this is a short form for small US clients. If a client is subject to GDPR/UK GDPR and data will be transferred outside the EEA/UK, or the client is a HIPAA covered entity, or the client sends you their own DPA, get a lawyer's review before signing. Do not sign a HIPAA Business Associate Agreement without legal advice.

## 1. Details of processing

| Item | Description |
|---|---|
| Subject matter | Reviewing, fixing, testing, deploying and maintaining Client's software application |
| Duration | The term of the MSA and its SOWs, plus the deletion period in Section 7 |
| Nature and purpose | Incidental access to personal data stored in Client's systems while performing the services; no independent use |
| Categories of data subjects | Client's end users, customers and staff whose data is stored in the application |
| Categories of personal data | Typically names, email addresses, account identifiers, usage data and other data Client's app stores. [LIST ANY OTHERS] |
| Sensitive data | None expected. Client will tell Provider in writing before giving access to any health, financial account, government ID, biometric or children's data. |

## 2. Provider's obligations

Provider will:

1. **Process on instructions.** Process personal data only to perform the services and on Client's documented instructions (the MSA, SOWs and written requests), unless required by law.
2. **Minimize.** Access personal data only as needed; prefer staging, anonymized or synthetic data; use read-only access where practical.
3. **No sale or sharing.** Not sell or share personal data, use it for its own purposes, or combine it with other data, as those terms are used in the California Consumer Privacy Act and similar US state laws.
4. **Confidentiality.** Ensure anyone processing the data for Provider is bound by confidentiality.
5. **Security.** Apply reasonable safeguards, including: device disk encryption, multi-factor authentication on all accounts used for Client work, credentials stored only in a password manager, no Client personal data or production secret keys in AI tools, and no local copies of production data unless agreed in writing for a specific task.
6. **Assistance.** Reasonably help Client respond to data subject requests and data protection assessments relating to the services, at the change-order rate if more than minimal effort is needed.
7. **Breach notice.** Notify Client without undue delay, and in any event within [72] hours, after becoming aware of a personal data breach affecting data in Provider's control, with the information reasonably available.

## 3. Subprocessors

Client authorizes Provider to use the following subprocessors. Provider will give Client [14] days' notice of new subprocessors that would process Client personal data, and Client may object on reasonable grounds.

| Subprocessor | Purpose | Personal data access |
|---|---|---|
| Anthropic (Claude Code) and [OTHER AI CODING TOOL] | AI coding assistance on source code | Source code and configuration only; no production personal data by policy |
| GitHub | Source code hosting (Client-owned or Client-approved repositories) | Only what is in the repository |
| [1PASSWORD / OTHER PASSWORD MANAGER] | Credential storage and sharing | Credentials only |
| [EMAIL PROVIDER] | Project communication | Business contact details |

Client's own platforms (for example Supabase, Vercel, Netlify, Stripe) are Client's processors under Client's own agreements, not Provider's subprocessors.

## 4. Client's obligations

Client confirms it has a lawful basis and any required notices for the personal data in its systems, that its instructions comply with law, and that it will provide staging or minimized data wherever the work allows.

## 5. International transfers

Provider is based in the United States and does not intentionally move personal data outside Client's existing systems. [IF NEEDED: For personal data subject to GDPR or UK GDPR transferred to Provider, the Parties incorporate the EU Standard Contractual Clauses (Module 2 or 3) and the UK Addendum, completed as set out in Annex [X].]

## 6. Audits

On reasonable written request no more than once a year, Provider will answer a security questionnaire of reasonable length about the services. On-site audits are not included.

## 7. Return and deletion

Within [7] days after handover or termination, Provider will delete all Client personal data and database exports in its possession, delete credentials, and confirm in writing. Provider keeps no copies of production data after handover, except where law requires.

## 8. Liability

Liability under this DPA is subject to the limitations in the MSA.

## Signatures

| | Provider | Client |
|---|---|---|
| Name | [PROVIDER NAME] | [CLIENT SIGNER NAME] |
| Signature | ____________________ | ____________________ |
| Date | [DATE] | [DATE] |
