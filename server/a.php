<?php
include './conn.php'; 
include './headers.php';

if (empty($_GET['date'])) {  
  http_response_code(400);
  echo json_encode('Заполните все поля!');
  exit;
}

$date = $_GET['date'];

$sql = "SELECT r.start_time, r.finish_time, t.number as table_number 
        FROM reservations r 
        JOIN tables t ON r.table_id = t.id 
        WHERE r.date = '$date' AND r.status != 'отклонён'
        ORDER BY r.start_time ASC";

$result = mysqli_query($conn, $sql);

// Создаем пустой массив для хранения результатов
$tables = [];

while ($row = mysqli_fetch_assoc($result)) {
  // Получаем номер стола и интервал
  $tableNumber = $row['table_number'];
  $interval = $row['start_time'] . '-' . $row['finish_time'];
  
  // Если записи для этого стола еще нет, создаем ее
  if (!isset($tables[$tableNumber])) {
    $tables[$tableNumber] = [
      'table_number' => $tableNumber,
      'intervals' => [$interval]
    ];
  } else {
  // Иначе добавляем интервал к уже существующей записи
    $tables[$tableNumber]['intervals'][] = $interval;
  }
}

// Преобразуем ассоциативный массив в обычный массив
$tables = array_values($tables);

// Выводим результат в формате JSON
echo json_encode($tables);
?>