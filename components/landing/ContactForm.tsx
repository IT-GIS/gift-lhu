"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { MessageSquareText, Send } from "lucide-react";
import { submitContactMessageAction, type ContactFormState } from "@/lib/actions/contact";
import { useLandingLanguage } from "./landing-language-provider";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton({ sendLabel, sendingLabel }: { sendLabel: string; sendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button suppressHydrationWarning className="wpr-button" type="submit" disabled={pending}>
      {pending ? sendingLabel : sendLabel} <Send size={16} />
    </button>
  );
}

export function ContactForm({ sourcePage }: { sourcePage: "home" | "contact" }) {
  const { content } = useLandingLanguage();
  const { contactForm } = content;
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
          <strong>{contactForm.eyebrow}</strong>
          <span>{contactForm.subtitle}</span>
        </div>
      </div>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div className="gift-wp-form-row">
        <label>{contactForm.nameLabel}<input suppressHydrationWarning className="wpr-form-field" name="name" placeholder={contactForm.namePlaceholder} required /></label>
        <label>{contactForm.emailLabel}<input suppressHydrationWarning className="wpr-form-field" type="email" name="email" placeholder={contactForm.emailPlaceholder} required /></label>
      </div>
      <label>{contactForm.companyLabel}<input suppressHydrationWarning className="wpr-form-field" name="company" placeholder={contactForm.companyPlaceholder} /></label>
      <label>{contactForm.messageLabel}<textarea suppressHydrationWarning className="wpr-form-field" name="message" placeholder={contactForm.messagePlaceholder} rows={7} required /></label>
      <SubmitButton sendLabel={contactForm.sendLabel} sendingLabel={contactForm.sendingLabel} />
      {state.status === "success" && (
        <p className="gift-wp-form-feedback gift-wp-form-feedback-success">
          {contactForm.successMessage}
        </p>
      )}
      {state.status === "error" && (
        <p className="gift-wp-form-feedback gift-wp-form-feedback-error">{state.message}</p>
      )}
    </form>
  );
}
