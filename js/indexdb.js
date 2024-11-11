// Membuka atau membuat database IndexedDB
let db;
const request = indexedDB.open('contactDatabase', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('contacts')) {
        db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    }
};

request.onerror = function(event) {
    console.error('Database error: ', event.target.error);
};

request.onsuccess = function(event) {
    db = event.target.result;
};


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('pesan').value;

    
    const transaction = db.transaction('contacts', 'readwrite');
    const contactsStore = transaction.objectStore('contacts');
    
    const contactData = {
        nama: nama,
        email: email,
        pesan: pesan,
        timestamp: new Date()
    };
    
    contactsStore.add(contactData);

    transaction.oncomplete = function() {
        alert('Data berhasil disimpan');
        document.getElementById('contact-form').reset();
    };

    transaction.onerror = function(event) {
        console.error('Transaction error: ', event.target.error);
    };
});
