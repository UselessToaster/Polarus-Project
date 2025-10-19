import { GoogleGenAI } from "@google/genai";
import { Proposition, Amendment, LegislativeBill } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const simplifyInitiative = async (measure: Proposition | Amendment): Promise<string> => {
  const prompt = `
    Explain the following ballot measure in simple, neutral, and easy-to-understand terms for a first-time voter.
    Structure the explanation into three sections:
    1.  **What it is:** A brief, one-sentence summary of the measure.
    2.  **A 'YES' vote means:** Clearly explain the outcome and main arguments for voting yes.
    3.  **A 'NO' vote means:** Clearly explain the outcome and main arguments for voting no.

    Keep the language impartial and focus on the practical consequences of the vote.

    ---
    **Ballot Measure Title:** ${measure.title}
    **Summary:** ${measure.summary}
    **Consequences of YES:** ${measure.consequences.yes}
    **Consequences of NO:** ${measure.consequences.no}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not simplify the measure at this time. Please try again later.";
  }
};

export const simplifyLegislativeBill = async (bill: LegislativeBill): Promise<string> => {
  const prompt = `
    Explain the following legislative bill in simple, neutral terms for an average citizen.
    Structure the explanation into three sections:
    1.  **What it Does:** A brief, one or two-sentence summary of the bill's main purpose.
    2.  **Current Status:** Explain what its current status (e.g., "${bill.status}") means in the legislative process.
    3.  **Potential Impact:** Briefly describe the potential impact on the public if this bill becomes law.

    Keep the language impartial.

    ---
    **Bill Title:** ${bill.title}
    **Summary:** ${bill.summary}
    **Level:** ${bill.level}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not simplify the bill at this time. Please try again later.";
  }
};
