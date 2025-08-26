import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key';

interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token Provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return NextResponse.json({ message: `Hello, ${decoded.username}` }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or Expired Token' }, { status: 403 });
  }
}