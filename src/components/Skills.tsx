import { useState } from "react";
import { cn } from '@/lib/utils';
import { useTranslation } from "react-i18next";

const skills = [
    { name: "Java", level: 90, category: "backend" },
    { name: "Spring Boot", level: 85, category: "backend" },
    { name: "Hibernate", level: 70, category: "backend" },
    { name: "Oracle DB", level: 75, category: "backend" },
    { name: "Maven", level: 80, category: "backend" },

    { name: "Google Cloud Platform", level: 85, category: "cloud" },
    { name: "Google Kubernetes Engine", level: 75, category: "cloud" },
    { name: "Terraform", level: 85, category: "cloud" },
    { name: "Packer", level: 85, category: "cloud" },

    { name: "Linux/Bash", level: 85, category: "devops" },
    { name: "Ansible", level: 85, category: "devops" },
    { name: "Docker", level: 75, category: "devops" },
    { name: "Kubernetes", level: 70, category: "devops" },

    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React JS", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "Node JS", level: 50, category: "frontend" },

    { name: "Git/GitHub", level: 90, category: "tools" },
    { name: "Jenkins", level: 80, category: "tools" },
    { name: "TeamCity", level: 90, category: "tools" }
];

const categories = ["all", "backend", "cloud", "devops", "frontend", "tools"];

function Skills() {
    const [activeCategory, setActiveCategory] = useState("all");

    const { t } = useTranslation();

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section id="skills"
            className="py-24 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    {t("mySkills.my")} <span className="text-primary"> {t("mySkills.skills")}</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button key={key}
                            className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCategory === category
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary/70 text-foreground hover:bd-secondary"
                            )}
                            onClick={() => setActiveCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div key={key}
                            className="bg-card p-6 rounded-lg shadow-xs card-hover"
                        >
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease_out]"
                                    style={{ width: skill.level + "%" }} />
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;