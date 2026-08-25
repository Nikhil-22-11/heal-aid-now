# ClinSync Health Hub

ClinSync is a modern, responsive Healthcare PWA for smart OPD queues, AI voice symptom intake, OCR prescription vault, and ABDM/ABHA health record integration.

## Navigation Architecture
The app features a desktop sidebar (≥1024px) and mobile bottom navigation bar with 5 primary tabs:
1. 📊 **Home** (Active token queue, live summary, quick actions, patient health profile)
2. 📅 **Book** (Doctor roster, specialty filters, real-time wait estimates, instant token booking)
3. 🎙️ **Intake** (AI voice intake simulator in Hindi/English, touch symptom grid, Ayush Dosha triage)
4. 📁 **Vault** (Scanned OCR intelligence, laser scan simulator, past visit summaries & digital prescriptions)
5. 👤 **Profile** (Patient profile editor, ABDM health locker sync, official ABHA ID card, DPDP 2023 consent switches)

## Emergency Assist
- Instant 🚨 **Nurse Assist & 108 Emergency Ambulance** triage available from both sidebar and mobile emergency banner.

## Tech Stack
- React 19 + TypeScript
- TanStack Router / TanStack Start
- Tailwind CSS with bespoke clinical tokens
- Lucide React & Sonner Toast feedback
