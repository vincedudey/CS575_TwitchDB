//RUN OUR jquery
//Client ID for twitch username kungungo=7rmddok8k7yq2s14vb3ae5wwzuv4pf
$(document).ready(function(){
  //USERS
    // $.getJSON("https://api.twitch.tv/kraken/users/freecodecamp?client_id=7rmddok8k7yq2s14vb3ae5wwzuv4pf").done(function(data){
    //   console.log(data);
    // })

    //top 25 streams
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/games/top?limit=50',
      headers: {
        'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
      },
      success: function(data){
        //console.log(data);
        for(var i= 0; i < data.top.length; i++){
          var name = data.top[i].game.name;
          var listChannels = [];
          var subtract = 0;

          // $("#game_title").append('<a target = "blank" href = "https://www.twitch.tv/directory/game/' + name + '">' + name + '</a><br>');
          // $("#number_live_ch").append(data.top[i].channels + "<br>");
          // $("#views_game").append(data.top[i].viewers + "<br>");
          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/?game='+name,
            headers: {
              'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
            },
            success: function(data2){
              console.log(data2);
              //for(var i=0; i<data2.length; i++)

                if(data2.streams[0] != null){
                  // $("#channel_name").append('<a target = "blank" href = "https://www.twitch.tv/' + data2.streams[0].channel.name + '">' + data2.streams[0].channel.display_name + '</a><br>');
                  // $("#game_playing").append(data2.streams[0].game + "<br>");
                  // $("#views_channel").append(data2.streams[0].viewers + "<br>");
                  // $("#broadcast_lang").append(data2.streams[0].channel.broadcaster_language + "<br>");
                  // $("#num_followers").append(data2.streams[0].channel.followers + "<br>");

                  var channelObject = {channel_name:data2.streams[0].channel.display_name, game_playing:data2.streams[0].game,
                  views_channel:data2.streams[0].viewers, broadcast_lang:data2.streams[0].channel.broadcaster_language,
                  num_followers:data2.streams[0].channel.followers};
                  listChannels.push(channelObject);
                  //var iterated = false;

                  // if(maxIter < iter){
                  //   maxIter = iter;
                  //   iterated = true;
                  // }
                  // console.log(iter);
                  // $("#channel_name").append(sortedList[0].channel_name + "<br>");
                  // $("#game_playing").append(sortedList.game_playing + "<br>");
                  // $("#views_channel").append(sortedList.views_channel + "<br>");
                  // $("#broadcast_lang").append(sortedList.broadcast_lang + "<br>");
                  // $("#num_followers").append(sortedList.num_followers + "<br>");
                }
                else{
                  subtract++;

                }
                //};
                if(listChannels.length == 50 - subtract){
                  var sortedList = listChannels.sort(function(a,b){
                    return parseInt(b.views_channel) - parseInt(a.views_channel);
                  });
                  //console.log(sortedList.length);
                  for(var i=0; i<sortedList.length; i++){
                      $("#channel_name").append(i+1 +')  ' + sortedList[i].channel_name + "<br>");
                      $("#game_playing").append(sortedList[i].game_playing + "<br>");
                      $("#views_channel").append(sortedList[i].views_channel + "<br>");
                      $("#broadcast_lang").append(convertLang(sortedList[i].broadcast_lang) + "<br>");
                      $("#num_followers").append(sortedList[i].num_followers + "<br>");
//                      $("#up_time").append()
                  }
                }
             }

          });

        };

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
      }
    });


    // $.getJSON("https://api.twitch.tv/kraken/streams/joshog?client_id=7rmddok8k7yq2s14vb3ae5wwzuv4pf").done(function(data){
    //   //console.log(data);
    //   if(data.stream===null)//not streaming
    //   {
    //     $("#fcc").html(" is offline!");
    //   }
    //   else {
    //     $("#fcc").html(" is online!");
    //   }
    // });

    //ajax is the request we make
    //json is the information we get back
    // for(var i = 0; i < streams.length; i++){
    //   $.ajax({
    //     type: "GET",
    //     //url: "https://api.twitch.tv/kraken/streams/" + streams[i],
    //     url: "https://api.twitch.tv/kraken/channels/" + streams[i],
    //     headers:{
    //       "client-ID":"7rmddok8k7yq2s14vb3ae5wwzuv4pf"
    //     },
    //     success: function(dataI){
    //       console.log(dataI);
    //       //nesting API call, once a channel exists
    //       $.getJSON("https://api.twitch.tv/kraken/streams/"+ dataI.name + "?client_id=7rmddok8k7yq2s14vb3ae5wwzuv4pf").done(function(data2){
    //         //console.log(data2);
    //         var name = data2._links.self.slice(37); //twitch url links start at 37th char for username
    //         //console.log(name);
    //
    //         if(data2.stream===null)//not streaming
    //         {
    //           $("#user").append('<a target = "blank" href = "https://www.twitch.tv/' + name + '">' + name + '</a><br>');
    //           $("#status").append("Offline<br>");
    //           $("#game").append("N/A<br>");
    //         }
    //         else {
    //           $("#user").append('<a target = "blank" href = "https://www.twitch.tv/' + name + '">' + name + '</a><br>');
    //           $("#status").append("ONLINE!<br>");
    //           $("#game").append(data2.stream.game + "<br>");
    //         }
    //       });
    //     },
    //     error: function(err){
    //       //alert("Error: User Not Found.");
    //       $("#user").append("Invalid User<br>");
    //       $("#status").append("Not Found<br>");
    //       $("#game").append("N/A<br>");
    //     }
    //
    //   });
    // };
})
