/*
    Script commun pour le bilinguisme de tout le site.
    Il affiche la version anglaise ou française, adapte les textes, les éléments
    masqués, les titres de page et les libellés d'accessibilité, puis mémorise
    la langue choisie dans le navigateur.
*/

(() => {
    const root = document.documentElement;
    const buttons = document.querySelectorAll("[data-language]");

    function setLanguage(language) {
        const selected = language === "fr" ? "fr" : "en";
        root.lang = selected;

        /* Textes bilingues stockés directement dans data-en et data-fr. */
        document.querySelectorAll("[data-en][data-fr]").forEach((element) => {
            element.textContent = element.dataset[selected];
        });

        /* Blocs anglais et français présents séparément dans le HTML. */
        document.querySelectorAll("[data-lang]").forEach((element) => {
            element.hidden = element.dataset.lang !== selected;
        });

        /* Libellés destinés notamment aux lecteurs d'écran. */
        document.querySelectorAll("[data-en-label][data-fr-label]").forEach((element) => {
            element.setAttribute("aria-label", element.dataset[`${selected}Label`]);
        });

        /* Textes alternatifs des images. */
        document.querySelectorAll("[data-en-alt][data-fr-alt]").forEach((element) => {
            element.alt = element.dataset[`${selected}Alt`];
        });

        buttons.forEach((button) => {
            const active = button.dataset.language === selected;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        const title = selected === "fr" ? document.body.dataset.frTitle : document.body.dataset.enTitle;
        if (title) document.title = title;

        try {
            localStorage.setItem("preferred-language", selected);
        } catch (error) {
            /* Le changement de langue fonctionne même sans stockage local. */
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
    });

    let initialLanguage = "en";
    try {
        initialLanguage = localStorage.getItem("preferred-language")
            || (navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
    } catch (error) {
        initialLanguage = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    }

    setLanguage(initialLanguage);
})();
