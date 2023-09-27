import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="file-form"
export default class extends Controller {
  static targets = [ "background", "iconeContainer", "label", "text", "submit" ]

  fileSelected(event) {
    event.preventDefault();
    this.backgroundTarget.classList.remove("border-blue-500");
    this.backgroundTarget.style.borderColor="#16a34a";
    this.iconeContainerTarget.firstElementChild.innerHTML = `<svg data-file-form-target="checkIcone" class="mx-auto h-12 w-12" viewBox="0 0 512 512" fill="#16a34a" aria-hidden="true">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`
    this.labelTarget.classList.remove("text-blue-500");
    this.labelTarget.style.color="#16a34a";
    this.textTarget.classList.add("text-green-600");
    this.textTarget.innerText = "Fichier ajouté";
    this.submitTarget.classList.remove("bg-blue-100");
    this.submitTarget.classList.remove("text-blue-500");
    this.submitTarget.style.backgroundColor="#dcfce7";
    this.submitTarget.style.color="#16a34a";
  }
}
