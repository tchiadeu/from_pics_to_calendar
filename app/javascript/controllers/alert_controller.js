import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="alert"
export default class extends Controller {
  static targets = ["alert"]

  connect() {
    let opacity = 0
    let right = -30
    this.alertTarget.style.opacity = 0
    this.alertTarget.style.right = "-30px"
    let interval = setInterval(() => {
      this.alertTarget.classList.remove("hidden")
      opacity += 0.1
      right += 4
      this.alertTarget.style.opacity = opacity
      this.alertTarget.style.right = right + "px"
      if (opacity >= 1) clearInterval(interval)
    }, 20)
    const notificationType = this.alertTarget.getAttribute("data-notification")
    if (notificationType === "notice") {
      setTimeout(() => {
        interval = setInterval(() => {
          opacity -= 0.1
          right -= 4
          this.alertTarget.style.opacity = opacity
          this.alertTarget.style.right = right + "px"
          if (opacity <= 0) {
            clearInterval(interval)
            this.alertTarget.remove()
          }
        }, 20);
      }, 5000);
    }
  }

  closeAlert() {
    let opacity = 1
    let right = 10
    const interval = setInterval(() => {
      opacity -= 0.1
      right -= 4
      this.alertTarget.style.opacity = opacity
      this.alertTarget.style.right = right + "px"
      if (opacity <= 0) {
        clearInterval(interval)
        this.alertTarget.remove()
      }
    }, 20);
  }

}
