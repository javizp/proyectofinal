<?php
include 'conexion.php';

$id = $_POST['id'];

$consulta = "DELETE FROM `favorito` WHERE `id` = '$id'";
$respuesta = false;
mysqli_query($conexion,$consulta);
if(mysqli_affected_rows($conexion) > 0){
    $respuesta = true;
}
$salida = array('respuesta' => $respuesta);
print json_encode($salida);
?>