const config = {
    GITHUB_TOKEN: 'your_github_token', // Replace with your token
    REPO_OWNER: 'your_username',       // Replace with your GitHub username
    REPO_NAME: 'your_repo_name'        // Replace with your repo name
};

class AdminDashboard {
    constructor() {
        this.fileInput = document.getElementById('fileInput');
        this.dropZone = document.getElementById('dropZone');
        this.previewContainer = document.getElementById('previewContainer');
        this.uploadBtn = document.getElementById('uploadBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dropZone.addEventListener('drop', this.handleDrop.bind(this));
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        this.uploadBtn.addEventListener('click', this.handleUpload.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.dropZone.classList.add('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.dropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        this.handleFiles(files);
    }

    handleFileSelect(e) {
        const files = e.target.files;
        this.handleFiles(files);
    }

    handleFiles(files) {
        this.previewContainer.innerHTML = '';
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.createPreview(file);
            }
        });
    }

    createPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <span>${file.name}</span>
            `;
            this.previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }

    async handleUpload() {
        const files = this.fileInput.files;
        if (!files.length) return alert('Please select files to upload');

        try {
            for (const file of files) {
                const base64Content = await this.fileToBase64(file);
                await this.uploadToGithub(file.name, base64Content);
            }
            alert('Upload successful!');
            this.previewContainer.innerHTML = '';
            this.fileInput.value = '';
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        }
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    async uploadToGithub(filename, content) {
        const path = `src/assets/gallery/${filename}`;
        const response = await fetch(`https://api.github.com/repos/${config.REPO_OWNER}/${config.REPO_NAME}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add gallery image: ${filename}`,
                content,
                branch: 'main'
            })
        });

        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    }
}

// Initialize dashboard after authentication
if (auth.isAuthenticated) {
    new AdminDashboard();
}