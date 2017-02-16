var music = null;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function() {
  if (this.status !== 200) return;
    var jsonString = this.responseText;
    music = JSON.parse(jsonString);
    var musicArray = music.albums.items;
    populateList(musicArray);
  }

  var populateList = function(musicArray){
    var albums = document.querySelector("#albums");
    musicArray.forEach(function(album){

      var albumBox = document.createElement("div")
      albumBox.id = "album_box"
      albums.appendChild(albumBox);

      var title = document.createElement("p");
      title.innerText = album.name + "\n";
      albumBox.appendChild(title);

      var image = document.createElement("img");
      image.src = album.images[0].url + "\n";
      image.width = 200;
      title.appendChild(image);

      var link = document.createElement("a");
      link.innerText = "Listen";
      link.href = album.external_urls.spotify;
      title.appendChild(link);

    })
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
  var searched = [];
  for(album of albums){
    if(album.name.toLowerCase().includes(searchString.toLowerCase())){
      searched.push(album);
    }
  }
  writeAlbums(searched);
}

var app = function(){
  var url = "https://api.spotify.com/v1/search?q=metal&type=album";
  makeRequest(url, requestComplete);

  var searchButton = document.querySelector('#go-search');
    searchButton.onclick = searchAlbums;
}

  window.onload = app;

// var albums = null;

// var makeRequest = function(url, callback){
//   var request = new XMLHttpRequest();
//   request.open('GET', url);
//   request.onload = callback;
//   request.send();
// }

// var checkJson = function(){
//   if (this.status !== 200) return;
//   var json = JSON.parse(this.responseText);
//   albums = json.albums.items;
//   writeAllAlbums();
// }

// writeAllAlbums = function(){
//   writeAlbums(albums);
// }

// var writeAlbums = function(list){
//   var albumDiv = document.querySelector('#albums');
//   albumDiv.innerText = "";
//   for (album of list){
//     var albumName = document.createElement('p');
//     albumName.innerText = album.name;
//     albumDiv.appendChild(albumName);
//   }
// }

// var searchAlbums = function(){
//   var searchString = document.querySelector('#search-query').value;
//   var searched = [];
//   for(album of albums){
//     if(album.name.toLowerCase().includes(searchString.toLowerCase())){
//       searched.push(album);
//     }
//   }
//   writeAlbums(searched);
// }

// var app = function(){
//   var url = "https://api.spotify.com/v1/search?q=metal&type=album";
//   makeRequest(url, checkJson);

//   var searchButton = document.querySelector('#go-search');
//   searchButton.onclick = searchAlbums;
// }

// window.onload = app;