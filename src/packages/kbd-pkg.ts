import { BasePkg } from './base-pkg';
import { IPackage } from './interface';

export class KbdPkg extends BasePkg implements IPackage {
  public name = '@easepick/kbd-plugin';
  public description = 'Adds keyboard navigation.';
  public url = 'https://easepick.com/packages/kbd-plugin';
  public optionKey = 'KbdPlugin';
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/kbd-plugin',
    ],
    cdn: [
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/kbd-plugin@[version]/dist/index.umd.min.js"></script>',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'unitIndex',
            default: 1,
            type: 'number',
            configurable: true,
          },
          {
            name: 'dayIndex',
            default: 2,
            type: 'number',
            configurable: true,
          },
        ],
      }
    ];
  }
}