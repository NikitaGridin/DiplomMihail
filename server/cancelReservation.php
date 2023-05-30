<?php
include './conn.php'; 
include './headers.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Заполните все поля!'), JSON_UNESCAPED_UNICODE);
    exit;
  }
  
  $id = $_GET['id'];
  
  $query = "UPDATE reservations SET status='отклонён' WHERE id=$id";
  $result = mysqli_query($conn, $query);
  
  if ($result) {
    http_response_code(200);
    echo json_encode(array('success' => true, 'message' => 'Бронь отменена!'), JSON_UNESCAPED_UNICODE);
  } else {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Что-то пошло не так, повторите попытку позже!'), JSON_UNESCAPED_UNICODE);
  }
?>