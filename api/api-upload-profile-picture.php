<?php
require_once '../bootstrap.php';

$img_name = "propic_" . $_SESSION['username'] . ".jpg";
if(isset($_POST['image'])){
    $image_parts = explode(";base64,", $_POST['image']);
    $image_base64 = base64_decode($image_parts[1]);
    $file = '.' . UPLOAD_DIR . $img_name;
    file_put_contents($file, $image_base64);
}else{
    copy('../resources/default-propic.jpg', '.' . UPLOAD_DIR . $img_name);
}

header('Content-Type: application/json');
echo json_encode($_SESSION['username']);
?>