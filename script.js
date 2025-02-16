document.addEventListener("DOMContentLoaded", function () {
    var hamburger = document.querySelector(".ham"),
        hamMenu = document.querySelector(".hamMenu");

    hamburger.onclick = function () {
        hamMenu.classList.toggle("active");

        if (hamburger.classList.contains("fa-bars")) {
            hamburger.classList.remove("fa-bars");
            hamburger.classList.add("fa-xmark");
        } else {
            hamburger.classList.remove("fa-xmark");
            hamburger.classList.add("fa-bars");
        }
    }

    var thumbnails = document.querySelectorAll(".thumbnail-content");
    var text = document.querySelector(".txt");

    gsap.from(".txt span", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2
    });

    thumbnails.forEach(thumbnail => {
        var image = thumbnail.querySelector("img");
        var tcTxt = thumbnail.querySelector(".tc-txt");

        image.addEventListener("mouseenter", function () {
            gsap.to(this, {
                scale: 1.2,
                opacity: 1,
                filter: "none",
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(tcTxt, {
                display: "block",
                opacity: 1,
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });

            thumbnails.forEach(otherThumbnail => {
                var otherImage = otherThumbnail.querySelector("img");
                if (otherImage !== image) {
                    gsap.to(otherImage, {
                        opacity: 0.3,
                        filter: "grayscale(100%) contrast(200%)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            text.classList.add("outline");
        });

        image.addEventListener("mouseleave", function () {
            gsap.to(image, {
                scale: 1,
                opacity: 1,
                filter: "none",
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.to(tcTxt, {
                display: "none",
                opacity: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            thumbnails.forEach(otherThumbnail => {
                gsap.to(otherThumbnail.querySelector("img"), {
                    opacity: 1,
                    filter: "none",
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            text.classList.remove("outline");
        });


        image.addEventListener("mousemove", function (e) {
            let bounds = this.getBoundingClientRect();
            let offsetX = (e.clientX - bounds.left) - bounds.width / 2;
            let offsetY = (e.clientY - bounds.top) - bounds.height / 2;

            gsap.to(this, {
                x: offsetX * 0.2,
                y: offsetY * 0.2,
                duration: 0.2
            });

            gsap.to(tcTxt, {
                x: offsetX * 0.2,
                y: offsetY * 0.2,
                duration: 0.2
            });
        });
    });
});
