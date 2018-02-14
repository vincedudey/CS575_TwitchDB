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

        for(var i= 0; i < data.top.length; i++){ //iterate through each game
          var name = data.top[i].game.name;
          // var stream_hours = 0; //total stream hours for this game
          // var total_views = 0; //total views for this game
          // var avg_fps = 0; //average fps for this game
          console.log(name);


          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/?game='+name+'&limit=100',
            headers: {
              'Client-ID': '7rmddok8k7yq2s14vb3ae5wwzuv4pf'
            },
            success: function(data2){

              console.log(data2);
               //  var num_channels = data2._total; //number of channels for this game
               //
               //  $("#game_title").append('<a target = "blank" href = "https://www.twitch.tv/directory/game/' + data2.streams[0].game + '">' + data2.streams[0].game + '</a><br>');
               //
               //  for(var i = 0; i<num_channels; i++){ //iterate through each channel
               //      total_views += data2.streams[i].viewers;
               //      avg_fps += data2.streams[i].average_fps;
               //      var timeStart = data2.streams[i].created_at;
               //      var timeEnd = data2.streams[i].channel.updated_at;
               //      var converted = convertTimeToDuration(timeStart, timeEnd);
               //      stream_hours += Math.ceil(converted);
               //  }
               //  if(num_channels > 0){
               //    avg_fps = avg_fps / num_channels;
               //  }
               // $("#number_live_ch").append(total_views + "<br>");
               // $("#avg_fps").append(Math.ceil(avg_fps) + "<br>");
               // $("#stream_hrs").append(stream_hours + " hrs <br>");
            }
          });
        };
      }
    });
})

function convertTimeToDuration(t1, t2){
    var yearStart = parseInt(t1.substring(0,4));
    var monthStart = parseInt(t1.substring(5,7));
    var dayStart = parseInt(t1.substring(8,10));
    var hourStart = parseInt(t1.substring(11,13));
    var minuteStart = parseInt(t1.substring(14,16));
    var secondStart = parseInt(t1.substring(17,19));
    var d1 = new Date(yearStart, monthStart, dayStart, hourStart, minuteStart, secondStart, 0);

    var yearEnd = parseInt(t2.substring(0,4));
    var monthEnd = parseInt(t2.substring(5,7));
    var dayEnd = parseInt(t2.substring(8,10));
    var hourEnd = parseInt(t2.substring(11,13));
    var minuteEnd = parseInt(t2.substring(14,16));
    var secondEnd = parseInt(t2.substring(17,19));
    var d2 = new Date(yearEnd, monthEnd, dayEnd, hourEnd, minuteEnd, secondEnd, 0);

    var hours = Math.abs(d1 - d2)/(36e5);

    return Math.round(hours*100)/100;
}
