        <div class="scrollable_user" onclick="slideDownDrawer();">
            <div class="scrollable_el">

            <header></header>
            <nav aria-label="followers/following-nav">
                <ul>
                    <li id='followers_button'>
                        <button onClick="switchSection('followers')" class="active" aria-pressed="true">
                        <span class="num"></span> followers
                        </button>
                    </li>
                    <li id='following_button'>
                        <button onClick="switchSection('following')" aria-pressed="false">
                        <span class="num"></span> following
                        </button>
                    </li>
                </ul>
            </nav>

            <section id="userlist_section">
                dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb
                <br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb<br>dhgb
            </section>
            </div>
        </div>

        <section id="drawer">
            <div class="swipe_down-btn text-center">
                <img src="./resources/swipedown__icon.png" alt="Add a new post" />
            </div>
            <div class="row slide_button">
                <div role="button" onclick="slideDrawer();" id="slide_button">
                    <div class="row">
                        <div class="col-4 pr-0">
                            <p class="posts_count">
                                <span class="num_posts"></span> posts
                            </p>
                        </div>
                        <div class="col-8 p-0 text-center align-items-center justify-content-center">
                            <div class="swipe_div">
                                <img class="swipe_icon" src="./resources/swipe_icon.png" alt="Add a new post" />
                                <pre>swipe up</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="scrollable_div">
                    <div class="scrollable_el">
                        <section id="posts_section">
                            
                        </section>

                        <footer>
                            <button onclick="loadMore();">
                                view more
                                <img src="./resources/load.png" alt="load more items">
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
        