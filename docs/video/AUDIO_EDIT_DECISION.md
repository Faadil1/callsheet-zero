# CALLSHEET ZERO — Audio Edit Decision

Status: **PASS**

Updated: 2026-09-07

The five supplied narration recordings remain outside the public repository. They were transcribed with timestamps and aligned against the previously approved CALLSHEET ZERO narration. The speech recognizer produced several obvious ASR substitutions for project-specific terms and numbers (for example `Mosaic` for `Mozaik`, `Course sheet zero` for `CALLSHEET ZERO`, and other phonetic substitutions). Those are transcript artifacts, not new product claims. Final captions must use the canonical project wording from `docs/STATE.md`, `docs/HANDOVER_CURRENT.md`, and `evidence/canonical-run.json`.

The edit below uses only the user's recorded voice. No synthetic replacement voice is authorized.

## 1. Source decisions

| source file | source duration | keep/cut | retained timestamp segments | retained idea | reason |
|---|---:|---|---|---|---|
| `1(1).m4a` | 17.73 s | KEEP / trim | `01.60–04.56`, `04.96–06.56`, `06.64–07.36`, `07.44–08.80`, `09.04–12.00`, `12.16–15.76` | Hook + CALLSHEET ZERO + Mozaik v4 | Removes greeting/dead air while preserving the opening thesis and platform identity. |
| `2(1).m4a` | 29.85 s | KEEP / hard trim | `08.88–10.24`, `10.24–15.12`, `15.12–21.335`, `22.055–26.775`, `27.575–28.615` | Schedule/Talent/Logistics concurrent reaction + verified 8.432 s overlap | Cuts the long disruption setup because the UI already shows weather hold and +90 min delay; retains the concurrency proof. |
| `3(1).m4a` | 32.32 s | KEEP / hard trim | `07.68–09.04`, `09.12–10.48`, `10.56–11.68`, `12.495–13.215`, `13.295–14.575`, `14.895–15.775`, `15.775–18.015`, `18.415–20.175`, `24.575–27.535`, `28.149–31.749` | Exact scarce resources + deterministic Guard refusal + targeted Schedule-only repair | Removes redundant explanation while retaining the causal failure/refusal/repair mechanism. |
| `4(1).m4a` | 15.34 s | KEEP / trim pauses | `00.56–02.00`, `02.08–03.76`, `03.84–04.56`, `04.88–06.48`, `06.48–08.48`, `08.72–10.08`, `10.32–12.48`, `12.80–13.84` | S22 revision + zero conflicts + COMMIT ALLOWED | Keeps the complete Revision 02 outcome. Final on-screen text must show the canonical `S22 16:30 → 18:00` value from the receipt. |
| `5(1).m4a` | 43.67 s | KEEP / hard trim | `00.64–03.76`, `03.84–05.84`, `06.48–07.36`, `07.36–10.08`, `10.24–12.40`, `14.655–18.175`, `18.175–19.615`, `19.615–20.575`, `20.895–24.735`, `24.735–25.535`, `26.94–30.86`, `31.18–32.54`, `35.74–42.619` | Run Live vs Verified Replay + Adaption async learning + Guard authority + closing line | Removes the extra transition word and final `Thank you`; preserves sponsor proof and closing memory line. |

## 2. Final narration assembly order

Use the retained material in this order:

```text
1(1) — hook + Mozaik v4
→ 2(1) — three agents + verified 8.432 s overlap
→ 3(1) — exact holds + COMMIT REFUSED + targeted repair
→ 4(1) — S22 revision + zero conflicts + COMMIT ALLOWED
→ 5(1) — Run Live / Verified Replay distinction
→ 5(1) — Adaption async preference data + Guard authority
→ 5(1) — closing CALLSHEET ZERO line
```

Estimated retained active speech: **~94.3 seconds** before tiny edit crossfades.

Target final narration: **94–95 seconds**.

No speed-up is required. Keep playback at `1.00x`; only use a maximum of approximately `1.01x` if the rendered master exceeds 95.0 seconds after joins.

Use short audio crossfades only to hide hard cuts. Do not add decorative pauses that push the master beyond 95 seconds.

## 3. Mandatory claim coverage

