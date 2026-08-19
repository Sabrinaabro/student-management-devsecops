import prisma from "../config/prisma.js";

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://host.docker.internal:11434";

const MODEL = "llama3.2:3b";

export const askAI = async (message: string) => {
  // Get student data from PostgreSQL through Prisma
  const students = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      age: true,
      department: true,
      email: true,
    },
  });

  const studentData = JSON.stringify(students, null, 2);

  const prompt = `
You are an AI assistant for a Student Management System.

Here is the current student data from the database:

${studentData}

Answer the user's question using this student data when relevant.

Rules:
- Do not invent student information.
- Only use the provided student data for questions about students.
- If the information cannot be determined from the data, say so.
- Keep the answer clear and concise.
- Never expose passwords, JWT tokens, or authentication information.

User question:
${message}
`;

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(`Ollama error: ${error}`);
  }

  const data = await response.json();

  return data.message.content;
};
