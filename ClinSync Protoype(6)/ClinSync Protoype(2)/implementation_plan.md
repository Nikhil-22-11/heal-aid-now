# FHIR Integration — ClinSync Phase 1 Implementation Plan

## What This Accomplishes
Upgrades ClinSync from a "display-only" prototype to a **real ABDM-compliant FHIR data system**.
Every patient visit generates structured, portable, nationally-readable medical records.

---

## What Changes — 3 Core Additions

### 1. `Encounter` Resource — OPD Token → Clinical Visit Record
**Trigger:** When a patient books an OPD slot (clicks "Book" on a doctor)  
**What happens:** A FHIR `Encounter` is created in the background with:
- Token number as identifier (T042)
- Doctor name + room
- Patient ABHA ID
- Timestamp + status = `in-progress`

**DB change:** New `encounters` table in SQLite  
**Backend:** New endpoint `POST /api/fhir/encounter`  
**Frontend:** Called silently after `handleBook()` in `ClinSyncApp.tsx`

---

### 2. `Composition` Resource — Pre-Consult AI Report → Official Document
**Trigger:** When patient clicks "Next" after AI Intake completes  
**What happens:** A FHIR `Composition` document is created containing:
- Chief complaint, HPI, Associated symptoms
- Ayush parameters (Prakriti, Vikriti, Agni)
- Vitals (BP, SpO2, Pulse, Temp)
- Allergy list from voice intake
- Past medical history

**DB change:** New `compositions` table in SQLite  
**Backend:** New endpoint `POST /api/fhir/composition`  
**Frontend:** Called silently in `screens.tsx` after AI analysis completes

---

### 3. `MedicationRequest` Upgrade — Add SNOMED Drug Codes
**Trigger:** When doctor saves prescription  
**What happens:** The existing `build_fhir_bundle()` on backend is upgraded to:
- Look up drug name against a built-in SNOMED/RxNorm mapping table (top 50 Indian OPD drugs)
- Add `coding` array with system + code alongside the existing `text` field
- AllergyIntolerance resource added from patient's allergy list

**DB change:** None (extends existing `prescriptions` table)  
**Backend:** Upgrade `build_fhir_bundle()` in `server.py`  
**Frontend:** No change — existing save prescription flow already calls this

---

## Proposed Changes by File

---

### Backend — `server.py`

#### [MODIFY] [server.py](file:///d:/clinsync/ClinSync%20Protoype(2)/heal-aid-now-main%20prototype/heal-aid-now-main/server.py)

1. Add 2 new DB models: `Encounter`, `PreConsultComposition`
2. Add Pydantic models: `EncounterRequest`, `CompositionRequest`
3. Add SNOMED drug code lookup table (top 50 Indian OPD drugs)
4. Add `POST /api/fhir/encounter` endpoint
5. Add `POST /api/fhir/composition` endpoint
6. Add `GET /api/fhir/patient/{abha_id}/timeline` — returns all FHIR records for a patient
7. Upgrade `build_fhir_bundle()` to add SNOMED codes + AllergyIntolerance resource

---

### Frontend — ClinSync Components

#### [MODIFY] [ClinSyncApp.tsx](file:///d:/clinsync/ClinSync%20Protoype(2)/heal-aid-now-main%20prototype/heal-aid-now-main/src/components/clinsync/ClinSyncApp.tsx)
- After `handleBook()` → fire `POST /api/fhir/encounter` silently in background

#### [MODIFY] [screens.tsx](file:///d:/clinsync/ClinSync%20Protoype(2)/heal-aid-now-main%20prototype/heal-aid-now-main/src/components/clinsync/screens.tsx)
- After AI analysis completes in `handleAnalyzeAi()` → fire `POST /api/fhir/composition` silently

#### [NEW] `FHIRTimeline.tsx`
- New component for the patient's Health Vault tab
- Shows a timeline of all FHIR records: Encounters, Compositions, Prescriptions
- Calls `GET /api/fhir/patient/{abha_id}/timeline`

---

## What the Doctor Gains

In the Doctor Workspace, after this is done:
- Pre-Consult report is backed by a real FHIR `Composition` ID (verifiable)
- Prescription generates `AllergyIntolerance` resources automatically
- Drug codes make prescriptions pharmacy-readable

## What the Patient Gains

In the Health Vault tab:
- Can see a full clinical timeline: "Visit on Sep 5 — Dr. Sharma — Chest Pain → Prescription #NDHM-HIP-..."
- All records have FHIR IDs and can be exported

---

## Verification Plan

### Automated
- `GET /health` shows new endpoints registered
- `GET /api/fhir/patient/{abha_id}/timeline` returns records after booking + intake

### Manual
1. Register new patient → book doctor → check SQLite `encounters` table has a row
2. Complete AI intake → check `compositions` table has a row with chief complaint
3. Doctor saves prescription → check FHIR bundle now has `AllergyIntolerance` + SNOMED codes
4. Health Vault tab shows the timeline correctly

---

> [!NOTE]
> All FHIR pushes are **fire-and-forget** — they happen silently in the background. The user experience does not change at all. If the backend is offline, the app still works normally.
