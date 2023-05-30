<?php
include './conn.php'; 
include './headers.php'; 

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $query = "SELECT * FROM users";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
            echo json_encode(array('success' => true, 'data' => $data), JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array('success' => false, 'message' => 'Пользователей нет!'), JSON_UNESCAPED_UNICODE);
        }
        break;
    case 'POST':
        if(!isset($_POST['id'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['phone'])) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
            exit;
        }

        $id = $_POST['id'];
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        $query = "SELECT img FROM users WHERE id=$id";
        $result = mysqli_query($conn, $query);
        
        if(mysqli_num_rows($result) == 0) {
            http_response_code(404);
            echo json_encode(array('success' => false, 'message' => 'Пользователь не найден!'), JSON_UNESCAPED_UNICODE);
            exit;
        }

        $query = "SELECT * FROM users WHERE email='$email' AND id!=$id";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            http_response_code(409);
            echo json_encode(array('success' => false, 'message' => 'Email занят!'), JSON_UNESCAPED_UNICODE);
            exit;
        }

        $query = "SELECT * FROM users WHERE phone='$phone' AND id!=$id";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            http_response_code(409);
            echo json_encode(array('success' => false, 'message' => 'Номер телефона занят!'), JSON_UNESCAPED_UNICODE);
            exit;
        }

        if (isset($_FILES['img'])) {
            $allowed_formats = array('jpg', 'jpeg', 'png');
            $img_name = $_FILES['img']['name'];
            $img_info = pathinfo($img_name);
            if(!in_array($img_info['extension'], $allowed_formats)) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Можно загружать только фотографии!'), JSON_UNESCAPED_UNICODE);
                exit;
            }
    
            $img_name = uniqid() . '.' . $img_info['extension'];
            $img_path = "./img_users/$img_name";

            $query = "SELECT img FROM users WHERE id=$id";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);
            $old_img = $row['img'];
            $query = "UPDATE users SET name='$name', surname='$surname', email='$email', phone='$phone', img='$img_path' WHERE id=$id";
        } 
        else{
            $query = "UPDATE users SET name='$name', surname='$surname', email='$email', phone='$phone' WHERE id=$id";
        }

        $result = mysqli_query($conn, $query);
        if ($result) {
            
            
            if (isset($_FILES['img'])) {
                move_uploaded_file($_FILES['img']['tmp_name'], $img_path);
            if ($old_img != $img_name) {
                $old_img_path = $old_img;
                if (file_exists($old_img_path)) unlink($old_img_path);
            }
        }
            http_response_code(200);
            echo json_encode(array('success' => true, 'message' => 'Информация успешно обновлена!'), JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
        }
        break;

        case 'DELETE':
            if(!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Укажите ID пользователя!'), JSON_UNESCAPED_UNICODE);
                exit;
            }
        
            $id = $_GET['id'];
            $query = "SELECT img FROM users WHERE id=$id";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) == 0) {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Пользователь не найден!'), JSON_UNESCAPED_UNICODE);
                exit;
            }
        
            $row = mysqli_fetch_assoc($result);
            $img = $row['img'];
        
            $query = "DELETE FROM users WHERE id=$id";
            $result = mysqli_query($conn, $query);
            if ($result) {
                if (!empty($img)) {
                    $img_path = $img;
                    if (file_exists($img_path)) unlink($img_path);
                }
                http_response_code(200);
                echo json_encode(array('success' => true, 'message' => 'Пользователь успешно удалён!'), JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
            }
            break;
}

?>