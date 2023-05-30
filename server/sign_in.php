<?php
include './conn.php'; 
include './headers.php'; 

    if(!isset($_POST['name'], $_POST['surname'], $_POST['email'], $_POST['phone'], $_POST['password'], $_FILES['img'])) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $img = $_FILES['img'];

    $query = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0) {
        http_response_code(409);
        echo json_encode(array('success' => false, 'message' => 'Email занят!'), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $query = "SELECT * FROM users WHERE phone='$phone'";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0) {
        http_response_code(409);
        echo json_encode(array('success' => false, 'message' => 'Номер телефона занят!'), JSON_UNESCAPED_UNICODE);
        exit;
    }


    $allowed_formats = array('jpg', 'jpeg', 'png');
    $img_name = $_FILES['img']['name'];
    $img_info = pathinfo($img_name);
    if(!in_array($img_info['extension'], $allowed_formats)) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Можно загружать только фотогрфии!'), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $img_name = uniqid() . '.' . $img_info['extension'];
    $img_path = "./img_users/$img_name";

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);  

    $query = "INSERT INTO `users` (`id`, `name`, `surname`, `email`, `phone`, `password`, `img`, `role`) VALUES (NULL, '$name', '$surname', '$email', '$phone', '$passwordHash', '$img_path', 'user')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        move_uploaded_file($_FILES['img']['tmp_name'], $img_path);
        http_response_code(200);
        echo json_encode(array('success' => true, 'message' => 'Регистрация прошла успешно!'), JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'message' => 'Что то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
    }

?>