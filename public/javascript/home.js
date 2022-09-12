const dynamicText = document.getElementById('dynamic-text');
const blink = document.getElementById('blink');
const words = ["Je suis passionné d'informatique.", "Je suis développeur web et mobile."];
let barBlink;
let sectionAbout = document.getElementById('about');
let sectionProjects = document.getElementById('projects');
let nav = document.getElementsByTagName("nav")[0];
let spanAbout = document.getElementById('span-about');
let spanProjects = document.getElementById('span-projects');

// Lance le clignotement de la barre d'insertions
const start = () => {
    barBlink = setInterval(() => {
        blink.style.opacity = (blink.style.opacity == 0 ? 1 : 0)
    }, 500)
};
// Supprime lettre par lettre
const deleteLetter = () => {
    // Stop le clignotement de la bar d'insertions
    clearInterval(barBlink);
    blink.style.opacity = 1;
    const arrayFullLetterForDelete = words[0].split('');

    
    const intervalDelete = setInterval(() => {
        arrayFullLetterForDelete.pop()
        dynamicText.innerHTML = arrayFullLetterForDelete.join('');
        
        // Si le tableau arrayFullLetterForDelete contenant chaque lettre de la phrase est vide, on supprime la phrase du tableau words
        if(arrayFullLetterForDelete.length === 0){
            words.shift();
            clearInterval(intervalDelete);
            start();

            // Si il reste des phrases dans le tableau on lance la fonction addLetter
            setTimeout(() => {
                if(words.length > 0){
                    addLetter();
                }
            }, 1000)
        }
    }, 100)
};
// Ecrit une phrase
const addLetter = () => {
    clearInterval(barBlink);
    blink.style.opacity = 1;

    let arrayNewWord = words[0].split('');
    let stringNewWord = '';
    let startNumber = -1;

    const intervalAdd = setInterval(() => {
        startNumber++;

        // Tant que numero d'index dans le tableau arrayNewWord existe, le programme continue d'injecter les lettres ajouter à la variable stringNewWord dans la balise HTML
        if(arrayNewWord[startNumber] !== undefined){
            stringNewWord = stringNewWord + arrayNewWord[startNumber];
            dynamicText.innerHTML = stringNewWord;
        } else {
            // Quand le numero d'index n'existe plus le programme efface l'interval, si il reste des phrases dans le tableau words, le programme lance la fonction deleteLetter 
            clearInterval(intervalAdd);
            words.shift();
            start();

            setTimeout(() => {
                if(words.length > 0){
                    deleteLetter();
                }
            }, 1000)
        }
    }, 100)
};
// Lancement du programme pour Ecrire et supprimé des phrases
start();
const myTimeout = setTimeout(() => {
    deleteLetter();
}, 3000);





// Check si l'element est visible a l'écran
function isInViewport(el) {
    var topEl = el.offsetTop - 100; // Recupere l'emplacement de l'element sur l'axeY par rapport au top document
    var heightEl = el.offsetHeight - 110; // Recupere la hauteur de l'element - 10px (pour eviter les croisements entre les sections)
    var bottomEl = heightEl + topEl; // Recupere l'emplacement du bas de l'element sur l'axeY par rapport au top document

    if(topEl < window.pageYOffset + nav.clientHeight && bottomEl > window.pageYOffset + nav.clientHeight){
        return true;
    } else return false;
  }

document.addEventListener('scroll', function () {
    isInViewport(sectionAbout) ? spanAbout.style.width = "50px" : spanAbout.style.width = "0px";
    isInViewport(sectionProjects) ? spanProjects.style.width = "50px" : spanProjects.style.width = "0px";
}, {
    passive: true
});
