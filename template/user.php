        <header></header>

        <div class="scrollable_div">
            <section id="userlist_section">
                
            </section>
        </div>

        <section id="drawer">
            <div class="row slide_button">
                <button onclick="slideDrawer();" id="slide_button">
                    <div class="row">
                        <div class="col-4">
                            <p class="posts_count">
                                <span class="num_posts"></span> posts
                            </p>
                        </div>
                        <div class="col-4 p-0">
                            <div class="swipe_div">
                                <img class="swipe_icon" src="./resources/swipe_icon.png" alt="Add a new post" />
                                <pre>swipe up</pre>
                            </div>
                        </div>
                        <div class="col-4 p-0">
                            <div class="add_button">
                            <a href=''>
                                <img class="add_icon" src="./resources/add_icon.png" alt="Add a new post" />
                            </a>
                        </div>
                        </div>
                    </div>
                </button>
            </div>
            
            <div class="row">
                <div class="scrollable_div">
                    <div class="scrollable_el">
                        <section id="posts_section">
                            
                        </section>

                        <footer>
                            <button onclick="loadMore();">load more</button>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
        