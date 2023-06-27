class AsideItem {
    constructor(itemClass, imageScr, imageAlt, copy, itemLink, button) {
        this.itemClass = itemClass;
        this.imageScr = imageScr;
        this.imageAlt = imageAlt;
        this.copy = copy;
        this.itemLink = itemLink;
        this.button = button;
    }

    getHTMLItem() {

        let myCopy = `<p>${this.copy[0]}</p>`;
        if (this.copy.length == 2) {
            myCopy += `<footer><p>${this.copy[1]}</p></footer>`;
        }
        return `<div class="row ${this.itemClass}">
                    <button tabindex="0" type="button" class="content" onClick="redirectToPage('${this.itemLink}')">
                            <img src="./uploads/${this.imageScr}" alt="${this.imageAlt}">
                            <span class="content-copy">${myCopy}</span>
                    </button>
                    ${this.button}
                </div>`;
    }

}