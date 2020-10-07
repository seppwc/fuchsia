import { FuchsiaFactory } from '../FuchsiaFactory';
import { FuchsiaApplication } from '../FuchsiaApplication';
import { Controller } from '@fuchsiajs/common';

describe('Fuchsia Factory Create', () => {
  it('should accept a controller return a FuchsiaApplication', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
    });
    expect(app).toBeInstanceOf(FuchsiaApplication);
  });

  it.each([
    [{ port: 1234 }, 1234],
    [{}, 8000],
  ])(
    'should take %o port setting in config and set application setting or 8000',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: a,
      });
      expect(app.port).toBe(expected);
    }
  );

  it.skip.each([
    [{ json: true }, true],
    [{ json: { strict: true } }, 'strict'],
    [{ json: { inflate: true } }, 'inflate'],
    [{ json: { limit: 200 } }, 200],
    [{ json: { type: '*/json' } }, '*/json'],
  ])(
    'should take %o object in config and set JSON settings',
    async (a, expected) => {
      for (const [key] of Object.entries(a)) {
        const app = await FuchsiaFactory.create({
          controllers: [new Controller({ path: '' }, [])],
          config: a,
        });
        expect(app.settings[key]).toBe(expected);
      }
    }
  );

  it.skip.each([
    [{ urlEncoded: { extended: true } }, { extended: true }],
    [{ urlEncoded: { inflate: true } }, { inflate: true }],
    [{ urlEncoded: { limit: 200 } }, { limit: 200 }],
    [{ urlEncoded: { limit: '200KB' } }, { limit: '200KB' }],
    [{ urlEncoded: { parameterLimit: 2000 } }, { parameterLimit: 2000 }],
    [
      { urlEncoded: { type: 'application/x-www-form-urlencoded' } },
      { type: 'application/x-www-form-urlencoded' },
    ],
  ])(
    'should take %o object in config and set urlEncoded settings',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: a,
      });

      const [key] = Object.entries(a);
      const [k, v] = key;
      console.log(k, v);

      expect(app.settings['hi']).toBe(expected);
    }
  );

  it.skip.each([
    [{ static: 'public' }, 'public'],
    [{ static: { dotfiles: 'allow' } }, { dotfiles: 'allow' }],
    [{ static: { etag: true } }, { etag: true }],
  ])(
    'should take %o object in config and set static settings',
    async (a, expected) => {
      for (const [key] of Object.entries(a)) {
        const app = await FuchsiaFactory.create({
          controllers: [new Controller({ path: '' }, [])],
          config: { a },
        });
        expect(app.settings[key]).toBe(expected);
      }
    }
  );
});
