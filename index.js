const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const numberOfRestuls = 10;

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyDZfM69viqjEuOZcn0-OrZ-zErRD9uzGvs',
      q: `${searchTerm} in:video`,
      maxResults: numberOfRestuls
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  //ignore thumbnails of channels (they don't link to videos):
  if (result.id.videoId == undefined) {
    return 
  // now we can link only to videos:
  } else {
    return `
      <div class="individual-result">
        <div class="result-data">
          Video title: ${result.snippet.title}<br>
          More from this channel: <a href="https://www.youtube.com/channel/${result.snippet.channelId}">Link</a>
        </div>
        <div class="result-thumbnail">
          <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
            <img src="${result.snippet.thumbnails.default.url}" class=result-thumbnail" alt="Result thumbnail">
          </a>
        </div>
      </div>
    `;
  }
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
