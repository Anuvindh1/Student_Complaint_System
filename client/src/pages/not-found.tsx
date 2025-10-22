import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-16 px-8">
            <div className="p-4 bg-muted rounded-full mb-6">
              <FileQuestion className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
            <p className="text-muted-foreground text-center mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/">
              <Button className="gap-2" data-testid="button-home">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
