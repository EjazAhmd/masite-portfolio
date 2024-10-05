import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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

                    if (!userWithPassword || !userWithPassword.password) {
                        console.log('User not found or password is null!');
                        return null;
                    }

                    const compareResult = await bcrypt.compare(credentials.password, userWithPassword.password);
                    if (compareResult) {
                        console.log('Passwords match! User authenticated.');
                        return {
                            id: userWithPassword.id,
                            name: userWithPassword.name || "Anonymous", // Ensure name is not null
                            email: userWithPassword.email || "",         // Ensure email is not null
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
        strategy: "jwt" as SessionStrategy,  // Use the correct type here
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {  // Explicitly typing session and token
            if (token) {
                session.user = {
                    id: token.sub,
                    name: token.name,
                    email: token.email,
                };
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user?: any }) {  // Typing jwt params
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
