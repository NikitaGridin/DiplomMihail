<?php
include './conn.php'; 
include './headers.php';


                if(!isset($_POST['id'], $_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'])) {
                    http_response_code(400);
                    echo json_encode('Заполните все поля!');
                    exit;
                }
                
                $id = $_POST['id'];
                $name = $_POST['name'];
                $description = $_POST['description'];
                $price = $_POST['price'];
                $category_id = $_POST['category_id'];
        
                $query = "SELECT img FROM dishes WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Блюдо не найдено!');
                    exit;
                }

                if (isset($_FILES['img'])) {
                    $allowed_formats = array('jpg', 'jpeg', 'png');
                    $img_name = $_FILES['img']['name'];
                    $img_info = pathinfo($img_name);
                    if(!in_array($img_info['extension'], $allowed_formats)) {
                        http_response_code(400);
                        echo json_encode('Можно загружать только фотографии!');
                        exit;
                    }
            
                    $img_name = uniqid() . '.' . $img_info['extension'];
                    $img_path = "./img_dishes/$img_name";
        
                    $query = "SELECT img FROM dishes WHERE id=$id";
                    $result = mysqli_query($conn, $query);
                    $row = mysqli_fetch_assoc($result);
                    $old_img = $row['img'];
                    $query = "UPDATE dishes SET name='$name', description='$description', price='$price', category_id='$category_id', img='$img_path' WHERE id=$id";
                } 
                else{
                    $query = "UPDATE dishes SET name='$name', description='$description', price='$price', category_id='$category_id' WHERE id=$id";
                }

                $result = mysqli_query($conn, $query);
                if ($result) {
                    if (isset($_FILES['img'])) {

                    move_uploaded_file($_FILES['img']['tmp_name'], $img_path);
        
                    if ($old_img != $img_name) {
                        $old_img_path = $old_img;
                        if (file_exists($old_img_path)) unlink($old_img_path);
                    }
                }
                    http_response_code(200);
                    echo json_encode('Информация успешно обновлена!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
?>