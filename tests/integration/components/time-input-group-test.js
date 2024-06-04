import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { fillIn, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | time-input-group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.time = new Date(Date.UTC(2015,3,10,12,40,0));
  });

  test('it renders', async function (assert) {
    await render(hbs`<TimeInputGroup @baseElementId='time-machine' @id='red-herring' @value={{this.time}} @minHour={{5}} @maxHour={{20}} />`);

    let hourInput = find('.time-input-group-hour');
    assert.strictEqual(hourInput.id, 'time-machine-hour', 'it has correct id');
    assert.strictEqual(hourInput.value, '12', 'it has correct value');

    let minuteInput = find('.time-input-group-minute');
    assert.strictEqual(minuteInput.id, 'time-machine-minute', 'it has correct id');
    assert.strictEqual(minuteInput.value, '40', 'it has correct value');
    assert.strictEqual(find('.time-input-group-meridian').textContent, 'pm');

    await fillIn('.time-input-group-hour', 13);

    assert.strictEqual(hourInput.value, '13', 'it has correct new hour value');

    await fillIn('.time-input-group-minute', 50);

    assert.strictEqual(minuteInput.value, '50', 'it has correct new minute value');
  });

  test ('it renders (morning time)', async function (assert) {
    this.time.setUTCHours(0);

    await render(hbs`<TimeInputGroup @baseElementId='time-machine' @value={{this.time}} @minHour={{5}} @maxHour={{20}} />`);

    assert.strictEqual(find('.time-input-group-meridian').textContent, 'am');
  });
});
