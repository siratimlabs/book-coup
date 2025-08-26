import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
//mock data
import { users } from '@/lib/mock-data'
const SECRET = 'your-secret-key';

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { username, password } = body;

    const founduser = users.find((u) => u.username === username);

    if(
        !founduser || !bcrypt.compareSync(password, founduser.password)
    ) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 401});
    }

    const token = jwt.sign({ username: founduser.username, role: founduser.role }, SECRET, {expiresIn: '1h'});

     return NextResponse.json( { token })
}