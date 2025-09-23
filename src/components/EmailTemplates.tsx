import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, Clock, FileText, Phone, RefreshCw, ArrowRightLeft, CheckCircle, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  sections: TemplateSection[];
}

interface TemplateSection {
  blockName: string;
  required: boolean;
  placeholder: string;
  category: string;
  timeEstimate: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "scrubbed-ticket",
    name: "Scrubbed Ticket Response",
    description: "Initial response to a customer ticket requiring careful analysis and question asking",
    estimatedTime: "8-12 min",
    sections: [
      {
        blockName: "Greeting / Appreciation",
        required: true,
        placeholder: "Thank you for reaching out regarding [ISSUE DESCRIPTION]. I appreciate you taking the time to provide the details you have shared so far.",
        category: "greeting",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Acknowledgment of Past Experience",
        required: true,
        placeholder: "I understand that [REFERENCE CUSTOMER'S SPECIFIC STATEMENT FROM TICKET], and I want to make sure we address this properly.",
        category: "empathy",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Ask Specific Questions for Context",
        required: true,
        placeholder: "To better understand the scenario and provide the most effective solution, I need to gather some additional details:\n\n1. [SPECIFIC QUESTION ABOUT WORKSPACE/INSTANCE]\n2. [SPECIFIC QUESTION ABOUT USERS AFFECTED]\n3. [SPECIFIC QUESTION ABOUT TIMELINE/DATES]\n4. [SPECIFIC QUESTION ABOUT JOB NAMES/ROLES]",
        category: "action",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Check for Urgency/Deadline",
        required: false,
        placeholder: "If this is time-sensitive, please let me know your preferred timeline for resolution so I can prioritize accordingly.",
        category: "action",
        timeEstimate: "1 min"
      },
      {
        blockName: "Reference Upcoming Scrub",
        required: true,
        placeholder: "We have an upcoming customer scrub session scheduled, and having these details will help us provide the most comprehensive support during that review.",
        category: "status",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Closing / Call to Action",
        required: true,
        placeholder: "Please provide these details when you have a chance, and I'll begin working on this right away. Let me know if you have any questions about the information I've requested.",
        category: "closing",
        timeEstimate: "1-2 min"
      }
    ]
  },
  {
    id: "post-call",
    name: "Post Customer Call Summary",
    description: "Following up after a customer call with clear outcomes and ownership",
    estimatedTime: "10-15 min",
    sections: [
      {
        blockName: "Greeting / Appreciation",
        required: true,
        placeholder: "Thank you for joining myself and our Engineers on today's call to [CALL PURPOSE]. I appreciate the time you took to walk us through [SPECIFIC DEMONSTRATION/DISCUSSION].",
        category: "greeting",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Status Update - Call Summary",
        required: true,
        placeholder: "To summarize what we learned from our call:\n\n- [KEY FINDING 1]\n- [KEY FINDING 2]\n- [KEY FINDING 3]\n\nBased on our discussion, we now have a clearer understanding of [MAIN INSIGHT].",
        category: "status",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Collaboration Mention",
        required: true,
        placeholder: "I've been working closely with our Engineering team on this issue, and [ENGINEER NAME] provided valuable insights during our call.",
        category: "status",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Technical Explanation",
        required: false,
        placeholder: "Based on our analysis, [TECHNICAL EXPLANATION OF ROOT CAUSE OR FINDINGS].",
        category: "technical",
        timeEstimate: "2-3 min"
      },
      {
        blockName: "Summary of Actions Taken",
        required: true,
        placeholder: "Here's what we've accomplished so far:\n- [ACTION 1]\n- [ACTION 2]\n- [ACTION 3]",
        category: "status",
        timeEstimate: "2-3 min"
      },
      {
        blockName: "Define Clear Ownership",
        required: true,
        placeholder: "Next steps and ownership:\n\nCustomer Action Items:\n- [CUSTOMER TASK 1]\n- [CUSTOMER TASK 2]\n\nSupport Action Items:\n- [SUPPORT TASK 1]\n- [SUPPORT TASK 2]\n\nEngineering Action Items:\n- [ENGINEERING TASK 1] (if applicable)",
        category: "action",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Set Next Update Timeline",
        required: true,
        placeholder: "My next update will be by [SPECIFIC DAY AND TIME]. I'll reach out sooner if there are any significant developments.",
        category: "closing",
        timeEstimate: "1 min"
      }
    ]
  },
  {
    id: "in-progress",
    name: "In Progress Ticket Response",
    description: "Responding to customer updates during ongoing ticket resolution",
    estimatedTime: "12-18 min",
    sections: [
      {
        blockName: "Acknowledge Customer Response",
        required: true,
        placeholder: "Thank you for the update. I understand that [SPECIFIC REFERENCE TO WHAT CUSTOMER SAID/TRIED].",
        category: "greeting",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Empathy / Acknowledgment of Frustration",
        required: true,
        placeholder: "I recognize this situation is not ideal, especially given [REFERENCE TO CUSTOMER'S SPECIFIC CONCERNS].",
        category: "empathy",
        timeEstimate: "1 min"
      },
      {
        blockName: "Status Update",
        required: true,
        placeholder: "As an update on this issue, we have been [CURRENT MONITORING/INVESTIGATION STATUS]. Here's what we've observed: [SPECIFIC FINDINGS].",
        category: "status",
        timeEstimate: "2-3 min"
      },
      {
        blockName: "Technical Explanation",
        required: true,
        placeholder: "Based on our investigation, [TECHNICAL EXPLANATION OF THE ISSUE]. This explains why [CONNECTION TO CUSTOMER'S EXPERIENCE].",
        category: "technical",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Effort Reassurance",
        required: true,
        placeholder: "We've taken several actions to address this:\n- [SPECIFIC ACTION 1]\n- [SPECIFIC ACTION 2]\n- [SPECIFIC ACTION 3]",
        category: "technical",
        timeEstimate: "2-3 min"
      },
      {
        blockName: "Proposed Solutions (Options)",
        required: true,
        placeholder: "Moving forward, we have identified the following options:\n\nOption 1: [SOLUTION WITH PROS/CONS]\nOption 2: [ALTERNATIVE SOLUTION WITH PROS/CONS]\n\nBased on [REASONING], I recommend [PREFERRED OPTION].",
        category: "action",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Encouragement / Reassurance",
        required: true,
        placeholder: "These steps should help resolve the issue and prevent it from recurring. We're confident this approach will [EXPECTED POSITIVE OUTCOME].",
        category: "empathy",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Closing / Call to Action",
        required: true,
        placeholder: "Please let me know your thoughts on the proposed solution. I'll check back with you by [SPECIFIC TIME] if I don't hear from you sooner.",
        category: "closing",
        timeEstimate: "1-2 min"
      }
    ]
  },
  {
    id: "transition",
    name: "Ticket Transition/Handoff",
    description: "Taking over a ticket from another team member",
    estimatedTime: "6-10 min",
    sections: [
      {
        blockName: "Greeting / Appreciation",
        required: true,
        placeholder: "Thank you for your patience as we transition your ticket. My name is [YOUR NAME], and I'll be taking over support for this issue from [PREVIOUS OWNER].",
        category: "greeting",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Acknowledgment of Past Experience",
        required: true,
        placeholder: "I've reviewed the complete history of your case, including [SPECIFIC REFERENCE TO PREVIOUS INTERACTIONS/ATTEMPTS].",
        category: "empathy",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Collaboration Mention",
        required: true,
        placeholder: "I've coordinated with [PREVIOUS TEAM MEMBER/ENGINEERS] to ensure full context transfer and will continue working closely with our technical team on your issue.",
        category: "status",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Status Update",
        required: true,
        placeholder: "Current status: [SUMMARY OF WHERE THINGS STAND]. The next steps in our process are [IMMEDIATE NEXT ACTIONS].",
        category: "status",
        timeEstimate: "2-3 min"
      },
      {
        blockName: "Offer a call/screenshare",
        required: false,
        placeholder: "If you'd like to discuss this transition in detail or have any questions about our approach, I'm available for a call at your convenience.",
        category: "action",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Closing / Call to Action",
        required: true,
        placeholder: "Please don't hesitate to reach out if you have any questions about this transition. I'm committed to maintaining the momentum on your case.",
        category: "closing",
        timeEstimate: "1-2 min"
      }
    ]
  },
  {
    id: "ticket-close",
    name: "Ticket Closure",
    description: "Properly closing a resolved ticket with clear outcome summary",
    estimatedTime: "8-12 min",
    sections: [
      {
        blockName: "Greeting / Appreciation",
        required: true,
        placeholder: "Thank you for your patience and collaboration throughout the resolution of this issue.",
        category: "greeting",
        timeEstimate: "1 min"
      },
      {
        blockName: "Summary of Actions Taken",
        required: true,
        placeholder: "To recap what we accomplished:\n- [FINAL ACTION 1]\n- [FINAL ACTION 2]\n- [FINAL ACTION 3]\n\nThe resolution involved [BRIEF SUMMARY OF SOLUTION].",
        category: "status",
        timeEstimate: "3-4 min"
      },
      {
        blockName: "Encouragement / Reassurance",
        required: true,
        placeholder: "This solution should fully resolve the issue you were experiencing. The changes we implemented will [EXPECTED LONG-TERM BENEFIT].",
        category: "empathy",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Reference to Documentation",
        required: false,
        placeholder: "For reference, additional details about [SOLUTION/PROCESS] can be found in this documentation: [LINK TO RESOURCES].",
        category: "action",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Explicit Closure",
        required: true,
        placeholder: "I am now closing this ticket as resolved. If you experience any related issues or have questions about this solution, please don't hesitate to open a new support ticket.",
        category: "closing",
        timeEstimate: "1-2 min"
      },
      {
        blockName: "Friendly Sign-off",
        required: true,
        placeholder: "Thank you again for working with us on this. Have a great [day/week/weekend]!",
        category: "closing",
        timeEstimate: "30 sec"
      }
    ]
  }
];

