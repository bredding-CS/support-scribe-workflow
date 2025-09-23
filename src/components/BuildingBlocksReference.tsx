import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MessageSquare, Users, Lightbulb, Heart, CheckCircle, ArrowRight, FileText, Search, Clock } from "lucide-react";
import { useState, useMemo } from "react";

interface BuildingBlock {
  name: string;
  example: string;
  purpose: string;
  category: 'greeting' | 'status' | 'technical' | 'empathy' | 'action' | 'closing';
  timeEstimate: string;
  keywords: string[];
}

const buildingBlocks: BuildingBlock[] = [
  {
    name: "Greeting / Appreciation",
    example: "Thank you for joining the Engineers and I to demonstrate the behavior you are encountering…",
    purpose: "Establishes rapport and appreciation for the customer's time and collaboration.",
    category: "greeting",
    timeEstimate: "1-2 min",
    keywords: ["greeting", "thank", "appreciation", "rapport", "opening"]
  },
  {
    name: "Status Update",
    example: "As an update on this one, we've been monitoring both jobs…\n\nTo summarize the call: We started by reviewing the Post-Publish Delete (PPD) errors…",
    purpose: "Keeps the customer informed on the current situation and progress.",
    category: "status",
    timeEstimate: "2-3 min",
    keywords: ["status", "update", "progress", "monitoring", "summary"]
  },
  {
    name: "Collaboration Mention",
    example: "I've been working closely with my colleagues on the engineering team…\n\nThank you for joining myself and our Engineers…",
    purpose: "Builds trust by showing teamwork and internal escalation.",
    category: "status",
    timeEstimate: "1-2 min",
    keywords: ["collaboration", "teamwork", "engineers", "colleagues", "escalation"]
  },
  {
    name: "Technical Explanation",
    example: "…we believe there is a data-specific aspect to this issue…\n\n…the reason behind all these errors is a recently identified defect in code, REL-639618.",
    purpose: "Provides transparency and context for the issue.",
    category: "technical",
    timeEstimate: "3-5 min",
    keywords: ["technical", "explanation", "defect", "code", "transparency", "context"]
  },
  {
    name: "Effort Reassurance",
    example: "We've taken several actions internally to accommodate the total volume of this job…\n\n…we went into SQL and ran a number of scripts…",
    purpose: "Reassures the customer that all standard solutions have been attempted.",
    category: "technical",
    timeEstimate: "2-3 min",
    keywords: ["effort", "actions", "attempted", "SQL", "scripts", "reassurance"]
  },
  {
    name: "Problem Statement",
    example: "…but the jobs are continuing to fail.\n\n…this defect can cause the Parent/Child relationship between files… to be mis-set…",
    purpose: "Clearly states the ongoing issue.",
    category: "technical",
    timeEstimate: "1-2 min",
    keywords: ["problem", "issue", "failing", "defect", "ongoing"]
  },
  {
    name: "Proposed Solutions (Options)",
    example: "1: We could cancel the second set…\n\n…the latest hotfix for Relativity Server 2023 needs to be applied…",
    purpose: "Offers actionable paths forward, empowering the customer to choose.",
    category: "action",
    timeEstimate: "3-4 min",
    keywords: ["solutions", "options", "hotfix", "actionable", "paths", "choose"]
  },
  {
    name: "Acknowledgment of Past Experience",
    example: "…keeping in mind your statement this has resulted in poor results in the past…",
    purpose: "Shows attentiveness to the customer's history and preferences.",
    category: "empathy",
    timeEstimate: "1-2 min",
    keywords: ["acknowledgment", "past", "history", "experience", "attentive"]
  },
  {
    name: "Contingency Plan",
    example: "…then run a second set, with ignore numbers disabled…\n\n…we also prepped on the call in the event that we did have to repair any files…",
    purpose: "Demonstrates proactive thinking and layered problem-solving.",
    category: "action",
    timeEstimate: "2-3 min",
    keywords: ["contingency", "backup", "proactive", "prepared", "layered"]
  },
  {
    name: "Retry Effort",
    example: "The original jobs have been retried…\n\nCavin initiated another retry for the File Level Errors…",
    purpose: "Reinforces that the team is actively trying to resolve the issue.",
    category: "action",
    timeEstimate: "1-2 min",
    keywords: ["retry", "retried", "actively", "resolve", "effort"]
  },
  {
    name: "Empathy / Acknowledgment of Frustration",
    example: "I recognize the above is not ideal…",
    purpose: "Validates the customer's potential frustration and shows empathy.",
    category: "empathy",
    timeEstimate: "1 min",
    keywords: ["empathy", "frustration", "recognize", "validate", "not ideal"]
  },
  {
    name: "Encouragement / Reassurance",
    example: "…should help to get our dataset to run to completion.\n\nOur hope is that these go through successfully and resolve…",
    purpose: "Provides hope and confidence in the proposed solutions.",
    category: "empathy",
    timeEstimate: "1-2 min",
    keywords: ["encouragement", "hope", "confidence", "successful", "resolve"]
  },
  {
    name: "Summary of Actions Taken",
    example: "…we ran a SQL script for the 9 impacted data sources…\n\n…update the publish filters…",
    purpose: "Clarifies what has already been done to resolve the issue.",
    category: "status",
    timeEstimate: "2-3 min",
    keywords: ["summary", "actions", "completed", "SQL", "filters", "done"]
  },
  {
    name: "Reference to Documentation",
    example: "More details on that process are in this Community Article: Relativity Server 2023 - 12.3.857.3 - Hotfixes",
    purpose: "Provides external resources for further reading or action.",
    category: "action",
    timeEstimate: "1-2 min",
    keywords: ["documentation", "reference", "article", "resources", "details"]
  },
  {
    name: "Closing / Call to Action",
    example: "Let us know your thoughts and if there are any questions.\n\nPlease let me know how the retries fare - I'll check in again on Monday if I don't hear from you sooner.",
    purpose: "Invites feedback and keeps the communication open.",
    category: "closing",
    timeEstimate: "1-2 min",
    keywords: ["closing", "feedback", "questions", "check in", "communication"]
  },
  {
    name: "Transitions",
    example: "...since this incident remains unresolved, I will transition to our weekend team in the event that you have any questions or require any further assistance before Monday morning.",
    purpose: "Handles handoffs and ensures continuity of support.",
    category: "closing",
    timeEstimate: "2-3 min",
    keywords: ["transition", "handoff", "weekend", "continuity", "assistance"]
  },
  {
    name: "Offer a call/screenshare",
    example: "I'd like to schedule a time for us to meet so you can demonstrate the issue you are encountering in the viewer\n\nPlease let me know if you have any questions or concerns about the proposed solution. I am available for a call if you would like to discuss in further detail.",
    purpose: "Provides opportunity for real-time collaboration and problem-solving.",
    category: "action",
    timeEstimate: "1-2 min",
    keywords: ["call", "screenshare", "meeting", "demonstrate", "discuss", "collaboration"]
  },
  {
    name: "Friendly Sign-off",
    example: "I hope you all have a great weekend!",
    purpose: "Ends the message on a warm, human note.",
    category: "closing",
    timeEstimate: "30 sec",
    keywords: ["friendly", "sign-off", "weekend", "warm", "human"]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'greeting':
      return <MessageSquare className="w-4 h-4 text-blue-600" />;
    case 'status':
      return <FileText className="w-4 h-4 text-green-600" />;
    case 'technical':
      return <Lightbulb className="w-4 h-4 text-orange-600" />;
    case 'empathy':
      return <Heart className="w-4 h-4 text-pink-600" />;
    case 'action':
      return <CheckCircle className="w-4 h-4 text-purple-600" />;
    case 'closing':
      return <ArrowRight className="w-4 h-4 text-indigo-600" />;
    default:
      return <MessageSquare className="w-4 h-4 text-gray-600" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'greeting':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'status':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'technical':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'empathy':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'action':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'closing':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function BuildingBlocksReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: 'all', name: 'All Categories', color: 'bg-gray-100 text-gray-800' },
    { id: 'greeting', name: 'Greeting & Rapport', color: 'bg-blue-100 text-blue-800' },
    { id: 'status', name: 'Status & Progress', color: 'bg-green-100 text-green-800' },
    { id: 'technical', name: 'Technical Details', color: 'bg-orange-100 text-orange-800' },
    { id: 'empathy', name: 'Empathy & Support', color: 'bg-pink-100 text-pink-800' },
    { id: 'action', name: 'Actions & Solutions', color: 'bg-purple-100 text-purple-800' },
    { id: 'closing', name: 'Closing & Next Steps', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const filteredBlocks = useMemo(() => {
    return buildingBlocks.filter(block => {
      const matchesSearch = searchTerm === "" || 
        block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || block.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalEstimatedTime = useMemo(() => {
    const timeInMinutes = filteredBlocks.reduce((total, block) => {
      const timeRange = block.timeEstimate;
      // Extract average time from ranges like "1-2 min" or "30 sec"
      if (timeRange.includes('sec')) {
        return total + 0.5; // Convert seconds to fraction of minute
      }
      const numbers = timeRange.match(/\d+/g);
      if (numbers && numbers.length === 2) {
        return total + (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
      } else if (numbers && numbers.length === 1) {
        return total + parseInt(numbers[0]);
      }
      return total;
    }, 0);
    
    return Math.round(timeInMinutes);
  }, [filteredBlocks]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="mb-2">Email Building Blocks Reference</h2>
        <p className="text-muted-foreground mb-4">
          Master reference for all email components with real examples, specific purposes, and timing estimates.
        </p>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search building blocks by name, purpose, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    {category.id !== 'all' && getCategoryIcon(category.id)}
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-medium">{filteredBlocks.length}</span> building blocks found
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              Estimated total time: <span className="font-medium">{totalEstimatedTime} minutes</span>
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.slice(1).map((category) => (
            <Badge 
              key={category.id} 
              variant="outline" 
              className={`cursor-pointer transition-colors ${
                selectedCategory === category.id ? category.color : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
            >
              {getCategoryIcon(category.id)}
              <span className="ml-1">{category.name}</span>
            </Badge>
          ))}
        </div>
      </div>

      {filteredBlocks.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-muted-foreground">
              No building blocks found for "{searchTerm}" in {selectedCategory === 'all' ? 'all categories' : categories.find(c => c.id === selectedCategory)?.name}.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlocks.map((block, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base leading-tight">{block.name}</CardTitle>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <Badge variant="outline" className={`${getCategoryColor(block.category)}`}>
                      {getCategoryIcon(block.category)}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700">
                      <Clock className="w-3 h-3 mr-1" />
                      {block.timeEstimate}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-sm mb-2 text-muted-foreground">Purpose:</h4>
                  <p className="text-sm leading-relaxed">{block.purpose}</p>
                </div>
                <div>
                  <h4 className="text-sm mb-2 text-muted-foreground">Example:</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm italic leading-relaxed whitespace-pre-line">"{block.example}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}