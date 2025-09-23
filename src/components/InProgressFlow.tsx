import { EmailFlowChart } from "./EmailFlowChart";
import { MessageSquare, RefreshCw, Users, Clock, TrendingUp, Heart, Lightbulb, CheckCircle } from "lucide-react";

const inProgressBlocks = [
  {
    id: "acknowledge-response",
    title: "Acknowledge Customer Response",
    description: "Show you've read and understood their response. If they say 'I tried that, it didn't work', acknowledge this specific feedback before proceeding.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "empathy-frustration",
    title: "Empathy / Acknowledgment of Frustration",
    description: "Validate customer frustration: 'I recognize the above is not ideal...' Shows empathy and understanding of their situation.",
    type: "action" as const,
    icon: <Heart className="w-4 h-4 text-blue-600" />
  },
  {
    id: "status-update",
    title: "Status Update",
    description: "Provide current situation update: 'As an update on this one, we've been monitoring both jobs...' Keep customer informed on progress.",
    type: "action" as const,
    icon: <RefreshCw className="w-4 h-4 text-blue-600" />
  },
  {
    id: "technical-explanation",
    title: "Technical Explanation",
    description: "Provide transparency: 'we believe there is a data-specific aspect to this issue...' or 'the reason behind all these errors is a recently identified defect...'",
    type: "decision" as const,
    icon: <Lightbulb className="w-4 h-4 text-orange-600" />
  },
  {
    id: "effort-reassurance",
    title: "Effort Reassurance",
    description: "Show what's been tried: 'We've taken several actions internally...' or 'we went into SQL and ran a number of scripts...' Reassure comprehensive effort.",
    type: "action" as const,
    icon: <CheckCircle className="w-4 h-4 text-blue-600" />
  },
  {
    id: "proposed-solutions",
    title: "Proposed Solutions (Options)",
    description: "Offer actionable paths: '1: We could cancel the second set...' or 'the latest hotfix for Relativity Server 2023 needs to be applied...'",
    type: "decision" as const,
    icon: <TrendingUp className="w-4 h-4 text-orange-600" />
  },
  {
    id: "encouragement",
    title: "Encouragement / Reassurance",
    description: "Provide confidence: 'should help to get our dataset to run to completion' or 'Our hope is that these go through successfully and resolve...'",
    type: "action" as const,
    icon: <Heart className="w-4 h-4 text-blue-600" />
  },
  {
    id: "closing-action",
    title: "Closing / Call to Action",
    description: "Set next steps: 'Please let me know how the retries fare - I'll check in again on Monday if I don't hear from you sooner.'",
    type: "outcome" as const,
    icon: <MessageSquare className="w-4 h-4 text-green-600" />
  }
];

const inProgressConnections = [
  { from: "acknowledge-response", to: "empathy-frustration" },
  { from: "empathy-frustration", to: "status-update" },
  { from: "status-update", to: "technical-explanation" },
  { from: "technical-explanation", to: "effort-reassurance" },
  { from: "effort-reassurance", to: "proposed-solutions" },
  { from: "proposed-solutions", to: "encouragement" },
  { from: "encouragement", to: "closing-action" }
];

export function InProgressFlow() {
  return (
    <EmailFlowChart 
      title="In Progress Ticket Flow"
      blocks={inProgressBlocks}
      connections={inProgressConnections}
    />
  );
}