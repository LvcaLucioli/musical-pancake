class AsideItem {
    constructor(itemClass, imageScr, imageAlt, copy, itemLink, buttonText, buttonOnClick) {
        this.itemClass = itemClass;
        this.imageScr = imageScr;
        this.imageAlt = imageAlt;
        this.copy = copy;
        this.itemLink = itemLink;
        this.buttonText = buttonText;
        this.buttonOnClick = buttonOnClick;
    }

    getHTMLItem() {
        return `<div class="row ${this.itemClass}" onclick="${this.itemLink}">
          <img src="${this.imageScr}" alt="${this.imageAlt}">
          <p>${this.copy}</p>
          <button onclick="${this.buttonOnClick}">${this.buttonText}</button>
        </div>`;
    }

}