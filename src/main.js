import './style.css'; // Mengimpor stylesheet, Vite akan menanganinya
import { initUI } from './lib/ui.js';

// Fungsi untuk menyuntikkan konten utama ke dalam div #app
const renderAppContent = () => {
  const appContainer = document.querySelector('#app');
  if (!appContainer) return;

  appContainer.innerHTML = `
    <header class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] transition-colors duration-300">pnglass</h1>
      <p class="mt-2 text-lg text-[var(--color-text-secondary)]">Generator PNG transparan yang cepat dan modern.</p>
    </header>

    <main>
      <div class="bg-[var(--color-surface)] rounded-2xl shadow-xl p-6 transition-colors duration-300">
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col sm:flex-row gap-3">
            <select id="template-select" class="w-full px-3 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] outline-none transition"></select>
            <button id="add-template-btn" class="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors">Gunakan Template</button>
          </div>
          <div>
            <button id="add-size-btn" class="w-full h-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary-100)] dark:bg-opacity-20 text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)] font-semibold rounded-lg hover:bg-[var(--color-primary-200)] dark:hover:bg-opacity-30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Tambah Manual
            </button>
          </div>
        </div>
        <hr class="border-[var(--color-border)] my-6 transition-colors duration-300">
        <div id="sizes-container" class="space-y-4 mb-6"></div>
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <button id="generate-zip-btn" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary-600)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary-500)] transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4z"></path><path fill-rule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"></path></svg>
            Unduh Semua (.zip)
          </button>
          <button id="generate-individual-btn" class="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed">Unduh Masing-Masing</button>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] transition-colors duration-300">Hasil</h2>
          <div id="results-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div id="placeholder" class="text-center col-span-full py-10 text-[var(--color-text-secondary)]">
              <p>Tambahkan ukuran untuk memulai.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="text-center mt-8 text-[var(--color-text-secondary)] text-sm">
      <p>Dibuat oleh Muhammad Rifkie Hasib.</p>
    </footer>
  `;
};

// Inisialisasi aplikasi utama
document.addEventListener('DOMContentLoaded', () => {
  renderAppContent(); // Menyuntikkan UI
  initUI(); // Menginisialisasi semua event listener dan logika
});

