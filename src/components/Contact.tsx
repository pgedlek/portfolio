import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        fetch("https://formspree.io/f/xqawkzdo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: (e.target as any).name.value,
                email: (e.target as any).email.value,
                message: (e.target as any).message.value,
            }),
        }).then((res) => {
            console.log(res);
            toast({
                title: "Message sent!",
                description: "Thank you for your message. I'll back to you soon."
            })
        }).catch((err) => {
            console.error(err);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        }).finally(() => {
            setIsSubmitting(false);
            setTimeout(() => {
                setName("");
                setEmail("");
                setMessage("");
            }, 3000);
        });
    }

    return (
        <section id="contact"
            className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    {t("contact.getIn")} <span className="text-primary"> {t("contact.touch")} </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    {t("contact.description")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">
                            {t("contact.contactInformation")}
                        </h3>
                        <div className="space-y-6 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4 className="text-left">{t("contact.email")}:</h4>
                                    <a href="mailto:pawgedlek@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        pawgedlek@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4 className="text-left">{t("contact.phone")}:</h4>
                                    <a href="tel:+48578555475"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        +48 578 555 475
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />{" "}
                                </div>
                                <div>
                                    <h4 className="text-left">{t("contact.location")}:</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors">
                                        Krakow, Poland
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">{t("contact.socialMedia")}</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://www.linkedin.com/in/pgedlek/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin />
                                </a>
                                <a href="https://github.com/pgedlek" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github />
                                </a>
                                <a href="https://www.instagram.com/pgedoix/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">
                            {t("contact.formTitle")}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name"
                                    className="block text-sm font-medium mb-2">
                                    {t("contact.formName")}
                                </label>
                                <input type="text" id="name" name="name" required placeholder={t("contact.formNamePlaceholder")}
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label htmlFor="email"
                                    className="block text-sm font-medium mb-2">
                                    {t("contact.formEmail")}
                                </label>
                                <input type="email" id="email" name="email" required placeholder={t("contact.formEmailPlaceholder")}
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label htmlFor="message"
                                    className="block text-sm font-medium mb-2">
                                    {t("contact.formMessage")}
                                </label>
                                <textarea id="message" name="message" required placeholder={t("contact.formMessagePlaceholder")}
                                    value={message} onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>

                            <button type="submit"
                                disabled={isSubmitting}
                                className={cn("cosmic-button w-full flex items-center justify-center gap-2",
                                    "")
                                }>
                                {isSubmitting ? "Sending..." : t("contact.sendMessageButton")}
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