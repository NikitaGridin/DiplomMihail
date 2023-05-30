<?php
include './conn.php'; 
include './headers.php'; 

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $id = $_GET['id'];
        $query = "SELECT * FROM users where id = $id";

        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
            echo json_encode(array('success' => true, 'data' => $data), JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array('success' => false, 'message' => 'Пользователь не найден!'), JSON_UNESCAPED_UNICODE);
        }
        break;
}