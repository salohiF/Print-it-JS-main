const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}

] //un tableau slides qui contient des objets avec deux propriétés : image et tagLine

//Récupérer un élément de notre DOM grâce à la méthode querySelector(selecteurCss)
const container = document.querySelector('.slides')
const dots = document.querySelector('.dots')

//la méthode forEach pour parcourir le tableau slides. 
//Pour chaque objet, j'ai créé un nouvel élément img et un nouvel élément div pour le point de pagination correspondant
//Ensuite, j'ai ajouté l'élément img à container et l'élément div à dots
slides.forEach( (slide, i)=>{

  const figure = document.createElement ('figure');
  figure.classList.add ('slide')
  //Image
  const image = document.createElement('img');
  image.setAttribute('src', './assets/images/slideshow/'+slide.image )
  figure.appendChild(image)

  //tagline
  const titre = document.createElement('p');
  titre.innerHTML= slide.tagLine;
  figure.appendChild (titre)

  container.appendChild (figure)

  
  //Dots
  const dot = document.createElement('div');
  dot.classList.add('dot') //Ajouter la classe dot
  dot.setAttribute('data-slide', i)
  dots.appendChild(dot)

//puis j'ai ajouté un écouteur d'événements click à chaque point de pagination.
//Lorsqu'un point est cliqué, la fonction gotoSlide est appelée avec l'index du point cliqué.
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    gotoSlide(slideIndex);
  });

} )

/*--------------------------------------------------------*/

//j'ai électionné tous les éléments avec la classe slide pour les  stockés dans la constante slidesHTML.  
//et j'ai défini les variables currentSlideIndex, lastIndex et firstIndex
const slidesHTML = document.querySelectorAll('.slide') 

let currentSlideIndex = 0;
const lastIndex = slidesHTML.length - 1;
const firstIndex = 0;

/* Faire une fonction de déplacement*/
function moveSlide(){
  slidesHTML.forEach( (slide, i) =>{
    //Si l'index est le même, la classe active est ajoutée à l'élément.
    // Sinon, si l'élément a déjà la classe active, elle est supprimée.
    //console.log(`Index courant : ${currentSlideIndex}`, `Index parcouru : ${i}`)
    if( i == currentSlideIndex ){
      slide.classList.add('active')
      //document.querySelector('.titre').innerHTML = "<p>" + slides[currentSlideIndex].tagLine + "</p>";
    }else if( slide.classList.contains('active') ){
       slide.classList.remove('active')
    }


    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentSlideIndex) {
        dot.classList.add('dot_selected');
      } else {
        dot.classList.remove('dot_selected');
      }
    });
    
    //Créer un mouvement de déplacement 
    //Cette fonction utilise setTimeout pour appliquer un délai à l'exécution de la fonction
    
    setTimeout(() => {
      let translateValue = 100 * (i - currentSlideIndex);
     // console.log(translateValue);
      slide.style.transition = 'transform 1s ease'; //la transition durera 1 seconde
      slide.style.transform = `translateX(${translateValue}%)`;//déplace la diapositive horizontalement de la valeur spécifiée
    }, i * 900); //  Le délai est calculé en multipliant l'index de la diapositive actuelle par 900 millisecondes
  
    
  })
}
function goNext(){
  // 1 -  Modifier index  
  if( currentSlideIndex === lastIndex){
    currentSlideIndex = 0
  }else{
    currentSlideIndex++
  }
  // 2-  afficher la slide au nouvel index
  moveSlide();
}

//goPrev

function goPrev(){
  // 1 -  Modifier index  
  if( currentSlideIndex === firstIndex){
    currentSlideIndex = lastIndex
  }else{
    currentSlideIndex--
  }
  // 2-  afficher la slide au nouvel index
  moveSlide();
}

//Pour aller à un index spécifique
function gotoSlide(idx){
  currentSlideIndex=idx;
  moveSlide();
}

moveSlide();
const autoplay = setInterval(goNext, 3000)

//J'ai sélectionné les éléments HTML pour les flèches en utilisant querySelector 
// j'ai ajouté un event listener pour l'événement click. flèche de droite appelle la fonction goNext//

const arrowRight = document.querySelector('.arrow_right');
arrowRight.addEventListener('click', goNext)

const arrowLeft = document.querySelector('.arrow_left');
arrowLeft.addEventListener('click', goPrev)
