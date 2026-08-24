# MediKiosk Health Hub

Create a modern, responsive Healthcare PWA called "MediKiosk" optimized for mobile views (max-width 430px container centered on screen with mobile mockup frames, or selectable 5-tab views). 

THEME & STYLING:
- Primary Color: Deep Medical Blue (`#0052CC`)
- Accent Blue: Light Cyan (`#38BDF8`)
- Canvas / App Background: Light Slate (`#F8FAFC`) with Navy outer shell (`#0F172A`)
- Success / Verified: Leaf Green (`#00875A`, pill background `#DCFCE7`)
- Emergency Alert: Vivid Red (`#DE350B`)
- Typography: Inter / System Sans-serif, bold clear hierarchy with generous touch padding.

NAVIGATION ARCHITECTURE:
Implement a fixed bottom navigation bar across all screens with 5 tabs:
1. 📊 Home
2. 📅 Book
3. 🎙️ Intake
4. 📁 Vault
5. 👤 Profile

SCREENS TO IMPLEMENT:

--- SCREEN 1: HOME DASHBOARD ---
- Top Navbar: Brand logo "MediKiosk", language pill "🌐 ENG", and Avatar circle "NL".
- Active Token Card: 
  * Header: "ACTIVE TOKEN TODAY", Status badge "● Room 12"
  * Main display: Huge Token "#042" next to "Dr. Rajesh Sharma - Ayurveda OPD (Kayachikitsa)"
  * Progress: "Wait Time: ~12 Mins (2 Ahead)"
  * Button: Blue "View Live Summary"
- Quick Actions Grid (2 columns):
  * Card 1: 📅 "Book Doctor - Select & Queue"
  * Card 2: 🎙️ "AI Intake - Voice Symptoms"
- Health Profile Card:
  * Name: "Nikhil Ladwani (24 M)"
  * ABHA: "nikhil@abdm"
  * Red Pill Badge: "Penicillin Allergy"
  * AYUSH tags: "Prakriti: Vata-Pitta | Agni: Manda"
- Emergency Banner (Fixed at bottom above nav): 
  * Red background (`#DE350B`): "🚨 CHEST PAIN? TAP FOR NURSE ASSIST" (Triggers alert modal when clicked).

--- SCREEN 2: BOOK OPD APPOINTMENT ---
- Top Navbar: "Book OPD Appointment" with "🌐 ENG" pill.
- Specialty Pills Carousel: "🌿 Ayurveda" (Active/Selected), "🩺 Gen Med", "🫀 Cardio".
- Doctor Cards List:
  * Card 1: Dr. Rajesh Sharma (Kayachikitsa, Room 12) | "● Available Now • Wait: ~10m" | Primary Button: "Book Token #042 →"
  * Card 2: Dr. Priya Deshmukh (Panchakarma, Room 14) | "● Busy (Token #38) • Wait: ~25m" | Secondary Button: "Book Next Slot"
  * Card 3: Dr. Vikram Joshi (Kayachikitsa, Room 15) | "● Available Now • Wait: ~5m" | Primary Button: "Book Token"

--- SCREEN 3: AI SYMPTOM INTAKE ---
- Top Navbar: "← Step 1: Voice Intake", "🌿 AYUSH Mode" badge.
- Live Voice Mic Recording Container:
  * Outer glowing ring around a solid blue circle containing a white detailed microphone icon (capsule head with stand/base).
  * Text: "AI Listening in Hindi/English..."
  * Live Transcript Box: Gray pill with italicized sample text `"Stomach pain & severe acid burning..."`
- Touch Symptom Grid (2x2):
  * "🤢 Stomach / Agni (Acidity, Digestion)"
  * "🌡️ Fever / Cold (High Temperature)"
  * "🦴 Joint Stiffness (Vata Imbalance)"
  * "🩹 Follow-up (Old Prescription)"
- Primary Action Button at bottom: Full-width blue "Next: Scan Documents →" (navigates to Vault screen).

