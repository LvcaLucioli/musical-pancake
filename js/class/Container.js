class Container{
    activeSection = 0;
    
    constructor(container, sections){
        this.sections = sections;
        this.sections.forEach(section => {
            section.bind(document.querySelector(container));
        });
    }
}