<?php
include './conn.php'; 
include './headers.php';

// Проверяем, установлены ли все параметры
if (empty($_GET['date']) || empty($_GET['startTime']) || empty($_GET['finishTime'])) {  
  http_response_code(400);
  echo json_encode('Заполните все поля!');
  exit;
}


// Получаем параметры из запроса
$date = $_GET['date'];
$startTime = $_GET['startTime'];
$finishTime = $_GET['finishTime'];

// Получаем список забронированных столов на выбранную дату и время
$sql = "SELECT table_id FROM reservations WHERE date = '$date' AND ('$startTime' < finish_time AND '$finishTime' > start_time)";
$result = mysqli_query($conn, $sql);
$bookedTables = [];
if (mysqli_num_rows($result) > 0) {
  while ($row = mysqli_fetch_assoc($result)) {
    $bookedTables[] = $row['table_id'];
  }
}

// Получаем список всех столов
$sql = "SELECT id, number FROM tables";
$result = mysqli_query($conn, $sql);
$tables = [];
if (mysqli_num_rows($result) > 0) {
  while ($row = mysqli_fetch_assoc($result)) {
    $tables[] = $row;
  }
}

// Фильтруем список столов, оставляя только свободные столики
$availableTables = array_filter($tables, function($table) use ($bookedTables) {
  return !in_array($table['id'], $bookedTables);
});

// Проверяем пересечение времени бронирования
$availableTables = array_filter($availableTables, function($table) use ($conn, $date, $startTime, $finishTime) {
  $tableId = $table['id'];
  $sql = "SELECT * FROM reservations WHERE table_id = $tableId AND date = '$date' AND ('$startTime' < finish_time AND '$finishTime' > start_time AND '$startTime' = finish_time and '$finishTime'=start_time)";
  $result = mysqli_query($conn, $sql);
  return mysqli_num_rows($result) == 0;
});


if(count($availableTables) === 0) {
  http_response_code(400);
  echo json_encode('Свободных столов нет!');
  exit;
}

if(count($availableTables) === 1){
  $json = json_encode($availableTables);  
  $array = json_decode($json , true);  
  $element = array_shift($array);  
  $newArray = [$element];      
  echo json_encode($newArray);
  exit;
}
  
  echo json_encode($availableTables);

?>