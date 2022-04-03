import { BasePkg } from './base-pkg';
import { IPackage } from './interface';

export class RangePkg extends BasePkg implements IPackage {
  public name = '@easepick/range-plugin';
  public description = 'Adds the ability to select a range of dates.';
  public url = 'https://easepick.com/packages/range-plugin';
  public optionKey = 'RangePlugin';
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/range-plugin',
    ],
    cdn: [
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version]/dist/index.umd.min.js"></script>',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'elementEnd',
            default: false,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'startDate',
            configurable: false,
          },
          {
            name: 'endDate',
            configurable: false,
          },
          {
            name: 'repick',
            default: false,
            type: 'boolean',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: { elementEnd: '#checkout' } },
              ],
            },
          },
          {
            name: 'strict',
            default: true,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'delimiter',
            default: ' - ',
            type: 'text',
            configurable: true,
          },
          {
            name: 'tooltip',
            default: true,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'tooltipNumber',
            configurable: false,
          },
        ]
      },
      {
        name: 'locale',
        configurable: true,
        children: [
          {
            name: 'zero',
            default: '',
            type: 'text',
            configurable: true,
            requirements: {
              conflict: [
                { RangePlugin: { tooltip: false } },
              ]
            },
          },
          {
            name: 'one',
            default: 'day',
            type: 'text',
            configurable: true,
            requirements: {
              conflict: [
                { RangePlugin: { tooltip: false } },
              ]
            },
          },
          {
            name: 'two',
            default: '',
            type: 'text',
            configurable: true,
            requirements: {
              conflict: [
                { RangePlugin: { tooltip: false } },
              ]
            },
          },
          {
            name: 'few',
            default: '',
            type: 'text',
            configurable: true,
            requirements: {
              conflict: [
                { RangePlugin: { tooltip: false } },
              ]
            },
          },
          {
            name: 'other',
            default: 'days',
            type: 'text',
            configurable: true,
            requirements: {
              conflict: [
                { RangePlugin: { tooltip: false } },
              ]
            },
          },
        ],
      }
    ];
  }
}