import { NextResponse } from "next/server";

// قاعدة بيانات وهمية (استبدلها بقاعدة بيانات فعلية)
const registeredUsers = new Map<string, { userName: string; email: string; universityId: string; ipAddress: string }>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, universityId, ipAddress } = body;

    // التحقق من أن البيانات مكتملة
    if (!email || !userName || !universityId || !ipAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // التحقق مما إذا كان المستخدم مسجل مسبقًا
    const isUserExists = [...registeredUsers.values()].some(
      (user) => user.email === email || user.userName === userName || user.universityId === universityId
    );

    if (isUserExists) {
      return NextResponse.json({ exists: true });
    }

    // حفظ بيانات المستخدم (استبدلها بإدخال البيانات في قاعدة بياناتك)
    registeredUsers.set(email, { userName, email, universityId, ipAddress });

    return NextResponse.json({ exists: false });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
