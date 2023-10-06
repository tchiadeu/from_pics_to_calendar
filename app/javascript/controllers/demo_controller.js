import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="demo"
export default class extends Controller {
  static targets = [ "landing", "demo", "smartphones", "buttons", "registration", "description", "footer", "steps" ]

  landingHeight = 60
  demoOpacity = 0
  smartphonesOpacity = 100

  showDemo(event) {
    event.preventDefault()
    let smartphonesInterval = setInterval(() => {
      this.smartphonesOpacity -= 10
      if (window.innerWidth < 640) {
        this.descriptionTarget.style.opacity = this.smartphonesOpacity / 100
        this.footerTarget.style.opacity = this.smartphonesOpacity / 100
        this.stepsTarget.style.opacity = this.smartphonesOpacity / 100
      }
      this.smartphonesTarget.style.opacity = this.smartphonesOpacity / 100
      this.buttonsTarget.style.opacity = this.smartphonesOpacity / 100
      if (this.smartphonesOpacity <= 0) {
        clearInterval(smartphonesInterval)
        if (window.innerWidth < 640) {
          this.descriptionTarget.classList.add("hidden")
          this.footerTarget.classList.add("hidden")
          this.stepsTarget.classList.add("hidden")
        }
        this.buttonsTarget.classList.add("hidden")
        this.smartphonesTarget.classList.add("sm:hidden")
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
            this.smartphonesTarget.classList.remove("sm:hidden")
            this.buttonsTarget.classList.remove("hidden")
            if (window.innerWidth < 640) {
              this.descriptionTarget.classList.remove("hidden")
              this.footerTarget.classList.remove("hidden")
              this.stepsTarget.classList.remove("hidden")
            }
            let smartphonesInterval = setInterval(() => {
              this.smartphonesOpacity += 10
              this.smartphonesTarget.style.opacity = this.smartphonesOpacity / 100
              this.buttonsTarget.style.opacity = this.smartphonesOpacity / 100
              if (window.innerWidth < 640) {
                this.descriptionTarget.style.opacity = this.smartphonesOpacity / 100
                this.footerTarget.style.opacity = this.smartphonesOpacity / 100
                this.stepsTarget.style.opacity = this.smartphonesOpacity / 100
              }
              if (this.smartphonesOpacity >= 100) {
                clearInterval(smartphonesInterval)
              }
            }, 50)
          }
        }, 30)
      }
    }, 50)
  }

  demoFromRegister(event) {
    event.preventDefault()
    let opacity = 100
    let interval = setInterval(() => {
      opacity -= 10
      this.registrationTarget.style.opacity = opacity / 100
      if (opacity <= 0) {
        clearInterval(interval)
        this.registrationTarget.classList.add("hidden")
        this.demoTarget.classList.remove("hidden")
        let demoInterval = setInterval(() => {
          this.demoOpacity += 10
          this.demoTarget.style.opacity = this.demoOpacity / 100
          if (this.demoOpacity >= 100) {
            clearInterval(demoInterval)
          }
        }, 50)
      }
    }, 50)
  }

  closeDemoFromRegister() {
    let opacity = 100
    let interval = setInterval(() => {
      opacity -= 10
      this.demoTarget.style.opacity = opacity / 100
      if (opacity <= 0) {
        clearInterval(interval)
        this.demoTarget.classList.add("hidden")
        this.registrationTarget.classList.remove("hidden")
        let registrationInterval = setInterval(() => {
          this.registrationTarget.style.opacity = this.demoOpacity / 100
          if (this.demoOpacity >= 100) {
            clearInterval(registrationInterval)
          }
        }, 50)
      }
    }, 50)
  }
}
