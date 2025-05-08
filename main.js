
const client = new WebTorrent();

document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  client.seed(file, torrent => {
    const url = location.origin + '/#' + torrent.infoHash;

    const linkContainer = document.getElementById('linkContainer');
    linkContainer.innerHTML = ''; // Clear previous content

    const link = document.createElement('a');
    link.href = url;
    link.textContent = "Link per il download: " + url;
    link.style.display = "block";
    link.style.marginTop = "1em";

    linkContainer.appendChild(link);
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
      a.style.display = "block";
      a.style.marginTop = "1em";

      const linkContainer = document.getElementById('linkContainer');
      linkContainer.innerHTML = '';
      linkContainer.appendChild(a);
    });
  });
}
