        <nav aria-label="feed-menu">
            <ul>
                <li>
                    <button class="active" onclick="switchHome(true);" id="followers">followers</button>
                </li>
                <li>
                    <button onclick="switchHome(false);" id="discovery">discovery</button>
                </li>
            </ul>
        </nav>

        <div class="scrollable_div">
            <section></section>
        
            <footer>
                <button onclick="loadMore();">load more</button>
            </footer>
        </div>