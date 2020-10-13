import { FuchsiaFactory } from '../FuchsiaFactory';
import { FuchsiaApplication } from '../FuchsiaApplication';
import { Controller } from '@fuchsiajs/common';
import { IJsonOptions, IStaticOptions } from '../interfaces';

describe('Fuchsia Factory Create', () => {
  it('should accept a controller return a FuchsiaApplication', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
    });
    expect(app).toBeInstanceOf(FuchsiaApplication);
  });

  it.each([
    [{ port: 1234 }, 1234],
    [{}, 8080],
  ])(
    'should take %o port setting in config and set application setting or 8000',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: a,
      });
      expect(app.settings.port).toBe(expected);
    }
  );

  it('', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
      config: {
        json: true,
      },
    });
    expect(app.settings.json).toBe(true);
  });

  it.each([
    [{ strict: true }, true],
    [{ inflate: true }, true],
    [{ limit: 200 }, 200],
    [{ type: '*/json' }, '*/json'],
  ])(
    'should take %o object in config and set JSON settings',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: {
          json: a,
        },
      });
      expect(Object.entries(app.settings.json)[0][1]).toBe(expected);
    }
  );

  it.each([
    [{ extended: false }, false],
    [{ inflate: true }, true],
    [{ limit: 200 }, 200],
    [{ limit: '200KB' }, '200KB'],
    [{ parameterLimit: 2000 }, 2000],
    [
      { type: 'application/x-www-form-urlencoded' },
      'application/x-www-form-urlencoded',
    ],
  ])(
    'should take %o object in config and set urlEncoded settings',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: { urlEncoded: a },
      });
    
      if(Object.entries(app.settings.urlEncoded).length > 1) {
        expect(Object.entries(app.settings.urlEncoded)[1][1]).toBe(expected)
      } else {
        expect(Object.entries(app.settings.urlEncoded)[0][1]).toBe(expected)
      }

      
    }
  );

  it('should take a single string for static param', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
      config: { static: 'publictest' },
    });
    expect(app.settings.static).toBe('publictest');
  });

  it.each([
    [{ root: 'public', dotfiles: 'allow' }, 'allow'],
    [{ root: 'public', etag: true }, true],
  ])(
    'should take %o object in config and set static settings',
    async (a, expected) => {
      const app = await FuchsiaFactory.create({
        controllers: [new Controller({ path: '' }, [])],
        config: { static: a as Partial<IStaticOptions> },
      });

      expect(Object.entries(app.settings.static)[1][1]).toBe(expected);
    }
  );
});
