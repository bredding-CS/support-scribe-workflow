import { EmailFlowChart } from "./EmailFlowChart";
import { CheckCircle, FileText, XCircle, Plus, MessageSquare, Heart, ArrowRight } from "lucide-react";

const ticketCloseBlocks = [
  {
    id: "greeting",
    title: "Greeting / Appreciation",
    description: "Thank customer for their patience and collaboration throughout the resolution process. Establish positive closing tone.",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "summary-actions",
    title: "Summary of Actions Taken",
    description: "Recap what was accomplished: 'we ran a SQL script for the 9 impacted data sources...' Give complete picture of resolution effort.",
    type: "action" as const,
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  {
    id: "encouragement",
    title: "Encouragement / Reassurance",
    description: "Provide confidence in resolution: 'should help to get our dataset to run to completion' or 'Our hope is that these go through successfully and resolve...'",
    type: "action" as const,
    icon: <Heart className="w-4 h-4 text-blue-600" />
  },
  {
    id: "check-new-issues",
    title: "Check for New Issues",
    description: "Review if customer has brought up any new issues while trying to close the ticket. These need separate handling to avoid scope creep.",
    type: "decision" as const,
    icon: <Plus className="w-4 h-4 text-orange-600" />
  },
  {
    id: "reference-documentation",
    title: "Reference to Documentation",
    description: "Provide resources: 'More details on that process are in this Community Article: Relativity Server 2023 - 12.3.857.3 - Hotfixes'",
    type: "action" as const,
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  {
    id: "explicit-closure",
    title: "State Explicit Closure",
    description: "Clearly state that 'this ticket is being closed' so there's no ambiguity about the ticket status. Make closure intention very clear.",
    type: "action" as const,
    icon: <XCircle className="w-4 h-4 text-blue-600" />
  },
  {
    id: "friendly-signoff",
    title: "Friendly Sign-off",
    description: "End on warm note: 'I hope you all have a great weekend!' Shows human connection and positive relationship.",
    type: "outcome" as const,
    icon: <ArrowRight className="w-4 h-4 text-green-600" />
  }
];

const ticketCloseConnections = [
  { from: "greeting", to: "summary-actions" },
  { from: "summary-actions", to: "encouragement" },
  { from: "encouragement", to: "check-new-issues" },
  { from: "check-new-issues", to: "reference-documentation", condition: "New issues found" },
  { from: "check-new-issues", to: "explicit-closure", condition: "No new issues" },
  { from: "reference-documentation", to: "explicit-closure" },
  { from: "explicit-closure", to: "friendly-signoff" }
];

export function TicketCloseFlow() {
  return (
    <EmailFlowChart 
      title="Ticket Close Flow"
      blocks={ticketCloseBlocks}
      connections={ticketCloseConnections}
    />
  );
}