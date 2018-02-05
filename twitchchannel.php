<!DOCTYPE html>
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
      <p style="text-align:center"><u>TOP 25 CHANNELS CURRENTLY LIVE FOR <?php echo $_GET["id"] ?></u> </p>
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
</body>

<script type="text/javascript">
    var gameTitle = '<?php echo $_GET["id"]?>'
    //alert(gameTitle);
    //var gameTitle = 'Overwatch';
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

          for(var i= 0; i < data.streams.length; i++){
            $("#channel_title").append(i+1+") " + '<a target = "_blank" href = ' + data.streams[i].channel.url + '>' + data.streams[i].channel.display_name + "<br>");
            //$("#number_live_ch").append('<a target = "blank" href = "https://www.twitch.tv/directory/game/' + name + '">' + data.top[i].channels + '</a><br>');

            $("#number_live_ch").append(data.streams[i].viewers + "<br>");
            //$("#broadcast_lang").append(data.streams[i].channel.broadcaster_language + "<br>");
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
            //$("#preview").append('<img src=' + data.streams[i].preview.small + 'alt = "unavailable">' +"<br>");
            //console.log(data.streams[i].preview.small);
          };
        }
      });
    });

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
</html>
