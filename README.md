# Capital City Citizen Network / Avatar Suspect Expander



Capital City Citizen Network adalah sebuah aplikasi web yang mengambil data penduduk dan teman-temannya dari [Capital City Citizen Database](https://avatar.labpro.dev/friends) aka API dari https://avatar.labpro.dev/friends dan menampilkannya dalam sebuah network graph.

Program ini dibuat sebagai bagian dari tugas seleksi asisten LabPro.

## Author

Gregorius Jovan Kresnadi | 13518135

## Instalasi

Program ini dibuat dengan framework ReactJS dengan framework tampilan Material-UI 

Cara instalasi:
```
$ npm install
```

## Menjalankan Program

Cara menjalankan program di localhost:
```
$ npm start
```

## Penggunaan

Program akan menampilkan sebuah display utama, search bar, dan display teks. Ketikan ID penduduk ke search bar dan tekan tombol 'Search'. Jika ID penduduk sesuai dan dapat di-fetch dari API, maka akan tampil sebuah graf yang memberikan informasi koneksi pertemanan penduduk tersebut beserta elemen yang dikendalikannya, diklasifikasikan dalam warna. Selain itu pada display teks akan ditampilkan ID, nama penduduk, dan elemennya, beserta informasi serupa mengenai teman-temannya.

Pada graf, setiap simpul penduduk dapat diklik untuk mengembangkan network dan menampilkan teman-temannya, namun display teks akan menggantikan isi dari informasi dengan penduduk yang dipilih. Setiap informasi penduduk pada display teks pun dapat diklik untuk mengembangkan network.

## Deployment

Program ini telah dideploy ke GitHub Pages di mana bisa diakses pada [link berikut]().

## Library

Daftar library/kakas yang dipakai dalam pengembangan program:
* [create-react-app](https://create-react-app.dev/) - Web Framework
* [material-ui](https://material-ui.com/) - UI Framework
* [d3](https://github.com/d3/d3/blob/master/API.md) - Data Driven Documents
* [react-d3-graph](https://www.npmjs.com/package/react-d3-graph) - Graph Visualizer
* [axios](https://github.com/axios/axios) - Promise Based HTTP client
* [lodash](https://lodash.com/) - JavaScript Utility Library

## API

API yang disediakan mempunyai beberapa kecacatan pada endpointnya. Sebagai contoh:
* ID 30 memiliki 2 teman sama dengan ID 43, dan 2 teman dengan ID 3
* ID 12 berteman dengan dirinya sendiri

Kecacatan ini ditangani oleh program dengan menggunakan bantuan library lodash yang menghilangkan ID duplikat dan menghapus hasil query yang dari 'friends' dengan id yang sama dengan 'id' yang dikembangkan.
