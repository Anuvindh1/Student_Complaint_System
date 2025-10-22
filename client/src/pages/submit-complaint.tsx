import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertComplaintSchema, type InsertComplaint, departments } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CheckCircle2, FileText, Send } from "lucide-react";
import { Link } from "wouter";

export default function SubmitComplaint() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertComplaint>({
    resolver: zodResolver(insertComplaintSchema),
    defaultValues: {
      studentName: "",
      department: undefined,
      issueTitle: "",
      description: "",
    },
  });

  const createComplaintMutation = useMutation({
    mutationFn: async (data: InsertComplaint) => {
      return apiRequest("POST", "/api/complaints", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
      setSubmitted(true);
      form.reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertComplaint) => {
    createComplaintMutation.mutate(data);
  };

  const descriptionLength = form.watch("description")?.length || 0;
  const maxDescriptionLength = 1000;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Submit a Complaint</h1>
            <p className="text-muted-foreground">
              Help us improve by sharing your concerns and feedback
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Complaint Details</CardTitle>
                  <CardDescription>
                    Please provide accurate information for faster resolution
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-chart-2/10 rounded-full mb-4">
                    <CheckCircle2 className="w-8 h-8 text-chart-2" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Complaint Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your complaint has been registered successfully. Our team will review it shortly.
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={() => setSubmitted(false)} data-testid="button-submit-another">
                      Submit Another
                    </Button>
                    <Link href="/complaints">
                      <Button variant="outline" data-testid="button-view-all-submitted">
                        View All Complaints
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                              data-testid="input-student-name"
                              className="transition-all duration-200 focus:scale-[1.01]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-department" className="transition-all duration-200">
                                <SelectValue placeholder="Select your department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept} data-testid={`option-${dept}`}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="issueTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Brief summary of your complaint"
                              {...field}
                              data-testid="input-issue-title"
                              className="transition-all duration-200 focus:scale-[1.01]"
                            />
                          </FormControl>
                          <FormDescription>
                            A short, descriptive title for your complaint
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide detailed information about your complaint..."
                              className="min-h-32 resize-none transition-all duration-200 focus:scale-[1.01]"
                              {...field}
                              data-testid="input-description"
                            />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormDescription>
                              Explain the issue in detail to help us understand better
                            </FormDescription>
                            <span className={`text-xs ${descriptionLength > maxDescriptionLength ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {descriptionLength}/{maxDescriptionLength}
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 gap-2"
                        disabled={createComplaintMutation.isPending}
                        data-testid="button-submit-form"
                      >
                        {createComplaintMutation.isPending ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Complaint
                          </>
                        )}
                      </Button>
                      <Link href="/">
                        <Button type="button" variant="outline" data-testid="button-cancel">
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 p-4 bg-muted/50 rounded-md border"
          >
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> All complaints are reviewed by the administration. 
              Please ensure your complaint is genuine and provides accurate information. 
              You can track the status of your complaint on the complaints page.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
