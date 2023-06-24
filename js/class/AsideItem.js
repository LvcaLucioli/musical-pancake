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
        return `<div tabindex="0" class="row ${this.itemClass}" onClick="redirectToPage('${this.itemLink}')">
                    <div class="content">
                            <img src="./uploads/${this.imageScr}" alt="${this.imageAlt}">
                            <div class="content-copy">${myCopy}</div>
                    </div>
                    ${this.button}
                </div>`;
    }

}