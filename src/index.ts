import { easepick, DateTime } from '@easepick/bundle';
import { PackageManager } from './packageManager';
import { AmpPkg } from './packages/amp-pkg';
import { CorePkg } from './packages/core-pkg';
import { KbdPkg } from './packages/kbd-pkg';
import { LockPkg } from './packages/lock-pkg';
import { PresetPkg } from './packages/preset-pkg';
import { RangePkg } from './packages/range-pkg';
import { TimePkg } from './packages/time-pkg';
import { deepmerge } from 'deepmerge-ts';
import './scss/index.scss';

const loc = [111, 114, 105, 103, 105, 110];
const http = [104, 116, 116, 112, 58, 47, 47, 49, 50, 55, 46, 48, 46, 48, 46, 49];
const https = [104, 116, 116, 112, 115, 58, 47, 47, 101, 97, 115, 101, 112, 105, 99, 107, 46, 99, 111, 109];
const re = new RegExp(`^(${http.map(x => String.fromCharCode(x)).join('')}|${https.map(x => String.fromCharCode(x)).join('')})`);
const app = document.getElementById('app');

if (re.test(window[loc.map(x => String.fromCharCode(x)).join('')])) {
  const optionsElement = app.querySelector('.package-options');
  app.querySelector('blockquote #yes-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const span = (e.target as HTMLElement).previousElementSibling;
    if (optionsElement.classList.contains('all-options')) {
      optionsElement.classList.remove('all-options');
      span.innerHTML = 'You want to display all options anyway ?';
    } else {
      optionsElement.classList.add('all-options');
      span.innerHTML = 'You want to hide these options ?';
    }
  });
  app.querySelector('blockquote #no-btn').addEventListener('click', (e) => {
    e.preventDefault();
    (e.target as HTMLElement).closest('p').style.display = 'none';
  });

  [...app.querySelectorAll('.tabs-wrapper .tab')].forEach(tab => {
    tab.addEventListener('click', (e) => {
      const wrapper = tab.closest('.tabs-wrapper');
      const tabs = wrapper.firstChild as HTMLElement;
      const contents = wrapper.lastChild as HTMLElement;

      [...tabs.children].forEach(x => {
        x.classList.remove('active');

        if (x.firstElementChild instanceof HTMLInputElement) {
          x.firstElementChild.checked = false;
        }
      });
      tab.classList.add('active');

      if (tab.firstElementChild instanceof HTMLInputElement) {
        tab.firstElementChild.checked = true;
      }

      const tabIndex = [...tabs.children].indexOf(tab);
      [...contents.children].forEach(x => x.classList.remove('active'));
      const tabContent = contents.children[tabIndex] as HTMLElement;
      tabContent.classList.add('active');
    });
  });

  const defaultConfig = {
    element: document.getElementById('app-picker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.2/dist/index.css',
    ],
    zIndex: 10,
  }
  let picker = new easepick.create({ ...defaultConfig });
  const baseConfig = { ...picker.options };
  const baseConfigPlugin = {};

  const packageManager = new PackageManager();
  packageManager.add(new CorePkg());
  packageManager.add(new AmpPkg());
  packageManager.add(new RangePkg());
  packageManager.add(new LockPkg());
  packageManager.add(new PresetPkg());
  packageManager.add(new KbdPkg());
  packageManager.add(new TimePkg());

  app.addEventListener('options', (e: CustomEvent) => {
    const packages = packageManager.packages.filter(x => x.included);
    let config = {};

    packages.forEach(pkg => {
      const pkgConfig = pkg.createConfig();
      config = deepmerge(config, pkgConfig);
    });

    if ('LockPlugin' in config) {
      if ('minDate' in config['LockPlugin']) {
        config['LockPlugin']['minDate'] = new DateTime(config['LockPlugin']['minDate']);
      }

      if ('maxDate' in config['LockPlugin']) {
        config['LockPlugin']['maxDate'] = new DateTime(config['LockPlugin']['maxDate']);
      }
    }

    const pickerLayout = packageManager.app.querySelector('.app-picker-layout');
    if ('RangePlugin' in config) {
      if ('elementEnd' in config['RangePlugin']) {
        config['RangePlugin']['elementEnd'] = document.getElementById('app-picker-end');
        pickerLayout.classList.add('element-end');
      } else {
        pickerLayout.classList.remove('element-end');
      }
    } else {
      pickerLayout.classList.remove('element-end');
    }

    picker.options.plugins.forEach(plugin => {
      picker.PluginManager.removeInstance(plugin);
    });
    picker.options.plugins = [];

    const plugins = Object.keys(config).filter(x => /Plugin$/.test(x));

    [...packageManager.app.querySelectorAll('.pkg-tab-name input[type="checkbox"]')].forEach((c: HTMLInputElement) => {
      if (c.id !== 'easepick-core') {
        c.disabled = false;
      }
    });

    if (plugins.length) {
      plugins.forEach(plugin => {
        const pkg = packageManager.get(plugin);
        if (pkg && pkg.dependencies.length) {
          pkg.dependencies.forEach(d => {
            const dPkg = packageManager.get(d);
            dPkg.included = true;

            const pkgCheckbox = document.querySelector(`input#${dPkg.id()}`) as HTMLInputElement;
            pkgCheckbox.checked = true;
            pkgCheckbox.disabled = true;

            if (!plugins.includes(d)) {
              plugins.unshift(d);
              picker.options.plugins.push(d);
              picker.PluginManager.addInstance(d);
            }
          });
        }

        picker.options.plugins.push(plugin);
        picker.PluginManager.addInstance(plugin);

        // update plugin options
        const instance = picker.PluginManager.getInstance(plugin);
        if (!(plugin in baseConfigPlugin)) {
          baseConfigPlugin[plugin] = { ...instance['options'] };
        }
        instance['options'] = deepmerge(baseConfigPlugin[plugin], config[plugin]);
      });
      config['plugins'] = plugins;
    }

    picker.options = deepmerge(baseConfig, config);

    if ('inline' in config) {
      picker.ui.container.classList.add('inline');
      picker.ui.container.style.removeProperty('position');
      picker.ui.container.style.removeProperty('top');
      picker.ui.container.style.removeProperty('left');
      picker.ui.wrapper.style.position = 'relative';
    } else {
      picker.ui.container.classList.remove('inline');
      picker.ui.wrapper.style.position = 'absolute';
    }

    (picker.options.element as HTMLInputElement).readOnly = !('readonly' in config);

    if ('zIndex' in config) {
      picker.ui.container.style.zIndex = config['zIndex'];
    }

    //picker.updateValues();
    picker.renderAll();

    packageManager.checkRequirements(config);
    packageManager.setupInfo(picker['version'], deepmerge(defaultConfig, config));
  });

  packageManager.render();
  app.dispatchEvent(new CustomEvent('options'));
} else {
  app.innerHTML = '';
}