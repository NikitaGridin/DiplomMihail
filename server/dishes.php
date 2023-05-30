<?php
include './conn.php'; 
include './headers.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 8;
        $offset = ($page - 1) * $limit;
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        $sort = isset($_GET['sort']) ? $_GET['sort'] : '';
        $order = isset($_GET['order']) ? $_GET['order'] : '';

        $queryCount = "SELECT COUNT(*) as count FROM dishes";

        if ($category) {
            $queryCount .= " WHERE category_id='$category'";
        }

        $countResult = mysqli_query($conn, $queryCount);
        $countRow = mysqli_fetch_assoc($countResult);
        $count = $countRow['count'];

        $pages = ceil($count / $limit);

        $query = "SELECT * FROM dishes";
        
        if ($category) {
            $query .= " WHERE category_id='$category'";
        }
    
        if ($sort) {
            $query .= " ORDER BY $sort $order";
        }
    
        $query .= " LIMIT $limit OFFSET $offset";
    
        $result = mysqli_query($conn, $query);
        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) $data[] = $row;
            $response = [
                'data' => $data,
                'pages' => $pages
            ];
            echo json_encode($response);
        } else {
            http_response_code(404);
            echo json_encode('Блюда данной категории времено отсутсвуют!');
        }
        break;

        case 'POST':         
            if(!isset($_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'], $_FILES['img']) || empty($_POST['description']) || empty($_POST['price'])) {
                http_response_code(400);
                echo json_encode('Заполните все поля!');
                exit;
            }
        
            $name = $_POST['name'];
            $description = $_POST['description'];
            $price = $_POST['price'];
            $category_id = $_POST['category_id'];
            $img = $_FILES['img'];      
        
            $allowed_formats = array('jpg', 'jpeg', 'png');
            $img_name = $_FILES['img']['name'];
            $img_info = pathinfo($img_name);
            if(!in_array($img_info['extension'], $allowed_formats)) {
                http_response_code(400);
                echo json_encode('Можно загружать только фотогрфии!');
                exit;
            }
        
            $img_name = uniqid() . '.' . $img_info['extension'];
            $img_path = "./img_dishes/$img_name";
                
            $query = "INSERT INTO `dishes` (`name`, `description`, `price`, `category_id`, `img`) VALUES ('$name', '$description', '$price', '$category_id','$img_path')";
            $result = mysqli_query($conn, $query);
        
            if ($result) {
                move_uploaded_file($_FILES['img']['tmp_name'], $img_path);
                http_response_code(200);
                echo json_encode('Блюдо добавлено!');
            } else {
                http_response_code(400);
                echo json_encode('Что то пошло не так, повторите попытку позже!');
            }

            break;
            
                case 'DELETE':
                if(!isset($_GET['id'])) {
                    http_response_code(400);
                    echo json_encode('Укажите ID блюда!');
                    exit;
                }
            
                $id = $_GET['id'];
                $query = "SELECT img FROM dishes WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) == 0) {
                    http_response_code(404);
                    echo json_encode('Блюдо не найдено!');
                    exit;
                }
            
                $row = mysqli_fetch_assoc($result);
                $img = $row['img'];
            
                $query = "DELETE FROM dishes WHERE id=$id";
                $result = mysqli_query($conn, $query);
                if ($result) {
                    if (!empty($img)) {
                        $img_path = $img;
                        if (file_exists($img_path)) unlink($img_path);
                    }
                    http_response_code(200);
                    echo json_encode('Блюдо успешно удалёно!');
                } else {
                    http_response_code(400);
                    echo json_encode('Что-то пошло не так, повторите попытку позже!');
                }
                break;
    }

?>