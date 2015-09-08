<?php

class MysqlClient
{
    private $connection = null;
    
    function MysqlClient()
    {
        
    }
    
    //interfacage avec une base de données mysql

    private function str_rows(&$item_array, $key)
    {
        $r_str = '';

        foreach($item_array as $key => $value)
        {
             $r_str .= $key.'="'.$value.'";';
        }

        $r_str = substr($r_str, 0, -1);

        echo $r_str.'|';

    }

    private function fetchAssocStatement($stmt)
    {
        if(mysqli_stmt_num_rows($stmt) >0)
        {
            $result = array();
            $md = mysqli_stmt_result_metadata($stmt);


            $params = array();
            $params[] = $stmt;
            while($field = mysqli_fetch_field($md)) {
                $params[] = &$result[$field->name];
            }

            call_user_func_array('mysqli_stmt_bind_result', $params);

            if(mysqli_stmt_fetch($stmt))
            {
                return $result;
            }
        }

        return null;
    }



    //récupère le caractère utilisé par les paramètres nommés dans les requêtes
    public function getparamchar()
    {
            return '?';
    }


    //connexion à la base de donnée
    public function connect_db($pDbuser = '',$pDbpass = '',$pDbase = '')
    {
            if(empty($pDbuser))
                    $pDbuser = WebConfig::$MYSQL_LOGIN;

            if(empty($pDbpass))
                    $pDbpass = WebConfig::$MYSQL_PWD;

            if(empty($pDbase))
                    $pDbase = WebConfig::$MYSQL_DB; 

            $this->connection = mysqli_connect(WebConfig::$MYSQL_SERVER,$pDbuser, $pDbpass, $pDbase); 

            if (mysqli_connect_errno()) 
            {
              $e = oci_error();
              
              log_manager::log("Connexion à mysql impossible : ". mysqli_connect_error(),LogLevel_Error);
              return  null;
            }


            mysqli_query( $this->connection,"SET NAMES 'utf8'");
            //mysqli_autocommit($conn,FALSE);	

            return  $this->connection;
    }

    public function get_last_id()
    {
        return mysqli_insert_id($this->connection);
    }

    //récupération d'un tableau de données à partir d'une requete
    public function getarray_fromquery($SQLquery,$params = array(),&$num_rows = 0,$fetch_type = 1,$start_enreg = 0,$max_enreg =-1,$usetransac = false)
    {
            $SQLstatement = mysqli_stmt_init($this->connection);

            if (!mysqli_stmt_prepare($SQLstatement, $SQLquery))
            {
                     log_manager::log("Erreur prep requete ".$SQLquery." ". mysqli_stmt_error($SQLstatement),LogLevel_Error);
                     mysqli_stmt_close($SQLstatement);
                     return null;
            }


            if(!empty($params))
            {
                $bind_params = array();
                $bind_params[] = $SQLstatement;
                $bind_params[] = "";

                foreach($params as $key => $value)
                {
                        $bind_params[1] .= $this->gettype_var($value);
                        $bind_params[] = &$params[$key];
                }

                call_user_func_array('mysqli_stmt_bind_param', $bind_params);
            }

            $Result = array();


            $check = mysqli_stmt_execute($SQLstatement);

            if(!$check)
            {
                log_manager::log("Erreur exécution requete ".$SQLquery." ". mysqli_stmt_error($SQLstatement),LogLevel_Error);
            }
            else
            {

                mysqli_stmt_store_result($SQLstatement);

                while($data = $this->fetchAssocStatement($SQLstatement))
                {
                         array_push($Result, $data);
                }
            }

            mysqli_stmt_close($SQLstatement);


            return $Result;
    }

    //fermeture de la connexion à la base données
    public function close_db()
    {
            mysqli_close( $this->connection);
    }

    //récupération d'une valeur à partir d'une  requête
    public function getscalar_fromquery($SQLquery,$params = array(),$return_field = '',$usetransac = false)
    {
            $SQLstatement = mysqli_stmt_init( $this->connection);

            if (!mysqli_stmt_prepare($SQLstatement, $SQLquery))
            {
                     log_manager::log("Erreur prep requete ".$SQLquery." ". mysqli_stmt_error($SQLstatement),LogLevel_Error);
                     mysqli_stmt_close($SQLstatement);
                     return null;
            }


            if(!empty($params))
            {
                $bind_params = array();
                $bind_params[] = $SQLstatement;
                $bind_params[] = "";

                foreach($params as $key => $value)
                {
                        $bind_params[1] .= $this->gettype_var($value);
                        $bind_params[] = &$params[$key];
                }

                call_user_func_array('mysqli_stmt_bind_param', $bind_params);
            }

            $check = mysqli_stmt_execute($SQLstatement);

            $result = null;

            if($check)
            {
                    mysqli_stmt_bind_result($SQLstatement, $result);

                    mysqli_stmt_fetch($SQLstatement);
            }

             mysqli_stmt_close($SQLstatement);

            return $result;
    }

    //exécution d'une requete d'insertion ou de mise à jour

    public function execute_nonquery($SQLquery,$params = array(),$usetransac = false)
    {

            $SQLstatement = mysqli_stmt_init( $this->connection);

            if(!mysqli_stmt_prepare($SQLstatement, $SQLquery))
            {
                log_manager::log("Erreur requête ".$SQLquery." ".mysqli_stmt_error($SQLstatement));
                return -1;
            }


            if(!empty($params))
            {
                $bind_params = array();
                $bind_params[] = $SQLstatement;
                $bind_params[] = "";

                foreach($params as $key => $value)
                {
                        $bind_params[1] .= $this->gettype_var($value);
                        $bind_params[] = &$params[$key];
                }

               /*ob_start();
                print_r($bind_params);
                $debuglog = ob_get_clean();

                log_manager::log($debuglog);*/


                call_user_func_array('mysqli_stmt_bind_param', $bind_params);
            }


            $result = -1;



            if(mysqli_stmt_execute($SQLstatement))
                $result = mysqli_affected_rows($this->connection);
            else
                log_manager::log("Error  query ".$SQLquery." : ".mysqli_stmt_error($SQLstatement));

            mysqli_stmt_close($SQLstatement);

            return $result;
    }

    public function set_auto_commit($state)
    {
        mysqli_autocommit( $this->connection, $state);
    }

    //validation des transactions en cours 
    public function commit_db()
    {
        return mysqli_commit( $this->connection);
    }

    public function savepoint_db($savepoint_name)
    {
        mysqli_query( $this->connection, "SAVEPOINT $savepoint_name");
        //mysqli_savepoint($connection,$savepoint_name);
    }

    //annulation des transaction en cours
    public function rollback_db($savepoint_name = NULL)
    {
        if($savepoint_name != NULL)
            mysqli_query( $this->connection, "ROLLBACK TO $savepoint_name");
        else
            return mysqli_rollback($this->connection);
    }


    private function gettype_var($var)
    {
        //i 	correspond à une variable de type entier
        //d 	correspond à une variable de type nombre décimal
       // s 	correspond à une variable de type chaîne de caractères
        //b 	correspond à une variable de type BLOB, qui sera envoyé par paquets

            if (is_bool($var)) return "i";
            if (is_float($var)) return "d";
            if (is_int($var)) return "i";
            if (is_numeric($var)) return "i";
            if (is_string($var)) return "s";
            if (is_array($var)) return "b";

            $type = gettype($var);
            //si aucun type valable
            log_manager::log('Erreur de type, '.$type.'non supporté');
            return "";
    }
}

