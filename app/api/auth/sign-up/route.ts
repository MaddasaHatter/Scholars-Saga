import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {

    try {
        const {email, password, role} = await request.json();
        // validate email and password, maybe zod

        const hashedpassword = await hash(password, 10);

        const user = await prisma.users.create({
            data: {
                id: 10002,
                email: email,
                password: hashedpassword,
                role: role
            }
        })

        return NextResponse.json(user, { status: 200});
        
    } catch (e) {
        console.log({ e });
    }
    
    return NextResponse.json({message: 'secussess'});
}
