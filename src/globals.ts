// globals.ts
'use strict';
// import { displayName, description, homepage } from 'package.json';
// export { displayName, description, homepage };

export const UI = Object.freeze({
  buttons: {
    discard: { text: 'Discard', role: 'destructive' },
    close: { text: 'Close', role: 'cancel' },
    info: { text: 'More info', role: 'destructive' }
  },
  ACTIONS: {
    cancel: { text: 'Cancel', role: 'cancel' },
    delete: { text: 'Delete', role: 'destructive' },
    edit: { text: 'Edit', role: 'destructive' },
    undo: { text: 'Undo', role: 'destructive' }
  }
});
