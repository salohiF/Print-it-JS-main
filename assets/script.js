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

] //ARRAY DE SLIDES qui sont des objets

//Récupérer un élément de notre DOM grâce à la méthode querySelector(selecteurCss)
const container = document.querySelector('.slides')
const dots = document.querySelector('.dots')
//Parcourir le tableau slides et créer un élement <img> pour chaque objet contenu dans ce tableau
//array.forEach()
slides.forEach( (slide, i)=>{
  //Image
  const image = document.createElement('img');
  image.setAttribute('src', './assets/images/slideshow/'+slide.image )
  image.classList.add('slide')
  container.appendChild(image)
  
  //Dots
  const dot = document.createElement('div');
  dot.classList.add('dot') //Ajouter la classe dot
  dot.setAttribute('data-slide', i)
  dots.appendChild(dot)

  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    gotoSlide(slideIndex);
  });

} )

/*--------------------------------------------------------*/

//On veut interagir sur les elements qui sont dans notre DOM
const slidesHTML = document.querySelectorAll('.slide') 

let currentSlideIndex = 0;
const lastIndex = slidesHTML.length - 1;
const firstIndex = 0;

/* Faire une fonction de déplacement*/
function moveSlide(){
  slidesHTML.forEach( (slide, i) =>{
    //Je détermine la classe pour la visibilité en fonction de l'index
    console.log(`Index courant : ${currentSlideIndex}`, `Index parcouru : ${i}`)
    if( i == currentSlideIndex ){
      slide.classList.add('active')
      document.querySelector('.titre').innerHTML = "<p>" + slides[currentSlideIndex].tagLine + "</p>";
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
    // node.style.nomPropriete = valeur
    setTimeout(() => {
      let translateValue = 100 * (i - currentSlideIndex);
      console.log(translateValue);
      slide.style.transition = 'transform 0.5s ease'; // Set transition property
      slide.style.transform = `translateX(${translateValue}%)`;
    }, i * 700); // Adjust the delay as needed (200ms per slide)
  
    
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

//GoPrev

function GoPrev(){
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


const arrowRight = document.querySelector('.arrow_right');
arrowRight.addEventListener('click', goNext)

const arrowLeft = document.querySelector('.arrow_left');
arrowLeft.addEventListener('click', GoPrev)