--- SCREEN 4: RECORDS & OCR VAULT ---
- Top Navbar: "Records & OCR Vault", "+ Upload" pill.
- Scanned OCR Intelligence Box:
  * Title: "Scanned OCR Intelligence"
  * Green tag: "✓ Paracetamol 500mg (Active) - 10-Jul Visit"
  * Yellow warning tag: "⚠️ Duplicate Painkiller Alert - Flagged AI"
- Past Visit History List:
  * Visit 1 Card: "12-Jul-2026 | Dr. Rajesh Sharma" | "Ayurveda OPD • Epigastric burning" | Action buttons: "📄 Summary PDF", "💊 Prescriptions"
  * Visit 2 Card: "04-Mar-2026 | Dr. A. K. Verma" | "General Med • Seasonal fever" | Action buttons: "📄 Summary PDF", "💊 Prescriptions"

--- SCREEN 5: MY PROFILE & ABHA ---
- Top Navbar: "My Profile & ABHA", "⚙️ Edit" button.
- Profile Header Card: Avatar "NL", "Nikhil Ladwani", "Patient ID: #8892 • Age: 24 (M)", "📱 Mobile: +91 98765 43210", Green badge "Verified ✓".
- ABDM Digital Health Account Card (Soft Blue BG `#EFF6FF`):
  * Title: "ABDM Digital Health Account (ABHA)"
  * "Linked Handle: nikhil@abdm" | "Status: Connected to National Health Exchange"
  * Buttons: "🔄 Sync Health Locker", "View ABHA Card"
- Saved Clinical & AYUSH Profile Card:
  * "Prakriti Constitution: Vata-Pitta"
  * "Agni Status: Manda (Sluggish)"
  * Red tag: "⚠️ Penicillin Allergy" | Gray tag: "Blood Group: B Positive"
- DPDP Act 2023 Consent Logs Card:
  * Switch 1 (Toggled ON): "Share Intake Summary with Doctor"
  * Switch 2 (Toggled OFF): "Cache Voice Recording Temporarily"

INTERACTIONS & STATE:
- Clicking bottom nav tabs switches active screen smoothly.
- Clicking "Book Token" or "AI Intake" updates state and navigates across screens.
- Make components fully interactive with working toggles, tab switching, and mock data.



REFRACTOR LAYOUT: REMOVE MOBILE PHONE FRAME & MAKE FULLY RESPONSIVE (DESKTOP + MOBILE)
1. REMOVE FIXED MOBILE WRAPPER:
- Completely remove the artificial centered 430px phone container/mockup shell background. 
- Expand the app layout to 100% width and height (`min-h-screen w-full`).
2. DESKTOP LAYOUT (Laptops & Desktops - Screen width ≥ 1024px):
- Left Fixed Sidebar (w-64): Display a full-height dark sidebar (`#0F172A`) featuring:
  * Brand Logo "MediKiosk" & Patient Badge "Nikhil Ladwani".
  * Vertical Navigation Links with icons: 📊 Dashboard, 📅 Book OPD, 🎙️ AI Intake, 📁 Document Vault, 👤 Profile & ABHA.
  * Fixed Red Emergency Banner at the bottom of the sidebar (`#DE350B`): "🚨 CHEST PAIN? TAP FOR NURSE ASSIST".
- Top Header Bar: Search bar, Language toggle ("🌐 ENG / हिंदी"), and Notifications/Avatar.
- Main Content Area: Multi-column grid (`grid grid-cols-1 lg:grid-cols-2 gap-6`) showing widescreen cards so information fills laptop screens cleanly without empty space.
3. MOBILE LAYOUT (Smartphones - Screen width < 1024px):
- Automatically hide the Left Sidebar (`hidden lg:block`).
- Show the Fixed Bottom Navigation Bar (`fixed bottom-0 w-full lg:hidden`) with the 5 tab icons.
- Collapse all content cards into a single touch-friendly vertical stack (`w-full px-4`).
4. MAINTAIN ALL CONTENT & STATE:
- Keep all 5 interactive screens (Dashboard, Doctor Select, AI Intake, OCR Vault, Profile & ABHA) fully functional with smooth tab navigation.
- Retain the active token (#042), doctor booking state, and emergency triage alert modal.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/853fcb2b-7b98-4898-8176-48b8ee03d8da).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
