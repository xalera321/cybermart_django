; (function () {
    let catalogSection = document.querySelector('.section__catalog');

    if (catalogSection === null) {
        return;
    }

    let removeChildren = function (item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };

    let updateChildren = function (item, children) {
        removeChildren(item);
        for (let i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };

    let catalog = catalogSection.querySelector('.catalog');
    let catalogNav = catalogSection.querySelector('.catalog__nav');
    let catalogItems = catalogSection.querySelectorAll('.card');

    let applyCategoryFilter = function (categoryParam) {
        let categoryButton;

        if (categoryParam === 'all') {
            categoryButton = catalogNav.querySelector('[data-filter="all"]');
        } else {
            categoryButton = catalogNav.querySelector(`[data-filter="${categoryParam}"]`);
        }

        if (categoryButton) {
            let previousBtnActive = catalogNav.querySelector('.catalog__nav-btn.is-active');
            previousBtnActive.classList.remove('is-active');
            categoryButton.classList.add('is-active');

            let filteredItems = [];
            for (let i = 0; i < catalogItems.length; i += 1) {
                let current = catalogItems[i];
                if (current.getAttribute('data-category') === categoryParam || categoryParam === 'all') {
                    filteredItems.push(current);
                }
            }

            updateChildren(catalog, filteredItems);
        }
    };

    // Добавьте следующий код для обработки параметров запроса при загрузке страницы
    let urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');

    if (categoryParam) {
        applyCategoryFilter(categoryParam);
    }

    catalogNav.addEventListener('click', function (e) {
        let target = e.target;
        let item = myLib.closestItemByClass(target, 'catalog__nav-btn');

        if (item === null || item.classList.contains('is-active')) {
            return;
        }

        e.preventDefault();
        let filterValue = item.getAttribute('data-filter');
        let previousBtnActive = catalogNav.querySelector('.catalog__nav-btn.is-active');

        previousBtnActive.classList.remove('is-active');
        item.classList.add('is-active');

        if (filterValue === 'all') {
            // Обновляем параметры запроса
            let url = new URL(window.location.href);
            url.searchParams.delete('category');
            history.replaceState(null, null, url);
        } else {
            // Обновляем параметры запроса
            let url = new URL(window.location.href);
            url.searchParams.set('category', filterValue);
            history.replaceState(null, null, url);
        }

        applyCategoryFilter(filterValue);
    });
})();
