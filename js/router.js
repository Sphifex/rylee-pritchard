export class Router {
    constructor() {
        this.routes = new Map();
        this.currentComponent = null;

        // Listen for browser navigation events
        window.addEventListener('popstate', () => this.handleRoute());
    }

    /**
     * Add a new route.
     * @param {string} path The path of the route.
     * @param {class} component The component to render for the route.
     */
    addRoute(path, component) {
        this.routes.set(path, component);
    }

    /**
     * Initialize the router and render the current route.
     */
    init() {
        this.handleRoute();

        // Handle clicks on links with the 'data-link' attribute
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.href);
            }
        });
    }

    /**
     * Navigate to a new route.
     * @param {string} url The new URL to navigate to.
     */
    navigate(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }

    /**
     * Handle routing logic and render the appropriate component.
     */
    handleRoute() {
        const path = window.location.pathname;
        let component = null;
        let params = {};

        for (let [routePath, routeComponent] of this.routes) {
            const match = this.matchRoute(routePath, path);
            if (match) {
                component = routeComponent;
                params = match.params;
                break;
            }
        }

        if (component) {
            if (this.currentComponent) {
                this.currentComponent.unmount(); // Unmount the current component
            }
            this.currentComponent = new component(params);
            this.currentComponent.mount(); // Mount the new component
        } else {
            console.error(`No route found for path: ${path}`);
            // Optionally redirect to a fallback route or show a 404 page
        }
    }

    /**
     * Match the current path with a route.
     * @param {string} routePath The registered route path.
     * @param {string} currentPath The current browser path.
     * @returns {object|null} The matched route parameters or null.
     */
    matchRoute(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const currentParts = currentPath.split('/');
        const params = {};

        if (routeParts.length !== currentParts.length) {
            return null;
        }

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                params[routeParts[i].slice(1)] = currentParts[i];
            } else if (routeParts[i] !== currentParts[i]) {
                return null;
            }
        }

        return { params };
    }
}

const router = async () => {
    const path = location.pathname;
    
    if (path.startsWith('/project/')) {
        const projectId = path.split('/project/')[1]; // Extract project ID from URL
        const page = new ProjectPage({ id: projectId });
        page.mount();
    }
};
