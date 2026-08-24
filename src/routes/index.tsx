import { createFileRoute } from "@tanstack/react-router";
import { MediKioskApp } from "@/components/medikiosk/MediKioskApp";

const title = "MediKiosk — Smart OPD Tokens, AI Intake & ABHA Records";
const description =
  "MediKiosk is a healthcare PWA for live OPD token queues, AI voice symptom intake, OCR prescription vault and ABHA-linked health profiles.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MediKioskApp />;
}
