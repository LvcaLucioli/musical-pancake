<?php
class DatabaseHelper{
    private $db;
    private $n_posts;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
        $this->n_posts = 0;  
    }

    public function getDiscoveryPosts($n){
        $this->n_posts = 0;
        $stmt = $this->db->prepare("... LIMIT ?");
        $stmt->bind_param('i',$n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPosts($n){
        $query = "SELECT *
        FROM posts p, users u
        WHERE p.user = u.username
        ORDER BY date DESC
        LIMIT ?, ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $this->n_posts, $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $this->n_posts += $n+1;

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLikeList($post_id){
        $query = "SELECT user FROM likes WHERE post = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $post_id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>