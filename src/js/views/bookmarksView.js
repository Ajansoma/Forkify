import View from './view.js';
import icon from 'url:../../img/icons.svg';
const icons = icon.split('?');

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a new recipe and book';
  _successMessage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._previewGenerateMarkUp).join('');
  }

  _previewGenerateMarkUp(result) {
    const id = window.location.hash.slice(1);
    return `
<li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        } " href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.image}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons[0]}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `;
  }
}

export default new BookmarksView();
