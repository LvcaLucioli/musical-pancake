<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getDiscPosts($current_user, $n){
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

    public function getFollowedPosts($current_user, $id, $n){
        
        if ($id != -1){
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
        }else{
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
        LIMIT ?;";
        $stmt = $this->db->prepare($query);
        $id = $result[count($result)-1]["id"];
        $stmt->bind_param('sii', $current_user, $id, $n);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getLikeList($postId){
        $query = "SELECT user FROM likes WHERE post = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUser($username){
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

    public function getUserPosts($username, $id, $n){

        if ($id != -1){
            $query = "SELECT p.*
            FROM posts p, users u
            WHERE p.user = ?
            AND p.user = u.username
            AND p.id < ? 
            ORDER BY date DESC
            LIMIT ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('sii', $username, $id, $n);
        }else{
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
        LIMIT ?;";
        $stmt = $this->db->prepare($query);
        $id = $result[count($result)-1]["id"];
        $stmt->bind_param('sii', $username, $id, $n);
        $stmt->execute();
        $result[] = count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) == 0;

        return $result;
    }

    public function getNotifications(){
        $query = "SELECT n.*
        FROM notifications n, users u
        WHERE n.user = u.username
        ORDER BY date DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getSearchResult($searchQuery){
        $query = "SELECT username, propic FROM users WHERE username LIKE CONCAT('%', ?, '%')";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param("s", $searchQuery);
        $stmt->execute();
        $result = $stmt->get_result();


        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserNPosts($username){
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

    public function checkFollow($user, $target){
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

    public function follow($user, $target){
        // aggiungere gestione notifiche
        $query = "INSERT INTO `followers` (`follower`, `followed`, `date`) VALUES
        (?, ?, NOW())";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $user, $target);
        $stmt->execute();
    }

    public function unfollow($user, $target){
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
?>