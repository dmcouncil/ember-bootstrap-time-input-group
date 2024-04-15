import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';

module('Unit | Component | time-input-group', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.component = this.owner.factoryFor('component:time-input-group').create({
      value: new Date(Date.UTC(2015,3,10,12,40,0)),
      id: 'time-machine'
    });
  });

  test('#hour (get)', function(assert) {
    assert.strictEqual(this.component.get('hour'), 12);
  });

  test('#hour (get when null) fails gracefully', function(assert) {
    this.component.set('value', null);
    assert.ok(!!this.component.get('hour'), 'the return value is not null');
  });

  test('#hour (set)', function(assert) {
    this.component.set('hour', 14);
    assert.strictEqual(this.component.get('value').getUTCHours(), 14);
    assert.strictEqual(this.component.get('hour'), 14);
  });

  test('#minute (get)', function(assert) {
    assert.strictEqual(this.component.get('minute'), 40);
  });

  test('#minute (set)', function(assert) {
    this.component.set('minute', 57);
    assert.strictEqual(this.component.get('value').getUTCMinutes(), 57);
    assert.strictEqual(this.component.get('minute'), 57);
  });

  test('#minute (get when null) fails gracefully', function(assert) {
    this.component.set('value', null);
    assert.ok(!!this.component.get('minute'), 'the return value is not null');
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
    assert.strictEqual(minutes.length, 60, 'it has 60 minutes');
    assert.deepEqual(minutes[0], { "label": "00", "value": 0  }, 'correct first minute');
    assert.deepEqual(minutes[59], { "label": "59", "value": 59 }, 'correct last minute');
  });
});
