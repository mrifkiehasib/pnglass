import JSZip from 'jszip';

// Mengambil ukuran yang valid dari UI, terpisah dari logika UI
export function getValidSizes(elements) {
    const sizes = [];
    const sizeRows = elements.sizesContainer.querySelectorAll('.size-input-row');
    sizeRows.forEach((row) => {
        const widthInput = row.querySelector('.width-input');
        const heightInput = row.querySelector('.height-input');
        const width = parseInt(widthInput.value, 10);
        const height = parseInt(heightInput.value, 10);
        [widthInput, heightInput].forEach(input => input.classList.remove('border-red-500', 'ring-red-500'));
        if (width > 0 && height > 0) {
            sizes.push({ width, height });
        } else {
            if (!(width > 0)) widthInput.classList.add('border-red-500', 'ring-red-500');
            if (!(height > 0)) heightInput.classList.add('border-red-500', 'ring-red-500');
        }
    });
    return sizes;
}

// Menghasilkan dan mengunduh gambar satu per satu
export function generateAndDownloadIndividually(sizes, elements) {
    elements.resultsContainer.innerHTML = '';
    if (sizes.length === 0) {
         elements.placeholder.classList.remove('hidden');
         elements.placeholder.innerHTML = '<p>Tidak ada ukuran yang valid. Periksa kembali input Anda.</p>';
         return;
    }
    sizes.forEach(({ width, height }) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const dataUrl = canvas.toDataURL('image/png');
        
        const resultCard = document.createElement('div');
        resultCard.className = 'flex flex-col items-center gap-2 p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] animate-fade-in';
        resultCard.innerHTML = `
            <div class="w-full h-24 checkerboard rounded-md flex items-center justify-center p-2">
                <img src="${dataUrl}" alt="Transparan ${width}x${height}px" class="max-w-full max-h-full object-contain border border-dashed border-gray-400 dark:border-gray-500">
            </div>
            <p class="text-sm font-medium">${width} &times; ${height} px</p>
        `;
        elements.resultsContainer.appendChild(resultCard);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `transparent_${width}x${height}.png`;
        downloadLink.click();
    });
}

// Menghasilkan semua gambar dan mengemasnya dalam ZIP
export async function generateAndZipImages(sizes, elements) {
    elements.resultsContainer.innerHTML = '';
    if (sizes.length === 0) {
         elements.placeholder.classList.remove('hidden');
         elements.placeholder.innerHTML = '<p>Tidak ada ukuran yang valid untuk di-zip.</p>';
         return;
    }
    
    elements.generateZipBtn.disabled = true;
    elements.generateZipBtn.innerHTML = '<span>Membuat ZIP...</span>';
    
    const zip = new JSZip();
    for (const { width, height } of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const dataUrl = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataUrl)).blob();
        zip.file(`transparent_${width}x${height}.png`, blob);
    }

    zip.generateAsync({ type: "blob" })
        .then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "pnglass_images.zip";
            link.click();
            URL.revokeObjectURL(link.href);
            elements.placeholder.classList.remove('hidden');
            elements.placeholder.innerHTML = `<p class="text-green-600 dark:text-green-400">${sizes.length} gambar berhasil di-zip!</p>`;
        })
        .catch(err => {
            console.error("Error zipping files:", err);
            elements.placeholder.innerHTML = `<p class="text-red-500">Gagal membuat file zip.</p>`;
        })
        .finally(() => {
            elements.generateZipBtn.disabled = false;
            elements.generateZipBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4z"></path><path fill-rule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"></path></svg><span>Unduh Semua (.zip)</span>`;
        });
}

