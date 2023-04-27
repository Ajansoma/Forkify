import icon from 'url:../../img/icons.svg';
const icons = icon.split('?');
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      newEl.isEqualNode(curEl);

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markUp = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons[0]}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>;
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = this._successMessage) {
    const markUp = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons[0]}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>;
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderSpinner() {
    const markUp = `
     <div class="spinner">
       <svg>
         <use href="${icons[0]}#icon-loader"></use>
       </svg>
     </div> 
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
