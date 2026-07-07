document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SMOOTH SCROLL NAVBAR
    ========================= */

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================
       ACTIVE NAVBAR LINK
    ========================= */

    window.addEventListener("scroll", () => {
        let sections = document.querySelectorAll("section");
        let scrollPos = window.scrollY + 100;

        sections.forEach(section => {

            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                document.querySelectorAll(".nav-links a").forEach(a => {
                    a.classList.remove("active");

                    document.querySelector(".nav-links a[href='#" + section.id + "']")
                        ?.classList.add("active");
                });
            }
        });
    });


    /* =========================
       NAVBAR SCROLL BACKGROUND
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================
       SCROLL ANIMATION
    ========================= */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });

    }, {
        threshold: 0.2
    });

    const elements = document.querySelectorAll(
        ".project-card, .skill-card, .timeline-item, .about-card"
    );

    elements.forEach(el => observer.observe(el));


    /* =========================
       HERO TEXT EFFECT (TYPING)
    ========================= */

    const heroText = document.querySelector(".hero h2");

    if (heroText) {

        let texts = [
            "Web Developer",
            "Programmer",
            "Frontend Developer"
        ];

        let index = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < texts[index].length) {
                heroText.textContent += texts[index].charAt(charIndex);
                charIndex++;
                setTimeout(type, 120);
            } else {
                setTimeout(erase, 1000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                heroText.textContent = texts[index].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 60);
            } else {
                index = (index + 1) % texts.length;
                setTimeout(type, 300);
            }
        }

        heroText.textContent = "";
        type();
    }

});
/* ===========================
   EmailJS Contact Form
=========================== */

emailjs.init("wbnZz3sFwoN-NFLPB");

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_42hfwpf",
            "template_vp5va0l",
            this
        )
        .then(function () {
            alert("Message Sent Successfully!");
            contactForm.reset();
        })
        .catch(function (error) {
            alert("Message Send Failed!");
            console.log(error);
        });
    });
}