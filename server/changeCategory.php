<?php
include './conn.php'; 
include './headers.php';
 
                if(!isset($_POST['id'], $_POST['name'])) {
                    http_response_code(400);
                    echo json_encode('Заполните все поля!');
                    exit;
                }
                
                $id = $_POST['id'];
                $name = $_POST['name'];
        
                $query = "SELECT * FROM categories WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Категория не найдена!');
                    exit;
                }
        
                $query = "UPDATE categories SET name='$name' WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {        
                    http_response_code(200);
                    echo json_encode('Информация успешно обновлена!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
?>