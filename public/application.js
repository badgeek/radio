$(function(){
  // This 'poll()' function polls for 'metadata' events from the radio stream
  function poll(force) {
    var headers = {};
    if (force){ 
      headers['X-Current-Track'] = 1;
    }
    $.ajax({
      url: '/metadata',
      success: function(data) {
        if (data) {
          $('#track').html(data);
        }
        poll();
      },
      error: function(){
        $('h1').html('Stream currently offline');
      },
      headers: headers
    });
  }
  poll(true);

  // We'll use 'canPlayType' to determine which file format to request
  var audio = $("audio")[0];
  if (audio.canPlayType('application/ogg; codecs="vorbis"') == "probably"
      && (/Chrome/i.test(navigator.userAgent) || !/Safari/i.test(navigator.userAgent))) {
    audio.src = "/stream.ogg";
  }
  console.log("loading " + audio.src);
  audio.setAttribute("controls", true);
  audio.load();
  audio.play();
});