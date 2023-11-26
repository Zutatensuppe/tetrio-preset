;(() => {
  console.log('tetrio preset loaded')

  const created_elements = []
  created_elements.push(document.querySelector('[src$="/tetrio-preset.js"]'))

  // fixing stuff by mapping them
  const fix = {
    'options.bagtype': {
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
      options: {
        bagtype: read_select('options.bagtype'),
        spinbonuses: read_select('options.spinbonuses'),
        allow180: read_checkbox('options.allow180'),
        kickset: read_select('options.kickset'),
        allow_harddrop: read_checkbox('options.allow_harddrop'),
        display_next: read_checkbox('options.display_next'),
        display_hold: read_checkbox('options.display_hold'),
        nextcount: read_number('options.nextcount'),
        display_shadow: read_checkbox('options.display_shadow'),
        are: read_number('options.are'),
        lineclear_are: read_number('options.lineclear_are'),
        room_handling: read_checkbox('options.room_handling'),
        room_handling_arr: read_number('options.room_handling_arr'),
        room_handling_das: read_number('options.room_handling_das'),
        room_handling_sdf: read_number('options.room_handling_sdf'),

        g: read_number('options.g'),
        gincrease: read_number('options.gincrease'),
        gmargin: read_number('options.gmargin'),
        garbagemultiplier: read_number('options.garbagemultiplier'),
        garbagemargin: read_number('options.garbagemargin'),
        garbageincrease: read_number('options.garbageincrease'),
        locktime: read_number('options.locktime'),
        garbagespeed: read_number('options.garbagespeed'),
        garbagecap: read_number('options.garbagecap'),
        garbagecapincrease: read_number('options.garbagecapincrease'),
        garbagecapmax: read_number('options.garbagecapmax'),

        passthrough: read_checkbox('options.passthrough'),
        manual_allowed: read_checkbox('options.manual_allowed'),
        b2bchaining: read_checkbox('options.b2bchaining'),
        clutch: read_checkbox('options.clutch'),
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
    write_select('options.bagtype', preset.options.bagtype)
    write_select('options.spinbonuses', preset.options.spinbonuses)
    write_checkbox('options.allow180', preset.options.allow180)
    write_select('options.kickset', preset.options.kickset)
    write_checkbox('options.allow_harddrop', preset.options.allow_harddrop)
    write_checkbox('options.display_next', preset.options.display_next)
    write_checkbox('options.display_hold', preset.options.display_hold)
    write_number('options.nextcount', preset.options.nextcount)
    write_checkbox('options.display_shadow', preset.options.display_shadow)
    write_number('options.are', preset.options.are)
    write_number('options.lineclear_are', preset.options.lineclear_are)
    write_checkbox('options.room_handling', preset.options.room_handling)
    write_number('options.room_handling_arr', preset.options.room_handling_arr)
    write_number('options.room_handling_das', preset.options.room_handling_das)
    write_number('options.room_handling_sdf', preset.options.room_handling_sdf)
    write_number('options.g', preset.options.g)
    write_number('options.gincrease', preset.options.gincrease)
    write_number('options.gmargin', preset.options.gmargin)
    write_number('options.garbagemultiplier', preset.options.garbagemultiplier)
    write_number('options.garbagemargin', preset.options.garbagemargin)
    write_number('options.garbageincrease', preset.options.garbageincrease)
    write_number('options.locktime', preset.options.locktime)
    write_number('options.garbagespeed', preset.options.garbagespeed)
    write_number('options.garbagecap', preset.options.garbagecap)
    write_number('options.garbagecapincrease', preset.options.garbagecapincrease)
    write_number('options.garbagecapmax', preset.options.garbagecapmax)
    write_checkbox('options.passthrough', preset.options.passthrough)
    write_checkbox('options.manual_allowed', preset.options.manual_allowed)
    write_checkbox('options.b2bchaining', preset.options.b2bchaining)
    write_checkbox('options.clutch', preset.options.clutch)
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

