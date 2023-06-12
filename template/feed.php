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

                <section class="followers" aria-label="posts from followed users"></section>

                <footer>
                    <button onclick="loadMore();">
                        view more
                        <img src="./resources/load_white.png" alt="load more items">
                    </button>
                </footer>
            </div>
        </div>
