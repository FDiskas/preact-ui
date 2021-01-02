// eslint-disable-next-line no-unused-vars
const handlers: { [key: string]: (...args: any[]) => void } = {};
const altMock = {
  emitView: (name: string, ...args: any[]) => {
    if (typeof handlers[name] === 'function') {
      handlers[name](...args);
      console.log('Event emitted: ', name, args);
    } else {
      console.warn('There is no such handler: ' + name);
    }
  },
  emit: (...args: any[]) => {
    console.log(args);
  },
  // eslint-disable-next-line no-unused-vars
  on: (name: string, cb: (data?: any) => void) => {
    handlers[name] = cb;
    console.log('.on(', name, ')');
  },
  off: (name: string, cb: () => void) => {
    if (handlers[name] === cb) {
      delete handlers[name];
      console.log(`.off('${name}')`);
    }
  },
};

window.alt = window.alt ?? altMock;
//
// if (typeof alt === 'undefined') {
//   window.alt = altMock;
// }
