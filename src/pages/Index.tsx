import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full p-8 text-center animate-scale-in">
        <div className="mb-6">
          <CheckCircle2 className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">TaskFlow</h1>
          <p className="text-muted-foreground">
            Your productivity companion with daily tracking and analytics
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <Link to="/login">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full glass">
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
