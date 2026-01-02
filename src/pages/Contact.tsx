import Navigation from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { useSectionTheme } from "@/hooks/use-section-theme";
import { TextShimmer } from "@/components/ui/text-shimmer";

const Contact = () => {
  useSectionTheme();
  
  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <TextShimmer 
                  as="span" 
                  className="bg-gradient-primary"
                  duration={1.5}
                >
                  Get in Touch
                </TextShimmer>
              </h1>
              <p className="text-lg text-muted-foreground">
                Got a question, idea, or just want to say hi? Feel free to reach out—I'd love to hear from you.
              </p>
            </div>
            <ContactForm />
          </div>
      </div>
    </div>
  );
};

export default Contact;
