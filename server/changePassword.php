<?php
include './conn.php'; 
include './headers.php'; 

if (!isset($_POST['old_password'], $_POST['new_password'], $_POST['id'])) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
    exit;
}

$id = $_POST['id'];
$password = $_POST['old_password'];
$new_password = $_POST['new_password'];

$query = "SELECT * FROM users WHERE id=$id";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 0) {
    http_response_code(404);
    echo json_encode(array('success' => false, 'message' => 'Пользователь не найден!'), JSON_UNESCAPED_UNICODE);
    exit;
}

$user = mysqli_fetch_assoc($result);

if (!password_verify($password, $user['password'])) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Старый пароль указан неверно!'), JSON_UNESCAPED_UNICODE);
    exit;
}

$new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);

$query = "UPDATE users SET password='$new_password_hash' WHERE id=$id";
$result = mysqli_query($conn, $query);

if ($result) {
    http_response_code(200);
    echo json_encode(array('success' => true, 'message' => 'Пароль успешно обновлен!'), JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
}

mysqli_close($conn);
?>