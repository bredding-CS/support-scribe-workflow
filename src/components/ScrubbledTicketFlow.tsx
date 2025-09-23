import { EmailFlowChart } from "./EmailFlowChart";
import { MessageSquare, Users, Clock, FileText, AlertTriangle, Heart } from "lucide-react";

const scrubbledTicketBlocks = [
  {
    id: "greeting",
    title: "Greeting / Appreciation",
    description: "Start with appreciation for their time and collaboration. Example: 'Thank you for reaching out regarding...' Establishes rapport from the beginning.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "read-ticket",
    title: "Read & Understand Ticket",
    description: "Carefully read the ticket and understand what the customer is asking with the information available. This is the foundation of a good response.",
    type: "action" as const,
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  {
    id: "acknowledge-facts",
    title: "Acknowledgment of Past Experience",
    description: "Reference one fact that the customer stated while asking your question. Show you understand their situation: 'I need to ask A, keeping in mind you mentioned B.'",
    type: "action" as const,
    icon: <Heart className="w-4 h-4 text-blue-600" />
  },
  {
    id: "ask-specific-questions",
    title: "Ask Specific Questions for Context",
    description: "Ask for details and context. Be specific, not relative - include job names, dates, people/roles. Ask about workspace vs. instance, users affected.",
    type: "decision" as const,
    icon: <Users className="w-4 h-4 text-orange-600" />
  },
  {
    id: "check-urgency",
    title: "Check for Urgency/Deadline",
    description: "If customer references urgency, ask for specific deadline (if not already provided). Balance meeting SLA with gathering necessary information.",
    type: "decision" as const,
    icon: <Clock className="w-4 h-4 text-orange-600" />
  },
  {
    id: "avoid-access-request",
    title: "Avoid Access Requests",
    description: "Do NOT ask for access in initial response. Ask questions that enable progress without access. Save access decisions for second response. When in doubt - swarm with team.",
    type: "action" as const,
    icon: <AlertTriangle className="w-4 h-4 text-blue-600" />
  },
  {
    id: "reference-scrub",
    title: "Reference Upcoming Scrub",
    description: "Mention the upcoming customer scrub (TBD) as reason for re-scrubbing and gathering detailed information now.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "closing-action",
    title: "Closing / Call to Action",
    description: "End with clear call to action: 'Let us know your thoughts and if there are any questions.' Keep communication open and set expectations.",
    type: "outcome" as const,
    icon: <MessageSquare className="w-4 h-4 text-green-600" />
  }
];

const scrubbledConnections = [
  { from: "greeting", to: "read-ticket" },
  { from: "read-ticket", to: "acknowledge-facts" },
  { from: "acknowledge-facts", to: "ask-specific-questions" },
  { from: "ask-specific-questions", to: "check-urgency", condition: "If details needed" },
  { from: "check-urgency", to: "avoid-access-request", condition: "If urgent" },
  { from: "avoid-access-request", to: "reference-scrub" },
  { from: "reference-scrub", to: "closing-action" }
];

export function ScrubbledTicketFlow() {
  return (
    <EmailFlowChart 
      title="Scrubbed Ticket Flow"
      blocks={scrubbledTicketBlocks}
      connections={scrubbledConnections}
    />
  );
}