| claim | coverage | source / visual requirement |
|---|---|---|
| Three agents can be right locally and still produce an impossible shoot | PASS | `1(1)` opening hook; caption normalize `shot`/`shoot` to approved wording only if needed. |
| CALLSHEET ZERO is built on Mozaik v4 | PASS | `1(1)`; caption must spell `CALLSHEET ZERO` and `Mozaik v4`. |
| Schedule, Talent, Logistics react concurrently | PASS | retained `2(1)` segment. |
| Verified canonical overlap = 8.432 seconds | PASS | retained `2(1)` segment + canonical receipt. |
| REV 01 → COMMIT REFUSED | PASS | retained `3(1)` segment + UI state. |
| Exact holds = `lead_actor`, `camera_a`, `van_1` | PASS | retained `3(1)` resource sentence + UI. |
| `repair.requested → Schedule Agent only` | PASS | retained `3(1)` targeted-repair sentence + replay step. |
| `S22 16:30 → 18:00` | PASS WITH CANONICAL VISUAL | retained `4(1)` revision sentence; final caption/UI must use exact canonical receipt values, never ASR-normalized numbers as evidence. |
| REV 02 → 0 conflicts → COMMIT ALLOWED | PASS | retained `4(1)` ending. |
| Run Live = fresh stochastic Mozaik execution; outcome can differ | PASS | retained `5(1)` opening sentence. |
| Verified Replay = captured canonical repair evidence | PASS | retained `5(1)` replay sentence. |
| Verified Replay makes no new model call | PASS WITH REQUIRED ON-SCREEN TEXT | The spoken line says it walks the captured receipts; during that line the UI must visibly retain `no new model call`. Do not claim the narration itself says this phrase. |
| Adaption asynchronously converts verified repairs into preference data | PASS | retained `5(1)` Adaption sentence. |
| Constraint Guard remains realtime safety authority | PASS | retained `5(1)` Guard sentence; caption normalize the ASR phonetic substitution to canonical wording. |
| Closing refusal/repair memory line | PASS | retained `5(1)` closing sentence. |

## 4. Truth-boundary audit

The final video must preserve exactly:

```text
LIVE = fresh model execution
VERIFIED REPLAY = captured canonical live evidence; no new model call
SIMULATION = explicitly labeled preview
```

Required implementation:

- Briefly show **Run Live** as a fresh execution.
- Use **Verified Replay** for the deterministic conflict → refusal → targeted repair → commit story.
- During the replay narration, keep the existing UI provenance `no new model call` visible or add a faithful text callout using that exact wording.
- Never present the replay as a new live run.
- Never fabricate Mozaik events.
- `COMMIT REFUSED` remains a deterministic decision-layer interpretation of verified hard conflicts, not an invented Mozaik semantic event.
- Canonical numeric labels shown in video must come from `evidence/canonical-run.json`, not from raw ASR text.

## 5. Audio-quality / edit notes

Authorized processing only:

- trim silence and dead air;
- remove the opening `Hi` from `1(1)`;
- remove the final `Thank you` from `5(1)`;
- use short crossfades at hard cuts;
- light noise reduction;
- loudness normalization across all five recordings;
- light EQ/compression if useful;
- no synthetic voice replacement;
- no aggressive time stretching.

Do not publish or commit the raw `.m4a` recordings.

## 6. Repository evidence blocker

**CLEARED.** Current GitHub `main` contains the previously reported missing evidence:

- `docs/HANDOVER_CURRENT.md`
- `docs/EVIDENCE_ADAPTION_A1.md`
- `evidence/canonical-run.json`

A local workspace that reports these files missing is stale and must refresh from current GitHub `main` before building the video.

## Stop gate

```text
AUDIO_EDIT_DECISION = PASS
TARGET_NARRATION_DURATION = 94_TO_95_SECONDS
SYNTHETIC_VOICE = FORBIDDEN
TRUTH_BOUNDARY = PRESERVED_WITH_REQUIRED_UI_PROVENANCE
REPOSITORY_EVIDENCE_BLOCKER = CLEARED
VIDEO_BUILD = AUTHORIZED
NEXT_EXACT_GATE = TRACE_GATE_6_75_RENDER_CANDIDATE_AND_COMPRESSED_READABILITY_REVIEW
```

Proceed directly to the 1920×1080 video candidate. Use the actual production UI and actual canonical receipts; no fake terminal, fake logs, synthetic proof, or decorative AI dashboard animation.