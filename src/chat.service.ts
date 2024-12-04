import OpenAI from 'openai';
const openai = new OpenAI();

export async function sendChat(
  system: string,
  assistant: string[],
  user: string[],
) {
  let messages = [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: system,
        },
      ],
    },
  ];
  assistant.map((text, index) => {
    messages.push({
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: text,
        },
      ],
    });
    messages.push({
      role: 'user',
      content: [
        {
          type: 'text',
          text: user[index],
        },
      ],
    });
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: system,
          },
        ],
      },
    ],
  });
}
