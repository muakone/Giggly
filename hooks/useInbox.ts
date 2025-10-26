import { useEffect, useState } from "react";

type Message = {
  id: string;
  from: string;
  text: string;
  time?: string;
};

const MOCK: Message[] = [
  {
    id: "m1",
    from: "Ada",
    text: "Hi, is this gig still available?",
    time: "2h",
  },
  {
    id: "m2",
    from: "Organizer",
    text: "Yes, we need you at 3pm. Bring ID.",
    time: "1h",
  },
  { id: "m3", from: "Jon", text: "I can pick this up today.", time: "3h" },
];

export default function useInbox() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setMessages(MOCK), 250);
    return () => clearTimeout(t);
  }, []);

  function sendMessage(from: string, text: string) {
    const m: Message = { id: String(Date.now()), from, text, time: "now" };
    setMessages((s) => [m, ...s]);
  }

  return { messages, sendMessage } as const;
}
