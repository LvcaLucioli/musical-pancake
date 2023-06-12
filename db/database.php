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
        $query = "SELECT c.*, u.propic
        FROM comments c, users u
        WHERE c.post = ?
        AND c.to_comment IS NULL
        AND c.user = u.username
        AND c.id > ? 
        ORDER BY c.datetime ASC
        LIMIT ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $postID, $lastID, $n);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT c.*, u.propic
        FROM comments c, users u
        WHERE c.post = ?
        AND c.to_comment IS NULL
        AND c.user = u.username
        AND c.id > ? 
        ORDER BY c.datetime ASC
        LIMIT 1";

        $stmt = $this->db->prepare($query);
        $id = $result[count($result) - 1]["id"];
        $stmt->bind_param('ii', $postID, $id);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

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

        if ($result->num_rows == 0) {
            error_log(var_export($result, true));
            $query = "SELECT u.username, u.propic, u.bio FROM users u WHERE u.username = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $result = $stmt->get_result();
            error_log(var_export($result, true));
        }

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

    public function getNotifications($username)
    {
        $query = "SELECT n.user, n.content, u.propic, n.date
        FROM notifications n
        JOIN users u ON n.user = u.username
        WHERE n.targetUser = ?
        ORDER BY n.date DESC";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
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

    public function deleteNotification($targetUser, $userPropic, $contentDate)
    {
        $splitted = explode(".", $contentDate);
        $content = $splitted[0];
        $date = $splitted[1];


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
    }

    public function like_unlike($user, $action, $postId)
    {
        if ($action == 'add') {
            $query = "INSERT INTO `likes` (`post`, `user`) VALUES (?, ?);";
            $this->notifyLike($user, $postId);
        } else if ($action = 'remove') {
            $query = "DELETE FROM `likes` WHERE  post = ? AND user = ?";
        }
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $postId, $user);
        $stmt->execute();
    }



    private function notifyFollow($user, $targetUser)
    {
        $content = $user . " started following you";

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

        $content = $user . " liked your post";

        $query = "INSERT INTO `notifications` (`targetUser`, `content`, `user`, `date`, `targetPost`) VALUES (?, ?, ?, NOW(), ?);";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssi', $targetUser, $content, $user, $targetPost);
        $stmt->execute();
    }
}
