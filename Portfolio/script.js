// JavaScript for Harshit Prasad's Portfolio Website

document.addEventListener("DOMContentLoaded", () => {
    const RESUME_URL = "assets/Harshit-Prasad-Resume.pdf";
    const RESUME_NAME = "Harshit-Prasad-Resume.pdf";

    function renderIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function openExternal(url) {
        window.open(url, "_blank", "noopener,noreferrer");
    }

    function downloadResume() {
        const link = document.createElement("a");
        link.href = RESUME_URL;
        link.download = RESUME_NAME;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    renderIcons();

    // Typing Animation
    const typedTextSpan = document.getElementById("typed-text");
    const roles = ["Backend Systems", "AI/ML Solutions", "Data Workflows", "API Integrations"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newWordDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;

        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;

        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingSpeed + 100);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const canObserve = "IntersectionObserver" in window;

    if (canObserve) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");

                    if (entry.target.id === "skills") {
                        animateSkillBars();
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("active"));
        animateSkillBars();
    }

    function animateSkillBars() {
        const progressBars = document.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");

    function setMenu(open) {
        if (!mobileMenuBtn || !navLinks) return;

        navLinks.classList.toggle("active", open);
        mobileMenuBtn.setAttribute("aria-expanded", String(open));

        const icon = mobileMenuBtn.querySelector("[data-lucide]") || mobileMenuBtn.querySelector("svg") || mobileMenuBtn.querySelector("i");
        if (icon) {
            icon.setAttribute("data-lucide", open ? "x" : "menu");
            renderIcons();
        }
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");

        mobileMenuBtn.addEventListener("click", () => {
            setMenu(!navLinks.classList.contains("active"));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenu(false);
            }
        });

        document.addEventListener("click", (event) => {
            if (!navLinks.classList.contains("active")) return;
            if (navLinks.contains(event.target) || mobileMenuBtn.contains(event.target)) return;
            setMenu(false);
        });
    }

    // Interactive developer terminal
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutputs = document.getElementById("terminal-outputs");
    const terminalBody = document.getElementById("terminal-body");

    const commands = {
        help: () => `
            Available commands:
            - <span class="t-keyword">about</span>       : Brief summary about me
            - <span class="t-keyword">skills</span>      : My technical toolkit
            - <span class="t-keyword">experience</span>  : Professional experience
            - <span class="t-keyword">projects</span>    : Featured projects
            - <span class="t-keyword">achieve</span>     : Hackathons and roles
            - <span class="t-keyword">contact</span>     : Contact channels
            - <span class="t-keyword">cv</span>          : Download my resume
            - <span class="t-keyword">retailiq</span>    : Open RetailIQ
            - <span class="t-keyword">citypulse</span>   : Open City Pulse
            - <span class="t-keyword">github</span>      : Open GitHub
            - <span class="t-keyword">linkedin</span>    : Open LinkedIn
            - <span class="t-keyword">clear</span>       : Clear the terminal
        `,
        about: () => `
            <strong>Harshit Prasad</strong> - B.Tech IT pre-final student at RIT (2023 - 2027).
            Seeking software engineering, backend database, data analytics, or AI internship roles.
            Experienced in Python development, FastAPI, database schemas, and neural network modules from scratch.
        `,
        skills: () => `
            <strong>Technical Skillset:</strong>
            - <span class="t-keyword">Languages:</span> Python, SQL, HTML, CSS
            - <span class="t-keyword">Backend:</span> FastAPI, SQLAlchemy, SQLite, PostgreSQL-ready design, REST APIs
            - <span class="t-keyword">Data & AI:</span> Pandas, NumPy, CNNs, Backpropagation, LLM Fine-tuning Workflows
            - <span class="t-keyword">Tools:</span> GitHub, Pytest, Streamlit, Figma, Blender, PyGame
        `,
        experience: () => `
            <strong>S.T.E.M Engineer Intern</strong> | Frostrek LLP, Gurgaon (Dec 2025 - Jan 2026)
            - Contributed to LLM training and fine-tuning workflows.
            - Worked on STEM and AI tasks using Python, model evaluation, and applied ML pipelines.
        `,
        projects: () => `
            <strong>Featured Projects:</strong>
            1. <span class="t-keyword">RetailIQ</span>: Sales analytics and inventory forecasting.
               Command: <span class="t-keyword">retailiq</span>
            2. <span class="t-keyword">City Pulse</span>: Real-time map city tracker, Sunhacks Hackathon 2025.
               Command: <span class="t-keyword">citypulse</span>
            3. <span class="t-keyword">Deep Learning From Scratch</span>: NumPy neural network components.
        `,
        achieve: () => `
            <strong>Achievements & Extracurriculars:</strong>
            - <span class="t-keyword">Sunhacks Hackathon 2025</span>: Secured 5th position.
            - <span class="t-keyword">Google Student Ambassador</span>: Two-time ambassador.
            - <span class="t-keyword">Tech-Coding Club</span>: Founder and mentor.
            - <span class="t-keyword">GUVI Certification</span>: Python and PyGame programming.
        `,
        contact: () => `
            <strong>Contact Channels:</strong>
            - Email   : <a href="mailto:hstpsd@gmail.com" style="color: #d7ff61;">hstpsd@gmail.com</a>
            - Phone   : <a href="tel:+917982059127" style="color: #d7ff61;">+91 79820 59127</a>
            - Location: Gwalior, Madhya Pradesh, India
        `,
        cv: () => {
            downloadResume();
            return "Downloading CV...";
        },
        resume: () => {
            downloadResume();
            return "Downloading CV...";
        },
        download: () => {
            downloadResume();
            return "Downloading CV...";
        },
        retailiq: () => {
            openExternal("https://retailiq-harshit.netlify.app/");
            return "Opening RetailIQ in a new tab...";
        },
        citypulse: () => {
            openExternal("https://github.com/SyntaxSociety6/City-Pulse");
            return "Opening City Pulse repository in a new tab...";
        },
        github: () => {
            openExternal("https://github.com/SyntaxSociety6");
            return "Opening GitHub profile in a new tab...";
        },
        linkedin: () => {
            openExternal("https://www.linkedin.com/in/harshit-prasad-5569532a1/");
            return "Opening LinkedIn profile in a new tab...";
        },
        home: () => {
            scrollToSection("hero");
            return "Jumping to home...";
        },
        work: () => {
            scrollToSection("projects");
            return "Jumping to work...";
        },
        projectsnav: () => {
            scrollToSection("projects");
            return "Jumping to work...";
        },
        stack: () => {
            scrollToSection("skills");
            return "Jumping to stack...";
        },
        clear: () => {
            terminalOutputs.innerHTML = "";
            return "";
        }
    };

    commands.project = commands.projects;
    commands.projectsnav = commands.projects;
    commands.skill = commands.skills;
    commands.githubprofile = commands.github;
    commands.linkedIn = commands.linkedin;

    function appendCommand(input) {
        const commandLine = document.createElement("div");
        commandLine.className = "terminal-line";

        const prompt = document.createElement("span");
        prompt.className = "terminal-prompt";
        prompt.textContent = "harshit@portfolio:~$";

        const value = document.createElement("span");
        value.style.color = "#f1f5f9";
        value.textContent = ` ${input}`;

        commandLine.append(prompt, value);
        terminalOutputs.appendChild(commandLine);
    }

    function appendOutput(html) {
        if (!html) return;
        const outputLine = document.createElement("div");
        outputLine.className = "terminal-line";
        outputLine.innerHTML = html.replace(/\n/g, "<br>");
        terminalOutputs.appendChild(outputLine);
    }

    if (terminalInput && terminalOutputs && terminalBody) {
        terminalBody.addEventListener("click", () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;

            const inputVal = terminalInput.value.trim();
            if (!inputVal) return;

            const command = inputVal.toLowerCase().split(/\s+/)[0];
            appendCommand(inputVal);

            const response = commands[command]
                ? commands[command]()
                : `command not found: <span style="color: #ff8a3d;">${command}</span>. Type <span class="t-keyword">help</span> for a list of commands.`;

            appendOutput(response);
            terminalInput.value = "";
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }
});
