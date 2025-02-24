export class Navbar {
    constructor() {
        this.navbarHTML = `
            <nav class="navbar">
                <div class="navdiv">
                    <button class="hamburger-menu" id="hamburger-menu">☰</button>
                    <ul class="nav-links" id="nav-links">
                     <li>
                            <button id="theme-toggle" class="theme-toggle">🌙</button>
                        </li>
                        <li><a href="#hero" data-link>Home</a></li>
                        <li><a href="#about" data-link>About</a></li>
                        <li><a href="#projects" data-link>Projects</a></li>
                        <li><a href="#skills" data-link>Skills</a></li>
                        <li><a href="#contact" data-link>Contact</a></li>
                       
                    </ul>
                </div>
            </nav>
        `;
    }

    /**
     * Mount the Navbar into the specified container.
     * @param {HTMLElement} container The DOM element to render the navbar.
     */
    mount(container) {
        if (container) {
            container.innerHTML = this.navbarHTML; // Inject the navbar HTML
            this.setupEventListeners(); // Setup interactivity
        } else {
            console.error('Navbar container not found'); // Debugging information
        }
    }

    /**
     * Setup event listeners for hamburger menu toggle.
     */
    setupEventListeners() {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinks = document.getElementById('nav-links');

        if (hamburgerMenu && navLinks) {
            hamburgerMenu.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-visible'); // Toggle visibility for mobile menu
            });
        }
    }
}

