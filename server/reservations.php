<?php
include './conn.php'; 
include './headers.php'; 

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        if(isset($_GET['id'])){
            $user_id = $_GET['id'];
        }
        $query = "SELECT reservations.*, users.name, users.surname, users.img, users.phone, users.email, tables.number
        FROM reservations
        JOIN users ON reservations.user_id = users.id
        JOIN tables ON reservations.table_id = tables.id";
        if (isset($user_id)) $query .= " WHERE reservations.user_id = '$user_id'";
        
        $result = mysqli_query($conn, $query);   
        if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode('Заказов нет!');
        }
        break;

        case 'POST':         
        if (empty($_POST['user_id']) || empty($_POST['table_id']) || empty($_POST['date']) || empty($_POST['start_time']) || empty($_POST['finish_time']) || empty($_POST['seats'])) {
            http_response_code(400);
            echo json_encode('Заполните все поля!');
            exit();
        }

        $user_id = $_POST['user_id'];
        $table_id = $_POST['table_id'];
        $date = $_POST['date'];
        $start_time = $_POST['start_time'];
        $finish_time = $_POST['finish_time'];
        $seats = $_POST['seats'];

        $query = "SELECT * FROM users WHERE id=$user_id";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) === 0) {
            http_response_code(404);
            echo json_encode('Пользователь не найден!');
            exit;
        }  

        $query = "SELECT * FROM tables WHERE id=$table_id";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) === 0) {
            http_response_code(404);
            echo json_encode('Стол не найден!');
            exit;
        }  

        $current_datetime = date('Y-m-d H:i:s');
        if ($date.' '.$start_time < $current_datetime) {
            http_response_code(400);
            echo json_encode('Выбранное время не может быть раньше текущего!');
            exit();
        }         
            
        if ($start_time >= $finish_time) {
            http_response_code(400);
            echo json_encode('Время начала не может быть больше, либо равно времени окончания!');
            exit();
        }
            
        $query = "SELECT * FROM reservations WHERE table_id='$table_id' AND date='$date' AND ((start_time <= '$finish_time' AND finish_time > '$start_time') OR (start_time <= '$start_time' AND finish_time > '$start_time') OR (finish_time >= '$finish_time' AND start_time < '$finish_time'))";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            http_response_code(400);
            echo json_encode('Выбранный временной интервал пересекается с уже забронированными временными интервалами!');
            exit;
        }

        $query = "INSERT INTO reservations (user_id, table_id, date, start_time, finish_time, seats, status) VALUES ('$user_id', '$table_id', '$date', '$start_time', '$finish_time','$seats', 'ожидает')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            http_response_code(201);
            echo json_encode('Бронирование создано, ожидайте подтверждения!');
        } else {
            http_response_code(500);
            echo json_encode('Что-то пошло не так, повторите попытку позже!');
        }
        break;

        case 'DELETE':
        if(!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode('Укажите ID бронирования!');
            exit;
        }
            
        $id = $_GET['id'];
        $query = "SELECT id FROM reservations WHERE id=$id";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) == 0) {
            http_response_code(404);
            echo json_encode('Бронирование не найдено!');
            exit;
        }
            
        $query = "DELETE FROM reservations WHERE id=$id";
        $result = mysqli_query($conn, $query);
        if ($result) {            
            http_response_code(200);
            echo json_encode('Бронирование успешно удалёно!');
        } else {
            http_response_code(400);
            echo json_encode('Что-то пошло не так, повторите попытку позже!');
        }
        break;
}
?>