<?php
include 'conexion.php';

$id = $_POST['id'];

$consulta = "select * from favorito WHERE `id` = '$id'";
$resultado = mysqli_query($conexion, $consulta);
$respuesta = false;
if(mysqli_num_rows($resultado) > 0){
    $respuesta = true;
}
$salida = array('respuesta' => $respuesta);
print json_encode($salida);
?>

