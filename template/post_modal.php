        <div class="modal d-none fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                
                <div class="modal-header sticky-top">
                    <div class="row" id="postModalLabel">
                        <div class="col-2 profile_pic">
                            <a><img alt="profile picture" /></a>
                        </div>
                        <div class="col-6 user">
                            <a></a>
                        </div>
                        <div class="col-4 edit-btn">
                            <pre></pre>
                        </div>
                        <div class="col-12 date">
                        <pre></pre>
                        </div>
                    </div>
                    <button title="close post pop-up" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <section aria-label="post section">
                        <img alt="post picture">
                        <pre></pre>
                    </section>

                    <nav aria-label="comments/likes-menu" class="sticky-top">
                        <ul>
                            <li id='comments_button'>
                                <button title="comments area" class="active" aria-pressed="true" data-target="comments" onclick="switchPostSection(this)">
                                <span class="num"></span> comments
                                </button>
                            </li>
                            <li id='likes_button'>
                                <button title="likes area" aria-pressed="false" data-target="likes" onclick="switchPostSection(this)">
                                <span class="num"></span> likes
                                </button>
                            </li>
                        </ul>
                        <ul>
                            <li id='like_click_btn'></li>
                        </ul>
                    </nav>

                    <div class="comments-input comments-base">
                        <div class="row reply-wrapper d-none">
                            <pre><a aria-label="return to the selected to reply comment" onclick="scrollToReply()"></a></pre>

                            <button type="button" class="close" aria-label="clear reply selection" onclick="clearReply()">
                                <span aria-hidden="true" class="text-white">&times;</span>
                            </button>
                        </div>

                        <div class="row">
                            <div class="col-10">
                                <textarea id="comment_textarea" placeholder="Leave your comment"></textarea>
                            </div>
                            <div class="col-2 pl-0">
                                <button type="button" class="send-btn" aria-label="post your comment" onclick="postComment()">
                                <img src="./resources/send.png" alt="leave comment">
                                </button>
                            </div>
                        </div>
                    </div>

                    <section id="switchable" class="comments-section" aria-label="users comments">
                        <footer></footer>
                    </section>
                </div>

            </div>
        </div>
        </div>
