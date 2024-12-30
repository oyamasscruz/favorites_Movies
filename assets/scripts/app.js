const movies = [];

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addModal.classList.remove('visible');
  toggleBackDrop();
};

const showMovieModal = () => {
  addModal.classList.add('visible');
  toggleBackDrop();
};

const closeDeleteModal = () => {
  deleteModal.classList.remove('visible');
  toggleBackDrop();
};

const showDeleteModal = () => {
  deleteModal.classList.add('visible');
  toggleBackDrop();
};

const toggleCancelBtn = () => {
  closeMovieModal();
  clearInputs();
};

const clearInputs = () => {
  title.value = '';
  imageUrl.value = '';
  rating.value = '';
};

const updateUi = () => {
  if(movies.length === 0) {
    section.style.display = 'block';  
  } else {
    section.style.display = 'none';
  }
};

const deleteMovieHandler = (movieId) => {
  let deleteModalYesBtn = document.getElementsByClassName('btn btn--danger')[0];
  deleteModalYesBtn.replaceWith(deleteModalYesBtn.cloneNode(true));
  deleteModalYesBtn = document.getElementsByClassName('btn btn--danger')[0];
  deleteModalNoBtn.removeEventListener('click', closeDeleteModal);
  deleteModalYesBtn.addEventListener('click', deleteMovie.bind(null, movieId));
  deleteModalNoBtn.addEventListener('click', closeDeleteModal);
  showDeleteModal();
};

const renderNewMovie = (id, title, image, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img class="movie-element__image img" src="${image}" alt="${title}"/>
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 Stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  movieList.append(newMovieElement);
}

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for(const movie of movies) { //this movies refer to array of movies, the first element that we created in this document.
    if(movie.id === movieId){
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1); // this only remove the object from array, but not from the dom
  movieList.children[movieIndex].remove();
  // remove the element from DOM.
  closeDeleteModal();
  updateUi();
};




const addMovieHandler = () => {
  const titleValue = title.value.trim();
  const imageUrlValue = imageUrl.value.trim();
  const ratingValue = rating.value.trim();
  
  if (
    !titleValue ||
    !imageUrlValue ||
    !ratingValue ||
    +ratingValue < 1 || // don`t forget that we're setting the exception
    +ratingValue > 5 // we know that this value has to be between 1 and 5.
    ) {
    alert('Please insert valid values (rating between 1 and 5)!');
    return;
    }

    const newMovie = {
      id: Math.random().toString(),
      title: titleValue,
      image: imageUrlValue,
      rating: ratingValue
    };

    movies.push(newMovie);
    closeMovieModal();
    clearInputs();
    updateUi();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
}

const backDropClickHandler = () => {
  closeMovieModal();
  closeDeleteModal();
};


movieBtn.addEventListener('click', showMovieModal);
backDrop.addEventListener('click',backDropClickHandler);
cancelBtn.addEventListener('click', toggleCancelBtn);
addBtn.addEventListener('click', addMovieHandler);
