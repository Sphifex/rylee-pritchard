import { projects } from '../data/projects.js';
import { skills } from '../data/skills.js';

export class HomePage {
    constructor() {
        this.app = document.querySelector('#app');
    }

    mount() {
        this.render();
        this.setupEventListeners();
        this.initializeSlider();
    }

    unmount() {
        this.app.innerHTML = '';
    }

    render() {
        this.app.innerHTML = `
            <section id="hero" class="hero">
                <div class="hero-overlay">
                    <h1>Rylee Pritchard</h1>
                    <h2>This Is My Portfolio . . .</h2>
                    <h3>This portfolio will be updated with every new project I take on !!!</h3>
                    <div class="slider-container">
                        <div class="slider">
                            <div class="user-img-wrap">
                                <div class="user-img">
                                    <img src="./images/userpic.jpg" alt="User Picture"/>
                                </div>
                            </div>
                            <div class="user-meta">
                                <div class="username">Rylee Pritchard</div>
                                <div class="user-location">Ruskin, FL, USA</div>
                                <div class="user-profiles">
                                    <a href="https://www.youtube.com/@sphifex5678" target="_blank">
                                        <ion-icon name="logo-youtube"></ion-icon>
                                    </a>
                                    <a href="https://x.com/sphifex" target="_blank">
                                        <ion-icon name="logo-twitter"></ion-icon>
                                    </a>
                                    <a href="https://www.instagram.com/aka_rylee/reels/" target="_blank">
                                        <ion-icon name="logo-instagram"></ion-icon>
                                    </a>
                                    <a href="" target="_blank">
                                        <ion-icon name="logo-linkedin"></ion-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about">
                <h2>About Me</h2>
                <p>Hi, I’m Rylee Pritchard, a front-end web developer with a passion 
                for creating clean, unique, and user-friendly designs. Born and but NOT 
                raised in Joplin, MO, as I moved around a lot, I discovered my love for 
                web development in 2022, thanks to my dad, who introduced me to the world 
                of coding. Since then, I’ve been dedicated to learning how to, and to 
                creating websites that not only look great but also provide an exceptional 
                user experience.</p>
            </section>

            <section id="projects">
                <h2>Projects</h2>
                <div class="project-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="html">HTML</button>
                    <button class="filter-btn" data-filter="css">CSS</button>
                    <button class="filter-btn" data-filter="javascript">JavaScript</button>
                </div>
                <div class="project-grid">
                    ${this.renderProjects()}
                </div>
            </section>

            <section id="skills">
                <h2>Skills</h2>
                <div class="skills-container">
                    ${this.renderSkills()}
                </div>
            </section>

            <section id="contact">
                <h2 class="contactme">Contact Me</h2>
                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </section>
        `;
    }

    renderProjects() {
        return projects.map(project => `
            <div class="card" data-categories='${JSON.stringify(project.categories)}'>
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="view-details-container">
                    <a href="/project/${project.id}" class="view-project" data-link>View Details</a>
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        return skills.map(skill => `
            <div class="skill-bar">
                <span class="skill-name">${skill.name}</span>
                <div class="skill-progress">
                    <div class="skill-progress-fill" style="width: ${(skill.years / 5) * 100}%"></div>
                </div>
                <span>${skill.years} years</span>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterProjects(filter);
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
    }

    async handleContactSubmit(e) {
        e.preventDefault(); // Prevents page reload

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!window.emailjs) {
            console.error("EmailJS not loaded!");
            alert("Email service not available. Try again later.");
            return;
        }

        emailjs.send("service_6gp7pi2", "template_84zph3i", {
            name: name,
            email: email,
            message: message
        }, "BgHY8529lRwUIFO1F")
        .then(response => {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
        })
        .catch(error => {
            alert("Failed to send message. Try again.");
            console.error("EmailJS Error:", error);
        });
    }

    initializeSlider() {
        const slider = document.querySelector('.slider');
        let currentSlide = 0;

        setInterval(() => {
            currentSlide = (currentSlide + 0) % 2;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }
}
