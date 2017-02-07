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

Use `ember install ember-bootstrap-time-input-group` to make the component available in your Ember CLI app. To use the component, insert this in your template:

    {{time-input-group}}

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## About

ember-bootstrap-time-input-group was developed at [District Management Group](https://dmgroupK12.com).
