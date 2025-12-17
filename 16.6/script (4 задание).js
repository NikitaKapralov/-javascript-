function sanitize(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent;
}

let user;

function setUser(userData) {
  user = userData;
}

function getUser() {
  return user;
}

async function getFilms() {
  try {
    const user = getUser();
    const response = await fetch("https://sb-film.skillbox.cc/films", {
      headers: {
        email: user?.email
      }
    });

    const data = await response.json();

    if (!response.ok) {
      handleErrorResponse(data);
    }

    return data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

function handleErrorResponse(data) {
  const isNeedAuth = data.errors.some(error => error.location === 'headers' && error.param === 'email');

  if (isNeedAuth) {
    const err = new Error('Некорректный email');
    err.name = 'AuthError';
    throw err;
  }
}

function handleError(error) {
  if (error.name === 'AuthError') {
    throw error;
  }
  console.error(error);
}

function renderTopBar(user) {
  const el = document.createElement('div');
  el.classList.add('topbar');

  el.innerHTML = `
    <span class="topbar-logo">Фильмотека</span>
    <div class="topbar-user user">
      <div class="user-name">${sanitize(user.name)}</div>
      <div class="user-email">${sanitize(user.email)}</div>
    </div>
  `;

  return el;
}

function renderFilms(films) {
  const el = document.createElement('div');
  el.classList.add('films');

  if (films.length === 0) {
    el.innerText = 'Cписок фильмов пока пуст';
    return el;
  }

  films.forEach((film) => {
    const filmEl = document.createElement('div');
    filmEl.classList.add('films-card');
    filmEl.dataset.watched = film.isWatched;

    filmEl.textContent = `${film.title} (${film.releaseYear})`;

    el.append(filmEl);
  });

  return el;
}

function renderGlobalError(message) {
  const el = document.createElement('div');

  el.innerHTML = `
    <div class="error">
      <div class="error-title">Упс... Возникла ошибка</div>
      <div class="error-message">${sanitize(message)}</div>
    </div>
  `;

  return el;
}

function renderAuthForm(props) {
  const form = document.createElement('form');
  form.classList.add('authForm')

  form.innerHTML = `
    <label for="name">Ваше имя</label>
    <input id="name" type="text" name="name" required="true" placeholder="Василий" />
    <label for="email">Эл. почта</label>
    <input id="email" type="text" name="email" required="true" placeholder="example@mail.com" />
    <button class="authForm-submit" type="submit">Войти</button>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    props.onSubmit(formProps);
  });

  return form;
}

class NetworkMonitor {
  constructor() {
    this.checkInterval = 5000; 
    this.slowThreshold = 500; 
    this.notificationElement = null;
    this.currentState = null;
    this.intervalId = null;
    this.isMonitoring = false;
  }

  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.intervalId = setInterval(() => this.checkConnection(), this.checkInterval);
    this.checkConnection();
  }

  stop() {
    this.isMonitoring = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.hideNotification();
  }

  async checkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const startTime = Date.now();
      
      const response = await fetch('https://sb-film.skillbox.cc/ping', {
        method: 'POST',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (duration > this.slowThreshold) {
        this.showNotification('slow');
      } else {
        this.hideNotification();
      }
      
      return true;
      
    } catch (error) {
      this.showNotification('offline');
      return false;
    }
  }

  showNotification(type) {
    if (this.currentState === type && this.notificationElement) {
      return;
    }

    this.hideNotification();
    
    this.currentState = type;
    this.notificationElement = this.renderNetworkNotification(type);
    
    if (this.notificationElement) {
      document.body.appendChild(this.notificationElement);
    }
  }

  hideNotification() {
    if (this.notificationElement) {
      this.notificationElement.remove();
      this.notificationElement = null;
    }
    this.currentState = null;
  }

  renderNetworkNotification(type) {
    const el = document.createElement('div');
    el.classList.add('network-notification');
    
    switch(type) {
      case 'slow':
        el.textContent = 'Медленное соединение';
        el.classList.add('network-notification--slow');
        break;
      case 'offline':
        el.textContent = 'Проблема с сетью';
        el.classList.add('network-notification--offline');
        break;
      default:
        return null;
    }
    
    return el;
  }
}

const networkMonitor = new NetworkMonitor();

function initAuth() {
  const app = document.getElementById("app");
  app.innerHTML = '';
  
  networkMonitor.stop();

  app.append(renderAuthForm({
    onSubmit: (user) => {
      setUser(user);
      initApp();
    }
  }));
}

async function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = '';

  try {
    const user = getUser();
    if (!user) {
      initAuth();
      return;
    }
    
    networkMonitor.start();
    
    const films = await getFilms();
    app.append(renderTopBar(user));
    app.append(renderFilms(films));
    
  } catch (error) {
    console.error(error);

    if (error.name === 'AuthError') {
      initAuth();
      return;
    }

    app.append(renderGlobalError(error.message));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});