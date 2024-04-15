# ember-bootstrap-time-input-group

[![Build Status](https://travis-ci.org/dmcouncil/ember-bootstrap-time-input-group.svg?branch=master)](https://travis-ci.org/dmcouncil/ember-bootstrap-time-input-group)

This Ember CLI addon provides a component with a time input for forms. It differs from existing inputs in the way it presents hours: rather than using 24-hour time (numbering hours from 00 to 23) or inserting the meridian label into the select menu (e.g. menu options of 10am, 11am, 12pm, 1pm, which leads to menus displaying a time such as "1pm:05" which is awkward), the hours are displayed using the "optgroup" tag, which provides the hours like this:

    am
      1
      2
      3
      ...
    pm
      12
      1
      2
      3
      etc.

## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above


## Installation

```
ember install ember-bootstrap-time-input-group
```


## Usage

To use the component, insert this in your template:

    <TimeInputGroup @id='my_element_id_base' @value={{my_value}} @minHour={{my_min}} @maxHour={{my_max}} @saveAction={{my_save_action}} /> 

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
