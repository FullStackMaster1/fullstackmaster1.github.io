import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Users, Mail, Phone, Calendar, ArrowLeft, Search, Copy, CheckCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { WebinarRegistration } from "@shared/schema";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmails, setCopiedEmails] = useState(false);
  const { toast } = useToast();

  const { data: registrations = [], isLoading, error } = useQuery<WebinarRegistration[]>({
    queryKey: ["/api/webinar/registrations"],
  });

  const filteredRegistrations = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.webinarTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyAllEmails = () => {
    const emails = filteredRegistrations.map((r) => r.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopiedEmails(true);
    toast({
      title: "Emails Copied!",
      description: `${filteredRegistrations.length} email addresses copied to clipboard.`,
    });
    setTimeout(() => setCopiedEmails(false), 2000);
  };

  const webinarStats = registrations.reduce((acc, r) => {
    acc[r.webinarTitle] = (acc[r.webinarTitle] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const whatsappOptIns = registrations.filter((r) => r.whatsappOptIn).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading registrations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-destructive">Error loading registrations. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-2" data-testid="link-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <h1 className="text-3xl font-bold" data-testid="text-admin-title">
              Webinar Registrations
            </h1>
            <p className="text-muted-foreground">
              Manage and export your webinar registrations
            </p>
          </div>
          <Button asChild data-testid="button-export-csv">
            <a href="/api/webinar/export" download>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card data-testid="card-stat-total">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registrations.length}</p>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-whatsapp">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <SiWhatsapp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{whatsappOptIns}</p>
                  <p className="text-sm text-muted-foreground">WhatsApp Opt-ins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-webinars" className="md:col-span-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Registrations by Webinar</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(webinarStats).map(([title, count]) => (
                  <Badge key={title} variant="secondary">
                    {title}: {count}
                  </Badge>
                ))}
                {Object.keys(webinarStats).length === 0 && (
                  <span className="text-sm text-muted-foreground">No registrations yet</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>All Registrations</CardTitle>
                <CardDescription>
                  {filteredRegistrations.length} of {registrations.length} registrations
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, webinar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-registrations"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={copyAllEmails}
                  disabled={filteredRegistrations.length === 0}
                  data-testid="button-copy-emails"
                >
                  {copiedEmails ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Emails
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {registrations.length === 0 
                  ? "No registrations yet. Share your webinar pages to get signups!"
                  : "No registrations match your search."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Webinar</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id} data-testid={`row-registration-${registration.id}`}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
                        <TableCell>
                          <a 
                            href={`mailto:${registration.email}`} 
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {registration.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          {registration.phone ? (
                            <a 
                              href={`https://wa.me/${registration.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              {registration.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {registration.webinarTitle}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {registration.whatsappOptIn ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                              <SiWhatsapp className="w-3 h-3 mr-1" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {registration.registeredAt 
                            ? new Date(registration.registeredAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:?bcc=${registrations.map(r => r.email).join(',')}&subject=Webinar Update`}>
                <Mail className="w-4 h-4 mr-2" />
                Email All Registrants
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`https://wa.me/?text=Hi! Just a reminder about our upcoming webinar. Looking forward to seeing you there!`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                WhatsApp Broadcast
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
