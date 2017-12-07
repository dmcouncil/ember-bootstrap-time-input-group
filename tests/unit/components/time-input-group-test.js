import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('time-input-group', 'Unit | Component | time input group', {
  unit: true,
  needs: ['helper:eq'],
  setup: function() {
    this.component = this.subject({
      value: new Date(Date.UTC(2015,3,10,12,40,0)),
      id: 'time-machine'
    });
  }
});

/*** Rendered states ***/

test('rendered has hour input', function(assert) {
  let hourInput = this.$('.time-input-group-hour');
  assert.ok(hourInput.length, 'it exists');
  assert.equal(hourInput.attr('id'), 'time-machine-hour', 'it has correct id');
  assert.equal(hourInput.val(), 12, 'it has correct value');
});

test('rendered has minute input', function(assert) {
  let minuteInput = this.$('.time-input-group-minute');
  assert.ok(minuteInput.length, 'it exists');
  assert.equal(minuteInput.attr('id'), 'time-machine-minute', 'it has correct id');
  assert.equal(minuteInput.val(), 40, 'it has correct value');
});

test('rendered shows am if time is before noon', function(assert) {
  this.component.get('value').setUTCHours(0);
  assert.equal(this.$('.time-input-group-meridian').text(), 'am');
});

test('rendered shows am if time is after noon', function(assert) {
  assert.equal(this.$('.time-input-group-meridian').text(), 'pm');
});

/*** Methods ***/

test('#hourElementId', function(assert) {
  assert.equal(this.component.get('hourElementId'), 'time-machine-hour');
});

test('#minuteElementId', function(assert) {
  assert.equal(this.component.get('minuteElementId'), 'time-machine-minute');
});

test('#meridian is "am" if time is before noon', function(assert) {
  this.component.get('value').setUTCHours(0);
  assert.equal(this.component.get('meridian'), 'am');
});

test('#meridian is "pm" if time is after noon', function(assert) {
  assert.equal(this.component.get('meridian'), 'pm');
});

test('#hour (get)', function(assert) {
  assert.equal(this.component.get('hour'), 12);
});

test('#hour (get when null) fails gracefully', function(assert) {
  this.component.set('value', null);
  assert.equal(this.component.get('hour'), null);
});

test('#hour (set)', function(assert) {
  this.component.set('hour', 14);
  assert.equal(this.component.get('value').getUTCHours(), 14);
});

test('#minute (get)', function(assert) {
  assert.equal(this.component.get('minute'), 40);
});

test('#minute (set)', function(assert) {
  this.component.set('minute', 57);
  assert.equal(this.component.get('value').getUTCMinutes(), 57);
});

test('#hoursSelectionContent', function(assert) {
  assert.deepEqual(this.component.get('hoursSelectionContent'), [
    {
      "label": "am",
      "content": [
        { "label": "12", "value": 0  },
        { "label": "1" , "value": 1  },
        { "label": "2" , "value": 2  },
        { "label": "3" , "value": 3  },
        { "label": "4" , "value": 4  },
        { "label": "5" , "value": 5  },
        { "label": "6" , "value": 6  },
        { "label": "7" , "value": 7  },
        { "label": "8" , "value": 8  },
        { "label": "9" , "value": 9  },
        { "label": "10", "value": 10 },
        { "label": "11", "value": 11 }
      ]
    },
    {
      "label": "pm",
      "content": [
        { "label": "12", "value": 12 },
        { "label": "1" , "value": 13 },
        { "label": "2" , "value": 14 },
        { "label": "3" , "value": 15 },
        { "label": "4" , "value": 16 },
        { "label": "5" , "value": 17 },
        { "label": "6" , "value": 18 },
        { "label": "7" , "value": 19 },
        { "label": "8" , "value": 20 },
        { "label": "9" , "value": 21 },
        { "label": "10", "value": 22 },
        { "label": "11", "value": 23 }
      ]
    }
  ]);
});

test('#hoursSelectionContent with min and max', function(assert) {
  this.component.set('minHour', 10);
  this.component.set('maxHour', 14);
  assert.deepEqual(this.component.get('hoursSelectionContent'), [
    {
      "label": "am",
      "content": [
        { "label": "10", "value": 10 },
        { "label": "11", "value": 11 }
      ]
    },
    {
      "label": "pm",
      "content": [
        { "label": "12", "value": 12 },
        { "label": "1" , "value": 13 }
      ]
    }
  ]);
});

test('#minutesSelectionContent', function(assert) {
  let minutes = this.component.get('minutesSelectionContent');
  assert.equal(minutes.length, 60, 'it has 60 minutes');
  assert.deepEqual(minutes[0], { "label": "00", "value": 0  }, 'correct first minute');
  assert.deepEqual(minutes[59], { "label": "59", "value": 59 }, 'correct last minute');
});
