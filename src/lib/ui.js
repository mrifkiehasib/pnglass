import { initTheme } from './theme.js';
import { getValidSizes, generateAndDownloadIndividually, generateAndZipImages } from './generator.js';

// Semua query elemen DOM terpusat di sini
const getElements = () => ({
    sizesContainer: document.getElementById('sizes-container'),
    addSizeBtn: document.getElementById('add-size-btn'),
    generateZipBtn: document.getElementById('generate-zip-btn'),
    generateIndividualBtn: document.getElementById('generate-individual-btn'),
    resultsContainer: document.getElementById('results-container'),
    placeholder: document.getElementById('placeholder'),
    templateSelect: document.getElementById('template-select'),
    addTemplateBtn: document.getElementById('add-template-btn'),
});

// Logika untuk mengisi template dari file JSON
async function loadAndPopulateTemplates(elements) {
    try {
        const response = await fetch('/src/data/templates.json'); // Path relatif ke root publik
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const standardSizes = await response.json();
        
        elements.templateSelect.innerHTML = '<option value="" disabled selected>Pilih template ukuran...</option>';
        for (const group in standardSizes) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group;
            for (const name in standardSizes[group]) {
                const option = document.createElement('option');
                const dims = standardSizes[group][name];
                option.value = `${dims.w},${dims.h}`;
                option.textContent = `${name} (${dims.w}x${dims.h})`;
                optgroup.appendChild(option);
            }
            elements.templateSelect.appendChild(optgroup);
        }
    } catch (error) {
        console.error("Gagal memuat data template:", error);
        elements.templateSelect.innerHTML = '<option value="" disabled selected>Gagal memuat template</option>';
    }
}

// Fungsi untuk memperbarui status tombol
const updateUIState = (elements) => {
    const hasRows = elements.sizesContainer.querySelector('.size-input-row');
    elements.generateZipBtn.disabled = !hasRows;
    elements.generateIndividualBtn.disabled = !hasRows;
    elements.placeholder.classList.toggle('hidden', !!hasRows);
    if (!hasRows) elements.placeholder.innerHTML = '<p>Tambahkan ukuran untuk memulai.</p>';
};

// Fungsi untuk menambah baris ukuran baru
const addSizeRow = (elements, width = '', height = '') => {
    // Template HTML untuk baris input kini disuntikkan oleh main.js, kita bisa membuatnya di sini jika diperlukan
    const row = document.createElement('div');
    row.className = 'size-input-row flex items-center gap-3 p-3 bg-[var(--color-background)] rounded-lg animate-fade-in border border-[var(--color-border)]';
    row.innerHTML = `
        <div class="flex-1">
            <input class="width-input w-full px-3 py-2 rounded-md border focus:border-[var(--color-primary-500)] outline-none transition" type="number" min="1" placeholder="Lebar (px)" value="${width}">
        </div>
        <div class="text-[var(--color-text-secondary)]">&times;</div>
        <div class="flex-1">
            <input class="height-input w-full px-3 py-2 rounded-md border focus:border-[var(--color-primary-500)] outline-none transition" type="number" min="1" placeholder="Tinggi (px)" value="${height}">
        </div>
        <button class="remove-size-btn text-[var(--color-text-secondary)] hover:text-red-400 transition-colors p-2 rounded-full flex-shrink-0">
            <svg class="h-5 w-5 pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
    `;
    elements.sizesContainer.appendChild(row);
    updateUIState(elements);
};

// Fungsi utama untuk menginisialisasi semua logika terkait UI
export function initUI() {
    const elements = getElements();
    
    initTheme();

    elements.addTemplateBtn.addEventListener('click', () => {
        if (elements.templateSelect.value) {
            const [width, height] = elements.templateSelect.value.split(',');
            addSizeRow(elements, width, height);
            elements.templateSelect.selectedIndex = 0;
        }
    });

    elements.addSizeBtn.addEventListener('click', () => addSizeRow(elements));

    elements.sizesContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-size-btn');
        if (removeBtn) {
            removeBtn.closest('.size-input-row').remove();
            updateUIState(elements);
        }
    });

    elements.generateIndividualBtn.addEventListener('click', () => {
        const sizes = getValidSizes(elements);
        generateAndDownloadIndividually(sizes, elements);
    });
    
    elements.generateZipBtn.addEventListener('click', () => {
        const sizes = getValidSizes(elements);
        generateAndZipImages(sizes, elements);
    });
    
    loadAndPopulateTemplates(elements);
    updateUIState(elements);
}

