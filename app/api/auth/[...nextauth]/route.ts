import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Owner Login",

      credentials: {
        email: { label: "Email", type: "email" },
      },

      async authorize(credentials) {
        const rawEmail =
          credentials?.email ||
          (credentials as any)?.username ||
          (credentials as any)?.emailAddress;

        if (!rawEmail) return null;

        const email = rawEmail.trim().toLowerCase();
        const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();

        if (!ownerEmail) {
          throw new Error("OWNER_EMAIL not configured");
        }

        if (email !== ownerEmail) {
          return null;
        }

        // ✅ Return minimal owner identity (NO DB dependency)
        return {
          id: "owner",
          email: ownerEmail,
          name: "Owner",
          role: "OWNER",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "OWNER";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

