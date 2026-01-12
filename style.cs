:root { --gold: #FFD700; --red: #ff0000; --orange: #ff6600; }
body { margin: 0; background: #000; font-family: 'Arial Black', sans-serif; overflow: hidden; color: #fff; }

/* CEO Notice */
.ceo-notice { background: rgba(255, 215, 0, 0.1); border-top: 1px solid var(--gold); border-bottom: 1px solid var(--gold); padding: 5px 0; color: var(--gold); font-size: 13px; font-family: sans-serif; }

/* Fire Button Anime Effect */
.fire-button {
    position: relative; background: var(--red); color: #fff; padding: 15px 40px; border-radius: 8px; font-size: 20px;
    border: 2px solid var(--gold); box-shadow: 0 0 20px var(--red); overflow: hidden; transition: 0.3s;
}
.fire-button::after {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, var(--gold) 5%, var(--orange) 30%, transparent 60%);
    animation: rotate-fire 1.5s infinite linear; opacity: 0.5; z-index: -1;
}
@keyframes rotate-fire { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Anime WhatsApp Shot Effect */
.anime-wa {
    box-shadow: 0 0 15px #25D366, 0 0 30px var(--orange); border: 2px solid #fff;
}
.anime-wa::before { content: '🔥'; position: absolute; top: -20px; font-size: 25px; animation: anime-bounce 0.4s infinite alternate; }
@keyframes anime-bounce { from { transform: translateY(0) scale(1); } to { transform: translateY(-10px) scale(1.3); } }

/* Map & Grid */
.map-wrapper { width: 95%; max-width: 1300px; height: 550px; margin: 10px auto; border: 3px solid #333; background: #fff; position: relative; overflow: hidden; }
#viewport { width: 100%; height: 100%; cursor: grab; }

/* Side Buttons */
.side-controls { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
.control-btn { width: 50px; height: 50px; border-radius: 10px; border: 2px solid var(--gold); background: #fff; font-size: 20px; cursor: pointer; }

/* Search Panel */
#search-panel { position: fixed; right: 80px; top: 50%; transform: translateY(-50%); background: #fff; padding: 15px; border-radius: 10px; width: 220px; z-index: 1000; box-shadow: -10px 0 30px #000; }
.search-hidden { display: none; }
#searchInput { width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; color: #000; outline: none; }

.nav-bar { background: #fff; color: #000; padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; }
.wa-float { position: fixed; bottom: 85px; right: 25px; background: #25D366; color: #fff; padding: 10px 20px; border-radius: 50px; text-decoration: none; font-weight: bold; }
