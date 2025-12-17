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
  
  const filterTitle = document.getElementById('filter-title');
  const filterGenre = document.getElementById('filter-genre');
  const filterYear = document.getElementById('filter-year');
  const filterWatched = document.getElementById('filter-watched');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const deleteAllBtn = document.getElementById('delete-all-btn');
  
  const STORAGE_KEY = 'films';
  let films = loadFilms();
  let filteredFilms = [...films];
  let isEditing = false;
  let currentSort = 'title';
  
  async function loadFilmsFromServer(filters = {}) {

    const filmsJSON = localStorage.getItem(STORAGE_KEY);
    let films = filmsJSON ? JSON.parse(filmsJSON) : [];
    
    if (filters.title) {
      films = films.filter(film => 
        film.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    
    if (filters.genre) {
      films = films.filter(film => 
        film.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    if (filters.releaseYear) {
      films = films.filter(film => 
        film.releaseYear.includes(filters.releaseYear)
      );
    }
    
    if (filters.isWatched && filters.isWatched !== 'all') {
      const isWatchedBool = filters.isWatched === 'true';
      films = films.filter(film => film.isWatched === isWatchedBool);
    }
    
    return films;
  }
  
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
    const currentYear = new Date().getFullYear();
    
    if (!year) {
      yearError.textContent = 'Год выпуска обязателен';
      releaseYearInput.classList.add('error');
      isValid = false;
    } else if (!/^\d{4}$/.test(year)) {
      yearError.textContent = 'Год должен состоять из 4 цифр';
      releaseYearInput.classList.add('error');
      isValid = false;
    } else if (parseInt(year) < 1888 || parseInt(year) > currentYear) {
      yearError.textContent = `Введите год между 1888 и ${currentYear}`;
      releaseYearInput.classList.add('error');
      isValid = false;
    } else {
      yearError.textContent = '';
      releaseYearInput.classList.remove('error');
    }
    
    return isValid;
  }
  
  filmForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const film = {
      id: isEditing ? films[parseInt(editIndexInput.value)].id : Date.now(),
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
    applyFilters(); 
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
    filteredFilms.sort((a, b) => {
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
  }
  
  async function applyFilters() {
    const filters = {};
    
    if (filterTitle.value.trim()) {
      filters.title = filterTitle.value.trim();
    }
    
    if (filterGenre.value.trim()) {
      filters.genre = filterGenre.value.trim();
    }
    
    if (filterYear.value.trim()) {
      filters.releaseYear = filterYear.value.trim();
    }
    
    if (filterWatched.value !== 'all') {
      filters.isWatched = filterWatched.value;
    }
    
    filteredFilms = [...films];
    
    if (filters.title) {
      filteredFilms = filteredFilms.filter(film => 
        film.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    
    if (filters.genre) {
      filteredFilms = filteredFilms.filter(film => 
        film.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    if (filters.releaseYear) {
      filteredFilms = filteredFilms.filter(film => 
        film.releaseYear.includes(filters.releaseYear)
      );
    }
    
    if (filters.isWatched) {
      const isWatchedBool = filters.isWatched === 'true';
      filteredFilms = filteredFilms.filter(film => film.isWatched === isWatchedBool);
    }
    
    sortFilms(currentSort);
    renderFilms();
  }
  
  filterTitle.addEventListener('input', applyFilters);
  filterGenre.addEventListener('input', applyFilters);
  filterYear.addEventListener('input', applyFilters);
  filterWatched.addEventListener('change', applyFilters);
  
  clearFiltersBtn.addEventListener('click', function() {
    filterTitle.value = '';
    filterGenre.value = '';
    filterYear.value = '';
    filterWatched.value = 'all';
    applyFilters();
  });
  
  deleteAllBtn.addEventListener('click', async function() {
    if (confirm('Вы уверены, что хотите удалить ВСЕ фильмы? Это действие нельзя отменить.')) {
      films = [];
      saveFilms();
      filteredFilms = [];
      renderFilms();
      
      if (isEditing) {
        isEditing = false;
        submitBtn.textContent = 'Добавить фильм';
        cancelEditBtn.style.display = 'none';
        resetForm();
      }
    }
  });
  
  function editFilm(index) {
    const film = filteredFilms[index];
    const mainIndex = films.findIndex(f => f.id === film.id);
    
    if (mainIndex !== -1) {
      titleInput.value = film.title;
      genreInput.value = film.genre;
      releaseYearInput.value = film.releaseYear;
      isWatchedInput.checked = film.isWatched;
      
      isEditing = true;
      editIndexInput.value = mainIndex;
      submitBtn.textContent = 'Сохранить изменения';
      cancelEditBtn.style.display = 'inline-block';
      
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
    }
  }
  
  async function deleteFilm(index) {
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
      const film = filteredFilms[index];
      
      films = films.filter(f => f.id !== film.id);
      saveFilms();
      applyFilters();
      
      if (isEditing && parseInt(editIndexInput.value) === films.findIndex(f => f.id === film.id)) {
        isEditing = false;
        submitBtn.textContent = 'Добавить фильм';
        cancelEditBtn.style.display = 'none';
        resetForm();
      }
    }
  }
  
  function renderFilms() {
    filmTbody.innerHTML = '';
    
    if (filteredFilms.length === 0) {
      const row = filmTbody.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 5;
      cell.textContent = films.length === 0 
        ? 'Фильмов пока нет. Добавьте первый фильм!' 
        : 'Фильмы не найдены. Попробуйте изменить фильтры.';
      cell.style.textAlign = 'center';
      cell.style.color = '#777';
      cell.style.padding = '30px';
      return;
    }
    
    filteredFilms.forEach((film, index) => {
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
  
  async function init() {
    films = loadFilms();
    filteredFilms = [...films];
    sortFilms('title');
    renderFilms();
    
    if (films.length === 0) {
      const initialFilms = [
      ];
      
      films = initialFilms;
      saveFilms();
      filteredFilms = [...films];
      sortFilms('title');
      renderFilms();
    }
  }
  
  init();
});