export function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("scrubbed-ticket");
  const [customizedSections, setCustomizedSections] = useState<Record<string, string>>({});

  const currentTemplate = emailTemplates.find(t => t.id === selectedTemplate);

  const handleSectionChange = (sectionIndex: number, value: string) => {
    const key = `${selectedTemplate}-${sectionIndex}`;
    setCustomizedSections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSectionValue = (sectionIndex: number, placeholder: string) => {
    const key = `${selectedTemplate}-${sectionIndex}`;
    return customizedSections[key] || placeholder;
  };

  const generateFullEmail = () => {
    if (!currentTemplate) return "";
    
    return currentTemplate.sections.map((section, index) => {
      const value = getSectionValue(index, section.placeholder);
      return `/* ${section.blockName} */\n${value}`;
    }).join('\n\n');
  };

  const copyToClipboard = () => {
    const fullEmail = generateFullEmail();
    navigator.clipboard.writeText(fullEmail);
    toast.success("Email template copied to clipboard!");
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'scrubbed-ticket':
        return <FileText className="w-4 h-4" />;
      case 'post-call':
        return <Phone className="w-4 h-4" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4" />;
      case 'transition':
        return <ArrowRightLeft className="w-4 h-4" />;
      case 'ticket-close':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="mb-2">Email Templates</h2>
        <p className="text-muted-foreground mb-4">
          Pre-built email templates combining building blocks for each workflow type. Customize the placeholders to fit your specific situation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Template Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Template Selection
              </CardTitle>
              <CardDescription>
                Choose from pre-built templates for different email scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {emailTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'ring-2 ring-primary bg-accent' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getTemplateIcon(template.id)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm mb-1">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {template.estimatedTime}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.sections.length} sections
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          {currentTemplate && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getTemplateIcon(currentTemplate.id)}
                      {currentTemplate.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {currentTemplate.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentTemplate.estimatedTime}
                    </Badge>
                    <Button onClick={copyToClipboard} size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentTemplate.sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        {section.blockName}
                        {section.required && (
                          <Badge variant="secondary" className="text-xs">Required</Badge>
                        )}
                      </label>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {section.timeEstimate}
                      </Badge>
                    </div>
                    <Textarea
                      placeholder={section.placeholder}
                      value={getSectionValue(index, section.placeholder)}
                      onChange={(e) => handleSectionChange(index, e.target.value)}
                      className="min-h-[100px] text-sm"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm">Full Email Preview</h4>
                    <Button onClick={copyToClipboard} size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Full Email
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm whitespace-pre-wrap leading-relaxed">
                      {generateFullEmail()}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}