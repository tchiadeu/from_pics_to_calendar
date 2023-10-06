import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="demo"
export default class extends Controller {
  static targets = [ "landing", "demo", "smartphones", "buttons" ]

  landingHeight = 60
  demoOpacity = 0
  smartphonesOpacity = 100

  showDemo(event) {
    event.preventDefault()
    let smartphonesInterval = setInterval(() => {
      this.smartphonesOpacity -= 10
      this.smartphonesTarget.style.opacity = this.smartphonesOpacity / 100
      this.buttonsTarget.style.opacity = this.smartphonesOpacity / 100
      if (this.smartphonesOpacity <= 0) {
        clearInterval(smartphonesInterval)
        this.buttonsTarget.classList.add("hidden")
        this.smartphonesTarget.classList.add("hidden")
        let landingInterval = setInterval(() => {
          this.landingHeight += 5
          this.landingTarget.style.height = this.landingHeight + "vh"
          if (this.landingHeight >= 100) {
            clearInterval(landingInterval)
            this.demoTarget.classList.remove("hidden")
            let demoInterval = setInterval(() => {
              this.demoOpacity += 10
              this.demoTarget.style.opacity = this.demoOpacity / 100
              if (this.demoOpacity >= 100) {
                clearInterval(demoInterval)
              }
            }, 50)
          }
        }, 30)
      }
    }, 50)
  }

  closeVideo() {
    let videoInterval = setInterval(() => {
      this.demoOpacity -= 10
      this.demoTarget.style.opacity = this.demoOpacity / 100
      if (this.demoOpacity <= 0) {
        clearInterval(videoInterval)
        this.demoTarget.classList.add("hidden")
        let landingInterval = setInterval(() => {
          this.landingHeight -= 5
          this.landingTarget.style.height = this.landingHeight + "vh"
          if (this.landingHeight <= 60) {
            clearInterval(landingInterval)
            this.smartphonesTarget.classList.remove("hidden")
            this.buttonsTarget.classList.remove("hidden")
            let smartphonesInterval = setInterval(() => {
              this.smartphonesOpacity += 10
              this.smartphonesTarget.style.opacity = this.smartphonesOpacity / 100
              this.buttonsTarget.style.opacity = this.smartphonesOpacity / 100
              if (this.smartphonesOpacity >= 100) {
                clearInterval(smartphonesInterval)
              }
            }, 50)
          }
        }, 30)
      }
    }, 50)
  }
}
