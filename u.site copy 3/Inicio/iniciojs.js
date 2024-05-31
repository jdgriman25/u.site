// Cargar imágenes de forma diferida
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores no compatibles con IntersectionObserver
        let lazyLoad = function() {
            lazyImages.forEach(function(image) {
                if (image.getBoundingClientRect().top < window.innerHeight && image.getBoundingClientRect().bottom > 0 && getComputedStyle(image).display !== "none") {
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                }
            });
            if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
        lazyLoad();
    }
});

// Búsqueda en Amazon
function searchAmazon() {
    const query = document.getElementById("search-bar").value;
    if (query) {
        window.location.href = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    }
}

// Abrir categoría
function openCategory(url) {
    window.location.href = url;
}
