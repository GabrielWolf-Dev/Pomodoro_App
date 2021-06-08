export default function menuMobile() {
    const $ = document.querySelector.bind(document);
    const btnMenu = $('#btnMenu');
    const menu = $('#menu');

    btnMenu.addEventListener('click', (event) => {
        const activeMenu = btnMenu.classList.contains('menu-mobile__btn--active');

        btnMenu.classList.toggle('menu-mobile__btn--active');
        menu.classList.toggle('menu-mobile__menu--active');

        event.currentTarget.setAttribute('aria-expended', activeMenu);
        if(!activeMenu) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
            btnMenu.ariaExpanded = true;
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
            btnMenu.ariaExpanded = false;
        }
    });
}
