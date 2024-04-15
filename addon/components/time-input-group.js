import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['time-input-group', 'form-inline'],

  actions: {
    hourInputChanged(target) {
      this.set('hour', parseInt(target.value));
    },
    minuteInputChanged(target) {
      this.set('minute', parseInt(target.value));
    }
  },

  hourElementId: computed('id', function() {
    return this.id + '-hour';
  }),

  minuteElementId: computed('id', function() {
    return this.id + '-minute';
  }),

  meridian: computed('hour', function() {
    return (this.hour >= 12) ? 'pm' : 'am';
  }),

  hour: computed('value', {
    get() {
      if (this.value) {
        return this.value.getUTCHours();
      } else {
        return new Date().getHours();
      }
    },
    set(key, value, previousValue) {
      if (value !== previousValue) {
        let newVal = this._cloneDate(this.value);
        newVal.setUTCHours(value);
        this.set('value', newVal);
        if (this.saveAction) {
          this.saveAction();
        }
      }
      return value;
    }
  }),

  minute: computed('value', {
    get() {
      if (this.value) {
        return this.value.getUTCMinutes();
      } else {
        return new Date().getMinutes();
      }
    },
    set(key, value, previousValue) {
      if (value !== previousValue) {
        let newVal = this._cloneDate(this.value);
        newVal.setUTCMinutes(value);
        this.set('value', newVal);
        if (this.saveAction) {
          this.saveAction();
        }
      }
      return value;
    }
  }),

  hoursSelectionContent: computed('maxHour', 'minHour', function() {
    let label, periods = [
      { label: "am", content: [] },
      { label: "pm", content: [] }
    ];
    let minHour = this.minHour || 0;
    let maxHour = this.maxHour || 24;
    for (let i = minHour; i < maxHour; i++) {
      label = (i % 12 === 0) ? '12' : ''+(i % 12);
      let periodIdx = (parseInt(i / 12) === 0) ? 0 : 1;
      periods[periodIdx].content.push({ value: i, label: label });
    }
    return periods;
  }),

  minutesSelectionContent: computed(function() {
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push({ value: i, label: ('0'+i).slice(-2) });
    }
    return minutes;
  }),

// private

  _cloneDate: function(jsDate) {
    let newVal = new Date();
    newVal.setTime(jsDate.getTime());
    return newVal;
  }

});
