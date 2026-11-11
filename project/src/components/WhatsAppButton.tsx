// Floating contact shortcut, bottom-right on every page.
const KARAN_WHATSAPP = 'https://wa.me/919873199799?text=Hi%20Karan%2C%20I%27m%20interested%20in%20NurvoSync';

export default function WhatsAppButton() {
  return (
    <a
      href={KARAN_WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center shadow-lg hover:bg-signal transition-colors"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.99.58 3.84 1.58 5.4L2 22l4.72-1.55a9.96 9.96 0 0 0 5.29 1.52h.01c5.53 0 10-4.48 10-10.01C22.02 6.48 17.54 2 12.01 2Zm0 18.17h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1 1.02 1.04-3.02-.2-.31a8.14 8.14 0 0 1-1.26-4.37c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.53-3.68 8.2-8.21 8.2Zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
      </svg>
    </a>
  );
}
