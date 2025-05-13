document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const envelope = document.querySelector('.envelope');
    const menu = document.querySelector('.menu');
    const letter = document.querySelector('.letter');
    const gallery = document.querySelector('.gallery');
    const musicPlayer = document.querySelector('.music-player');
    const backButtons = document.querySelectorAll('.back-button');
    const uploadButton = document.querySelector('.upload-button');
    const galleryGrid = document.querySelector('.gallery-grid');
    const vinylContainer = document.querySelector('.vinyl-container');
    const menuButtons = document.querySelectorAll('.menu-button');
    const envelopeContent = document.querySelector('.envelope-content');
    const envelopeFlap = document.querySelector('.envelope-flap');
    const senderRecipient = document.querySelector('.sender-recipient');

    // Estado inicial
    let isPlaying = false;
    let isEnvelopeOpen = false;

    // Funções de navegação
    function showSection(section) {
        [menu, letter, gallery, musicPlayer].forEach(s => {
            s.style.display = 'none';
            s.classList.remove('visible');
        });
        section.style.display = 'block';
        setTimeout(() => {
            section.classList.add('visible');
        }, 50);
    }

    // Animação do envelope
    envelopeFlap.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Anima o flap
        envelopeFlap.style.transform = 'rotateX(180deg)';
        
        // Fade out do conteúdo
        envelope.classList.add('fade-out');
        
        // Redireciona após a animação
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 1000);
    });

    // Event Listeners para voltar
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Esconde a seção atual
            const currentSection = button.closest('.letter, .gallery, .music-player');
            currentSection.classList.remove('visible');
            
            // Mostra o menu novamente
            setTimeout(() => {
                menu.style.display = 'flex';
                menuButtons.forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.add('visible');
                    }, index * 150);
                });
                menu.classList.add('visible');
            }, 300);
        });
    });

    // Event Listeners para as seções
    menuButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Esconde os botões do menu
            menuButtons.forEach(btn => btn.classList.remove('visible'));
            menu.classList.remove('visible');
            
            // Mostra a seção correspondente
            setTimeout(() => {
                switch(index) {
                    case 0:
                        showSection(letter);
                        break;
                    case 1:
                        showSection(gallery);
                        break;
                    case 2:
                        showSection(musicPlayer);
                        break;
                }
            }, 300);
        });
    });

    // Player de música
    vinylContainer.addEventListener('click', () => {
        isPlaying = !isPlaying;
        vinylContainer.classList.toggle('playing', isPlaying);
    });

    // Upload de imagens
    uploadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('div');
                    img.className = 'gallery-item';
                    img.innerHTML = `<img src="${event.target.result}" alt="Imagem da galeria">`;
                    
                    img.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const modal = document.createElement('div');
                        modal.className = 'modal';
                        modal.innerHTML = `
                            <div class="modal-content">
                                <img src="${event.target.result}" alt="Imagem ampliada">
                            </div>
                        `;
                        document.body.appendChild(modal);
                        
                        modal.addEventListener('click', () => {
                            modal.remove();
                        });
                    });
                    
                    galleryGrid.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        };
        
        input.click();
    });

    // Animações de hover
    function addHoverEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-3px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    }

    menuButtons.forEach(addHoverEffect);
}); 