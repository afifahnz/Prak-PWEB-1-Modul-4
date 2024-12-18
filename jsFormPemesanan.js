    function hitungTotalBayar() {
    var tipeKamar = document.querySelector('select[name="tipe_kamar"]').value;
    var durasiMenginap = parseInt(document.querySelector('input[name="durasi_menginap"]').value);
    var termasukBreakfast = document.querySelector('input[name="termasuk_breakfast"]').checked;
    var harga = 0;

    // Tentukan harga berdasarkan tipe kamar
    if (tipeKamar === "STANDAR") {
        harga = 500000;
    } else if (tipeKamar === "DELUXE") {
        harga = 750000;
    } else if (tipeKamar === "FAMILY") {
        harga = 1000000;
    }

    // Diskon 10% jika durasi menginap lebih dari 3 hari
    var diskon = 0;
    if (durasiMenginap > 3) {
        diskon = harga * 0.1;
    }

    // Biaya breakfast tambahan jika dipilih
    var biayaBreakfast = 0;
    if (termasukBreakfast) {
        biayaBreakfast = 80000;
    }

    // Menghitung total bayar
    var totalBayar = harga - diskon + biayaBreakfast;

    // Menampilkan harga kamar dan total bayar pada form
    document.querySelector('input[name="harga"]').value = harga.toLocaleString();
    document.querySelector('input[name="total_bayar"]').value = totalBayar.toLocaleString();
}

// Fungsi untuk menampilkan resume pemesanan
function tampilkanResume(event) {
    event.preventDefault(); // Menghindari pengiriman form

    // Validasi Nomor Identitas (harus 16 digit)
    var nomorIdentitas = document.querySelector('input[name="nomor_identitas"]').value;
    if (nomorIdentitas.length !== 16 || isNaN(nomorIdentitas)) {
        document.querySelector('.error').textContent = "Isian salah, harus 16 digit";
        return;
    } else {
        document.querySelector('.error').textContent = "";
    }

    // Ambil data dari form
    var namaPemesan = document.querySelector('input[name="nama_pemesan"]').value;
    var jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked').value;
    var tipeKamar = document.querySelector('select[name="tipe_kamar"]').value;
    var durasiMenginap = document.querySelector('input[name="durasi_menginap"]').value;
    var harga = document.querySelector('input[name="harga"]').value;
    var diskon = harga ? (parseInt(harga.replace(/[^\d]/g, '')) * 0.1).toLocaleString() : 0;
    var totalBayar = document.querySelector('input[name="total_bayar"]').value;

    // Tampilkan resume
    var resumeHTML = `
        <h2>Resume Pemesanan</h2>
        <p><strong>Nama Pemesan     :</strong> ${namaPemesan}</p>
        <p><strong>Nomor Identitas  :</strong> ${nomorIdentitas}</p>
        <p><strong>Jenis Kelamin    :</strong> ${jenisKelamin}</p>
        <p><strong>Tipe Kamar       :</strong> ${tipeKamar}</p>
        <p><strong>Durasi Menginap  :</strong> ${durasiMenginap} Hari</p>
        <p><strong>Diskon           :</strong> Rp ${diskon}</p>
        <p><strong>Total Bayar      :</strong> Rp ${totalBayar}</p>
    `;

    // Tampilkan data resume
    document.querySelector('.resume').innerHTML = resumeHTML;
}

// Event listener untuk melakukan perhitungan setiap kali ada perubahan
document.addEventListener('DOMContentLoaded', function() {
    // Memanggil fungsi hitungTotalBayar saat data diubah
    document.querySelector('select[name="tipe_kamar"]').addEventListener('change', hitungTotalBayar);
    document.querySelector('input[name="durasi_menginap"]').addEventListener('input', hitungTotalBayar);
    document.querySelector('input[name="termasuk_breakfast"]').addEventListener('change', hitungTotalBayar);
    // Event listener untuk tombol Simpan
    document.querySelector('form').addEventListener('submit', tampilkanResume);
});