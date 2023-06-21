<?php
require_once '..\bootstrap.php';

// $result["logineseguito"] = false;

if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["email"])){
    $login_result = $dbh->signup($_POST["username"], $_POST["password"], $_POST["email"]);
    if(!$login_result){
        $result["errorelogin"] = "error on username or password";
    }
    else{
        logUserIn($_POST["username"]);
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>