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

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDf84tuPbEIrQ4b2jcU0MeXjg4OY3kE-yU",
  authDomain: "insancemerlang-7c3fb.firebaseapp.com",
  projectId: "insancemerlang-7c3fb",
  storageBucket: "insancemerlang-7c3fb.firebasestorage.app",
  messagingSenderId: "775357332019",
  appId: "1:775357332019:web:25b794ac39eceb84f00146",
  measurementId: "G-2T6Q5VM932"
}

 const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const siswaCollection = collection(db, "biodata")

 // fungsi untuk menampilkan daftar siswa
export async function tampilkanDaftarSiswa() {
  // ambil snapshot data dari koleksi siswa
  const snapshot = await getDocs(siswaCollection)
  
  // ambil element tabel data
  const tabel = document.getElementById("tabelData")
  
  //kosongkan isi tablel 
  tabel.innerHTML = ""
  
  //loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data 
    const data = doc.data()
    const id = doc.id
    
    // buat element baris baru
    const baris = document.createElement("tr")
    
    //buat element kolom untuk nis
    const kolomNo = document.createElement("td")
    kolomNo.textContent = data.no
    
    //buat element kolom untuk nama
    const kolomNamalengkap = document.createElement("td")
    kolomNamalengkap.textContent = data.namalengkap
    
    // buat kolom kelas
    const kolomJenisKelamin = document.createElement("td")
    kolomJenisKelamin.textContent = data.jeniskelamin
    
    const kolomTanggalLahir = document.createElement("td")
    kolomTanggalLahir. textContent = data.tanggallahir
    
    const kolomagama = document.createElement("td")
    kolomagama.textContent = data.agama
    
    const kolomnotlp = document.createElement("td")
    kolomnotlp.textContent = data.notlp
    
    const kolomhoby = document.createElement("td")
    kolomhoby.textContent = data.hobi
    
    const kolomCitacita = document.createElement("td")
    kolomCitacita.textContent = data.citacita
    
    const kolomalamat = document.createElement("td")
    kolomalamat.textContent = data.alamat
    // buat element kolom untuk Aksi
    const kolomAksi = document.createElement("td")
    
    // buat tombol edit
    const tombolEdit = document.createElement("button")
    tombolEdit.textContent = "Edit"
    tombolEdit.href = "edit.html?id" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusSiswa(id)
    }
      
 
      
      // tambahan elemen ke dalam kolom Aksi
      kolomAksi.appendChild(tombolEdit)
      kolomAksi.appendChild(tombolHapus)
      
      //tambahan kolom ke dalam baris
      baris.appendChild(kolomNo)
baris.appendChild(kolomNamalengkap)
baris.appendChild(kolomJenisKelamin)
baris.appendChild(kolomTanggalLahir)
baris.appendChild(kolomagama)
baris.appendChild(kolomnotlp)
baris.appendChild(kolomhoby)
baris.appendChild(kolomCitacita)
baris.appendChild(kolomalamat)
baris.appendChild(kolomAksi)
      
      
      //tambahan baris ke dalam tabel
      tabel.appendChild(baris)
      
      
  })
}

// fungsi untuk menambahkan data siswa
export async function tambahDataSiswa() {
  //ambil nilai dari from
  const namalengkap = document.getElementById("nama").value
  const jeniskelamin = document.getElementById("jeniskelamin").value 
  const tanggallahir = document.getElementById("tanggallahir").value
  const agama = document.getElementById("agama").value
  const notlp = document.getElementById("notlp").value
  const hoby = document.getElementById("hoby").value
  const citacita = document.getElementById("citacita").value
  const alamat = document.getElementById("alamat").value
  const aksi = document.getElementById("aksi")
  // tambahkan data ke firestore
  await addDoc(siswaCollection, {
    namalengkap:namalengkap, 
    jeniskelamin:jeniskelamin, 
    tanggallahir:tanggallahir, 
    agama:agama, 
    notlp:notlp, 
    hoby:hoby, 
    citacita:citacita, 
    alamat:alamat, 
    aksi:aksi
})

//alihkan ke halaman daftar siswa
window.location.href = 'daftar.html'
}

//fungsi untuk menghapus data siswa
export async function hapusSiswa(id){
  // menghapus dokumen siswa berdasarkan id
  await deleteDoc(doc(db, "biodata",id)) 
  
  //refresh daftar siswa
  await tampilkanDaftarSiswa()
  
}
