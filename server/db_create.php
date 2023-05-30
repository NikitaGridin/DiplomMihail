<?php

include "./conn.php";

// Создание таблицы "users"
$sql = "CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
)";
mysqli_query($conn, $sql);

// Создание таблицы "reviews"
$sql = "CREATE TABLE reviews (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6) UNSIGNED,
    text TEXT NOT NULL,
    grade INT(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";
mysqli_query($conn, $sql);

// Создание таблицы "tables"
$sql = "CREATE TABLE tables (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    number INT(3) NOT NULL
    )";
mysqli_query($conn, $sql);

// Создание таблицы "reservations"
$sql = "CREATE TABLE reservations (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6) UNSIGNED,
    table_id INT(6) UNSIGNED,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    finish_time TIME NOT NULL,
    seats INT(6) NOT NULL,
    status ENUM('ожидает', 'отклонён', 'подтверждён') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
)";
mysqli_query($conn, $sql);

// Создание таблицы "categories"
$sql = "CREATE TABLE categories (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)";
mysqli_query($conn, $sql);

// Создание таблицы "dishes"
$sql = "CREATE TABLE dishes (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price INT(6) NOT NULL,
    category_id INT(6) UNSIGNED,
    img VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
)";
mysqli_query($conn, $sql);


// Закрытие соединения с базой данных
mysqli_close($conn);
?>