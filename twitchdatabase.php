
      <?php
      session_start();

      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "twitchdb";


      //$id = $_SESSION["id"];
      // $language = $_SESSION["language"];
      // $displayname = $_SESSION["displayname"];
      // $followers = $_SESSION["followers"];
      // $mature = $_SESSION["mature"];
      // $name = $_SESSION["name"];
      // $url = $_SESSION["url"];
      // $views = $_SESSION["views"];
      // Create connection
      $conn = mysqli_connect($servername, $username, $password, $dbname);

      if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
      }

      // sql to insert an artist to database

      $id = $_POST["u_id"];
      $_SESSION['id'] = $id;
      $language = $_POST["bl"];
      $displayname = $_POST["dn"];
      $followers = $_POST["f"];
      $mature = $_POST["m"];

      $name = $_POST["n"];
      $url = $_POST["u"];
      $views = $_POST["v"];


      for($x=0;$x<count($id);$x++){
          $sql = "SELECT c_id FROM channel WHERE c_id = '$id[$x]'";
          $result = $conn->query($sql);
          if ($result->num_rows <= 0){
            $sql2 = "INSERT INTO channel (c_id, broadcaster_lang, display_name, followers, mature, name, url, channel_views) VALUES
            ('$id[$x]', '$language[$x]', '$displayname[$x]' , '$followers[$x]', '$mature[$x]', '$name[$x]', '$url[$x]', '$views[$x]')";

            if ($conn->query($sql2) === TRUE) {
              // echo "New record created successfully.<br>";
              // sql to insert an artwork to database
            } else {
                echo "Error: " . $sql2 . "<br>" . $conn->error . "<br>";
            }
          }
          else{
            $sql2 = "UPDATE channel SET broadcaster_lang = '$language[$x]', display_name = '$displayname[$x]', followers = '$followers[$x]',
             mature = '$mature[$x]', name = '$name[$x]', url = '$url[$x]', channel_views = '$views[$x]' WHERE c_id = $id[$x]";

             if ($conn->query($sql2) === TRUE) {
             } else {
                 echo "Error: " . $sql2 . "<br>" . $conn->error . "<br>";
             }
          }

      }
    //  header("location:index.html");


      //$sql = "INSERT INTO channel (c_id) VALUES ($id)";
      // $sql = "INSERT INTO game VALUES ('', '', , '')";
      // $sql = "INSERT INTO gamepeakhours VALUES ('', '', , '')";
      // $sql = "INSERT INTO stream VALUES ('', '', , '')";



      $conn->close();
      ?>
