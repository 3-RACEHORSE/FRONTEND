import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { stringify } from "querystring";
import { json } from "stream/consumers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/loginvalid",
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
    async session({ session, token }) {
      session.user.id = token.id;
      return { ...session, ...token };
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
