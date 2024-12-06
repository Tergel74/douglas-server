import OpenAI from 'openai';
const openai = new OpenAI();

export async function sendChat(
  system: string,
  history: string,
  question: string,
) {
  let context = `
    ${system}\n\n
    Conversation History: ${history}
    `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: context,
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: question,
          },
        ],
      },
    ],
  });

  return response.choices[0].message;
}
