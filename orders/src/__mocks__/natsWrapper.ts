/***************
Fake nats wrapper for testing purposes.
has a client property with a publish method. This simulates the actual event
publishing built into the routes.
***************/

export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation(
      (subject: string, data: string, callback: () => void) => {
        callback();
      }
    ),
  },
};
