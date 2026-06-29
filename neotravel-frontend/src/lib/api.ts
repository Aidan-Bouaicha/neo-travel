import type { GenerateQuoteRequest, QuoteResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function generateQuote(data: GenerateQuoteRequest): Promise<QuoteResponse> {
  const response = await fetch(`${API_URL}/generate-quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la génération du devis");
  }

  return response.json();
}
