<!DOCTYPE html>
<?php
  session_start();
  //echo $_SESSION["id"]
  $gametitle=$_GET["id"];


?>
<html lang="en">
<head>
  <title>Twitch App</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="twitchtest.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!-- <script src="top100channels.js" type="text/javascript"></script> -->
</head>

<!--style-->
<style>
div{
  font-size: 15px;
}
</style>

<body>
  <div class="page container-fluid">
    <div class="spacer"></div>
    <div class="block text-center">
        <h1>TwitchDB APP For Streamers Who Wanna Stream!</h1>
    </div>

    <div class="spacer"></div>

    <div style="width:100%" class="block">

      <p style="text-align:center"><u>TOP 25 CHANNELS CURRENTLY LIVE FOR </u> </p>
      <div class="row">
        <div class="col-md-3" id="channel_title">
          <u>Channels:</u><br>
        </div>
        <div class="col-md-1" id="number_live_ch">
          <u>Viewers:</u><br>
        </div>
        <div style="text-align:center" class="col-md-2" id="fps">
          <u>Average FPS:</u><br>
        </div>
        <div class="col-md-2" id="broadcast_lang">
          <u>Broadcast Lang:</u><br>
        </div>
        <div class="col-md-2" id="mature">
          <u>Mature:</u><br>
        </div>
        <div class="col-md-2" id="duration">
          <u>Stream Duration:</u><br>
        </div>

      </div>
    </div>
    <div class="spacer"></div>
  </div>




