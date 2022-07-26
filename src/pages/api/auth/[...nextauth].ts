import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import Users from "../../../models/Users";
import bcrypt from 'bcrypt'
import dbConnect from "../../../utils/dbConnect";

dbConnect()

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email
        const password = credentials?.password
        if (!email || !password) throw Error('Check your credentials, and try again.')

        const user = await Users.findOne({email})
        if (!user) throw Error('You are not registered yet.')

        const match = await bcrypt.compare(password, user.password)
        if (match) return user
        else throw Error('Invalid password')
        
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
  },
});