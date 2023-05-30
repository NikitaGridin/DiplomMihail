<?php
include './conn.php'; 
include './headers.php'; 

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
            $query = "SELECT reviews.*, users.name, users.surname, users.img FROM reviews JOIN users ON reviews.user_id = users.id";
            $result = mysqli_query($conn, $query);

            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
                echo json_encode(array('success' => true, 'data' => $data), JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Отзывов нет!'), JSON_UNESCAPED_UNICODE);
            }
        break;

        case 'POST':                  
            $user_id = $_POST['user_id'];
            $text = $_POST['text'];
            $grade = $_POST['grade'];

            if (!isset($user_id) || strlen($text) == 0 || $grade == 0) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
                exit();
              }


            $query = "SELECT * FROM users WHERE id=$user_id";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) === 0) {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Пользователь не найден!'), JSON_UNESCAPED_UNICODE);
                exit;
            }  

            $query = "INSERT INTO reviews (user_id, text, grade) VALUES ('$user_id', '$text', $grade)";
            $result = mysqli_query($conn, $query);
            if ($result) {
              http_response_code(201);
              echo json_encode(array('success' => true, 'message' => 'Отзыв успешно добален!'), JSON_UNESCAPED_UNICODE);
            } else {
              http_response_code(500);
              echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
            }
            break;

            case 'PUT':
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);
            if (!isset($data['id']) || !isset($data['text']) || !isset($data['grade'])) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
                exit();
            }

            $id = $data['id'];
            $text = $data['text'];
            $grade = $data['grade'];

            $query = "SELECT * FROM reviews WHERE id=$id";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);
            if(mysqli_num_rows($result) == 0) {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Запись не найдена!'), JSON_UNESCAPED_UNICODE);
                exit;
            }  
            
            $old_text = $row['text'];
            $old_grade = $row['grade'];
            if ($text == $old_text && $grade == $old_grade) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Введёные данные соотвутсвуют текущим!'), JSON_UNESCAPED_UNICODE);
                exit;
            }            
            
            $query = "UPDATE reviews SET text='$text', grade='$grade' WHERE id='$id'";
            $result = mysqli_query($conn, $query);
            if (mysqli_affected_rows($conn) > 0) {
                echo json_encode(array('success' => true, 'message' => 'Отзыв успешно отредактирован!'), JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
            }

            mysqli_close($conn);
            break;

            case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode('Укажите ID отзыва!');
                    exit;
                }
            
                $id = $_GET['id'];
                $query = "SELECT id FROM reviews WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Отзыв не найден!');
                    exit;
                }
            
                $query = "DELETE FROM reviews WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {            
                    http_response_code(200);
                    echo json_encode('Отзыв успешно удалён!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
                break;
    }

?>