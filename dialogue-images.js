/*
    Ce script permet d'agrandir les images des folios.
    Il crée une seule fenêtre d'agrandissement, puis y affiche l'image cliquée.
    La touche Échap, le bouton de fermeture ou un clic autour de l'image la referme.
*/

(() => {
    const images = document.querySelectorAll(".folio-image img");
    if (!images.length) return;

    const dialog = document.createElement("dialog");
    dialog.className = "image-dialog";

    const enlargedImage = document.createElement("img");
    const closeButton = document.createElement("button");
    closeButton.className = "image-dialog-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.dataset.enLabel = "Close enlarged image";
    closeButton.dataset.frLabel = "Fermer l'image agrandie";

    dialog.append(closeButton, enlargedImage);
    document.body.append(dialog);

    function openImage(image) {
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt;
        dialog.showModal();
    }

    images.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.dataset.enLabel = `${image.alt} — enlarge`;
        image.dataset.frLabel = `${image.alt} — agrandir`;

        image.addEventListener("click", () => openImage(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage(image);
            }
        });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
})();
