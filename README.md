# Offline-First Mental Health App — High-Priority Implementation Plan

> A single-file checklist + plan for a privacy-first, offline-capable mental health app (desktop installer + web landing page). Focus: **must-have** items for a real implementation and hackathon demo readiness.

---

## 1. Core project goal (one line)

Provide a fully functioning mental-health support app that **runs locally by default**, offers evidence-based journaling & CBT micro-interventions, includes a safety escalation pipeline, and ships as an installer (.exe) that downloads a quantized LLaMA-style model for offline inference.

---

## 2. Must-have features (highest priority — implement first)

1. **Mood Check-In (text + voice input)**
2. **Journaling with AI CBT Reframe** (local inference; supportive language)
3. **Safety Escalation Engine** (deterministic keyword + conservative classifier)
4. **Privacy Mode (Local-only toggle)** — default ON
5. **Local Encrypted Storage** (AES-256; key derived from user password)
6. **Installer Bootstrapper** (.exe that downloads model files & verifies SHA256)
7. **Local Model Runtime Integration** (llama.cpp / GGUF / quantized runtime)
8. **Offline RAG corpus** (curated CBT docs, crisis resources) with local embeddings
9. **Digital Bonsai Tracker** (progress visualization / gamification)
10. **Calm Hub** (pre-bundled nature scenes + audio + breathing animation)
11. **Clinician Export (RAG-based summary)** — opt-in, editable
12. **Fallback Demo Mode** (canned responses when model download fails)

---

## 3. Why each is high-priority (short justification)

* *Mood check-in & journaling:* Core proven behavior change mechanisms; drives personalization.
* *Safety escalation:* Legal & ethical non-negotiable — protects users and judges look for it.
* *Privacy Mode & local storage:* Differentiator and necessary for user trust and compliance.
* *Installer + model runtime:* Enables true offline experience; central technical complexity.
* *Offline RAG:* Allows targeted, evidence-based content retrieval without the cloud.
* *Clinician export:* Demonstrates clinical integration potential and real-world utility.
* *Fallback demo mode:* Ensures robust demo even when downloads fail.

---

## 4. Minimal architecture (high-level)

* **Frontend:** React (web) + Tauri (desktop shell) for small, secure executables.
* **Local runtime:** llama.cpp (GGUF / quantized) or a small distilled model.
* **Local DB:** Encrypted SQLite storing journals, embeddings, metadata.
* **RAG:** Local nearest-neighbor (FAISS/Annoy/SQLite + vector table).
* **Installer:** Lightweight bootstrapper exe (downloads model assets), verifies checksums.
* **Optional Cloud:** Disabled by default; explicit opt-in with end-to-end encryption.

---

## 5. Installer & first-run behavior (must implement exactly)

1. User downloads `installer.exe` from website.
2. Installer extracts app to `%LOCALAPPDATA%\YourApp` (or Program Files if chosen) and creates a launcher.
3. On first launch, app prompts user to accept privacy terms & enter a local password (used to derive encryption key).
4. App downloads quantized model files from CDN (show progress bar).
5. App downloads model checksum file and verifies SHA256. If signature mismatch → abort and show error.
6. If model download fails or user declines, app switches to **Demo Mode** with canned LLM replies.
7. After successful download and verification, compute or load local embeddings for offline RAG corpus.

---

## 6. Model & packaging constraints (urgent)

* **Preferred format:** GGUF / quantized ggml (compatible with llama.cpp). Use 4-bit / 5-bit quantization to reduce download size.
* **Target size:** aim ≤ 4–6 GB for practical consumer download; if not possible, ship small adapter weights (QLoRA) + require user to download base model separately per license.
* **Licensing:** Verify model redistribution rights; if restricted, provide an installer that *links* or instructs user to download official base model and then applies your adapter.

---

## 7. Local RAG corpus (what to include)

* Core CBT modules (structured exercises in markdown)
* Crisis resources (global helplines, localizable)
* Short psychoeducation pieces (sleep, breathing, grounding techniques)
* Sample clinician guidance templates (for export)

> Precompute embeddings for these documents and bundle them (or compute embeddings at first run once model is available).

---

## 8. Security & privacy checklist (must do before public release)

* Default to **local-only** mode; cloud sync opt-in.
* **Encrypt user data at rest (AES-256-GCM).**
* Use **Argon2** or **PBKDF2** for key derivation from password; never store password in plain text.
* Use HTTPS + signed URLs for model/CDN files; verify SHA256 and optionally RSA signature.
* Limit logs and anonymize telemetry; provide a clear data deletion/export option.
* Minimal permissions in installer (avoid admin rights unless required); clearly state what the installer will do.

