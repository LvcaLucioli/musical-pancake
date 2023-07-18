class AbstractSection {

    LOAD_BTN = ` 
    <button data-target="users" onclick="loadMoreSection(this);">
        view more
        <img src="./resources/load_white.png" alt="load more item">
    </button>`;

    LOAD_BTN_DISABLED = `
    <button aria-label="no more item to view" disabled>
        <img src="./resources/nomore.png" alt="no more item to view">
    </button>`;

    bind(container){
        this.container = container;
    }

    show() {
        throw new NotImplementedError('method not implemented');
    }
}