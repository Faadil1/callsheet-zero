# TRACE Gate 6.5 — Reference Audit

Date: 2026-09-06
Project: CALLSHEET ZERO
Purpose: reference-bounded UI/UX transfer for the Gate 6.5 visual rework.

## Reference policy

References are used to transfer **mechanisms**, not visual identities. CALLSHEET ZERO must remain its own product and must not copy another product's branding, layouts wholesale, illustration system, or component styling.

The unresolved job was: make the interface read as a film-production revision instrument, improve evaluator scanability, and remove generic AI/SaaS visual grammar.

## Mobbin attempt

Mobbin was attempted first for web operations/scheduling references. The connected Mobbin tool returned a paid-plan requirement, so no Mobbin screen was used as evidence. This is recorded explicitly rather than pretending Mobbin was consulted.

## Domain references actually used

### StudioBinder — film production call sheets

Sources:
- https://www.studiobinder.com/templates/call-sheets/film-production-call-sheet-template/
- https://www.studiobinder.com/call-sheet-template/

Mechanisms transferred:
- top-of-document production identity before secondary detail;
- shoot day / call-time / weather / location information as operational metadata;
- chronological scene schedule as a primary document structure;
- compact schedule rows rather than dashboard cards;
- clear separation between header conditions and detailed day schedule.

Not copied:
- StudioBinder brand styling;
- exact call-sheet layout;
- typography, colors, icons, or proprietary interaction patterns.

### SetHero — call-sheet revisions and production workflow

Sources:
- https://sethero.com/call-sheets/
- https://help.sethero.com/en/articles/1513691-tab-breakdown
- https://sethero.com/blog/the-lifecycle-of-a-call-sheet/

Mechanisms transferred:
- revisions as an explicit operational concept;
- script/schedule version visibility;
- scene-by-scene day schedule;
- production conditions such as locations, weather and timing as first-class information;
- revision/publish mentality: plans change, the current issued document must make the new version obvious;
- print/document-like rule structure rather than generic SaaS card chrome.

Not copied:
- SetHero brand identity;
- marketing copy;
- editor layout;
- proprietary drag/drop or publishing interactions.

## TRACE synthesis

The final design direction is not "make it look like StudioBinder or SetHero." The transfer is:

```text
FILM CALL SHEET DOCUMENT LOGIC
+
REVISION / ISSUE CONTROL
+
CALLSHEET ZERO'S UNIQUE CONCURRENCY + CONSTRAINT REPAIR PROOF
=
WARM PRODUCTION OPERATIONS
```

CALLSHEET ZERO-specific signatures remain limited to:
1. **Canonical Verified Run Evidence Strip** — concurrency → 3 holds → targeted repair → REV 02 → 0 conflicts.
2. **Constraint Guard Hold Receipts** — exact scarce-resource collisions.
3. **REVISION 02 · CONFLICT-FREE** approval stamp.

These signatures are product-specific because they expose CALLSHEET ZERO's verified mechanism, not generic film-software decoration.

## Four mandatory Gate 6.5 problems mapped to references

### P1 — Judge/video readability
Transferred from call-sheet document logic: important production facts should be readable at a glance. Implementation raises critical UI text and removes microtype where possible.

### P2 — Generic AI/SaaS / AI-slop shell
Transferred from call-sheet + revision-document structure: warm paper canvas, printed rules, explicit revision metadata, schedule rows and hold receipts replace neon/glass rounded-card grammar.

### P3 — Proof below fold
CALLSHEET ZERO-specific correction: canonical verified proof is promoted into an above-fold evidence strip. This does not come from a competitor; it is the evaluator-facing representation of our own runtime evidence.

### P4 — Reduced motion
Accessibility correction independent of visual reference. `prefers-reduced-motion` explicitly disables looping/nonessential animation while preserving all state labels.

## Resulting implementation boundary

The reference audit authorizes presentation-layer changes only. It does not authorize changes to:
- Mozaik runtime semantics;
- concurrency proof logic;
- Constraint Guard behavior;
- canonical evidence values;
- live/replay/simulation truth boundaries;
- Adaption's secondary asynchronous role.

## Current status

Reference audit: **PASS**
Mobbin: **ATTEMPTED_BLOCKED_BY_PAID_PLAN**
Domain reference coverage: **PASS_STUDIOBINDER_SETHERO**
Visual-copy risk: **BOUNDED_MECHANISM_TRANSFER_ONLY**
Next: CI → deployment → current production evaluator capture → TRACE Gate 6.5 rerun.
