document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-button');
    const letter = document.querySelector('.letter');
    const gallery = document.querySelector('.gallery');
    const musicPlayer = document.querySelector('.music-player');
    const backButtons = document.querySelectorAll('.back-button');
    const menu = document.querySelector('.menu');

    // Mostra o menu com animação
    setTimeout(() => {
        menu.style.display = 'flex';
        menuButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('visible');
            }, index * 150);
        });
        menu.classList.add('visible');
    }, 500);

    // Função para mostrar uma seção específica
    function showSection(section) {
        // Esconde todas as seções
        letter.style.display = 'none';
        gallery.style.display = 'none';
        musicPlayer.style.display = 'none';
        menu.style.display = 'none';

        // Mostra a seção selecionada
        section.style.display = 'block';
        setTimeout(() => {
            section.classList.add('visible');
        }, 50);
    }

    // Event listeners para os botões do menu
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

    // Event listeners para os botões de voltar
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Esconde todas as seções
            letter.classList.remove('visible');
            gallery.classList.remove('visible');
            musicPlayer.classList.remove('visible');

            // Mostra o menu
            setTimeout(() => {
                letter.style.display = 'none';
                gallery.style.display = 'none';
                musicPlayer.style.display = 'none';
                menu.style.display = 'flex';
                menuButtons.forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.add('visible');
                    }, index * 150);
                });
                menu.classList.add('visible');
            }, 500);
        });
    });

    // Upload de imagens
    const uploadButton = document.querySelector('.upload-button');
    const galleryGrid = document.querySelector('.gallery-grid');

    uploadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;

        input.onchange = (e) => {
            const files = e.target.files;
            for (let file of files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    const div = document.createElement('div');
                    div.className = 'gallery-item';
                    div.appendChild(img);
                    galleryGrid.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });

    // Player de música
    const vinylContainer = document.querySelector('.vinyl-container');
    const vinylDisc = document.querySelector('.vinyl-disc');
    let isPlaying = false;

    vinylContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying = !isPlaying;
        if (isPlaying) {
            vinylContainer.classList.add('playing');
        } else {
            vinylContainer.classList.remove('playing');
        }
    });
}); 