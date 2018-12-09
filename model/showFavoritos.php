<?php
include 'conexion.php';

$consulta = "select * from favorito";
$resultado = mysqli_query($conexion, $consulta);
$salida = array();
if(mysqli_num_rows($resultado) > 0){
    while($registro=mysqli_fetch_array($resultado)){
        array_push($salida, $registro);
    }
}
print json_encode($salida);
?>