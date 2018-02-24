//Client ID for twitch username kungungo=7rmddok8k7yq2s14vb3ae5wwzuv4pf
$(function(title){
    //top 25 streams
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/?game='+title+'Overwatch&limit=100',
      headers: {
        'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
      },
      success: function(data){
        console.log(data);

        for(var i= 0; i < data.streams.length; i++){
          //var name = data.top[i].game.name;
          $("#channel_title").append(data.streams[i].channel.name + "<br>");
          $("#number_live_ch").append(data.streams[i].viewers + "<br>");
          $("#broadcast_lang").append(data.streams[i].channel.broadcaster_language + "<br>");
          $("#mature").append(data.streams[i].channel.mature + "<br>");
        };
      }
    });
})
