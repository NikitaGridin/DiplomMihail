<?php
include './conn.php'; 
include './headers.php';

       
    $id = $_GET['id'];

    $query = "SELECT d.*, c.name as category_name 
    FROM dishes d 
    LEFT JOIN categories c ON c.id = d.category_id
    WHERE d.id = $id
";            
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode('Не найден!');
    }