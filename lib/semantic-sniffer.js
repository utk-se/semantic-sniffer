'use babel';

import SemanticSnifferView from './semantic-sniffer-view';
import { CompositeDisposable } from 'atom';

export default {

  semanticSnifferView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.semanticSnifferView = new SemanticSnifferView(state.semanticSnifferViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.semanticSnifferView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'semantic-sniffer:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.semanticSnifferView.destroy();
  },

  serialize() {
    return {
      semanticSnifferViewState: this.semanticSnifferView.serialize()
    };
  },

  toggle() {
    console.log('SemanticSniffer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
