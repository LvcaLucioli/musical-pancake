<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getDiscPosts($n){
        $stmt = $this->db->prepare("SELECT img_name 
        FROM posts p, users u
        WHERE p.user = u.username
        AND u.is_in_disc = 1
        ORDER BY RAND()
        LIMIT ?");
        $stmt->bind_param('i',$n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPosts($i, $n){
        $query = "SELECT *
        FROM posts p, users u
        WHERE p.user = u.username
        ORDER BY date DESC
        LIMIT ?, ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $i, $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
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
        $query = "SELECT * FROM users WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    public function getUserPosts($username, $i, $n){
        $query = "SELECT *
        FROM posts p, users u
        WHERE p.user = ?
        AND p.user = u.username
        ORDER BY date DESC
        LIMIT ?, ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sii', $username, $i, $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>