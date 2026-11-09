(function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Typing intro ---------- */
    var title = document.getElementById("hero-title");
    if (title) {
        var lineEls = title.querySelectorAll(".line");
        var lines = [
            [{ t: "Hey, I'm " }, { t: "Rohan", c: "accent" }],
            [{ t: "Computer Science Student" }]
        ];

        var cursor = document.createElement("span");
        cursor.className = "cursor typing";
        cursor.textContent = "_";
        cursor.setAttribute("aria-hidden", "true");

        Array.prototype.forEach.call(lineEls, function (el) { el.textContent = ""; });

        var li = 0, si = 0, ci = 0, current = null;

        var typeStep = function () {
            if (li >= lines.length) {
                cursor.className = "cursor"; // finished: blink
                return;
            }
            var seg = lines[li][si];
            if (ci === 0) {
                current = document.createElement("span");
                if (seg.c) current.className = seg.c;
                lineEls[li].appendChild(current);
                lineEls[li].appendChild(cursor);
            }
            current.textContent += seg.t.charAt(ci++);
            var delay = reduce ? 0 : 70 + Math.random() * 70;
            if (ci >= seg.t.length) {
                ci = 0; si++;
                if (si >= lines[li].length) { si = 0; li++; delay = 450; }
            }
            setTimeout(typeStep, delay);
        };

        lineEls[0].appendChild(cursor);
        cursor.className = "cursor"; // blink briefly before typing starts
        setTimeout(function () { cursor.className = "cursor typing"; typeStep(); }, reduce ? 0 : 900);
    }

    var Unit1 = document.getElementById("Unit1-title");
    if (Unit1) {
        var unitLineEls = Unit1.querySelectorAll(".line");
        var unitLines = [
            [{ t: "Unit 1 " }, { t: "Online World", c: "accent" }],
        ];

        

        var unitCursor = document.createElement("span");
        unitCursor.className = "cursor typing";
        unitCursor.textContent = "_";
        unitCursor.setAttribute("aria-hidden", "true");

        Array.prototype.forEach.call(unitLineEls, function (el) { el.textContent = ""; });

        var unitLi = 0, unitSi = 0, unitCi = 0, unitCurrent = null;

        var typeUnitStep = function () {
            if (unitLi >= unitLines.length) {
                unitCursor.className = "cursor";
                return;
            }
            var seg = unitLines[unitLi][unitSi];
            if (unitCi === 0) {
                unitCurrent = document.createElement("span");
                if (seg.c) unitCurrent.className = seg.c;
                unitLineEls[unitLi].appendChild(unitCurrent);
                unitLineEls[unitLi].appendChild(unitCursor);
            }
            unitCurrent.textContent += seg.t.charAt(unitCi++);
            var delay = reduce ? 0 : 70 + Math.random() * 70;
            if (unitCi >= seg.t.length) {
                unitCi = 0; unitSi++;
                if (unitSi >= unitLines[unitLi].length) { unitSi = 0; unitLi++; delay = 450; }
            }
            setTimeout(typeUnitStep, delay);
        };

        unitLineEls[0].appendChild(unitCursor);
        unitCursor.className = "cursor";
        setTimeout(function () { unitCursor.className = "cursor typing"; typeUnitStep(); }, reduce ? 0 : 900);
    }

    /* ---------- Stars + planet ---------- */
    var canvas = document.getElementById("stars");
    var planet = document.getElementById("planet");
    if (!canvas || !planet) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, stars = [];

    var LAYERS = [
        // drift = pixels per second the stars float upward on their own
        { count: 110, size: 0.7, speed: 0.05, alpha: 0.45, drift: 4 },
        { count: 60, size: 1.0, speed: 0.15, alpha: 0.7, drift: 9 },
        { count: 28, size: 1.5, speed: 0.35, alpha: 0.95, drift: 16 }
    ];

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = [];
        LAYERS.forEach(function (L, li) {
            for (var i = 0; i < L.count; i++) {
                stars.push({ x: Math.random() * w, y: Math.random() * h, l: li, t: Math.random() * 6.28 });
            }
        });
    }

    function draw(time) {
        var sy = window.scrollY;
        var maxScroll = Math.max(document.documentElement.scrollHeight - h, 1);
        var progress = Math.min(Math.max(sy / maxScroll, 0), 1);

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#fff";
        stars.forEach(function (s) {
            var L = LAYERS[s.l];
            var drift = reduce ? 0 : (time / 1000) * L.drift;
            var y = ((s.y - sy * L.speed - drift) % h + h) % h;
            var tw = reduce ? 1 : 0.7 + 0.3 * Math.sin(time / 900 + s.t);
            ctx.globalAlpha = L.alpha * tw;
            ctx.beginPath();
            ctx.arc(s.x, y, L.size, 0, 6.2832);
            ctx.fill();
        });
        ctx.globalAlpha = 1;


        var size = planet.offsetWidth;
        var cx = w * (w < 700 ? 0.62 : 0.7) - progress * w * 0.45;
        var cy = h * 0.55 + progress * h * 0.25;
        planet.style.transform = "translate3d(" + (cx - size / 2) + "px," + (cy - size / 2) + "px,0)";
    }

    function loop(t) {
        draw(t);
        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(loop);
})();


/* FOLDER STUFF DO NOT TOUCH  */
var folderBtn = document.getElementById("folder-btn");
var folderItems = document.getElementById("folder-items");
if (folderBtn && folderItems) {
    folderBtn.addEventListener("click", function () {
        var open = folderBtn.getAttribute("aria-expanded") === "true";
        folderBtn.setAttribute("aria-expanded", String(!open));
        folderItems.hidden = open;
    });
}