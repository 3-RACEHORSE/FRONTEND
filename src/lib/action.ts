"use server";

import { auth } from "@/auth";

export async function myAction() {
  const session = await auth();
  return console.log(session);
  //   return session;
}
