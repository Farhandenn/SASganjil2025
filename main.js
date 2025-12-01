// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// KONFIGURASI FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDf84tuPbEIrQ4b2jcU0MeXjg4OY3kE-yU",
  authDomain: "insancemerlang-7c3fb.firebaseapp.com",
  projectId: "insancemerlang-7c3fb",
  storageBucket: "insancemerlang-7c3fb.firebasestorage.app",
  messagingSenderId: "775357332019",
  appId: "1:775357332019:web:25b794ac39eceb84f00146",
  measurementId: "G-2T6Q5VM932"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const siswaCollection = collection(db, "biodata");

// TAMPILKAN DAFTAR SISWA

export async function tampilkanDaftarSiswa() {
  const snapshot = await getDocs(siswaCollection);
  const tabel = document.getElementById("tabelData");
  if (!tabel) return;

  tabel.innerHTML = "";
  let nomor = 1;

  snapshot.forEach((docItem) => {
    const data = docItem.data();
    const id = docItem.id;

    const baris = document.createElement("tr");

    // Kolom No
    const kolomNo = document.createElement("td");
    kolomNo.textContent = nomor++;

    // Kolom2 lain
    const kolomNama = document.createElement("td");
    kolomNama.textContent = data.namalengkap || "";

    const kolomJK = document.createElement("td");
    kolomJK.textContent = data.jeniskelamin || "";

    const kolomTL = document.createElement("td");
    kolomTL.textContent = data.tanggallahir || "";

    const kolomAgama = document.createElement("td");
    kolomAgama.textContent = data.agama || "";

    const kolomTlp = document.createElement("td");
    kolomTlp.textContent = data.notlp || "";

    const kolomHobi = document.createElement("td");
    kolomHobi.textContent = data.hobi || data.hoby || ""; // DATA LAMA & BARU

    const kolomCita = document.createElement("td");
    kolomCita.textContent = data.citacita || "";

    const kolomAlamat = document.createElement("td");
    kolomAlamat.textContent = data.alamat || "";

    // Kolom Aksi
    const kolomAksi = document.createElement("td");

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.className = "button edit";
    tombolEdit.onclick = () => {
      window.location.href = "edit.html?id=" + id;
    };

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.className = "button delete";
    tombolHapus.onclick = async () => {
      if (confirm("Hapus data ini?")) {
        await hapusSiswa(id);
      }
    };

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(tombolHapus);

    // Susun baris
   
    baris.appendChild(kolomNama);
    baris.appendChild(kolomJK);
    baris.appendChild(kolomTL);
    baris.appendChild(kolomAgama);
    baris.appendChild(kolomTlp);
    baris.appendChild(kolomHobi);
    baris.appendChild(kolomCita);
    baris.appendChild(kolomAlamat);
    baris.appendChild(kolomAksi);

    tabel.appendChild(baris);
  });
}
// TAMBAH DATA SISWA
export async function tambahDataSiswa() {
  const namalengkap = document.getElementById("nama").value;
  const jeniskelamin = document.getElementById("jeniskelamin").value;
  const tanggallahir = document.getElementById("tanggallahir").value;
  const agama = document.getElementById("agama").value;
  const notlp = document.getElementById("notlp").value;
  const hobi = document.getElementById("hoby").value;
  const citacita = document.getElementById("citacita").value;
  const alamat = document.getElementById("alamat").value;

  await addDoc(siswaCollection, {
    namalengkap,
    jeniskelamin,
    tanggallahir,
    agama,
    notlp,
    hobi,
    citacita,
    alamat
  });

  window.location.href = "daftar.html";
}

// HAPUS DATA
export async function hapusSiswa(id) {
  await deleteDoc(doc(db, "biodata", id));
  await tampilkanDaftarSiswa();
}