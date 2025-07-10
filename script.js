const logo = document.getElementById("logo");
const dropdown = document.getElementById("dropdownMenu");

logo.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent outside click from triggering immediately
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Optional: Hide dropdown on outside click
document.addEventListener("click", (e) => {
    if (!logo.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    // You can add logic here to load content if needed
});
//====================================================================

const contentDiv = document.getElementById("content");

const loadInner = (className) => {
    fetch("mix.html")
        .then((res) => res.text())
        .then((htmlText) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");
            const innerContent = doc.querySelector(`.${className}`);
            if (innerContent) {
                contentDiv.innerHTML = innerContent.outerHTML;
                contentDiv.firstElementChild.classList.add("fade-in");
            } else {
                contentDiv.innerHTML = "<p>Content not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error loading content:", error);
            contentDiv.innerHTML = "<p>Error loading content.</p>";
        });
};

document.getElementById("box1").addEventListener("click", () => loadInner("resume"));
document.getElementById("box2").addEventListener("click", () => loadInner("Outfit"));
document.getElementById("box3").addEventListener("click", () => loadInner("comm"));
document.getElementById("box4").addEventListener("click", () => loadInner("Question"));
document.getElementById("box5").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page reload if any <a> inside
    loadInner("live");
});
