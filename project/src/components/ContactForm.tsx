import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

// TODO: paste the access key from web3forms.com here once you have it.
const WEB3FORMS_ACCESS_KEY = '';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('not-configured');
      return;
    }

    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New pilot request — NurvoSync website');
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="border border-hairline bg-surface p-8 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-ink">Thanks — we'll be in touch.</p>
          <p className="text-sm text-muted mt-1">Your message has been sent.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(status === 'not-configured' || status === 'error') && (
        <div className="border border-hairline bg-surface p-4 flex items-start gap-3 text-sm">
          <AlertCircle className="w-4 h-4 text-signal flex-shrink-0 mt-0.5" />
          <p className="text-muted">
            {status === 'not-configured'
              ? "This form isn't wired up to a submission service yet"
              : 'Something went wrong sending this'}{' '}
            — please reach out directly via WhatsApp or email instead.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="spec-label block mb-1.5" htmlFor="name">Name</label>
          <input id="name" name="name" required className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink" />
        </div>
        <div>
          <label className="spec-label block mb-1.5" htmlFor="organisation">Organisation / Clinic</label>
          <input id="organisation" name="organisation" className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="spec-label block mb-1.5" htmlFor="role">Role</label>
          <input id="role" name="role" className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink" />
        </div>
        <div>
          <label className="spec-label block mb-1.5" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink" />
        </div>
      </div>

      <div>
        <label className="spec-label block mb-1.5" htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink" />
      </div>

      <div>
        <label className="spec-label block mb-1.5" htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required className="w-full border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink resize-none" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-medium text-sm hover:bg-signal transition-colors disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {status === 'sending' ? 'Sending…' : 'Request a Pilot'}
      </button>
    </form>
  );
}
