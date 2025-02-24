import { projects } from '../data/projects.js'; // ✅ Import the projects data

export class ProjectPage {
    constructor(params) {
        this.app = document.querySelector('#app');
        this.projectId = parseInt(params.id); // Convert to number to match project IDs
    }

    mount() {
        this.render();
    }

    unmount() {
        this.app.innerHTML = '';
    }

    render() {
        console.log("Project ID:", this.projectId);
        console.log("Available Projects:", projects.map(p => p.id)); // Debugging

        // Find the project by ID (default to first project if not found)
        const project = projects.find(p => p.id === this.projectId) || projects[0];

        this.app.innerHTML = `
            <div class="project-detail">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <div class="code-preview">
                    ${project.code} <!-- Embed iframe directly -->
                </div>
                <button id="backToHome">Back to Home</button>
            </div>
        `;

        // Attach event listener to "Back to Home" button
        document.getElementById('backToHome').addEventListener('click', () => {
            const homeButton = document.querySelector('.nav-home');
            if (homeButton) homeButton.click();
            else window.location.href = '/';
        });
    }
}


