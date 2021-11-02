;(() => {
  console.log('tetrio preset loaded')

  const created_elements = []
  created_elements.push(document.querySelector('[src$="/tetrio-preset.js"]'))

  // fixing stuff by mapping them
  const fix = {
    'game.options.bagtype': {
      '7bag': '7-bag',
    }
  }

  // settings
  const read_select = (index) => {
    const value = document.querySelector(`[data-index="${index}"]`).innerHTML
    return fix[index] && fix[index][value] ? fix[index][value] : value
  }
  const read_checkbox = (index) => {
    const value = document.querySelector(`[data-index="${index}"]`).checked
    return fix[index] && fix[index][value] ? fix[index][value] : value
  }
  const read_number = (index) => {
    const value = document.querySelector(`[data-index="${index}"]`).value
    return fix[index] && fix[index][value] ? fix[index][value] : value
  }

  const read_preset_from_tetrio = () => {
    return {
      game: {
        options: {
          bagtype: read_select('game.options.bagtype'),
          spinbonuses: read_select('game.options.spinbonuses'),
          allow180: read_checkbox('game.options.allow180'),
          kickset: read_select('game.options.kickset'),
          allow_harddrop: read_checkbox('game.options.allow_harddrop'),
          display_next: read_checkbox('game.options.display_next'),
          display_hold: read_checkbox('game.options.display_hold'),
          nextcount: read_number('game.options.nextcount'),
          display_shadow: read_checkbox('game.options.display_shadow'),
          are: read_number('game.options.are'),
          lineclear_are: read_number('game.options.lineclear_are'),
          room_handling: read_checkbox('game.options.room_handling'),
          room_handling_arr: read_number('game.options.room_handling_arr'),
          room_handling_das: read_number('game.options.room_handling_das'),
          room_handling_sdf: read_number('game.options.room_handling_sdf'),

          g: read_number('game.options.g'),
          gincrease: read_number('game.options.gincrease'),
          gmargin: read_number('game.options.gmargin'),
          garbagemultiplier: read_number('game.options.garbagemultiplier'),
          garbagemargin: read_number('game.options.garbagemargin'),
          garbageincrease: read_number('game.options.garbageincrease'),
          locktime: read_number('game.options.locktime'),
          garbagespeed: read_number('game.options.garbagespeed'),
          garbagecap: read_number('game.options.garbagecap'),
          garbagecapincrease: read_number('game.options.garbagecapincrease'),
          garbagecapmax: read_number('game.options.garbagecapmax'),

          passthrough: read_checkbox('game.options.passthrough'),
          manual_allowed: read_checkbox('game.options.manual_allowed'),
          b2bchaining: read_checkbox('game.options.b2bchaining'),
          clutch: read_checkbox('game.options.clutch'),
        },
      },
    }
  }

  const write_select = (index, value) => {
    document.querySelector(`[data-index="${index}"]`).click()
    document.querySelector(`[data-id="${value}"]`).click()
  }
  const write_checkbox = (index, value) => {
    const el = document.querySelector(`[data-index="${index}"]`)
    if (el.checked !== value) {
      el.click()
    }
  }
  const write_number = (index, value) => {
    const el = document.querySelector(`[data-index="${index}"]`)
    el.value = value
    el.dispatchEvent(new Event('input'))
  }

  const write_preset_to_tetrio = (preset) => {
    write_select('game.options.bagtype', preset.game.options.bagtype)
    write_select('game.options.spinbonuses', preset.game.options.spinbonuses)
    write_checkbox('game.options.allow180', preset.game.options.allow180)
    write_select('game.options.kickset', preset.game.options.kickset)
    write_checkbox('game.options.allow_harddrop', preset.game.options.allow_harddrop)
    write_checkbox('game.options.display_next', preset.game.options.display_next)
    write_checkbox('game.options.display_hold', preset.game.options.display_hold)
    write_number('game.options.nextcount', preset.game.options.nextcount)
    write_checkbox('game.options.display_shadow', preset.game.options.display_shadow)
    write_number('game.options.are', preset.game.options.are)
    write_number('game.options.lineclear_are', preset.game.options.lineclear_are)
    write_checkbox('game.options.room_handling', preset.game.options.room_handling)
    write_number('game.options.room_handling_arr', preset.game.options.room_handling_arr)
    write_number('game.options.room_handling_das', preset.game.options.room_handling_das)
    write_number('game.options.room_handling_sdf', preset.game.options.room_handling_sdf)
    write_number('game.options.g', preset.game.options.g)
    write_number('game.options.gincrease', preset.game.options.gincrease)
    write_number('game.options.gmargin', preset.game.options.gmargin)
    write_number('game.options.garbagemultiplier', preset.game.options.garbagemultiplier)
    write_number('game.options.garbagemargin', preset.game.options.garbagemargin)
    write_number('game.options.garbageincrease', preset.game.options.garbageincrease)
    write_number('game.options.locktime', preset.game.options.locktime)
    write_number('game.options.garbagespeed', preset.game.options.garbagespeed)
    write_number('game.options.garbagecap', preset.game.options.garbagecap)
    write_number('game.options.garbagecapincrease', preset.game.options.garbagecapincrease)
    write_number('game.options.garbagecapmax', preset.game.options.garbagecapmax)
    write_checkbox('game.options.passthrough', preset.game.options.passthrough)
    write_checkbox('game.options.manual_allowed', preset.game.options.manual_allowed)
    write_checkbox('game.options.b2bchaining', preset.game.options.b2bchaining)
    write_checkbox('game.options.clutch', preset.game.options.clutch)
  }

  const init = () => {
    const load = () => JSON.parse(localStorage.getItem('tetrio_preset_presets') || '[]')
    const save = (presets) => localStorage.setItem('tetrio_preset_presets', JSON.stringify(presets))


    const wrapper = document.createElement('div')
    wrapper.classList.add('tetrio-preset-wrapper')
    document.body.appendChild(wrapper)
    created_elements.push(wrapper)

    const component = {
      data() {
        return {
          selectedPreset: '',
          presetName: 'New Preset',
          presets: [],
        }
      },
      template: `
      <div class="tetrio-preset-widget">
        <div v-if="presets.length" class="tetrio-preset-widget-row tetrio-preset-load-presets">
          <select v-model="selectedPreset">
            <option v-for="preset in presets">{{preset.name}}</option>
          </select>
          <button @click="onLoad">Load preset</button>
        </div>
        <div class="tetrio-preset-widget-row tetrio-preset-save-presets">
          <input type="text" v-model="presetName" />
          <button @click="onSave">Save preset</button>
        </div>
        <div class="tetrio-preset-widget-row tetrio-preset-close">
          <button @click="onClose">Close</button>
        </div>
      </div>
    `,
      methods: {
        onLoad() {
          console.log('loading preset', this.selectedPreset)
          let idx = this.presets.findIndex(p => p.name === this.selectedPreset)
          if (idx >= 0) {
            write_preset_to_tetrio(this.presets[idx].preset)
            console.log('finished writing preset to tetrio')
          } else {
            console.log('unable to find preset')
          }
        },
        onSave() {
          console.log('saving preset', this.presetName)
          let idx = this.presets.findIndex(p => p.name === this.presetName)
          if (idx >= 0) {
            this.presets[idx] = { name: this.presetName, preset: read_preset_from_tetrio() }
          } else {
            this.presets.push({ name: this.presetName, preset: read_preset_from_tetrio() })
          }
          console.log('finished reading preset from tetrio')
          save(this.presets)
          console.log('finished saving presets')
          if (this.selectedPreset === '') {
            this.selectedPreset = this.presets.length > 0 ? this.presets[0].name : ''
          }
        },
        onClose() {
          for (let el of created_elements) {
            if (el) {
              el.parentElement.removeChild(el)
            }
          }
        },
      },
      mounted() {
        this.presets = load()
        console.log('finished loading presets')

        this.selectedPreset = this.presets.length > 0 ? this.presets[0].name : ''
      },
    }
    Vue.createApp({ render() { return Vue.h(component) }}).mount(wrapper);
  }



  // vue
  const vue = document.createElement('script');
  vue.src = 'https://unpkg.com/vue@3.2.21/dist/vue.global.prod.js';
  vue.addEventListener("load", function(event) {
    init()
  });
  document.head.appendChild(vue);
  created_elements.push(vue)

  // custom CSS
  ;(() => {
    let el = document.getElementById('tetrio-preset-custom-css')
    if (el) {
      el.parentElement.removeChild(el)
    }
    el = document.createElement("style")
    el.id = 'tetrio-preset-custom-css'
    el.textContent = `
.tetrio-preset-wrapper {
  background-color: #eee;
  color: #222;
  position: fixed;
  z-index: 1000000;
}
.tetrio-preset-widget {
  padding: .5em;
}
.tetrio-preset-widget-row:not(:last-child) {
  margin-bottom: .5em;
}
.tetrio-preset-widget-row > *:not(:last-child) {
  margin-right: 0.5em;
}
`
    document.head.appendChild(el)

    created_elements.push(el)
  })()
})()

