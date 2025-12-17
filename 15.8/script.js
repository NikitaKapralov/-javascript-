const STORAGE_KEY = "films_app_data";

const initialFilms = [
    {
        id: Date.now() + 1,
        title: "Матрица: Революция",
        genre: "фантастика",
        releaseYear: 2003,
        isWatched: true
    },
    {
        id: Date.now() + 2,
        title: "Гарри Поттер и философский камень",
        genre: "фэнтези",
        releaseYear: 2001,
        isWatched: true
    }
];

function getFilmsFromStorage() {
    const filmsJson = localStorage.getItem(STORAGE_KEY);
    if (filmsJson) {
        return JSON.parse(filmsJson);
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialFilms));
        return initialFilms;
    }
}

function saveFilmsToStorage(films) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
}

function getNextId() {
    const films = getFilmsFromStorage();
    if (films.length === 0) return 1;
    return Math.max(...films.map(f => f.id)) + 1;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const releaseYear = document.getElementById("releaseYear").value.trim();
    const isWatched = document.getElementById("isWatched").checked;
    
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = '';
    
    if (!title) {
        errorMessage.textContent = "Пожалуйста, введите название фильма";
        return;
    }
    
    if (!genre) {
        errorMessage.textContent = "Пожалуйста, введите жанр фильма";
        return;
    }
    
    if (!releaseYear) {
        errorMessage.textContent = "Пожалуйста, введите год выпуска";
        return;
    }
    
    if (releaseYear < 1900 || releaseYear > 2024) {
        errorMessage.textContent = "Год должен быть между 1900 и 2024";
        return;
    }
    
    const film = {
        id: getNextId(),
        title: title,
        genre: genre,
        releaseYear: parseInt(releaseYear),
        isWatched: isWatched,
    };
    
    addFilm(film);
    
    document.getElementById("film-form").reset();
}

function addFilm(film) {
    const films = getFilmsFromStorage();
    films.push(film);
    saveFilmsToStorage(films);
    renderTable();
}

function getFilms(filters = {}) {
    let films = getFilmsFromStorage();
    
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
            film.releaseYear.toString() === filters.releaseYear
        );
    }
    
    if (filters.isWatched !== '') {
        films = films.filter(film => 
            film.isWatched.toString() === filters.isWatched
        );
    }
    
    return films;
}

function renderTable() {
    const titleFilter = document.getElementById("searchInput").value.trim();
    const genreFilter = document.getElementById("genreFilter").value.trim();
    const yearFilter = document.getElementById("yearFilter").value;
    const watchedFilter = document.getElementById("watchedFilter").value;
    
    const filters = {
        title: titleFilter,
        genre: genreFilter,
        releaseYear: yearFilter,
        isWatched: watchedFilter
    };
    
    const films = getFilms(filters);
    const filmTableBody = document.getElementById("film-tbody");
    
    filmTableBody.innerHTML = "";
    
    if (films.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 20px;">
                ${Object.values(filters).some(f => f) 
                    ? "Фильмы не найдены по заданным фильтрам" 
                    : "Нет фильмов. Добавьте первый фильм!"}
            </td>
        `;
        filmTableBody.appendChild(row);
        return;
    }
    
    films.forEach((film) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="delete-btn" data-id="${film.id}">Удалить</button>
            </td>
        `;
        filmTableBody.appendChild(row);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filmId = parseInt(e.target.getAttribute('data-id'));
            deleteFilm(filmId);
        });
    });
}

function deleteFilm(filmId) {
    if (!confirm("Вы уверены, что хотите удалить этот фильм?")) {
        return;
    }
    
    const films = getFilmsFromStorage();
    const updatedFilms = films.filter(film => film.id !== filmId);
    saveFilmsToStorage(updatedFilms);
    renderTable();
}

function deleteAllFilms() {
    if (!confirm("Вы уверены, что хотите удалить ВСЕ фильмы?")) {
        return;
    }
    
    saveFilmsToStorage([]);
    renderTable();
}

function updateFilters() {
    clearTimeout(window.filterTimeout);
    window.filterTimeout = setTimeout(() => {
        renderTable();
    }, 300);
}

function initEventListeners() {
    document.getElementById("film-form").addEventListener("submit", handleFormSubmit);
    
    document.getElementById("deleteAllBtn").addEventListener("click", deleteAllFilms);
    
    document.getElementById("searchInput").addEventListener("input", updateFilters);
    document.getElementById("genreFilter").addEventListener("input", updateFilters);
    document.getElementById("yearFilter").addEventListener("input", updateFilters);
    document.getElementById("watchedFilter").addEventListener("change", updateFilters);
}

document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    renderTable();
});