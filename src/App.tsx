import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { ScrubbledTicketFlow } from "./components/ScrubbledTicketFlow";
import { PostCallFlow } from "./components/PostCallFlow";
import { InProgressFlow } from "./components/InProgressFlow";
import { TransitionFlow } from "./components/TransitionFlow";
import { TicketCloseFlow } from "./components/TicketCloseFlow";
import { BuildingBlocksReference } from "./components/BuildingBlocksReference";
import { EmailTemplates } from "./components/EmailTemplates";
import { FileText, Phone, RefreshCw, ArrowRightLeft, CheckCircle, Building2, Mail } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-4">Email Reply Workflow System</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete toolkit for crafting effective customer support emails with interactive flowcharts, searchable building blocks, and customizable templates.
          </p>
        </div>

        <Tabs defaultValue="building-blocks" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="building-blocks" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Building Blocks
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="scrubbed" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Scrubbed Ticket
            </TabsTrigger>
            <TabsTrigger value="post-call" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Post Call
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="transition" className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" />
              Transition
            </TabsTrigger>
            <TabsTrigger value="close" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Close
            </TabsTrigger>
          </TabsList>

          <TabsContent value="building-blocks">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Email Building Blocks Reference
                </CardTitle>
                <CardDescription>
                  Searchable reference for all email components with real examples, specific purposes, and timing estimates.
                </CardDescription>
              </CardHeader>
            </Card>
            <BuildingBlocksReference />
          </TabsContent>

          <TabsContent value="templates">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Templates
                </CardTitle>
                <CardDescription>
                  Pre-built email templates combining building blocks for each workflow type. Customize placeholders to fit your specific situation.
                </CardDescription>
              </CardHeader>
            </Card>
            <EmailTemplates />
          </TabsContent>

          <TabsContent value="scrubbed">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Scrubbed Ticket Response
                </CardTitle>
                <CardDescription>
                  Initial response to a customer ticket requiring careful analysis and question asking without premature access requests.
                </CardDescription>
              </CardHeader>
            </Card>
            <ScrubbledTicketFlow />
          </TabsContent>

          <TabsContent value="post-call">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Post Customer Call Summary
                </CardTitle>
                <CardDescription>
                  Following up after a customer call with clear outcomes, ownership, and next steps for all parties involved.
                </CardDescription>
              </CardHeader>
            </Card>
            <PostCallFlow />
          </TabsContent>

          <TabsContent value="in-progress">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  In Progress Ticket Response
                </CardTitle>
                <CardDescription>
                  Responding to customer updates during ongoing ticket resolution, maintaining momentum and setting expectations.
                </CardDescription>
              </CardHeader>
            </Card>
            <InProgressFlow />
          </TabsContent>

          <TabsContent value="transition">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5" />
                  Ticket Transition/Handoff
                </CardTitle>
                <CardDescription>
                  Taking over a ticket from another team member or transitioning ownership while maintaining continuity.
                </CardDescription>
              </CardHeader>
            </Card>
            <TransitionFlow />
          </TabsContent>

          <TabsContent value="close">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Ticket Closure
                </CardTitle>
                <CardDescription>
                  Properly closing a resolved ticket with clear outcome summary and guidance for future issues.
                </CardDescription>
              </CardHeader>
            </Card>
            <TicketCloseFlow />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}