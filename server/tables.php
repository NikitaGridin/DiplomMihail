<?php
include './conn.php'; 
include './headers.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
             $query = "SELECT * FROM tables";
             $result = mysqli_query($conn, $query);
             if (mysqli_num_rows($result) > 0) {
                 $data = array();
                 while ($row = mysqli_fetch_assoc($result)) {
                     $data[] = $row;
                 }
                 echo json_encode(array('success' => true, 'data' => $data), JSON_UNESCAPED_UNICODE);
                } else {
                 http_response_code(404);
                 echo json_encode(array('success' => false, 'message' => 'Столов нет!'), JSON_UNESCAPED_UNICODE);
                }
        break;

        case 'POST':         
            if (!isset($_POST['number'])) {
              http_response_code(400);
              echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
              exit();
            }
          
            $number = $_POST['number'];
          
            $query = "SELECT number FROM tables WHERE number='$number'";
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Номер столика занят!'), JSON_UNESCAPED_UNICODE);
            exit();
            }

            $query = "INSERT INTO tables (number,) VALUES ('$number')";
            $result = mysqli_query($conn, $query);
            if ($result) {
              http_response_code(201);
              echo json_encode(array('success' => true, 'message' => 'Стол успешно добавлен'), JSON_UNESCAPED_UNICODE);
            } else {
              http_response_code(500);
              echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
            }
            break;

            case 'PUT':
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);
            
            if (!isset($data['id']) || !isset($data['number'])) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
                exit();
              }

            $id = $data['id'];
            $number = $data['number'];

            $query = "SELECT * FROM tables WHERE id=$id";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);
            if(mysqli_num_rows($result) == 0) {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Запись не найдена!'), JSON_UNESCAPED_UNICODE);
                exit;
            }  
            
            $old_number = $row['number'];

            if ($number == $old_number) {
                http_response_code(400);
                echo json_encode(array('success' => false,'message' => 'Введёные данные соотвутсвуют текущим!'), JSON_UNESCAPED_UNICODE);
                exit;
            }

            $query = "SELECT number FROM tables WHERE number='$number' AND id!=$id";
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Номер столика занят!'), JSON_UNESCAPED_UNICODE);
            exit();
            }
            
            $query = "UPDATE tables SET number='$number' WHERE id='$id'";
            $result = mysqli_query($conn, $query);
            if (mysqli_affected_rows($conn) > 0) {
                echo json_encode(array('success' => true, 'message' => 'Данные успешно изменены!'), JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
            }

            mysqli_close($conn);
            break;

            case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode(array('success' => false, 'message' => 'Укажите ID столика!'), JSON_UNESCAPED_UNICODE);
                    exit;
                }
    
                $id = $_GET['id'];
                $query = "SELECT id FROM tables WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode(array('success' => false, 'message' => 'Столик не найден!'), JSON_UNESCAPED_UNICODE);
                    exit;
                }
            
                $query = "DELETE FROM tables WHERE id=$id";
                $result = mysqli_query($conn, $query);
            
                if ($result) {            
                    http_response_code(200);
                    echo json_encode(array('success' => true, 'message' => 'Столик успешно удалён!'), JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(400);
                    echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
                }
                break;
    }

?>