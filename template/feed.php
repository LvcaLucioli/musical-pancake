        <div class="scroll-wrap">
            <div class="scrollable_feed">
                <nav aria-label="feed-menu">
                    <ul>
                        <li>
                            <button class="active" onclick="switchHome(true);return false;" id="followers" aria-pressed="true">
                                followers
                            </button>
                        </li>
                        <li>
                            <button onclick="switchHome(false);return false;" id="discovery" aria-pressed="false">
                                discovery
                            </button>
                        </li>
                    </ul>
                </nav>

                <div class="feed-add-btn d-md-none">
                    <a href="new-post.php" alt="create a new post" id="add-sm-btn">
                        <img src="./resources/add_btn.png" alt="create a new post">
                    </a>
                </div>

                <section class="followers" aria-label="posts from followed users"></section>

                <footer>
                    <button onclick="loadMore();">
                        loading...
                        <div class="spinner-border text-light" role="status">
                            <span class="sr-only">loading...</span>
                        </div>
                    </button>
                </footer>
            </div>
        </div>
