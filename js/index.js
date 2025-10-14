function show_hide(id) {
            const el = document.getElementById(id);
            if (el.style.display === "none" || el.style.display === "") {
                el.style.display = "flex";
            } else {
                el.style.display = "none";
            }
        }