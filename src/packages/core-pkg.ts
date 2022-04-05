import { BasePkg } from './base-pkg';
import { IPackage } from '../interface';

export class CorePkg extends BasePkg implements IPackage {
  public name = '@easepick/core';
  public description = 'Main package of easepick.';
  public url = 'https://easepick.com/packages/core';
  public included = true;
  public setup = {
    npm: [
      'npm install @easepick/core',
    ],
    cdn: [
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version]/dist/index.umd.min.js"></script>',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [

          {
            name: 'element',
            configurable: false,
          },
          {
            name: 'doc',
            configurable: false,
          },
          {
            name: 'css',
            configurable: false,
          },
          {
            name: 'firstDay',
            info: 'Day of start week',
            default: 1,
            type: 'dropdown',
            values: [
              { text: 'Monday', value: 1 },
              { text: 'Tuesday', value: 2 },
              { text: 'Wednesday', value: 3 },
              { text: 'Thursday', value: 4 },
              { text: 'Friday', value: 5 },
              { text: 'Saturday', value: 6 },
              { text: 'Sunday', value: 0 },
            ],
            configurable: true,
          },
          {
            name: 'lang',
            info: 'Language',
            default: 'en-US',
            type: 'dropdown',
            values: [
              'en-US',
              'ru-RU',
              'fr-FR',
              'de-DE',
              'ja-JP',
            ],
            configurable: true,
          },
          {
            name: 'date',
            configurable: false,
          },
          {
            name: 'format',
            info: 'The default output format',
            default: 'YYYY-MM-DD',
            type: 'dropdown',
            values: [
              'YYYY-MM-DD',
              'DD MMM YYYY',
              'DD MMMM YYYY',
              'HH:mm, DD/MM/YY',
            ],
            configurable: true,
          },
          {
            name: 'grid',
            info: 'Number of calendar columns',
            default: 1,
            type: 'range',
            min: 1,
            max: 12,
            configurable: true,
          },
          {
            name: 'calendars',
            info: 'Number of visible months',
            default: 1,
            type: 'range',
            min: 1,
            max: 12,
            configurable: true,
          },
          {
            name: 'readonly',
            info: 'Add readonly attribute to element',
            default: true,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'autoApply',
            info: 'Hide the apply and cancel buttons',
            default: true,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'zIndex',
            info: 'zIndex of picker',
            default: 10,
            type: 'number',
            configurable: true,
          },
          {
            name: 'inline',
            info: 'Show calendar inline',
            default: false,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'header',
            info: 'Add header to calendar',
            default: null,
            type: 'text',
            configurable: true,
          },
        ],
      },
      {
        configurable: true,
        name: 'locale',
        children: [
          {
            name: 'previousMonth',
            default: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
            type: 'text',
            configurable: true,
          },
          {
            name: 'nextMonth',
            default: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
            type: 'text',
            configurable: true,
          },
          {
            name: 'cancel',
            default: 'Cancel',
            type: 'text',
            configurable: true,
            requirements: {
              depends: [
                { autoApply: false },
              ],
            },
          },
          {
            name: 'apply',
            default: 'Apply',
            type: 'text',
            configurable: true,
            requirements: {
              depends: [
                { autoApply: false },
              ],
            },
          },
        ]
      },
      {
        configurable: true,
        children: [
          {
            name: 'documentClick',
            configurable: false,
          },
          {
            name: 'setup',
            configurable: false,
          },
          {
            name: 'plugins',
            configurable: false,
          },
        ]
      },
    ]
  }
}