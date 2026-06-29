"use client";

import { useState, useRef, useEffect } from "react";
import { generateQuote } from "@/lib/api";
import type { ChatMessage, GenerateQuoteRequest } from "@/types";

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! 👋 Je suis Neo, votre assistant NeoTravel. Je vais vous aider à obtenir un devis pour votre transport en autocar.\n\nPour commencer, quel est votre nom ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || quoteGenerated) return;

    const userMessage = input.trim();
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      const chatHistory = [...messages, { role: "user" as const, content: userMessage }].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) throw new Error("Erreur");

      const result = await response.json();

      if (result.isComplete && result.data) {
        addMessage("assistant", "Parfait ! Je génère votre devis... 📝");
        await handleQuoteGeneration(result.data);
      } else {
        const cleanMessage = result.message?.replace(/\{[\s\S]*"complete"[\s\S]*\}/g, "").trim();
        addMessage("assistant", cleanMessage || "Je n'ai pas compris, pouvez-vous reformuler ?");
      }
    } catch (error) {
      console.error(error);
      addMessage("assistant", "Désolé, une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuoteGeneration = async (data: GenerateQuoteRequest) => {
    try {
      const response = await generateQuote(data);
      
      if (response.success && response.data) {
        setQuoteGenerated(true);
        addMessage(
          "assistant",
          `✅ Votre devis est prêt !\n\n📧 Envoyé à : ${data.email}\n🔢 Numéro : ${response.data.quote.quote_number}\n💰 Montant : ${response.data.quote.prix} €\n\nMerci d'avoir choisi NeoTravel !`
        );
      } else {
        throw new Error("Erreur génération");
      }
    } catch (error) {
      console.error(error);
      addMessage("assistant", "❌ Impossible de générer le devis. Contactez-nous au 01 23 45 67 89.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>N</div>
          <span style={styles.logoText}>NeoTravel</span>
        </div>
        <a href="/login" style={styles.adminLink}>Admin</a>
      </header>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.chatContainer}>
          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <div style={styles.avatar}>N</div>
            <div>
              <div style={styles.chatTitle}>Neo - Assistant NeoTravel</div>
              <div style={styles.chatStatus}>
                <span style={styles.statusDot}></span>
                En ligne
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.role === "user" ? styles.userBubble : styles.assistantBubble),
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
                <div style={{ ...styles.messageBubble, ...styles.assistantBubble }}>
                  <div style={styles.typingIndicator}>
                    <span style={styles.dot}></span>
                    <span style={{ ...styles.dot, animationDelay: "0.2s" }}></span>
                    <span style={{ ...styles.dot, animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={styles.inputContainer}>
            {quoteGenerated ? (
              <div style={styles.completedMessage}>
                ✅ Devis envoyé par email !
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Écrivez votre message..."
                  disabled={isLoading}
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    ...styles.sendButton,
                    opacity: !input.trim() || isLoading ? 0.5 : 1,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info */}
        <p style={styles.info}>Gratuit • Sans engagement • Réponse immédiate</p>
      </main>

      <style jsx global>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    background: "#2563eb",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
  },
  logoText: {
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "18px",
  },
  adminLink: {
    color: "#64748b",
    textDecoration: "none",
    fontSize: "14px",
  },
  main: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  chatContainer: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    background: "#2563eb",
    color: "#fff",
  },
  avatar: {
    width: "40px",
    height: "40px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
  chatTitle: {
    fontWeight: "600",
    fontSize: "15px",
  },
  chatStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    opacity: 0.9,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    background: "#4ade80",
    borderRadius: "50%",
  },
  messagesContainer: {
    height: "400px",
    overflowY: "auto" as const,
    padding: "20px",
    background: "#f8fafc",
  },
  messageRow: {
    display: "flex",
    marginBottom: "12px",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: "12px 16px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
  },
  userBubble: {
    background: "#2563eb",
    color: "#fff",
    borderBottomRightRadius: "4px",
  },
  assistantBubble: {
    background: "#fff",
    color: "#1e293b",
    borderBottomLeftRadius: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  typingIndicator: {
    display: "flex",
    gap: "4px",
    padding: "4px 0",
  },
  dot: {
    width: "8px",
    height: "8px",
    background: "#94a3b8",
    borderRadius: "50%",
    animation: "bounce 1.4s infinite ease-in-out",
  },
  inputContainer: {
    padding: "16px 20px",
    borderTop: "1px solid #e2e8f0",
    background: "#fff",
  },
  form: {
    display: "flex",
    gap: "12px",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "none",
    borderRadius: "24px",
    background: "#f1f5f9",
    fontSize: "14px",
    outline: "none",
  },
  sendButton: {
    width: "44px",
    height: "44px",
    border: "none",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  completedMessage: {
    textAlign: "center" as const,
    color: "#16a34a",
    fontWeight: "500",
    padding: "8px 0",
  },
  info: {
    textAlign: "center" as const,
    color: "#64748b",
    fontSize: "14px",
    marginTop: "24px",
  },
};
