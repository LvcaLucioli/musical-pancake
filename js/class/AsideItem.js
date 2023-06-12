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
        return `<div class="row ${this.itemClass}" onClick="location.href='${this.itemLink}'">
                    <div class="content">
                        <img src="./uploads/${this.imageScr}" alt="${this.imageAlt}">
                        <p>${this.copy}</p>
                    </div>
                    ${this.button}
                </div>`;
    }

}