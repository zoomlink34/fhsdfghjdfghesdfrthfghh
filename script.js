const firebaseConfig = {
    apiKey: "AIzaSyDcFXKaFi1lPOV5wMqFwcjhXlpKdpKkxgE",
    authDomain: "the-10-million-pixels-plus.firebaseapp.com",
    projectId: "the-10-million-pixels-plus",
    databaseURL: "https://the-10-million-pixels-plus-default-rtdb.firebaseio.com/",
    storageBucket: "the-10-million-pixels-plus.firebasestorage.app",
    messagingSenderId: "589782307046",
    appId: "1:589782307046:web:fcc40b27c846d5dcb86b27"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const cv = document.getElementById('mainCanvas');
const ctx = cv.getContext('2d');

const blockW = 100, blockH = 60;
const cols = 316, rows = 317; 
cv.width = cols * blockW; cv.height = rows * blockH;

let scale = 0.04, pX = 0, pY = 0, isD = false, sX, sY, pixels = {};

function render() {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = "#000000"; ctx.lineWidth = 1;
    
    // গ্রিড দাগ জুমের সাথে পরিবর্তন
    ctx.globalAlpha = (scale > 0.3) ? 0.3 : 0.1;
    for(let i=0; i<cols; i++) {
        for(let j=0; j<rows; j++) {
            let x = i * blockW, y = j * blockH;
            ctx.strokeRect(x, y, blockW, blockH);
            if(scale > 0.5) {
                ctx.fillStyle = "#888"; ctx.font = "12px Arial";
                ctx.fillText("#" + ((j * cols) + i + 1), x + 50, y + 35);
            }
        }
    }
    ctx.globalAlpha = 1.0;

    Object.keys(pixels).forEach(id => {
        const p = pixels[id];
        if(p.imageUrl) {
            const img = new Image(); img.crossOrigin = "anonymous"; img.src = p.imageUrl;
            img.onload = () => {
                ctx.drawImage(img, p.x, p.y, blockW, blockH);
                ctx.strokeStyle = "#FFD700"; ctx.lineWidth = 5;
                ctx.strokeRect(p.x, p.y, blockW, blockH);
            };
        }
    });
}

function updateUI() { 
    document.getElementById('mover').style.transform = `translate(${pX}px,${pY}px) scale(${scale})`; 
    render(); 
}

function zoomIn() { scale = Math.min(scale * 1.8, 4); updateUI(); }
function zoomOut() { scale = Math.max(scale / 1.8, 0.02); updateUI(); }
function resetView() { scale = 0.04; pX = 0; pY = 0; updateUI(); }
function toggleSearch() { document.getElementById('search-panel').classList.toggle('search-hidden'); }

function searchPixel() {
    const q = document.getElementById('searchInput').value;
    if(!isNaN(q) && q > 0 && q <= 100000) {
        const idx = parseInt(q) - 1;
        const tx = (idx % cols) * blockW;
        const ty = Math.floor(idx / cols) * blockH;
        scale = 2.0;
        pX = (window.innerWidth / 2) - (tx + 50) * scale;
        pY = (window.innerHeight / 2) - (ty + 30) * scale;
        updateUI();
        toggleSearch();
    }
}

function copyText(val) { navigator.clipboard.writeText(val).then(() => alert("Copied: " + val)); }

// Drag logic
const vp = document.getElementById('viewport');
vp.onmousedown = (e) => { isD = true; sX = e.clientX-pX; sY = e.clientY-pY; };
window.onmouseup = () => isD = false;
window.onmousemove = (e) => { if(isD){ pX = e.clientX-sX; pY = e.clientY-sY; updateUI(); } };

db.ref('pixels').on('value', s => { pixels = s.val() || {}; render(); document.getElementById('sold-count').innerText = Object.keys(pixels).length; });
