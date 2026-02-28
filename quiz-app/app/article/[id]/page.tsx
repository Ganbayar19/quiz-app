import prisma from "@/lib/prisma";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true },
  });

  if (!quiz) return <div>Not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">{quiz.summary}</div>

      <button className="bg-black text-white px-4 py-2 rounded">
        Generate Quiz
      </button>
    </div>
  );
}
