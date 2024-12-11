import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export const authOptions: NextAuthOptions = {
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

          const data = res.data[0];
          const hashedPassword = data.E2;

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            hashedPassword,
          );

          const user = {
            id: data._id,
            email: data.I,
            name: data.D,
            surname: data.E,
            currentBidderNumber: data.Z2,
            isRegisteredForAuction: data.A3,
            bidderNumbers: data.X1,
            phone: data.P,
            consignerNr: data.B,
            consignerObjects: data.A,
            company: { companyName: data.W, iban: data.L },
            mainAddress: {
              address: data.R,
              address2: data.W2,
              plz: data.T,
              city: data.U,
              country: data.B2,
            },
          };

          if (isPasswordValid) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Error authentification:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session) {
        if (session.company) token.company = session.company;
        if (session.mainAddress) token.mainAddress = session.mainAddress;
        if (session.currentBidderNumber)
          token.currentBidderNumber = session.currentBidderNumber;
        if (session.isRegisteredForAuction)
          token.isRegisteredForAuction = session.isRegisteredForAuction;
        if (session.bidderNumbers) token.bidderNumbers = session.bidderNumbers;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          surname: user.surname,
          currentBidderNumber: user.currentBidderNumber,
          isRegisteredForAuction: user.isRegisteredForAuction,
          bidderNumbers: user.bidderNumbers,
          phone: user.phone,
          consignerNr: user.consignerNr,
          consignerObjects: user.consignerObjects,
          company: user.company,
          mainAddress: user.mainAddress,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          surname: token.surname,
          currentBidderNumber: token.currentBidderNumber,
          isRegisteredForAuction: token.isRegisteredForAuction,
          bidderNumbers: token.bidderNumbers,
          phone: token.phone,
          consignerNr: token.consignerNr,
          consignerObjects: token.consignerObjects,
          company: token.company,
          mainAddress: token.mainAddress,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
