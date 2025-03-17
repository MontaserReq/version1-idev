import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic"; // 💡 يمنع Next.js من محاولة تحسين هذا الـ API أثناء `build`

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userName, email, universityId, question, selectedAnswer, correctAnswer, timeTaken, points } = await req.json();

  try {
    const quizResponse = await prisma.quizResponse.create({
      data: { userName, email, universityId, question, selectedAnswer, correctAnswer, timeTaken, points },
    });

    return new Response(JSON.stringify({ success: true, quizResponse }), { status: 200 });
  } catch (error) {
    console.error("Error saving quiz response:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to save response" }), { status: 500 });
  }
}
