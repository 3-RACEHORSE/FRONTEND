"use server";

import { auth } from "@/auth";

export async function sessionValid() {
  const session = await auth();
  if (!session) {
    return false;
  }
  return true;
}
