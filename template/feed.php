        <nav aria-label="feed-menu">
            <ul>
                <li>
                    <a href="index.php" class="active" onclick="switchHome(true);return false;" id="followers">followers</a>
                </li>
                <li>
                    <a href="index.php" onclick="switchHome(false);return false;" id="discovery">discovery</a>
                </li>
            </ul>
        </nav>

        <div id="scrollable_div">
            <section></section>
        
            <footer>
                <button onclick="loadMore();return false;">load more</button>
            </footer>
        </div>