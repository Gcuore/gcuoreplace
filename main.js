
const client = new WebTorrent();

document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  client.seed(file, torrent => {
    const url = location.origin + '/#' + torrent.infoHash;
    const link = document.createElement('a');
    link.href = url;
    link.textContent = "Link per il download: " + url;
    document.getElementById('linkContainer').appendChild(link);
  });
});

if (location.hash) {
  const hash = location.hash.substring(1);
  client.add('magnet:?xt=urn:btih:' + hash, torrent => {
    torrent.files[0].getBlobURL((err, url) => {
      if (err) return console.error(err);
      const a = document.createElement('a');
      a.href = url;
      a.download = torrent.files[0].name;
      a.textContent = "Scarica " + torrent.files[0].name;
      document.body.appendChild(a);
    });
  });
}
