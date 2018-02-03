//RUN OUR jquery
//Client ID for twitch username kungungo=7rmddok8k7yq2s14vb3ae5wwzuv4pf
$(function(){
  //USERS
    // $.getJSON("https://api.twitch.tv/kraken/users/freecodecamp?client_id=7rmddok8k7yq2s14vb3ae5wwzuv4pf").done(function(data){
    //   console.log(data);
    // })

    //var streams = ["loltyler1", "aXtLOL", "pokimane", "Shiphtur", "NoWay4u_Sir"];
    //var streams = [];

    //top 25 streams
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/games/top',
      headers: {
        'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
      },
      success: function(data){
        //console.log(data);
        for(var i= 0; i < data.top.length; i++){
          var name = data.top[i].game.name;

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
              for(var i=0; i<3; i++){
                //alert("Channel Name: " + data.streams[i].channel.display_name + ". Viewers: " + data.streams[i].viewers);
                $("#channel_name").append('<a target = "blank" href = "https://www.twitch.tv/' + data2.streams[i].channel.name + '">' + data2.streams[i].channel.display_name + '</a><br>');
                $("#game_playing").append(data2.streams[i].game + "<br>");
                $("#views_channel").append(data2.streams[i].viewers + "<br>");
                $("#up_time").append(data2.streams[i].channel.updated_at - data2.streams[i].channel.created_at + "<br>");
                $("#broadcast_lang").append(data2.streams[i].channel.broadcaster_language + "<br>");
                $("#num_followers").append(data2.streams[i].channel.followers + "<br>");
              };
            }
          });
        };
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
