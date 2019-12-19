<?php
include "conn.php";
$conn->query('SET NAMES UTF8');
if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $result=$conn->query("select * from hot_goods where sid='$sid'");
    echo json_encode($result->fetch_assoc());
}