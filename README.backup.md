# Giggle MVP Launch Plan

## Project Snapshot

- **Team:** Farmceries
- **Product:** Giggle — "One-line gigs, instant pay"
- **Audience:** Nigerian students and fresh graduates seeking fast, trusted, short-term work
- **Value Proposition:** Social, mobile-first feed of verified one-liner gigs with same-day payouts via escrow

## Problem Statement

- Students often need rapid cash for essentials such as rent, food, and transport.
- Short-term gigs are buried in scattered, informal channels (WhatsApp statuses, Twitter threads, campus posters).
- Informal gig markets expose students to scams, ghosted payments, and zero accountability.

## Solution Overview

Giggle delivers a social-first gig marketplace where:

- Employers post simple, one-line gigs that feel like status updates.
- Students scroll a familiar feed, claim tasks, and get paid instantly through a verified escrow system.
- Trust is built through profile verification, ratings, and transparent wallet balances.

## Core Features

- **Gig Feed:** Infinite-scroll list of active gigs styled like WhatsApp statuses or X timelines.
- **One-Liner Posting:** Minimal friction for employers—title, payout, time, location, phone.
- **Claim & Escrow:** Students tap to claim; funds move into Paystack-powered escrow until completion.
- **Wallet & Payouts:** In-app balance with instant release once employers approve work.
- **Trust Layer:** Verified badges, quick ratings, and dispute resolution playbook.
- **In-App Chat:** Lightweight Supabase Realtime chat for coordination (stubbed if time-constrained).
- **Accessibility:** Mobile-first UX with USSD companion concept for feature phones.

## Target User Journey

1. Employer posts a gig such as "Need flyer sharing today, 3 hrs, NGN 35,000".
2. Student claims the gig; Giggle locks the payment in escrow.
3. Student completes the work and marks it done.
4. Employer confirms delivery; funds release instantly into the student wallet.
5. Both parties leave quick ratings to strengthen future trust.

## Differentiators

- **Social Feed Paradigm:** Feels like browsing status updates, not a job board.
- **Speed:** Same-day payouts to tackle urgent financial needs.
- **Simplicity:** One-liner gig format lowers posting barriers.
- **Trust Infrastructure:** Escrow, verification, ratings, and dispute tooling reduce scams.
- **Community Energy:** Fun, fast, mobile experience tailored to Nigerian youth culture.

## Market & Business Model

- **Market:** 40M+ Nigerian students and fresh graduates; youth unemployment ~53%.
- **Opportunity:** Nigerian gig economy is an early-stage contributor to the projected USD 350B global gig market by 2030.
- **Revenue Streams:**
  - 5–10% commission on completed gig transactions.
  - Paid premium placement for employers.
  - Campus and brand partnerships, events, and sponsorships.

## Tech Stack & Integrations

- **Frontend:** React Native (Expo) with NativeWind (Tailwind CSS)
- **Auth & Data:** Supabase (Auth, Database, Realtime, Edge Functions)
- **Payments:** Paystack (Escrow, Transfers, Webhooks)
- **Notifications:** Expo Push Notifications (with optional Firebase linkage)
- **Utilities:** TypeScript, Zustand/Context for lightweight state, React Navigation

## Execution Roadmap (72-Hour Hackathon Sprint)

| Day       | Theme                 | Goals                                            | Key Deliverables                                                                                                                                                                   |
| --------- | --------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prep**  | Environment & Infra   | Preconfigure tooling, Supabase schema, secrets   | Expo project scaffold, Supabase tables, env variables, folder structure                                                                                                            |
| **Day 1** | Auth & Gig Feed       | Users can sign up, view, and post gigs           | Auth screen, feed screen, gig card component, post gig form, Supabase CRUD hooks                                                                                                   |
| **Day 2** | Claim, Escrow, Wallet | End-to-end payment flow from claim to held funds | Gig detail screen, claim actions, Paystack WebView checkout, escrow webhook (Supabase Edge), wallet view, push notification wiring                                                 |
| **Day 3** | Trust, Admin, Polish  | Ratings, admin tools, payouts, overall QA        | Ratings flow, admin oversight (Supabase dashboard or lightweight screen), withdrawal flow via Paystack Transfer API, optional KYC stub, UI polish, end-to-end testing & demo build |

## Sprint Checklist

- **Auth:** Phone/email OTP via Supabase
- **Feed:** Post, list, claim gig lifecycle
- **Escrow:** Paystack charge, hold, release
- **Wallet:** Balance tracking and statement history
- **Chat:** Realtime messaging (optional stub)
- **Ratings:** Post-gig feedback loop
- **Notifications:** Expo push and/or realtime alerts
- **Admin:** Role-based controls for verifications and disputes

## Tools & Estimated Costs (NGN)

- Supabase Free Tier — NGN 0 (database, auth, storage)
- Paystack Test Mode — NGN 0 (escrow sandbox)
- Expo (EAS Build) — NGN 0 to NGN 10,000 (Android build credits if needed)
- Firebase Cloud Messaging — NGN 0 (push notifications)
- Domain/Hosting (optional for admin portal) — NGN 5,000 to NGN 10,000 annually

## Team Roles (Optional Multi-Dev Split)

- **Frontend Lead:** React Native UI, navigation, styling, UX polish
- **Backend & Infra:** Supabase schema, edge functions, Paystack webhooks
- **Payments Specialist:** Escrow flows, wallet accounting, payout automation
- **QA & Testing:** Regression sweeps, device testing, bug triage
- **Presenter & Comms:** Pitch deck, demo script, stakeholder updates

## Risk Watchlist & Mitigations

- **Heavy Day 2 Scope:** Pre-stub Paystack webhooks and success callbacks during prep to reduce integration surprises.
- **KYC Integration Creep:** Treat BVN verification with Dojah/SmileID as a stretch goal; document manual verification fallback.
- **Notification Complexity:** If Expo push blocks progress, fall back to in-app alerts or SMS triggers via Supabase functions.
- **Data Consistency:** Add basic audit columns (created_at, status enums) and logging early to simplify debugging.

## Suggested Immediate Next Steps

1. Generate the Expo project scaffold with navigation, NativeWind config, and baseline screens.
2. Apply Supabase SQL schema and seed test gigs for Day 1 feed development.
3. Draft webhook handler contracts (request/response shape) before implementing Paystack integration.
4. Schedule midpoint check-ins each day to demo progress and unblock dependencies.

> Ready to convert this plan into code? Let me know and I can scaffold the Expo project or supply targeted implementation snippets for each milestone.
