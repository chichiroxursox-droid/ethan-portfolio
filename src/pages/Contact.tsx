import Navigation from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { useSectionTheme } from "@/hooks/use-section-theme";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const Contact = () => {
  useSectionTheme();
  
  return (
    <div className="min-h-screen bg-background transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>
      <div className="relative z-10">
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
                Have a question or want to work together? Send me a message and I'll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
