function generatePosts(posts){
    let result = '';

    for(let i=0; i < posts.length; i++){
        let post = `
        <article>
            <header>
                <div class="row">
                    <div class="col-3">
                        <a href="user.php?username=${posts[i]["username"]}">
                        <!--<img src="${posts[i]["propic"]}" alt="Profile picture" />-->
                        </a>
                    </div>
                    <div class="col-9">
                        <a href="user.php?username=${posts[i]["username"]}">${posts[i]["username"]}</a>
                    </div>
                </div>
            </header>
            <section>
                <img src="${posts[i]["img_name"]}" alt="Post picture" />
                <p>${posts[i]["description"]}</p>
            </section>
            <section>
                <div class="row">
                    <div class="col-4">
                        <a href="" onClick="likeClick(${posts[i]["is_liked"]}, ${posts[i]["username"]}, ${posts[i]["id"]})">
                        <img src="resources/like_button_${posts[i]["is_liked"]}.png" alt="Like button" />
                        </a>
                    </div>
                    <div class="col-4">
                        <p>${posts[i]["n_likes"]} likes</p>
                    </div>
                    <div class="col-4">
                        <p>Published on ${posts[i]["date"]}</p>
                    </div>
                </div>
            </section>
            <footer>
                <button onClick="switchHome(false)">Show comments</button>
            </footer>
        </article>
        `;
        result += post;
    }
    return result;
}