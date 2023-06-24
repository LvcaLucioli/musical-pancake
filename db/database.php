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
            $query = "SELECT c.*, u.propic
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
        // notifica commento
        return $result;
    }

    public function getUser($username)
    {
        $query = "SELECT 
        q1.username, q1.propic, q1.bio, COALESCE(q1.followers, 0) AS followers, COALESCE(q2.following, 0) AS following
        FROM (
            SELECT 
                u.username, u.propic, u.bio, COUNT(*) AS followers
                FROM 
                    users u
                    JOIN followers f ON u.username = f.followed
                WHERE 
                    u.username = ?
                GROUP BY 
                    u.username
        ) AS q1
        LEFT JOIN (
            SELECT 
                    follower,
                    COUNT(*) AS following
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

    public function getSearchUser($username)
    {
        $query = "SELECT u.username, u.propic, u.bio FROM users u WHERE u.username = ?";
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

    public function deleteNotification($targetUser, $userPropic, $content, $date)
    {
        $userPropic = str_replace("./uploads/", "", $userPropic);;
        $query = "DELETE FROM notifications
        WHERE targetUser = ?
          AND content = ?
          AND date = ?
          AND user IN (
            SELECT username
            FROM users  
            WHERE propic = ?
          );
        ";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss', $targetUser, $content, $date, $userPropic);
        $stmt->execute();
        error_log($targetUser);
        error_log($content);
        error_log($date);
        error_log($userPropic);
        error_log($stmt->affected_rows);
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
        $content = "<b>" . $user . "</b>&nbsp;" . "started following you";

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
            $content = "<b>" . $user . "</b>&nbsp;" . "liked your post";

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
