function generatePosts(posts) {
    let result = '';

    for (let i = 0; i < posts.length; i++) {
        let like_section = ``;
        if (posts[i]["is_liked"]) {
            `<div class="row">
                    <div class="col-4">
                        <a href="" onClick="">
                        <img src="${posts[i]["propic"]}" alt="Profile picture" />
                        </a>
                    </div>
                    <div class="col-8">
                        <a href="user.php?username=${posts[i]["username"]}">${posts[i]["username"]}</a>
                    </div>
                </div>`
        }

        let post = `
        <article>
            <header>
                <div class="row">
                    <div class="col-3">
                        <a href="user.php?username=${posts[i]["username"]}">
                        <img src="${posts[i]["propic"]}" alt="Profile picture" />
                        </a>
                    </div>
                    <div class="col-9">
                        <a href="user.php?username=${posts[i]["username"]}">${posts[i]["username"]}</a>
                    </div>
                </div>
            </header>
            <section aria-label="photo">
                <img src="${posts[i]["img_name"]}" alt="Post picture" />
                <p>${posts[i]["description"]}</p>
            </section>
            <section>
            ` + like_section + `
            </section>
            <footer>
                <a href="">Show comments</a>
            </footer>
        </article>
        `;
        result += post;
    }
    return result;
}