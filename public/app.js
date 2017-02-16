
var albums = null;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var checkJson = function(){
  if (this.status !== 200) return;
    var json = JSON.parse(this.responseText);
    albums = json.albums.items;
    writeAllAlbums();
  }

  writeAllAlbums = function(){
    writeAlbums(albums);
  }

  var writeAlbums = function(list){
    var albumDiv = document.querySelector('#albums');
    albumDiv.innerText = "";
    for (album of list){
      var albumName = document.createElement('p');
      albumName.innerText = album.name;
      albumDiv.appendChild(albumName);
    }
  }

  var searchAlbums = function(){
    var searchString = document.querySelector('#search-query').value;
    console.log(searchString);
    var searched = [];
    for(album of albums){
      // console.log(album.name, searchString);
      if(album.name.toLowerCase().includes(searchString.toLowerCase())){
        searched.push(album);
      }
    }
    console.log(searched);
    writeAlbums(searched);
  }

  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=metal&type=album";
    makeRequest(url, checkJson);

    var searchButton = document.querySelector('#go-search');
    searchButton.onclick = searchAlbums;
  }

  window.onload = app;