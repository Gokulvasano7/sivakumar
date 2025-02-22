class Gallery {
    constructor() {
        this.images = [
            { 
                src: './assets/gallery/1.jpg',
                title: ''
            },
            { 
                src: './assets/gallery/2.jpg', 
                title: '' 
            },
            { 
                src: './assets/gallery/3.jpg', 
                title: '' 
            },
            { 
                src: './assets/gallery/4.jpg', 
                title: '' 
            }, 
            {
                src: './assets/gallery/5.jpg',
                title: ''
            },
            {
                src: './assets/gallery/6.jpg',
                title: ''
            },
            {
                src: './assets/gallery/7.jpg',
                title: ''
            },
            {
                src: './assets/gallery/8.jpg',
                title: ''
            },
            {
                src: './assets/gallery/9.jpg',
                title: ''
            },
            {
                src: './assets/gallery/10.jpg',
                title: ''
            },
            {
                src: './assets/gallery/11.jpg',
                title: ''
            }, 
            {
                src:'./assets/gallery/12.jpg',
                title:''
            },
            
            {
                src:'./assets/gallery/13.jpg',
                title:''
            }
            
        ];
        this.container = document.querySelector('.gallery-grid');
        this.modal = this.createModal();
        this.currentImageIndex = 0;
        this.init();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <button class="nav-btn prev">&lt;</button>
                <button class="nav-btn next">&gt;</button>
                <img src="" alt="">
                <h3></h3>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
    }

    renderGallery() {
        this.container.innerHTML = '';
        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            item.innerHTML = `
                <img src="${image.src}" 
                     alt="${image.title}"
                     data-index="${index}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+Not+Found'">
                <div class="gallery-overlay">
                    <h3>${image.title}</h3>
                </div>
            `;
            this.container.appendChild(item);
        });
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const img = item.querySelector('img');
                const index = parseInt(img.dataset.index);
                this.openModal(index);
            }
        });

        this.modal.querySelector('.prev').addEventListener('click', () => {
            this.navigateGallery('prev');
        });

        this.modal.querySelector('.next').addEventListener('click', () => {
            this.navigateGallery('next');
        });

        this.modal.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'flex') {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.navigateGallery('prev');
                if (e.key === 'ArrowRight') this.navigateGallery('next');
            }
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(index) {
        this.currentImageIndex = index;
        const image = this.images[index];
        const modalImg = this.modal.querySelector('img');
        const modalTitle = this.modal.querySelector('h3');
        
        modalImg.src = image.src;
        modalTitle.textContent = image.title;
        this.modal.style.display = 'flex';
        this.updateNavigationButtons();
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    navigateGallery(direction) {
        if (direction === 'prev' && this.currentImageIndex > 0) {
            this.currentImageIndex--;
        } else if (direction === 'next' && this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
        }
        this.openModal(this.currentImageIndex);
    }

    updateNavigationButtons() {
        const prevBtn = this.modal.querySelector('.prev');
        const nextBtn = this.modal.querySelector('.next');
        
        prevBtn.style.display = this.currentImageIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = this.currentImageIndex === this.images.length - 1 ? 'none' : 'block';
    }
}
