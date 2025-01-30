class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.token = localStorage.getItem('adminToken');
        this.checkAuth();
    }

    checkAuth() {
        if (this.token) {
            this.isAuthenticated = true;
            this.showDashboard();
        }
    }

    async login(username, password) {
        // For demo purposes - replace with secure authentication
        if (username === 'a' && password === 'a') {
            const token = this.generateToken();
            localStorage.setItem('adminToken', token);
            this.isAuthenticated = true;
            this.token = token;
            this.showDashboard();
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('adminToken');
        this.isAuthenticated = false;
        this.token = null;
        window.location.href = '/admin';
    }

    generateToken() {
        // Generate a random token - replace with proper JWT in production
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    showDashboard() {
        const loginForm = document.getElementById('loginForm');
        const dashboard = document.getElementById('dashboard');
        
        if (loginForm && dashboard) {
            loginForm.classList.add('hidden');
            dashboard.classList.remove('hidden');
        }
    }

    requireAuth(req, res, next) {
        if (!this.isAuthenticated) {
            window.location.href = '/admin';
            return false;
        }
        return true;
    }

    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }
}

// Initialize auth
const auth = new Auth();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const success = await auth.login(username, password);
                if (!success) {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed');
            }
        });
    }

    const logoutBtn = document.querySelector('#dashboard button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.logout();
        });
    }
});

// Export auth instance
window.auth = auth;