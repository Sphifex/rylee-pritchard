export class ProjectPage {
    constructor(params) {
        this.app = document.querySelector('#app');
        this.projectId = params.id;
    }

    mount() {
        this.render();
    }

    unmount() {
        this.app.innerHTML = '';
    }

    render() {
        // Fetch project details based on this.projectId
        const project = {
            title: 'Project Title',
            description: 'Project description...',
            code: '// Sample code\nconst x = 42;'
        };

        this.app.innerHTML = `
            <div class="project-detail">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <div class="code-preview">
                    <pre><code>${project.code}</code></pre>
                </div>
                <a href="/" data-link>Back to Home</a>
            </div>
        `;
    }
}