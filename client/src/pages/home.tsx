import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Complaint } from "@shared/schema";

export default function Home() {
  const { data: complaints = [], isLoading } = useQuery<Complaint[]>({
    queryKey: ["/api/complaints"],
  });

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;
  const pendingCount = complaints.filter(c => c.status === "pending").length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0;

  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-2/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-hero">
              <FileText className="w-3 h-3 mr-1" />
              Open Source Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Student Complaint Portal
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Submit, track, and resolve student complaints efficiently. A transparent system 
              built for B.Tech colleges to ensure every voice is heard.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/submit">
                <Button size="lg" className="gap-2" data-testid="button-submit-complaint">
                  <FileText className="w-5 h-5" />
                  Submit Complaint
                </Button>
              </Link>
              <Link href="/complaints">
                <Button size="lg" variant="outline" data-testid="button-view-all">
                  View All Complaints
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Card data-testid="card-stat-total" className="border-2 bg-gradient-to-br from-primary/20 via-primary/10 to-background backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Total Complaints</CardTitle>
                <div className="p-2 rounded-lg bg-primary/20">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-br from-primary to-chart-4 bg-clip-text text-transparent" 
                  data-testid="text-total-complaints"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {isLoading ? "..." : totalComplaints}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  All registered issues
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Card data-testid="card-stat-resolved" className="border-2 bg-gradient-to-br from-chart-2/20 via-chart-2/10 to-background backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Resolved</CardTitle>
                <div className="p-2 rounded-lg bg-chart-2/20">
                  <CheckCircle2 className="h-5 w-5 text-chart-2" />
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="text-4xl font-bold text-chart-2" 
                  data-testid="text-resolved-count"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {isLoading ? "..." : resolvedCount}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  Successfully addressed
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Card data-testid="card-stat-pending" className="border-2 bg-gradient-to-br from-chart-3/20 via-chart-3/10 to-background backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Pending</CardTitle>
                <div className="p-2 rounded-lg bg-chart-3/20">
                  <Clock className="h-5 w-5 text-chart-3" />
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="text-4xl font-bold text-chart-3" 
                  data-testid="text-pending-count"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {isLoading ? "..." : pendingCount}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  Awaiting resolution
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Card data-testid="card-stat-rate" className="border-2 bg-gradient-to-br from-chart-5/20 via-chart-5/10 to-background backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Resolution Rate</CardTitle>
                <div className="p-2 rounded-lg bg-chart-5/20">
                  <TrendingUp className="h-5 w-5 text-chart-5" />
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-br from-chart-5 to-primary bg-clip-text text-transparent" 
                  data-testid="text-resolution-rate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {isLoading ? "..." : `${resolutionRate}%`}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  Overall success rate
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Recent Complaints */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Recent Complaints</h2>
              <p className="text-muted-foreground mt-1">Latest submissions from students</p>
            </div>
            <Link href="/complaints">
              <Button variant="ghost" data-testid="button-view-all-recent">
                View All
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentComplaints.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recentComplaints.map((complaint, idx) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                >
                  <Card className="hover-elevate transition-all duration-300" data-testid={`card-complaint-${complaint.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant={complaint.status === "resolved" ? "default" : "secondary"} className="shrink-0">
                          {complaint.status === "resolved" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {complaint.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          #{complaint.id.slice(0, 8)}
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{complaint.issueTitle}</CardTitle>
                      <CardDescription>{complaint.department}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{complaint.studentName}</span>
                        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No complaints submitted yet. Be the first to submit one!
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-primary/10 via-background to-chart-2/10 rounded-xl p-8 sm:p-12 text-center border"
          >
            <h2 className="text-3xl font-bold mb-4">Have a Concern?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your feedback matters. Submit your complaint and help us improve the campus experience 
              for everyone. All submissions are reviewed by the administration.
            </p>
            <Link href="/submit">
              <Button size="lg" data-testid="button-submit-cta">
                Submit Your Complaint
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
