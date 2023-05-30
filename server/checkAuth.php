<?php
include './conn.php'; 
include './headers.php'; 

if (isset($_GET['key'])) {
  $user_data = $_GET['key'];
  $decoded_user_data = json_decode(base64_decode($user_data), true);

  if (is_array($decoded_user_data) && array_key_exists('id', $decoded_user_data)) {
  $id = $decoded_user_data['id'];
  $name = $decoded_user_data['name'];
  $surname = $decoded_user_data['surname'];
  $email = $decoded_user_data['email'];
  $role = $decoded_user_data['role'];
  $query = "SELECT * FROM users WHERE id='$id' and name='$name' and surname='$surname' and email='$email' and role='$role'";
  $result = mysqli_query($conn, $query);

  if ($result && mysqli_num_rows($result) > 0) {
    http_response_code(200);
    echo json_encode(array('success' => true, 'message' => 'Авторизован!'), JSON_UNESCAPED_UNICODE);
  }
  else {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Не авторизован!'), JSON_UNESCAPED_UNICODE);
  }

} else {
  http_response_code(400);
  echo json_encode(array('success' => false, 'message' => 'Не авторизован!'), JSON_UNESCAPED_UNICODE);
}
}
else {
  http_response_code(400);
  echo json_encode(array('success' => false, 'message' => 'Не авторизован!'), JSON_UNESCAPED_UNICODE);
}
?>