import { renderListPage } from './pages/list.js';
import { renderFormPage } from './pages/form.js';

const preloader = document.getElementById('preloader');

function showPreloader() {
    preloader.classList.remove('hidden');
}

function hidePreloader() {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 500); 
}

function navigate(page) {
    showPreloader();
    
    document.getElementById('app').innerHTML = '';

    setTimeout(() => {
        if (page === 'list') {
            renderListPage(navigate);
        } else if (page === 'form') {
            renderFormPage(navigate);
        }
        hidePreloader();
    }, 300);
}

navigate('list');