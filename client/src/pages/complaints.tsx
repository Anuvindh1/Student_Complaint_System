import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Complaint } from "@shared/schema";
import { departments } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Clock, FileText, Search, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Complaints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [reopenDialogOpen, setReopenDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: complaints = [], isLoading } = useQuery<Complaint[]>({
    queryKey: ["/api/complaints"],
  });

  const reopenMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("PATCH", `/api/complaints/${id}`, { status: "pending" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
      toast({
        title: "Complaint reopened",
        description: "The complaint has been marked as pending again",
      });
      setReopenDialogOpen(false);
      setSelectedComplaint(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reopen complaint",
        variant: "destructive",
      });
    },
  });

  const handleReopen = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setReopenDialogOpen(true);
  };

  const confirmReopen = () => {
    if (selectedComplaint) {
      reopenMutation.mutate(selectedComplaint.id);
    }
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.issueTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || complaint.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const pendingCount = complaints.filter(c => c.status === "pending").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">All Complaints</h1>
            <p className="text-muted-foreground">
              View and track all submitted complaints
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <CardTitle className="text-lg">Filters</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger data-testid="select-status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger data-testid="select-department-filter">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {pendingCount} Pending
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {resolvedCount} Resolved
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaints List */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredComplaints.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredComplaints.map((complaint, idx) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Card className="hover-elevate transition-all duration-300" data-testid={`card-complaint-${complaint.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                        <Badge
                          variant={complaint.status === "resolved" ? "default" : "secondary"}
                          className="gap-1"
                          data-testid={`badge-status-${complaint.id}`}
                        >
                          {complaint.status === "resolved" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {complaint.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono" data-testid={`text-id-${complaint.id}`}>
                          #{complaint.id.slice(0, 8)}
                        </span>
                      </div>
                      <CardTitle className="text-xl" data-testid={`text-title-${complaint.id}`}>
                        {complaint.issueTitle}
                      </CardTitle>
                      <CardDescription data-testid={`text-department-${complaint.id}`}>
                        {complaint.department}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-description-${complaint.id}`}>
                        {complaint.description}
                      </p>
                      {complaint.status === "resolved" && (
                        <div className="mb-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                          <p className="text-xs text-muted-foreground">
                            Issue not actually resolved?
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReopen(complaint)}
                            data-testid={`button-reopen-${complaint.id}`}
                            className="gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reopen
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t gap-2 flex-wrap">
                        <span className="font-medium" data-testid={`text-student-${complaint.id}`}>
                          {complaint.studentName}
                        </span>
                        <span data-testid={`text-date-${complaint.id}`}>
                          {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {searchTerm || statusFilter !== "all" || departmentFilter !== "all"
                    ? "Try adjusting your filters to see more results"
                    : "No complaints have been submitted yet"}
                </p>
                {(searchTerm || statusFilter !== "all" || departmentFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setDepartmentFilter("all");
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Reopen Confirmation Dialog */}
      <AlertDialog open={reopenDialogOpen} onOpenChange={setReopenDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reopen Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reopen this complaint? This will mark it as pending again
              and notify the administration that the issue hasn't been fully resolved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-reopen">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReopen}
              disabled={reopenMutation.isPending}
              data-testid="button-confirm-reopen"
            >
              {reopenMutation.isPending ? "Reopening..." : "Reopen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
