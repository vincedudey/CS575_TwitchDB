//RUN OUR jquery
//Client ID for twitch username kungungo=7rmddok8k7yq2s14vb3ae5wwzuv4pf
$(function(){
    //top 25 streams
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/games/top?limit=100',
      headers: {
        'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
      },
      success: function(data){
        console.log(data);

        for(var i= 0; i < data.top.length; i++){
          var name = data.top[i].game.name;

          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/?game='+name,
            headers: {
              'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
            },
            success: function(data2){
              console.log(data2);
                var num_channels = data2._total;
                var total_views = 0;
                var avg_fps = 0;
                $("#game_title").append('<a target = "blank" href = "https://www.twitch.tv/directory/game/' + data2.streams[0].game + '">' + data2.streams[0].game + '</a><br>');
                if(num_channels > 25)
                {
                  num_channels = 25;
                }
                for(var i = 0; i<num_channels; i++){
                    total_views += data2.streams[i].viewers;
                    avg_fps += data2.streams[i].average_fps;
                }
                if(num_channels > 0){
                  avg_fps = avg_fps / num_channels;
                }
               $("#number_live_ch").append(total_views + "<br>");
               $("#avg_fps").append(Math.ceil(avg_fps) + "<br>");
            }
          });
        };
      }
    });
})
