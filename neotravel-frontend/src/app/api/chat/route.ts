import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const SYSTEM_PROMPT = `Tu es Neo, l'assistant virtuel de NeoTravel, une entreprise de transport en autocar.

Ton rôle est de collecter les informations nécessaires pour générer un devis de transport.

INFORMATIONS À COLLECTER (dans cet ordre) :
1. Nom complet du client
2. Email
3. Téléphone
4. Ville de départ
5. Ville d'arrivée  
6. Date de départ (format YYYY-MM-DD)
7. Date de retour (optionnelle, format YYYY-MM-DD)
8. Nombre de passagers

RÈGLES :
- Pose UNE SEULE question à la fois
- Sois poli, professionnel et concis
- Valide chaque information avant de passer à la suivante
- Pour l'email, vérifie qu'il contient @ et un domaine
- Pour le téléphone, accepte les formats français (10 chiffres)
- Pour les dates, aide l'utilisateur si besoin (ex: "demain" → date du jour +1)

QUAND TOUTES LES INFOS SONT COLLECTÉES :
Réponds avec un JSON à la fin de ton message dans ce format exact :
{"complete": true, "data": {"nom": "...", "email": "...", "telephone": "...", "depart": "...", "arrivee": "...", "date_depart": "YYYY-MM-DD", "date_retour": "YYYY-MM-DD", "nombre_passagers": X}}

Ne génère ce JSON que quand tu as TOUTES les informations obligatoires.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages manquants" },
        { status: 400 }
      );
    }

    // Formater les messages pour le SDK
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Utilisation du Vercel AI SDK avec OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
      temperature: 0.7,
    });

    const assistantMessage = text || "";

    // Chercher si un JSON complet est présent
    const jsonMatch = assistantMessage.match(/\{"complete":\s*true[\s\S]*?\}/);
    
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.complete && parsed.data) {
          const cleanMessage = assistantMessage.replace(jsonMatch[0], "").trim();
          return NextResponse.json({
            message: cleanMessage || "Parfait ! Je génère votre devis...",
            isComplete: true,
            data: parsed.data,
          });
        }
      } catch {
        // JSON invalide, on continue normalement
      }
    }

    return NextResponse.json({
      message: assistantMessage,
      isComplete: false,
    });

  } catch (error) {
    console.error("Erreur API Chat:", error);
    return NextResponse.json(
      { error: "Erreur du serveur", details: String(error) },
      { status: 500 }
    );
  }
}
