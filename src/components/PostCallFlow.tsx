import { EmailFlowChart } from "./EmailFlowChart";
import { MessageSquare, Users, Calendar, CheckCircle, FileText } from "lucide-react";

const postCallBlocks = [
  {
    id: "greeting",
    title: "Greeting / Appreciation",
    description: "Thank the customer for their time on the call. Example: 'Thank you for joining the Engineers and I to demonstrate the behavior you are encountering...'",
    type: "action" as const,
    icon: <MessageSquare className="w-4 h-4 text-blue-600" />
  },
  {
    id: "status-update",
    title: "Status Update - Call Summary",
    description: "Summarize what was LEARNED, not what was done. Example: 'To summarize the call: We started by reviewing the Post-Publish Delete (PPD) errors...'",
    type: "action" as const,
    icon: <FileText className="w-4 h-4 text-blue-600" />
  },
  {
    id: "collaboration-mention",
    title: "Collaboration Mention",
    description: "Highlight teamwork and escalation: 'I've been working closely with my colleagues on the engineering team...' Builds trust through transparency.",
    type: "action" as const,
    icon: <Users className="w-4 h-4 text-blue-600" />
  },
  {
    id: "define-ownership",
    title: "Define Clear Ownership",
    description: "Specify in casual terms who owns what next step. What does the customer own? What does Support own? What does Engineering own?",
    type: "action" as const,
    icon: <Users className="w-4 h-4 text-blue-600" />
  },
  {
    id: "summary-actions",
    title: "Summary of Actions Taken",
    description: "Clarify what has already been done: 'we ran a SQL script for the 9 impacted data sources...' or 'update the publish filters...'",
    type: "decision" as const,
    icon: <CheckCircle className="w-4 h-4 text-orange-600" />
  },
  {
    id: "set-next-update",
    title: "Set Next Update Timeline",
    description: "Commit to when the next update will be provided: 'My next update will be by X day.' This becomes your commitment to the customer.",
    type: "action" as const,
    icon: <Calendar className="w-4 h-4 text-blue-600" />
  },
  {
    id: "closing-action",
    title: "Closing / Call to Action",
    description: "Keep communication open: 'Let us know your thoughts and if there are any questions.' This email serves as 'source of truth' for the call.",
    type: "outcome" as const,
    icon: <MessageSquare className="w-4 h-4 text-green-600" />
  }
];

const postCallConnections = [
  { from: "greeting", to: "status-update" },
  { from: "status-update", to: "collaboration-mention" },
  { from: "collaboration-mention", to: "define-ownership" },
  { from: "define-ownership", to: "summary-actions" },
  { from: "summary-actions", to: "set-next-update", condition: "Customer has actions" },
  { from: "set-next-update", to: "closing-action" }
];

export function PostCallFlow() {
  return (
    <EmailFlowChart 
      title="Post Customer Call Flow"
      blocks={postCallBlocks}
      connections={postCallConnections}
    />
  );
}