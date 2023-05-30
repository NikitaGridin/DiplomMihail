<?php
include './conn.php'; 
include './headers.php';

if(!isset($_POST['email'],$_POST['password'])) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
    exit;
}

$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);

if (!$user) {
    http_response_code(401);
    echo json_encode(array('success' => false, 'message' => 'Неверные данные'), JSON_UNESCAPED_UNICODE);
    exit;
}

if (password_verify($password, $user['password'])) {
    $user_data = array(
        'id' => $user['id'],
        'name' => $user['name'],
        'surname' => $user['surname'],
        'email' => $user['email'],
        'phone' => $user['phone'],
        'img' => $user['img'],
        'role' => $user['role']
    );
    
    $json_user_data = json_encode($user_data);
    $encoded_user_data = base64_encode($json_user_data);    
    
    http_response_code(200);
    echo json_encode(array('success' => true, 'message' => 'Авторизация прошла успешно!' , 'cookie' => $encoded_user_data), JSON_UNESCAPED_UNICODE);

} else {
    http_response_code(401);
    echo json_encode(array('success' => false, 'message' => 'Неверные данные'), JSON_UNESCAPED_UNICODE);
    exit;   
}
?>