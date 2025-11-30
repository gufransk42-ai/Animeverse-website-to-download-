// Animeverse1727 Website JS
// Neon Effects + Scroll Animations + Button Hover

console.log("Animeverse1727 website loaded!");

// 🔹 Neon Flicker Effect for Header
const header = document.querySelector('header h1');

function flicker() {
    const intensity = Math.random() * 0.6 + 0.4; // brightness 0.4 to 1
    header.style.textShadow = `
        0 0 5px rgba(255,0,204,${intensity}),
        0 0 10px rgba(255,0,204,${intensity}),
        0 0 20px rgba(255,0,204,${intensity}),
        0 0 40px rgba(255,0,204,${intensity})
    `;
}
setInterval(flicker, 200);

// 🔹 Smooth Scroll Animation for Sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + window.innerHeight;
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY > sectionTop + 50) {
            section.style.transition = "opacity 1s ease-in";
            section.style.opacity = 1;
        }
    });
});

// 🔹 Button Hover Neon Glow Effect (if any buttons added later)
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = "0 0 20px #ff00cc, 0 0 40px #ff00cc";
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = "none";
    });
});

// 🔹 Optional: Console style message
console.log("%cWelcome to Animeverse1727! 🎌", "color:#ff00cc; font-size:18px; font-weight:bold;");
