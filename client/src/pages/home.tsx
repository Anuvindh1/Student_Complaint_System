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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 shimmer" data-testid="badge-hero">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <Card data-testid="card-stat-total" className="border border-white/20 dark:border-white/10 bg-gradient-to-br from-[#f3f0ff]/80 to-[#e9e3ff]/60 dark:from-[#2d2640]/80 dark:to-[#3d3550]/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Complaints</CardTitle>
                <div className="p-2.5 rounded-full bg-[#e9e3ff]/70 dark:bg-[#3d3550]/70 backdrop-blur-sm shadow-md">
                  <FileText className="h-4 w-4 text-[#8b5cf6]" />
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-5xl font-bold text-[#8b5cf6] mb-2" 
                  data-testid="text-total-complaints"
                >
                  {isLoading ? "..." : totalComplaints}
                </div>
                <p className="text-xs text-muted-foreground font-normal">
                  All registered issues
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <Card data-testid="card-stat-resolved" className="border border-white/20 dark:border-white/10 bg-gradient-to-br from-[#d1fae5]/80 to-[#a7f3d0]/60 dark:from-[#1e3a32]/80 dark:to-[#2d4f43]/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
                <div className="p-2.5 rounded-full bg-[#a7f3d0]/70 dark:bg-[#2d4f43]/70 backdrop-blur-sm shadow-md">
                  <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-5xl font-bold text-[#10b981] mb-2" 
                  data-testid="text-resolved-count"
                >
                  {isLoading ? "..." : resolvedCount}
                </div>
                <p className="text-xs text-muted-foreground font-normal">
                  Successfully addressed
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <Card data-testid="card-stat-pending" className="border border-white/20 dark:border-white/10 bg-gradient-to-br from-[#fef3c7]/80 to-[#fde68a]/60 dark:from-[#3d3420]/80 dark:to-[#4d4430]/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                <div className="p-2.5 rounded-full bg-[#fde68a]/70 dark:bg-[#4d4430]/70 backdrop-blur-sm shadow-md">
                  <Clock className="h-4 w-4 text-[#f59e0b]" />
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-5xl font-bold text-[#f59e0b] mb-2" 
                  data-testid="text-pending-count"
                >
                  {isLoading ? "..." : pendingCount}
                </div>
                <p className="text-xs text-muted-foreground font-normal">
                  Awaiting resolution
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <Card data-testid="card-stat-rate" className="border border-white/20 dark:border-white/10 bg-gradient-to-br from-[#fce7f3]/80 to-[#fbcfe8]/60 dark:from-[#3d2038]/80 dark:to-[#4d3048]/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolution Rate</CardTitle>
                <div className="p-2.5 rounded-full bg-[#fbcfe8]/70 dark:bg-[#4d3048]/70 backdrop-blur-sm shadow-md">
                  <TrendingUp className="h-4 w-4 text-[#ec4899]" />
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-5xl font-bold text-[#ec4899] mb-2" 
                  data-testid="text-resolution-rate"
                >
                  {isLoading ? "..." : `${resolutionRate}%`}
                </div>
                <p className="text-xs text-muted-foreground font-normal">
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
                  <Card className="glass-card hover-lift transition-all duration-300 border-2 shadow-lg" data-testid={`card-complaint-${complaint.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant={complaint.status === "resolved" ? "default" : "secondary"} className="shrink-0 shadow-md">
                          {complaint.status === "resolved" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {complaint.status}
                        </Badge>
                        <motion.span 
                          className="text-xs text-muted-foreground font-mono bg-primary/10 px-2 py-1 rounded-md"
                          whileHover={{ scale: 1.05 }}
                        >
                          #{complaint.id.slice(0, 8)}
                        </motion.span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{complaint.issueTitle}</CardTitle>
                      <CardDescription>{complaint.department}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{complaint.studentName}</span>
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
            className="glass-card bg-gradient-to-br from-primary/15 via-background to-chart-2/15 rounded-2xl p-8 sm:p-12 text-center border-2 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-2/30 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-chart-5 to-chart-2 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Have a Concern?
              </motion.h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                Your feedback matters. Submit your complaint and help us improve the campus experience 
                for everyone. All submissions are reviewed by the administration.
              </p>
              <Link href="/submit">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="shadow-xl hover:shadow-2xl" data-testid="button-submit-cta">
                    Submit Your Complaint
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
