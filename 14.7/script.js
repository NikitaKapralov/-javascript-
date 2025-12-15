document.addEventListener('DOMContentLoaded', function() {
  const filmForm = document.getElementById('film-form');
  const filmTbody = document.getElementById('film-tbody');
  const titleInput = document.getElementById('title');
  const genreInput = document.getElementById('genre');
  const releaseYearInput = document.getElementById('releaseYear');
  const isWatchedInput = document.getElementById('isWatched');
  const editIndexInput = document.getElementById('edit-index');
  const submitBtn = document.getElementById('submit-btn');
  const cancelEditBtn = document.getElementById('cancel-edit');
  const sortSelect = document.getElementById('sort-select');
  const sortBtn = document.getElementById('sort-btn');
  
  const STORAGE_KEY = 'films';
  let films = loadFilms();
  let isEditing = false;
  let currentSort = 'title';
  
  renderFilms();
  
  function loadFilms() {
    const filmsJSON = localStorage.getItem(STORAGE_KEY);
    return filmsJSON ? JSON.parse(filmsJSON) : [];
  }
  
  function saveFilms() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
  }
  
  function validateForm() {
    let isValid = true;
    
    const titleError = document.getElementById('title-error');
    if (!titleInput.value.trim()) {
      titleError.textContent = 'Название фильма обязательно';
      titleInput.classList.add('error');
      isValid = false;
    } else {
      titleError.textContent = '';
      titleInput.classList.remove('error');
    }
    
    const genreError = document.getElementById('genre-error');
    if (!genreInput.value.trim()) {
      genreError.textContent = 'Жанр фильма обязателен';
      genreInput.classList.add('error');
      isValid = false;
    } else {
      genreError.textContent = '';
      genreInput.classList.remove('error');
    }
    
    const yearError = document.getElementById('releaseYear-error');
    const year = releaseYearInput.value.trim();
    if (!year) {
      yearError.textContent = 'Год выпуска обязателен';
      releaseYearInput.classList.add('error');
      isValid = false;
    } else if (!/^\d+$/.test(year) || parseInt(year) < 1888 || parseInt(year) > new Date().getFullYear() + 5) {
      yearError.textContent = 'Введите корректный год (1888-' + (new Date().getFullYear() + 5) + ')';
      releaseYearInput.classList.add('error');
      isValid = false;
    } else {
      yearError.textContent = '';
      releaseYearInput.classList.remove('error');
    }
    
    return isValid;
  }
  
  filmForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const film = {
      title: titleInput.value.trim(),
      genre: genreInput.value.trim(),
      releaseYear: releaseYearInput.value.trim(),
      isWatched: isWatchedInput.checked
    };
    
    if (isEditing) {
      const index = parseInt(editIndexInput.value);
      films[index] = film;
      isEditing = false;
      submitBtn.textContent = 'Добавить фильм';
      cancelEditBtn.style.display = 'none';
    } else {
      films.push(film);
    }
    
    saveFilms();
    sortFilms(currentSort);
    renderFilms();
    resetForm();
  });
  
  cancelEditBtn.addEventListener('click', function() {
    isEditing = false;
    submitBtn.textContent = 'Добавить фильм';
    cancelEditBtn.style.display = 'none';
    resetForm();
  });
  
  sortBtn.addEventListener('click', function() {
    currentSort = sortSelect.value;
    sortFilms(currentSort);
    renderFilms();
  });
  
  function sortFilms(sortBy) {
    films.sort((a, b) => {
      switch(sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'genre':
          return a.genre.localeCompare(b.genre);
        case 'releaseYear':
          return parseInt(b.releaseYear) - parseInt(a.releaseYear);
        case 'isWatched':
          return (a.isWatched === b.isWatched) ? 0 : a.isWatched ? -1 : 1;
        default:
          return 0;
      }
    });
    saveFilms();
  }
  
  function editFilm(index) {
    const film = films[index];
    titleInput.value = film.title;
    genreInput.value = film.genre;
    releaseYearInput.value = film.releaseYear;
    isWatchedInput.checked = film.isWatched;
    
    isEditing = true;
    editIndexInput.value = index;
    submitBtn.textContent = 'Сохранить изменения';
    cancelEditBtn.style.display = 'inline-block';
    
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
  }
  
  function deleteFilm(index) {
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
      films.splice(index, 1);
      saveFilms();
      renderFilms();
      
      if (isEditing && parseInt(editIndexInput.value) === index) {
        isEditing = false;
        submitBtn.textContent = 'Добавить фильм';
        cancelEditBtn.style.display = 'none';
        resetForm();
      }
    }
  }
  
  function renderFilms() {
    filmTbody.innerHTML = '';
    
    if (films.length === 0) {
      const row = filmTbody.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 5;
      cell.textContent = 'Фильмов пока нет. Добавьте первый фильм!';
      cell.style.textAlign = 'center';
      cell.style.color = '#777';
      return;
    }
    
    films.forEach((film, index) => {
      const row = filmTbody.insertRow();
      
      const titleCell = row.insertCell();
      titleCell.textContent = film.title;
      
      const genreCell = row.insertCell();
      genreCell.textContent = film.genre;
      
      const yearCell = row.insertCell();
      yearCell.textContent = film.releaseYear;
      
      const watchedCell = row.insertCell();
      const watchedSpan = document.createElement('span');
      watchedSpan.textContent = film.isWatched ? 'Да' : 'Нет';
      watchedSpan.className = `watched-status watched-${film.isWatched}`;
      watchedCell.appendChild(watchedSpan);
      
      const actionCell = row.insertCell();
      const actionDiv = document.createElement('div');
      actionDiv.className = 'action-buttons';
      
      const editButton = document.createElement('button');
      editButton.textContent = 'Редактировать';
      editButton.className = 'action-btn edit-btn';
      editButton.addEventListener('click', () => editFilm(index));
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.className = 'action-btn delete-btn';
      deleteButton.addEventListener('click', () => deleteFilm(index));
      
      actionDiv.appendChild(editButton);
      actionDiv.appendChild(deleteButton);
      actionCell.appendChild(actionDiv);
    });
  }
  
  function resetForm() {
    filmForm.reset();
    editIndexInput.value = '-1';
    
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
  }
  
  sortFilms('title');
});