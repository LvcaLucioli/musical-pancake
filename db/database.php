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

    public function getDiscPosts($n)
    {
        $stmt = $this->db->prepare("SELECT img_name 
        FROM posts p, users u
        WHERE p.user = u.username
        AND u.is_in_disc = 1
        ORDER BY RAND()
        LIMIT ?");
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPosts($i, $n, $date)
    {
        $query = "SELECT *
        FROM posts p, users u
        WHERE p.user = u.username
        AND p.date < ?
        ORDER BY date DESC
        LIMIT ?, ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sii', $date, $i, $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLikeList($postId)
    {
        $query = "SELECT user FROM likes WHERE post = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUser($username, $date)
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
                    f.date < ?
                    AND u.username = ?
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
                    date < ?
                    AND follower = ?
                GROUP BY 
                    follower
        ) AS q2
        ON q1.username = q2.follower;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss', $date, $username, $date, $username);
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

    public function getUserPosts($username, $i, $n, $date)
    {
        $query = "SELECT *
        FROM posts p, users u
        WHERE p.user = ?
        AND p.user = u.username
        AND p.date < ?
        ORDER BY date DESC
        LIMIT ?, ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssii', $username, $date, $i, $n);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $stmt = $this->db->prepare($query);
        $i += $n;
        $stmt->bind_param('ssii', $username, $date, $i, $n);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getNotifications()
    {
        $query = "SELECT n.*
        FROM notifications n, users u
        WHERE n.user = u.username
        ORDER BY date DESC";

        $stmt = $this->db->prepare($query);
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

    public function getUserNPosts($username, $date)
    {
        $query = "SELECT COUNT(*)
        FROM posts p, users u
        WHERE p.user = ?
        AND p.user = u.username
        AND p.date < ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $date);
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
        // aggiungere gestione notifiche
        $query = "INSERT INTO `followers` (`follower`, `followed`, `date`) VALUES
        (?, ?, NOW())";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();
    }

    public function unfollow($user, $target)
    {
        // aggiungere gestione notifiche
        $query = "DELETE
        FROM followers
        WHERE follower = ?
        AND followed = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();
    }
}
