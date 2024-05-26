import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { stringify } from "querystring";
// import { json } from "stream/consumers";

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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.id = account?.providerAccountId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return { ...session, ...token };
    },
    async signIn({ user, account }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              snsType: "google",
              snsId: account?.providerAccountId,
            }),
          }
        );
        const data = await res.json();
        console.log("리스판스", res.status);
        console.log("데이터", data.statusCodeValue);

        // console.log("상태", data.status);
        if (data.statusCodeValue === 200) {
          // console.log("엑세스 토큰!", res.headers.get("authorization"));
          // console.log("유유아이디!", res.headers.get("uuid"));
          console.log("로그인되었습니다.");
          // return "/";
          return true;
        } else if (data.statusCodeValue === 201) {
          console.log("회원가입이 필요합니다.");
          // return "/join";
          return true;
        } else {
          throw data.message;
        }
      } catch (error) {
        return true;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
