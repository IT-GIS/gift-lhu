"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { MessageSquareText, Send } from "lucide-react";
import { submitContactMessageAction, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button suppressHydrationWarning className="wpr-button" type="submit" disabled={pending}>
      {pending ? "Mengirim..." : "Send Message"} <Send size={16} />
    </button>
  );
}

export function ContactForm({ sourcePage }: { sourcePage: "home" | "contact" }) {
  const [state, formAction] = useActionState(submitContactMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      className="elementor-element elementor-element-04512b7 elementor-widget elementor-widget-wpr-forms gift-wp-form"
      action={formAction}
    >
      <div className="gift-wp-form-header">
        <MessageSquareText size={24} />
        <div>
          <strong>Kirim Pertanyaan</strong>
          <span>Tim kami akan menindaklanjuti melalui email resmi.</span>
        </div>
      </div>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div className="gift-wp-form-row">
        <label>Name<input suppressHydrationWarning className="wpr-form-field" name="name" placeholder="Nama lengkap" required /></label>
        <label>Email<input suppressHydrationWarning className="wpr-form-field" type="email" name="email" placeholder="nama@perusahaan.com" required /></label>
      </div>
      <label>Company<input suppressHydrationWarning className="wpr-form-field" name="company" placeholder="Nama perusahaan / instansi" /></label>
      <label>Message<textarea suppressHydrationWarning className="wpr-form-field" name="message" placeholder="Ceritakan kebutuhan pengujian atau inspeksi Anda" rows={7} required /></label>
      <SubmitButton />
      {state.status === "success" && (
        <p className="gift-wp-form-feedback gift-wp-form-feedback-success">
          Terima kasih, pesan Anda berhasil terkirim. Tim kami akan segera menindaklanjuti.
        </p>
      )}
      {state.status === "error" && (
        <p className="gift-wp-form-feedback gift-wp-form-feedback-error">{state.message}</p>
      )}
    </form>
  );
}
