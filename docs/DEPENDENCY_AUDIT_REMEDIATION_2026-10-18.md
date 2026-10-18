# Vulnerable dependency chain and controlled lockfile repair — 2026-10-18

**Status:** OWNER-REPORTED AUDIT FAIL / REMEDIATION PREPARED / NOT YET RESOLVED. No security PASS and no production promotion.

## Pinned evidence

The owner executed `git rev-parse HEAD` in a dedicated Windows validation worktree: `14a9a4ef9c5daab3f441d8e68eb24be8f58eda89`, matching the exact head of Callsheet PR #2 when reported. `npm audit --omit=dev` found four vulnerabilities (one critical, one high, two moderate). Full `npm audit` found an additional high advisory in the development dependency tree. Local TypeScript/schema/9 UI tests/10 authorization tests had already passed on this same head, but were run under Node 24.16.0 even though package.json requests 22.x.

The exact `package-lock.json` on this head shows these paths and patch floors:

| Loaded package / vulnerable version | Introduced via | Advisory | Compatible minimal patched release |
| --- | --- | --- | --- |
| `proxy-addr@2.0.7` | `@mozaik-ai/core@4.0.5 → @modelcontextprotocol/sdk@1.30.0 → express@5.2.1` | GHSA-jqcg-44mw-7w3h, critical | `2.0.8` |
| `@modelcontextprotocol/sdk@1.30.0` | `@mozaik-ai/core@4.0.5` | GHSA-6qxp-vccf-f47h, high | `1.31.0` |
| `ip-address@10.7.0` | `@modelcontextprotocol/sdk → express-rate-limit@8.7.0` | GHSA-j6r3-76f7-8jcv and GHSA-h3mg-xc3c-68pw, moderate | `10.7.1` |
| `fast-uri@3.1.7` | `@modelcontextprotocol/sdk → ajv@8.20.0` | GHSA-hrr3-gc8f-f4qj, moderate | `3.1.8` |
| `source-map-js@1.2.1` | development tooling `postcss@8.5.28` and `css-tree@3.2.1` | GHSA-68fv-2mgg-jv7q, high | `1.2.2` |

These packages are **transitive**, not direct dependencies in the current package.json. Their declared parent semver ranges (e.g. SDK `^1.29.0`, proxy-addr `^2.0.7`, ip-address `^10.2.0`, fast-uri `^3.0.1`, source-map-js `^1.2.1`) should admit patched same-major/minor versions. The safest first attempt is a lockfile-only update, with no `--force`, no upstream major upgrade and no unreviewed `overrides`.

## Remediation commands on *dedicated* clean Windows worktree

Do not run on the user's original dirty repository. Confirm source SHA first, then:

```powershell
npm audit fix --package-lock-only --ignore-scripts
npm ci
npm audit --omit=dev
npm audit
npm run typecheck
npm run schema:check
npm run test:ui
npm run test:security
```

Require **0 outstanding advisories for production and full tree**, exact patched versions in the new lockfile, zero test failures and a reviewed diff limited to relevant dependency files. Record Node22 reproducibility separately before promotion (owner's machine currently Node24). If `npm audit fix --package-lock-only` cannot resolve all advisories, stop; do not force incompatible releases or assert green. A dependency fix that breaks Mozaik/Anthropic runtime behavior still needs runtime follow-up before promotion.

**No lockfile patch has been generated or committed by this analysis**, because the current integration has no verified dependency resolver/registry writer. The source pull request remains DRAFT and unmixed with production. The existing production endpoint's ungated run route remains a separate open security risk until an explicitly reviewed and tested rollout.
