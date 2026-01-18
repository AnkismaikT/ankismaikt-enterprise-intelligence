import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

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
        // 1️⃣ Get email defensively
        const rawEmail =
          credentials?.email ||
          (credentials as any)?.username ||
          (credentials as any)?.emailAddress;

        if (!rawEmail) return null;

        const email = rawEmail.trim().toLowerCase();
        const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();

        if (!ownerEmail) {
          throw new Error("OWNER_EMAIL is not configured");
        }

        // 2️⃣ Enforce owner-only access
        if (email !== ownerEmail) {
          return null;
        }

        // 3️⃣ Fetch owner user from DB
        const user = await prisma.user.findUnique({
          where: { email: ownerEmail },
          include: { organization: true },
        });

        if (!user) {
          // Owner exists in env but not in DB
          throw new Error("Owner user not found in database");
        }

        // 4️⃣ Return safe user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          organizationId: user.organizationId,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.organizationId = (user as any).organizationId;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).organizationId = token.organizationId;
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

