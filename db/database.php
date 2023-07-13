<?php
class DatabaseHelper
{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getDiscPosts($current_user, $n)
    {
        $stmt = $this->db->prepare("SELECT p.*
        FROM posts p, users u
        WHERE p.user != ?
        AND p.user = u.username
        AND u.is_in_disc = 1
        ORDER BY RAND()
        LIMIT ?");
        $stmt->bind_param('si', $current_user, $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowedPosts($current_user, $id, $n)
    {

        if ($id != -1) {
            $query = "SELECT p.*, u.propic
            FROM posts p, users u, followers f
            WHERE f.follower = ?
            AND f.followed = p.user
            AND p.user = u.username
            AND p.id < ? 
            ORDER BY p.date DESC
            LIMIT ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sii', $current_user, $id, $n);
        } else {
            $query = "SELECT p.*, u.propic
            FROM posts p, users u, followers f
            WHERE f.follower = ?
            AND f.followed = p.user
            AND p.user = u.username
            ORDER BY p.date DESC
            LIMIT ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('si', $current_user, $n);
        }

        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT p.*, u.propic
        FROM posts p, users u, followers f
        WHERE f.follower = ?
        AND f.followed = p.user
        AND p.user = u.username
        AND p.id < ? 
        ORDER BY p.date DESC
        LIMIT 1";

        $stmt = $this->db->prepare($query);
        $id = $result[count($result) - 1]["id"];
        $stmt->bind_param('si', $current_user, $id);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getPostById($id)
    {
        $query = "SELECT p.*, u.propic
        FROM posts p, users u
        WHERE p.user = u.username
        AND p.id = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getLikeList($postId, $searchQuery)
    {
        $query = "SELECT u.username FROM likes, users u WHERE post = ? AND u.username = user AND u.username LIKE CONCAT('%', ?, '%') ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $postId, $searchQuery);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLikes($postId)
    {
        $query = "SELECT user FROM likes WHERE post = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNComments($postId)
    {
        $query = "SELECT COUNT(*) FROM comments WHERE post = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getComments($postID, $lastID, $n)
    {
        if ($lastID != -1) {
            $query = "SELECT c.*, u.propic,
            CASE WHEN EXISTS (SELECT 1 FROM comments WHERE to_comment = c.id) THEN 1 ELSE 0 END AS has_replies
            FROM comments c, users u
            WHERE c.post = ?
            AND c.to_comment IS NULL
            AND c.user = u.username
            AND c.id < ? 
            ORDER BY c.datetime DESC
            LIMIT ?;";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('iii', $postID, $lastID, $n);
        } else {
            $query = "SELECT c.*, u.propic,
            CASE WHEN EXISTS (SELECT 1 FROM comments WHERE to_comment = c.id) THEN 1 ELSE 0 END AS has_replies
            FROM comments c, users u
            WHERE c.post = ?
            AND c.to_comment IS NULL
            AND c.user = u.username
            ORDER BY c.datetime DESC
            LIMIT ?;";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ii', $postID, $n);
        }

        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT c.*, u.propic
        FROM comments c, users u
        WHERE c.post = ?
        AND c.to_comment IS NULL
        AND c.user = u.username
        AND c.id < ? 
        ORDER BY c.datetime DESC
        LIMIT 1";

        $stmt = $this->db->prepare($query);
        $id = $result[count($result) - 1]["id"];
        $stmt->bind_param('ii', $postID, $id);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getCommentReplies($postID, $lastID, $n, $commentId)
    {
        if ($lastID != -1) {
            $query = "SELECT c.*, u.propic
            FROM comments c, users u
            WHERE c.post = ?
            AND c.to_comment = ?
            AND c.user = u.username
            AND c.id < ? 
            ORDER BY c.datetime DESC
            LIMIT ?;";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('iiii', $postID, $commentId, $lastID, $n);
        } else {
            $query = "SELECT c.*, u.propic
            FROM comments c, users u
            WHERE c.post = ?
            AND c.to_comment = ?
            AND c.user = u.username
            ORDER BY c.datetime DESC
            LIMIT ?;";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('iii', $postID, $commentId, $n);
        }

        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT c.*, u.propic
        FROM comments c, users u
        WHERE c.post = ?
        AND c.to_comment = ?
        AND c.user = u.username
        AND c.id < ?
        ORDER BY c.datetime DESC
        LIMIT 1;";

        $stmt = $this->db->prepare($query);
        $id = $result[count($result) - 1]["id"];
        $stmt->bind_param('iii', $postID, $commentId, $id);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function notifyComment($user, $targetPost, $date, $text)
    {
        $query = "SELECT `user` FROM `posts` WHERE `id` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $targetPost);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_row();
        $targetUser = $row[0];

        if ($user != $targetUser) {
            $content = 'commented your post "' . $text . '"';

            $query = "INSERT INTO `notifications` (`targetUser`, `content`, `user`, `date`, `targetPost`) VALUES (?, ?, ?, ?, ?);";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ssssi', $targetUser, $content, $user, $date, $targetPost);
            $stmt->execute();
        }
    }

    public function leaveComment($date, $text, $user, $postID, $repliedID)
    {
        if ($repliedID != -1) {
            $query = "INSERT INTO `comments`
            (`datetime`, `text`, `user`, `post`, `to_comment`)
            VALUES (?, ?, ?, ?, ?);";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sssii', $date, $text, $user, $postID, $repliedID);
            $stmt->execute();
        } else {
            $query = "INSERT INTO `comments`
            (`datetime`, `text`, `user`, `post`, `to_comment`)
            VALUES (?, ?, ?, ?, NULL);";

            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sssi', $date, $text, $user, $postID);
            $stmt->execute();
        }

        $commentID = $this->db->insert_id;
        $query = "SELECT c.*, u.propic
        FROM comments c, users u
        WHERE c.id = ?
        LIMIT 2;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $commentID);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $this->notifyComment($user, $postID, $date, $text);
        return $result;
    }

    public function deleteComment($commentID, $postID)
    {
        $query = "DELETE
        FROM comments
        WHERE post = ?
        AND to_comment = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $postID, $commentID);
        $stmt->execute();

        $query = "DELETE
        FROM comments
        WHERE post = ?
        AND id = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $postID, $commentID);
        $stmt->execute();
    }

    public function deletePost($id)
    {
        $query = "DELETE
        FROM comments
        WHERE post = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();

        $query = "DELETE
        FROM likes
        WHERE post = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();

        $query = "DELETE
        FROM notifications
        WHERE targetPost = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();

        $query = "SELECT img_name
        FROM posts
        WHERE id = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $ret = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "DELETE
        FROM posts
        WHERE id = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();

        return $ret;
    }

    public function addNewPost($user, $desc) {
        $query = "INSERT INTO `posts`
        (`user`, `date`, `description`)
        VALUES (?, NOW(), ?)";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $desc);
        $stmt->execute();

        $id = $this->db->insert_id;
        $img_name = "post" . $id . ".png";

        $query = " UPDATE `posts`
        SET img_name = ?
        WHERE id = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $img_name, $id);
        $stmt->execute();

        return $img_name;
    }

    public function getUser($username)
    {
        $query = "SELECT 
        q1.username, q1.propic, q1.bio, COALESCE(q1.followers, 0) AS followers, COALESCE(q2.following, 0) AS following
    FROM (
        SELECT 
            u.username, u.propic, u.bio, COUNT(f.followed) AS followers
        FROM 
            users u
            LEFT JOIN followers f ON u.username = f.followed
        WHERE 
            u.username = ?
        GROUP BY 
            u.username, u.propic, u.bio
    ) AS q1
    LEFT JOIN (
        SELECT 
            follower, COUNT(followed) AS following
        FROM 
            followers
        WHERE 
            follower = ?
        GROUP BY 
            follower
    ) AS q2
    ON q1.username = q2.follower;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowers($username, $searchQuery)
    {
        // error_log($searchQuery);
        $query = "SELECT u.username, u.propic 
            FROM followers, users u
            WHERE followed = ? AND follower <> ? AND follower = u.username AND follower LIKE CONCAT('%', ?, '%')";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $username, $username, $searchQuery);


        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowings($username, $searchQuery)
    {
        $query = "SELECT u.username, u.propic 
            FROM followers, users u
            WHERE follower = ? AND followed <> ? AND followed = u.username AND followed LIKE CONCAT('%', ?, '%')";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $username, $username, $searchQuery);


        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getSearchUser($username)
    {
        $query = "SELECT u.username, u.propic FROM users u WHERE u.username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPosts($username, $id, $n)
    {

        if ($id != -1) {
            $query = "SELECT p.*
            FROM posts p, users u
            WHERE p.user = ?
            AND p.user = u.username
            AND p.id < ? 
            ORDER BY date DESC
            LIMIT ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sii', $username, $id, $n);
        } else {
            $query = "SELECT p.*
            FROM posts p, users u
            WHERE p.user = ?
            AND p.user = u.username
            ORDER BY date DESC
            LIMIT ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('si', $username, $n);
        }

        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT p.*
        FROM posts p, users u
        WHERE p.user = ?
        AND p.user = u.username
        AND p.id < ? 
        ORDER BY date DESC
        LIMIT 1";

        $stmt = $this->db->prepare($query);
        $id = $result[count($result) - 1]["id"];
        $stmt->bind_param('si', $username, $id);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getNotifications($username, $n, $lastId)
    {
        if ($lastId != -1) {
            $query = "SELECT n.id, n.user, n.content, n.date, n.targetPost, u.propic, p.img_name
            FROM notifications n
            JOIN users u ON n.user = u.username
            LEFT JOIN posts p ON n.targetPost = p.id
            WHERE n.targetUser = ?
            AND n.id < ?
            ORDER BY n.date DESC
            LIMIT ?;";

            $stmt = $this->db->prepare($query);
            $n = $n + 1;
            $stmt->bind_param('sii', $username, $lastId, $n);
        } else {
            $query = "SELECT n.id, n.user, n.content, n.date, n.targetPost, u.propic, p.img_name
            FROM notifications n
            JOIN users u ON n.user = u.username
            LEFT JOIN posts p ON n.targetPost = p.id
            WHERE n.targetUser = ?
            ORDER BY n.date DESC
            LIMIT ?;
            ";

            $stmt = $this->db->prepare($query);
            $n = $n + 1;
            $stmt->bind_param('si', $username, $n);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getSearchResult($searchQuery)
    {
        $query = "SELECT username, propic FROM users WHERE username LIKE CONCAT('%', ?, '%')";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $searchQuery);
        $stmt->execute();
        $result = $stmt->get_result();


        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserNPosts($username)
    {
        $query = "SELECT COUNT(*)
        FROM posts p, users u
        WHERE p.user = ?
        AND p.user = u.username";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkFollow($user, $target)
    {
        $query = "SELECT *
        FROM followers
        WHERE follower = ?
        AND followed = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();
        $result = $stmt->get_result();

        return count($result->fetch_all(MYSQLI_ASSOC)) == 0;
    }

    public function follow($user, $target)
    {
        $query = "INSERT INTO `followers` (`follower`, `followed`, `date`) VALUES
        (?, ?, NOW())";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();

        $this->notifyFollow($user, $target);
    }

    public function unfollow($user, $target)
    {
        $query = "DELETE
        FROM followers
        WHERE follower = ?
        AND followed = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();
    }

    public function deleteNotification($targetUser, $user, $content, $date)
    {
        $query = "DELETE FROM notifications
        WHERE targetUser = ?
          AND content = ?
          AND date = ?
          AND user = ?
        ";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss', $targetUser, $content, $date, $user);
        $stmt->execute();
        // error_log($targetUser);
        // error_log($content);
        // error_log($date);
        // error_log($user);
        // error_log($stmt->affected_rows);
    }

    public function like_unlike($user, $action, $postId)
    {
        if ($action == 'add') {
            $query = "INSERT INTO `likes` (`post`, `user`, `date`) VALUES (?, ?, '" . date('Y-m-d H:i:s') . "');";
            $this->notifyLike($user, $postId);
        } else if ($action == 'remove') {
            $query = "DELETE FROM `likes` WHERE  post = ? AND user = ?";
        }
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $postId, $user);
        $stmt->execute();
    }



    private function notifyFollow($user, $targetUser)
    {
        $content = "started following you";

        $query = "INSERT INTO `notifications` (`targetUser`, `content`, `user`, `date`) VALUES (?, ?, ?, NOW());";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $targetUser, $content, $user);
        $stmt->execute();
    }

    private function notifyLike($user, $targetPost)
    {

        $query = "SELECT `user` FROM `posts` WHERE `id` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $targetPost);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_row();
        $targetUser = $row[0];

        if ($user != $targetUser) {
            $content = "liked your post";

            $query = "INSERT INTO `notifications` (`targetUser`, `content`, `user`, `date`, `targetPost`) VALUES (?, ?, ?, NOW(), ?);";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sssi', $targetUser, $content, $user, $targetPost);
            $stmt->execute();
        }
    }

    public function checkLogin($username, $password)
    {
        $query = "SELECT `username`, `password` FROM `users` WHERE `username` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_row();
        return password_verify($password, $row[1]);
    }

    public function signup($username, $password, $email)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $propic = "propic_" . $username;
        $query = "INSERT INTO `users` (`username`, `password`, `email`, `propic`) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss', $username, $hashedPassword, $email, $propic);
        return $stmt->execute();
    }
}
