
function bukaHalaman(id) {
    const halaman = document.querySelectorAll(".halaman");

    halaman.forEach(function (item) {
        item.classList.remove("aktif");
    });

    const tujuan = document.getElementById(id);

    if (tujuan) {
        tujuan.classList.add("aktif");
    }

    if (id === "hasil") {
        tampilkanJawaban();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// MENGAMBIL JAWABAN DARI FORM
function ambilData() {
    return {
        nama: document.getElementById("nama").value.trim(),
        kelas: document.getElementById("kelas").value.trim(),
        jawaban1: document.getElementById("jawaban1").value.trim(),
        jawaban2: document.getElementById("jawaban2").value.trim(),
        jawaban3: document.getElementById("jawaban3").value.trim(),
        waktu: new Date().toLocaleString("id-ID")
    };
}

// MEMERIKSA JAWABAN
function periksaJawaban() {
    const data = ambilData();

    const kunci = ["60000", "15000", "20000"];

    const jawabanSiswa = [
        data.jawaban1,
        data.jawaban2,
        data.jawaban3
    ];

    let benar = 0;

    jawabanSiswa.forEach(function (jawaban, index) {
        const angka = jawaban.replace(/[^\d-]/g, "");

        if (angka === kunci[index]) {
            benar++;
        }
    });

    const pesan = document.getElementById("pesan");

    pesan.style.color = "#39834d";

    pesan.textContent =
        "Hasil kamu: " + benar +
        " dari 3 soal benar. " +
        "Kunci jawaban: 1) 60000, 2) 15000, 3) 20000.";
}

// MENYIMPAN JAWABAN
function simpanJawaban() {
    const data = ambilData();

    try {
        localStorage.setItem(
            "jawabanAritmatikaSosial",
            JSON.stringify(data)
        );

        document.getElementById("pesan").textContent =
            "💚 Jawaban berhasil disimpan!";

        document.getElementById("pesan").style.color =
            "#39834d";

    } catch (error) {
        alert(
            "Penyimpanan tidak tersedia. " +
            "Coba buka aplikasi melalui browser."
        );
    }
}

// MENAMPILKAN JAWABAN TERSIMPAN
function tampilkanJawaban() {
    const tempat = document.getElementById("daftarJawaban");

    let data;

    try {
        data = JSON.parse(
            localStorage.getItem("jawabanAritmatikaSosial")
        );
    } catch (error) {
        data = null;
    }

    tempat.replaceChildren();

    if (!data) {
        tempat.textContent =
            "Belum ada jawaban yang disimpan.";
        return;
    }

    const judul = document.createElement("h3");
    judul.textContent = "💛 Data Jawaban Siswa";

    tempat.appendChild(judul);

    const daftar = [
        ["Nama", data.nama || "-"],
        ["Kelas", data.kelas || "-"],
        ["Jawaban 1", data.jawaban1 || "-"],
        ["Jawaban 2", data.jawaban2 || "-"],
        ["Jawaban 3", data.jawaban3 || "-"],
        ["Waktu", data.waktu || "-"]
    ];

    daftar.forEach(function (baris) {
        const p = document.createElement("p");
        p.style.marginTop = "10px";

        const label = document.createElement("b");
        label.textContent = baris[0] + ": ";

        const isi = document.createElement("span");
        isi.textContent = baris[1];

        p.appendChild(label);
        p.appendChild(isi);

        tempat.appendChild(p);
    });
}
