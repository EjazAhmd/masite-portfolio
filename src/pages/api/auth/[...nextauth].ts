// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.log('No credentials provided!');
                    return null;
                }

                try {
                    const userWithPassword = await prisma.user.findUnique({
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            password: true,
                        },
                        where: {
                            username: credentials.username,
                        },
                    });

                    if (!userWithPassword) {
                        console.log('User not found!');
                        return null;
                    }

                    const compareResult = bcrypt.compareSync(credentials.password, userWithPassword.password);
                    if (compareResult) {
                        console.log('Passwords match! User authenticated.');
                        return {
                            id: userWithPassword.id,
                            name: userWithPassword.name,
                            email: userWithPassword.email,
                        };
                    } else {
                        console.log('Passwords do not match! Authentication failed.');
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authorization:', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.sub,
                    name: token.name,
                    email: token.email,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    pages: {
        signIn: "/signin",
    }
}

export default NextAuth(authOptions);
