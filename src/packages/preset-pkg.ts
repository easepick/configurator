import { BasePkg } from './base-pkg';
import { IPackage } from '../interface';

export class PresetPkg extends BasePkg implements IPackage {
  public name = '@easepick/preset-plugin';
  public description = 'Adds predefined ranges.';
  public url = 'https://easepick.com/packages/preset-plugin';
  public optionKey = 'PresetPlugin';
  public dependencies = ['RangePlugin'];
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/range-plugin',
      'npm install @easepick/preset-plugin',
    ],
    cdn: [
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version]/dist/index.umd.min.js"></script>',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'customPreset',
            configurable: false,
          },
          {
            name: 'customLabels',
            configurable: false,
          },
          {
            name: 'position',
            default: 'left',
            type: 'dropdown',
            values: [
              'left',
              'top',
              'right',
              'bottom',
            ],
            configurable: true,
          },
        ],
      }
    ];
  }
}