import { EmailFlowChart } from "./EmailFlowChart";
import { ArrowRightLeft, FileText, Users, Handshake, MessageSquare, Heart } from "lucide-react";

const transitionBlocks = [
  {
    id: "greeting",
    title: "Greeting / Appreciation",
    description: "Introduce yourself professionally: 'Thank you for your patience as we transition this ticket...' Establish rapport from the start.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "review-ticket-history",
    title: "Review Ticket History",
    description: "Thoroughly read through all previous communications, actions taken, and current status. Understand the complete context before taking ownership.",
    type: "action" as const,
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  {
    id: "acknowledge-past",
    title: "Acknowledgment of Past Experience",
    description: "Show understanding of customer's history: 'keeping in mind your statement this has resulted in poor results in the past...' Reference their previous experiences.",
    type: "action" as const,
    icon: <Heart className="w-4 h-4 text-blue-600" />
  },
  {
    id: "collaboration-mention",
    title: "Collaboration Mention",
    description: "Reference team coordination: 'I've been working closely with my colleagues...' Show continuity and teamwork in the transition.",
    type: "action" as const,
    icon: <Users className="w-4 h-4 text-blue-600" />
  },
  {
    id: "transition-statement",
    title: "Transitions",
    description: "Handle the handoff professionally: 'since this incident remains unresolved, I will transition to our weekend team in the event that you have any questions...'",
    type: "decision" as const,
    icon: <ArrowRightLeft className="w-4 h-4 text-orange-600" />
  },
  {
    id: "offer-call",
    title: "Offer a call/screenshare",
    description: "Provide real-time support option: 'I am available for a call if you would like to discuss in further detail.' Shows commitment to resolution.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "closing-action",
    title: "Closing / Call to Action",
    description: "Set clear next steps and maintain open communication: 'Let us know your thoughts and if there are any questions.'",
    type: "outcome" as const,
    icon: <MessageSquare className="w-4 h-4 text-green-600" />
  }
];

const transitionConnections = [
  { from: "greeting", to: "review-ticket-history" },
  { from: "review-ticket-history", to: "acknowledge-past" },
  { from: "acknowledge-past", to: "collaboration-mention" },
  { from: "collaboration-mention", to: "transition-statement" },
  { from: "transition-statement", to: "offer-call", condition: "If internal handoff" },
  { from: "offer-call", to: "closing-action" }
];

export function TransitionFlow() {
  return (
    <EmailFlowChart 
      title="Ticket Transition Flow"
      blocks={transitionBlocks}
      connections={transitionConnections}
    />
  );
}