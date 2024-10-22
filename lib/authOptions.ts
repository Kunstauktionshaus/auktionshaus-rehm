import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await axios.get(URL, {
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
            params: {
              filters: JSON.stringify({ I: credentials.email }),
            },
          });

          if (!res.data[0]) {
            return null;
          }

          const user = res.data[0];
          const hashedPassword = user.E2;

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            hashedPassword,
          );

          if (isPasswordValid) {
            return { id: user._id, email: user.I, name: `${user.D} ${user.E}` };
          }

          return null;
        } catch (error) {
          console.error("Error authentification:", error);
          return null;
        }
      },
    }),
  ],
};
