const buttonNavMobil = document.getElementById('right-mobil');
const buttonNavDesktop = document.getElementById('right-desktop');
const buttonBar = document.getElementById('right-mobil');
const checkbox = document.getElementById('nav-checkbox');
const menuMobil = document.getElementById('menu-mobil');
let heightMenuMobil = menuMobil.children.length * menuMobil.children[0].offsetHeight;
console.log(heightMenuMobil);

// Au chargement de la page fait apparaitre la div nav-right suivant la taille de l'écran
window.addEventListener("load", () => {
    if(window.innerWidth > 800){
        buttonNavDesktop.style.display = "flex";
        buttonNavMobil.style.display = "none";
    } else {
        buttonNavDesktop.style.display = "none";
        buttonNavMobil.style.display = "flex";
    }
});


// Si la page est redimensionné fait apparaitre la div nav-right suivant la taille de l'écran
window.addEventListener('resize', () => {
    if(window.innerWidth > 800){
        buttonNavDesktop.style.display = "flex";
        buttonNavMobil.style.display = "none";
        checkbox.checked = false;
        menuMobil.style.height = "0px";
        menuMobil.style.paddingTop = "0px";
        for(var i = 0; i < menuMobil.children.length; i++){
            let li = menuMobil.children[i];
            li.style.opacity = "0";
            li.style.transition = "none";
        }
    } else {
        buttonNavDesktop.style.display = "none";
        buttonNavMobil.style.display = "flex";
    }
})

// Afficher le menu deroulant ou non 
buttonBar.addEventListener('click', () => {
    checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
    if(checkbox.checked) {
        menuMobil.style.height = `${heightMenuMobil}px`;
        let time = 0;
        for(var i = 0; i < menuMobil.children.length; i++){
            time = time + 100;
            let li = menuMobil.children[i];
            menuMobil.style.paddingTop = "20px";
            setTimeout(() => {
                li.style.opacity = "1";
                li.style.transition = ".3s ease-in";
            }, time)
        }
    } else {
        menuMobil.style.height = "0px";
        menuMobil.style.paddingTop = "0px";
        for(var i = 0; i < menuMobil.children.length; i++) {
            const li = menuMobil.children[i];
            li.style.opacity = "0";
            li.style.transition = "none";
        }
    }
})

// Si on clique sur un bouton du menu deroulant
for(var i = 0; i < menuMobil.children.length; i++){
    let li = menuMobil.children[i]
    li.addEventListener('click', () => {
        checkbox.checked = false;
        menuMobil.style.height = "0px";
        menuMobil.style.paddingTop = "0px";
        for(var e = 0; e < menuMobil.children.length; e++){
            menuMobil.children[e].style.opacity = "0";
            menuMobil.children[e].style.transition = "none";
        }
    })
}


