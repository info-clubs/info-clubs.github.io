// setup api access
const base_url = "https://api.football-data.org/";
const api_options = {
  headers: {
    "X-Auth-Token": "d0527dbc8809457c9d74f8cb1039665e",
  },
};
const api_endpoint_v2teams = `${base_url}v2/teams/`;

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getClubs() {
  if ("caches" in window) {
    caches.match(api_endpoint_v2teams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var clubsHTML = "";
          data.teams.forEach(function (club) {
            clubsHTML += /*html*/ `
                <div class="col s12 m4">
                  <div class="card">
                    <a href="./clubs.html?id=${club.id}" onclick="showNotifikasiClubLoad('${club.shortName}')">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${club.crestUrl}" alt="${club.shortName}">
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title title-name">${club.shortName}</span>
                      <p>${club.area.name}</p>
                      <p>${club.venue}</p>
                    </div>
                  </div>
                </div>
                  `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("clubs").innerHTML = clubsHTML;
        });
      }
    });
  }

  fetch(api_endpoint_v2teams, api_options)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var clubsHTML = "";
      data.teams.forEach(function (club) {
        clubsHTML += /*html*/ `
          <div class="col s12 m4">
            <div class="card">
              <a href="./clubs.html?id=${club.id}" onclick="showNotifikasiClubLoad('${club.shortName}')">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${club.crestUrl}" alt="${club.shortName}">
                </div>
              </a>
              <div class="card-content">
                <span class="card-title title-name">${club.shortName}</span>
                <p>${club.area.name}</p>
                <p>${club.venue}</p>
              </div>
            </div>
          </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("clubs").innerHTML = clubsHTML;
    })
    .catch(error);
}

function getClubById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(api_endpoint_v2teams + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var clubHTML = /*html*/ `
              <div class="row">
                <div class="col s12 content-center">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${data.crestUrl}" alt="${data.shortName}">
                        </div>
                        <div class="card-content content-center">
                            <h6 class="header">${data.area.name}</h6>
                            <h4 class="header">${data.name}</h4>
                            <h5 class="header">${data.venue}</h5>
                            <h6 class="header">${data.clubColors}</h6>
                            <p>Address: ${data.address}</p>
                            <p>Phone: ${data.phone}</p>
                            <p>Email:
                                <a href="mailto:${data.email}">${data.email}</a>
                            </p>
                            <p>website:
                                <a href="${data.website}" target="_blank">
                                  ${data.website}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <h5 class="squad-name">Squad</h5>
                            <div class="row">

                              ${data.squad
                                .map(
                                  (i) => /*html*/ `
                              <div class="col s12">
                                  <div class="card">
                                      <div class="card-content">
                                          <span class="squad-name">${i.name}</span>
                                          <p>Position: ${i.position}</p>
                                          <p>Nationality: ${i.nationality}</p>
                                      </div>
                                  </div>
                              </div>
                              `
                                )
                                .join("")}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = clubHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(api_endpoint_v2teams + idParam, api_options)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // Menyusun komponen card artikel secara dinamis
        var clubHTML = /*html*/ `
              <div class="row">
                <div class="col s12 content-center">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${data.crestUrl}" alt="${data.shortName}">
                        </div>
                        <div class="card-content content-center">
                            <h6 class="header">${data.area.name}</h6>
                            <h4 class="header">${
                              data.name
                            }</h4>                            
                            <h5 class="header">${data.venue}</h5>
                            <h6 class="header">${data.clubColors}</h6>
                            <p>Address: ${data.address}</p>
                            <p>Phone: ${data.phone}</p>
                            <p>Email:
                                <a href="mailto:${data.email}">${data.email}</a>
                            </p>
                            <p>website:
                                <a href="${data.website}" target="_blank">
                                  ${data.website}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <h5 class="squad-name">Squad</h5>
                            <div class="row">

                              ${data.squad
                                .map(
                                  (i) => /*html*/ `
                              <div class="col s12">
                                  <div class="card">
                                      <div class="card-content">
                                          <span class="squad-name">${i.name}</span>
                                          <p>Position: ${i.position}</p>
                                          <p>Nationality: ${i.nationality}</p>
                                      </div>
                                  </div>
                              </div>
                              `
                                )
                                .join("")}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = clubHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedClubs() {
  getAll().then(function (teams) {
    // Menyusun komponen card artikel secara dinamis
    var clubsHTML = "";
    teams.forEach(function (club) {
      clubsHTML += /*html*/ `
                <div class="col s12 m4">
                  <div class="card">
                    <a href="./clubs.html?id=${club.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${club.crestUrl}" alt="${club.shortName}">
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title title-name">${club.shortName}</span>
                      <p>${club.area.name}</p>
                      <p>${club.venue}</p>
                    </div>
                  </div>
                </div>
                  `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = clubsHTML;
  });
}

function getSavedClubById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(parseInt(idParam)).then(function (club) {
    clubHTML = "";
    var clubHTML = /*html*/ `
              <div class="row">
                <div class="col s12 content-center">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${club.crestUrl}" alt="${club.shortName}">
                        </div>
                        <div class="card-content content-center">
                            <h6 class="header">${club.area.name}</h6>
                            <h4 class="header">${
                              club.name
                            }</h4>                            
                            <h5 class="header">${club.venue}</h5>
                            <h6 class="header">${club.clubColors}</h6>
                            <p>Address: ${club.address}</p>
                            <p>Phone: ${club.phone}</p>
                            <p>Email:
                                <a href="mailto:${club.email}">${club.email}</a>
                            </p>
                            <p>website:
                                <a href="${club.website}" target="_blank">
                                  ${club.website}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <h5 class="squad-name">Squad</h5>
                            <div class="row">

                              ${club.squad
                                .map(
                                  (i) => /*html*/ `
                              <div class="col s12">
                                  <div class="card">
                                      <div class="card-content">
                                          <span class="squad-name">${i.name}</span>
                                          <p>Position: ${i.position}</p>
                                          <p>Nationality: ${i.nationality}</p>
                                      </div>
                                  </div>
                              </div>
                              `
                                )
                                .join("")}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}
