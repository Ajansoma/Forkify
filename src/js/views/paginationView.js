import View from './view.js';
import icon from 'url:../../img/icons.svg';
const [icons] = icon.split('?');

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = +this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, and there other pages
    if (curPage === 1 && numPages > 1) {
      return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
`;
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }"class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
           </svg>
          <span>Page ${curPage - 1}</span>
        </button>;
          `;
    }

    //other page
    if (curPage > 1 && this._data.page < numPages) {
      return `
     <button data-goto="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
        <span>Page ${curPage - 1}</span>
     </button>
     <button data-goto="${
       curPage + 1
     }"class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
     </button>
          `;
    }

    //page 1, and theres no other page
    return ``;
  }
}
export default new PaginationView();
