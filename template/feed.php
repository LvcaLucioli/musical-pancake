        <div class="scroll-wrap">
            <div class="scrollable_feed">
                <div class="scrollable_el">
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

                    <section class="followers"></section>

                    <footer>
                        <button onclick="loadMore();">
                            view more
                            <img src="./resources/load_white.png">
                        </button>
                    </footer>
                </div>
            </div>
        </div>