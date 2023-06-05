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
        return `<div class="row ${this.itemClass}" onclick="${this.itemLink}">
          <img src="${this.imageScr}" alt="${this.imageAlt}">
          <p>${this.copy}</p>
          ${this.button}
        </div>`;
    }

}