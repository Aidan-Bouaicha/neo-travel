// Types pour les messages du chat
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Types pour la génération de devis
export interface GenerateQuoteRequest {
  nom: string;
  email: string;
  telephone: string;
  depart: string;
  arrivee: string;
  date_depart: string;
  date_retour?: string;
  nombre_passagers: number;
}

// Types pour la réponse de devis
export interface QuoteResponse {
  success: boolean;
  data?: {
    lead: {
      id: string;
      nom: string;
      email: string;
    };
    trip: {
      id: string;
      depart: string;
      arrivee: string;
    };
    quote: {
      id: string;
      quote_number: string;
      prix: number;
    };
    pdfPath?: string;
  };
  error?: string;
}

// Types pour les données extraites du chat
export interface ExtractedData {
  nom?: string;
  email?: string;
  telephone?: string;
  depart?: string;
  arrivee?: string;
  date_depart?: string;
  date_retour?: string;
  nombre_passagers?: number;
}
