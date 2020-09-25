import { FuchsiaFactory } from '../FuchsiaFactory';
import { FuchsiaApplication } from '../FuchsiaApplication';
import { Controller } from '@fuchsiajs/common';

describe('Fuchsia Factory Create', () => {
  it('should accept a controller return a FuchsiaApplication', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
    });
    expect(app).toBeInstanceOf(String);
  });

  it('should accept a config property (PORT) and set the port accordingly', async () => {
    const app = await FuchsiaFactory.create({
      controllers: [new Controller({ path: '' }, [])],
      config: { port: 1111 },
    });

    expect(app.port).toBe(1111);
  });
});