---

## 9. Safety & escalation (implementation details)

* **Multi-layer detection:** 1) deterministic keyword & regex list (high recall); 2) conservative on-device classifier (low false negatives); 3) if flagged -> immediate UI modal with crisis resources + optional call-to-action to connect to human help.
* **Escalation flow:** Show resources → offer to call local helpline (open dialer or show number) → give option to connect to clinician/export data.
* **Logging:** keep flagged events locally encrypted; do not auto-share unless user explicitly consents.

---

## 10. UI placement & flow (priority-based)

* **Top nav / Home:** Mood check-in widget (quick entry)
* **Primary CTA:** "Journal" (central large button)
* **Secondary tabs:** Calm Hub, Bonsai (progress), History/Timeline, Settings (privacy toggle)
* **Journal entry screen:** Text area, optional voice record, Save + "Reflect" button (runs local LLM)
* **On result:** AI shows: Mood tag, 1-sentence summary, 1 CBT reframe, 2 suggested next steps
* **Safety modal:** interruptive modal with helpline and reassurance copy

---

## 11. Demo script (essential to prepare)

1. Show landing page → click `Download` → run `installer.exe` (explain bootstrap behavior)
2. First-run: accept privacy, enable local-only mode, show model download progress (or fallback demo mode)
3. Mood check-in: type/voice input → app shows mood tag
4. Journal: write a short entry → click `Reflect` → AI returns CBT reframe
5. Bonsai growth: show plant grows after entry
6. Calm Hub: open a nature scene + breathing animation (play audio)
7. Safety demo: type a flagged phrase and show escalation modal
8. Clinician export: click export and show RAG-generated brief (editable)

---

## 12. Demo-time fallbacks (prepare these files)

* Canned model responses JSON for demo mode
* Small tiny model (e.g., llama-2-7B-mini or distilled tiny) for offline quick responses if LLaMA-3 not ready
* Precomputed embeddings + small RAG DB for quick retrieval

---

## 13. Legal & ethical quick-notes (must include in onboarding)

* Clear disclaimer: this tool is *supportive* not a medical diagnostic tool.
* Consent form for any research / analytics; explicit opt-in.
* If using medical training data, confirm dataset licenses and privacy compliance.

---

## 14. Development checklist & prioritized tasks (do these first)

1. Build UI skeleton (React + Tauri) — include mood, journal, calm hub, bonsai, settings
2. Implement encrypted local DB and privacy toggle (start with simple password-derived key)
3. Integrate a mock LLM flow (canned responses) to test UI
4. Implement deterministic safety checks and modal flows
5. Implement installer that copies app and runs first-run script
6. Add model download + SHA256 verification (PowerShell/launcher)
7. Integrate real local runtime (llama.cpp) and point LLM calls to it
8. Bundle offline RAG corpus and embed or compute embeddings
9. Add clinician export + sample RAG summary
10. Polish microcopy and onboarding privacy text

---

## 15. Files & artifacts to prepare for upload/download

* `installer.exe` (bootstrapper)
* `app.zip` or app folder (front-end + runtime launcher)
* `model.gguf` (quantized model) — host on CDN
* `model.gguf.sha256` (checksum file)
* `rag_corpus.zip` (markdown docs + precomputed embeddings)
* `demo_responses.json` (fallback)
* `README.md` (installation & privacy notes)

---

## 16. Quick scripts references (include in repo)

* PowerShell download + checksum verification (for Windows)
* Simple launcher Python script that starts local model server and Tauri frontend
* SQLite encryption helper (example using Python `cryptography`)

---

## 17. Final priorities for Sunday 9 a.m. (what you must have working)

1. UI skeleton with mood check-in + journal + calm hub + bonsai
2. Local encrypted storage and privacy toggle
3. Safety escalation working (regex + modal)
4. Installer that launches app and can simulate model download
5. Local LLM mock or tiny model providing CBT reframes
6. Demo script and fallback canned responses

---

## 18. Next recommended deliverable I can prepare for you now

* Tauri + React starter repo file tree and essential code snippets OR
* `installer.ps1` + Inno Setup script with checksum flow OR
* Pre-written onboarding & safety microcopy for the app

---

*Keep this document as the single source of truth for the demo; follow the prioritized checklist under section 14 & 17 first. Good luck — you can do this.*
