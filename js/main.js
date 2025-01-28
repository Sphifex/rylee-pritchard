import { Router } from './router.js';
import { HomePage } from './pages/home.js';
import { ProjectPage } from './pages/project.js';
import { Navbar } from './pages/navbar.js';

// Mount the Navbar component
const navbar = new Navbar();
navbar.mount(document.querySelector('nav')); // Mounts into the <nav> element

// Initialize HomePage
const homePage = new HomePage();
homePage.mount();

// Initialize the Router
const router = new Router();

// Register application routes
router.addRoute('/', HomePage);
router.addRoute('/project/:id', ProjectPage);

// Start the Router
router.init();

// Fix for Links: Smooth Scrolling to Sections
document.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-link]');
    if (target) {
        const href = target.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault(); // Prevent default anchor behavior
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to section
            }
        }
    }
});