<script>
    var gameTitle =  '<?php echo $gametitle; ?>';
    $(document).ready(function(){
      console.log(gameTitle);
      $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams/?game='+gameTitle+'&limit=50',
        headers: {
          'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
        },
        success: function(data){
          console.log(data);

          //need for db
          // var u_id = document.getElementById("u_id");
          // var lang = document.getElementById("lang");
          // var displayname = document.getElementById("displayname");
          // var followers = document.getElementById("followers");
          // var maturity = document.getElementById("maturity");
          // var u_name = document.getElementById("u_name");
          // var url = document.getElementById("url");
          // var views = document.getElementById("views");

          //don't need for db
          for(var i= 0; i < data.streams.length; i++){
            $("#channel_title").append(i+1+") " + '<a target = "_blank" href = ' + data.streams[i].channel.url + '>' + data.streams[i].channel.display_name + "<br>");
            $("#number_live_ch").append(data.streams[i].viewers + "<br>");
            $("#broadcast_lang").append(convertLang(data.streams[i].channel.broadcaster_language) + "<br>");
            if(data.streams[i].channel.mature)
              $("#mature").append("Mature<br>");
            else
              $("#mature").append("Family-friendly<br>");
            var timeStart = data.streams[i].created_at;
            var timeEnd = data.streams[i].channel.updated_at;
            var converted = convertTimeToDuration(timeStart, timeEnd);
            $("#duration").append(converted + " hrs <br>");
            $("#fps").append(Math.floor(data.streams[i].average_fps) +"<br>");


            //need for db

          //   var temp = document.createElement('INPUT');
          //   temp.setAttribute("type", "hidden");
          //   temp.setAttribute("value",  data.streams[i]._id);
          //   temp.setAttribute("name", 'u_id[]');
          //   u_id.appendChild(temp);
          //
          //   var temp2 = document.createElement('INPUT');
          //   temp2.setAttribute("type", "hidden");
          //   temp2.setAttribute("value",  convertLang(data.streams[i].channel.broadcaster_language));
          //   temp2.setAttribute("name", 'bl[]');
          //   lang.appendChild(temp2);
          //
          //   var temp3 = document.createElement('INPUT');
          //   temp3.setAttribute("type", "hidden");
          //   temp3.setAttribute("value",  data.streams[i].channel.display_name);
          //   temp3.setAttribute("name", 'dn[]');
          //   displayname.appendChild(temp3);
          //
          //   var temp4 = document.createElement('INPUT');
          //   temp4.setAttribute("type", "hidden");
          //   temp4.setAttribute("value",  data.streams[i].channel.followers);
          //   temp4.setAttribute("name", 'f[]');
          //   followers.appendChild(temp4);
          //
          //   var temp5 = document.createElement('INPUT');
          //   temp5.setAttribute("type", "hidden");
          //   temp5.setAttribute("value",  data.streams[i].channel.mature);
          //   temp5.setAttribute("name", 'm[]');
          //   maturity.appendChild(temp5);
          //
          //   var temp6 = document.createElement('INPUT');
          //   temp6.setAttribute("type", "hidden");
          //   temp6.setAttribute("value",  data.streams[i].channel.name);
          //   temp6.setAttribute("name", 'n[]');
          //   u_name.appendChild(temp6);
          //
          //   var temp7 = document.createElement('INPUT');
          //   temp7.setAttribute("type", "hidden");
          //   temp7.setAttribute("value",  data.streams[i].channel.url.substring(8, data.streams[i].channel.url.length) );
          //   temp7.setAttribute("name", 'u[]');
          //   url.appendChild(temp7);
          //
          //   var temp8 = document.createElement('INPUT');
          //   temp8.setAttribute("type", "hidden");
          //   temp8.setAttribute("value",  data.streams[i].channel.views);
          //   temp8.setAttribute("name", 'v[]');
          //   views.appendChild(temp8);
          // };
          //
          // var auto_refresh = setInterval(function(){submitform();}, 5000);
          //
          // function submitform(){
          //   //document.forms["myForm"].submit();
          // }
        };


        }
      });


    });

    //for both
    function convertLang(lang){
      var langArray = ['da', 'de', 'en', 'en-gb', 'es', 'es-mx', 'fr', 'it', 'hu', 'nl', 'no', 'pl', 'pt', 'pt-br',
    'sk', 'fi', 'sv', 'vi', 'tr', 'cs', 'el', 'bg', 'ru', 'ar', 'th', 'zh-cn', 'zh-tw', 'ja', 'ko'];
      var displayLangArray = ['Dansk', 'Deutsch', 'English', 'English - UK', 'Español', 'Español - Latinoamérica',
    'Français', 'Italiano', 'Magyar', 'Nederlands', 'Norsk', 'Polski', 'Português', 'Português - Brasil', 'Slovenčina',
    'Suomi', 'Svenska', 'Tiếng Việt', 'Türkçe', 'Čeština', 'Ελληνικά', 'Български', 'Русский', 'العربية', 'ภาษาไทย',
    '中文 简体', '中文 繁體', '日本語', '한국어'];
      for(var i = 0; i<langArray.length; i++){
        if(langArray[i] == lang){
          return displayLangArray[i];
        }
      }
      return "other";
    }

    //don't need for db
    function convertTimeToDuration(t1, t2){
      //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
      //updated_at: "2018-02-05T02:07:28Z"
      //created_at: "2018-02-04T20:30:13Z"

        var yearStart = parseInt(t1.substring(0,4));
        var monthStart = parseInt(t1.substring(5,7));
        var dayStart = parseInt(t1.substring(8,10));
        var hourStart = parseInt(t1.substring(11,13));
        var minuteStart = parseInt(t1.substring(14,16));
        var secondStart = parseInt(t1.substring(17,19));
        var d1 = new Date(yearStart, monthStart, dayStart, hourStart, minuteStart, secondStart, 0);
        //console.log(d1);
        var yearEnd = parseInt(t2.substring(0,4));
        var monthEnd = parseInt(t2.substring(5,7));
        var dayEnd = parseInt(t2.substring(8,10));
        var hourEnd = parseInt(t2.substring(11,13));
        var minuteEnd = parseInt(t2.substring(14,16));
        var secondEnd = parseInt(t2.substring(17,19));
        var d2 = new Date(yearEnd, monthEnd, dayEnd, hourEnd, minuteEnd, secondEnd, 0);
        //console.log(d2);
        var hours = Math.abs(d1 - d2)/(36e5);
        //console.log(hours);
        return Math.round(hours*100)/100;
    }
</script>
</body>
</html>
