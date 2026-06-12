"use server";

import {
  createContactMessage,
  getContactMessageErrorMessage,
} from "@/lib/db/queries/contact-messages";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactMessageAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    await createContactMessage({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      sourcePage: String(formData.get("sourcePage") ?? "home"),
    });

    return { status: "success" };
  } catch (error) {
    return { status: "error", message: getContactMessageErrorMessage(error) };
  }
}
