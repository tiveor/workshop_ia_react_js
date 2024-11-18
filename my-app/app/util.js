const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

async function askGPT(messages) {
  if (!openai.apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return response.choices[0].message.content;
  } catch (error) {
    // Add more specific error handling for billing issues
    if (error.message.includes("billing")) {
      console.error("Error de facturación: Por favor verifica que:");
      console.error("1. Tu método de pago esté actualizado en OpenAI");
      console.error("2. No hayas excedido tu límite de uso");
      console.error("3. Tu cuenta tenga saldo disponible");
      console.error(
        "4. La API key que estás usando corresponda a la cuenta donde realizaste el pago"
      );
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
}

module.exports = { openai, askGPT };
