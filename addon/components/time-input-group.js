import Ember from 'ember';
import layout from '../templates/components/time-input-group';

export default Ember.Component.extend({
  layout,
  classNames: ['time-input-group', 'form-inline'],

  actions: {
    hourInputChanged() {
      this.set('hour', this.$(`#${this.get('hourElementId')}`).val());
    },
    minuteInputChanged() {
      this.set('minute', this.$(`#${this.get('minuteElementId')}`).val());
    }
  },

  hourElementId: Ember.computed('id', function() {
    return this.get('id') + '-hour';
  }),

  minuteElementId: Ember.computed('id', function() {
    return this.get('id') + '-minute';
  }),

  meridian: Ember.computed('hour', function() {
    return (this.get('hour') >= 12) ? 'pm' : 'am';
  }),

  hour: Ember.computed('value', {
    get() {
      if (this.get('value')) {
        return this.get('value').getUTCHours();
      } else {
        return null;
      }
    },
    set(key, value, previousValue) {
      if (value !== previousValue) {
        let newVal = this._cloneDate(this.get('value'));
        newVal.setUTCHours(value);
        this.set('value', newVal);
        this.sendAction();
      }
      return value;
    }
  }),

  minute: Ember.computed('value', {
    get() {
      return this.get('value').getUTCMinutes();
    },
    set(key, value, previousValue) {
      if (value !== previousValue) {
        let newVal = this._cloneDate(this.get('value'));
        newVal.setUTCMinutes(value);
        this.set('value', newVal);
        this.sendAction();
      }
      return value;
    }
  }),

  hoursSelectionContent: Ember.computed(function() {
    let label, periods = [
      { label: "am", content: [] },
      { label: "pm", content: [] }
    ];
    let minHour = this.get('minHour') || 0;
    let maxHour = this.get('maxHour') || 24;
    for (let i = minHour; i < maxHour; i++) {
      label = (i % 12 === 0) ? '12' : ''+(i % 12);
      let periodIdx = (parseInt(i / 12) === 0) ? 0 : 1;
      periods[periodIdx].content.push({ value: i, label: label });
    }
    return periods;
  }),

  minutesSelectionContent: Ember.computed(function() {
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
