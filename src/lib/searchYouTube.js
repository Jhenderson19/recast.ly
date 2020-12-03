

var searchYouTube = (options, callback) => {
  $.ajax({
    //jquery
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    // dataType: 'json',
    success: function(data) {
      callback(data.items);
      return data.items;
    },
    error: function() { console.error('oops'); },
    // dataFilter: function(data, dataType) {
    //   // var dataObject = JSON.parse(data);
    //   console.log(data);
    //   console.log(data.items);
    // },


    //youtube
    data: {
      key: options.key,
      part: 'snippet',
      type: 'video',
      maxResults: options.max || 5,
      videoEmbeddable: 'true',
      q: options.query,
    },

  });
};

export default searchYouTube;
