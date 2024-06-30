import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KaKaoProvider from "next-auth/providers/kakao";
// import { stringify } from "querystring";
// import { json } from "stream/consumers";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/join",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    KaKaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // console.log(token, account);
        token.id = account?.providerAccountId;
        token.type = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.type = token.type;

      return { ...session, ...token };
    },
    async signIn({ user, account }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              snsType: account?.provider,
              snsId: account?.providerAccountId,
            }),
          }
        );
        const data = await res.json();

        // console.log("상태", data.status);
        if (data.statusCodeValue === 200) {
          const authorization: any = res.headers.get("authorization");
          const uuid: any = res.headers.get("uuid");
          cookies().set("authorization", authorization);
          cookies().set("uuid", uuid);
          console.log(data);
          console.log("로그인되었습니다.");
          return true;
        } else if (data.statusCodeValue === 201) {
          console.log("회원가입이 필요합니다.");
          return true;
        } else {
          throw data.message;
        }
      } catch (error) {
        return true;
      }
    },
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  trustHost: true,
});
