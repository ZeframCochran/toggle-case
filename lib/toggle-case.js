'use babel';

import CapsLocCapitalizeView from './toggle-case-view';
import { CompositeDisposable } from 'atom';

export default {

  capsLocCapitalizeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
      // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'toggle-case:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      let ranges = editor.getSelectedBufferRanges();
      let switchedCase = selection.split("").map((x)=>{if(x==x.toLowerCase()){return x.toUpperCase()} else {return x.toLowerCase()}}).join("");
      editor.insertText(switchedCase);
      editor.setSelectedBufferRanges(ranges);
    };
  }
};
