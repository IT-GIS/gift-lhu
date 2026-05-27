"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { createPost, getPostErrorMessage, updatePost } from "@/lib/db/queries/posts";

function getFormValues(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "",
    ]),
  ) as Record<string, string>;
}

function withMessage(path: string, type: "success" | "error", message: string) {
  const params = new URLSearchParams({ [type]: message });
  return `${path}?${params.toString()}`;
}

export async function createPostAction(formData: FormData) {
  const session = await requireSession();
  assertPermission(session, "managePosts");

  let target = "/posts";

  try {
    const post = await createPost(getFormValues(formData));
    revalidatePath("/posts");
    target = withMessage(`/posts/${post.id}`, "success", "Post berhasil dibuat.");
  } catch (error) {
    target = withMessage("/posts/new", "error", getPostErrorMessage(error));
  }

  redirect(target);
}

export async function updatePostAction(formData: FormData) {
  const session = await requireSession();
  assertPermission(session, "managePosts");

  const values = getFormValues(formData);
  const postId = values.postId;
  let target = `/posts/${postId}`;

  try {
    const post = await updatePost(values);
    revalidatePath("/posts");
    revalidatePath(`/posts/${post.id}`);
    target = withMessage(`/posts/${post.id}`, "success", "Post berhasil diperbarui.");
  } catch (error) {
    target = withMessage(`/posts/${postId}`, "error", getPostErrorMessage(error));
  }

  redirect(target);
}
