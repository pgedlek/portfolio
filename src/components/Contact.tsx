import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Message sent!",
                description: "Thank you for your message. I'll back to you soon."
            })
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <section id="contact"
            className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get in <span className="text-primary"> Touch </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Have a project in mind or want to collaborate? Feel free to reach out.
                    I'm always open to discussing new opporuinities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">
                            Contact information
                        </h3>
                        <div className="space-y-6 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4> Email</h4>
                                    <a href="mailto:hello@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        hello@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4> Phone</h4>
                                    <a href="tel:+48123456789"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        +48 123 456 789
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4> Location</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors">
                                        Krakow, Poland
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">Connect with me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="#" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin />
                                </a>
                                <a href="#" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Twitter />
                                </a>
                                <a href="#" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Instagram />
                                </a>
                                <a href="#" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Facebook />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">
                            Send a message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name"
                                    className="block text-sm font-medium mb-2">
                                    Your name
                                </label>
                                <input type="text" id="name" name="name" required placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label htmlFor="email"
                                    className="block text-sm font-medium mb-2">
                                    Your email
                                </label>
                                <input type="email" id="email" name="email" required placeholder="john@gmail.com"
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label htmlFor="message"
                                    className="block text-sm font-medium mb-2">
                                    Your message
                                </label>
                                <textarea id="message" name="message" required placeholder="Your message here"
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>

                            <button type="submit"
                                disabled={isSubmitting}
                                className={cn("cosmic-button w-full flex items-center justify-center gap-2",
                                    "")
                                }>
                                {isSubmitting ? "Sending..." : "Send message"}
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;