import Vue from 'vue'

export default function toggleTheme() {
      const returnTheme = Vue.$vs.toggleTheme()
      this.setTheme(returnTheme)

      if (returnTheme == 'dark') {
        document.body.classList.remove('light-color')
        document.body.classList.add('darken', 'dark-color')
      } else {
        document.body.classList.remove('darken')
        document.body.classList.add('light-color')
      }
}
DOMTokenList ['vs-remove-transition', value: 'vs-remove-transition']
0: "light-color"
length: 1
value: "light-color"
[[Prototype]]: DOMTokenList
DOMTokenList ['vs-remove-transition', value: 'vs-remove-transition']
0: "light-color"
length: 1
value: "light-color"
[[Prototype]]: DOMTokenList
