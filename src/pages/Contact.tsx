import Navigation from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work together? Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
