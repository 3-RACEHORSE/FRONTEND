import { auth } from "@/auth";
import LoginValid from "./_component/LoginValid";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <LoginValid
        email={session?.user.email}
        snsType="google"
        snsId={session?.user.id}
      />
    </main>
  );
}
