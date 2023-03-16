import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";
import axios from "axios";

export const authOption = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProviders({
      name: "Credentials",
      // credentials: {
      //   username: { label: "username", type: "text", placeholder: "zonggo" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        const res = await axios.post("http://127.0.0.1:1337/api/auth/local", {
          identifier: credentials.username,
          password: credentials.password,
        });
        const { user } = res.data;

        return user;
      },
    }),
  ],

  callback: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },

  async session({ session, token, user }) {
    session.accessToken = token.accessToken;
    return session;
  },
};

export default NextAuth(authOption);
