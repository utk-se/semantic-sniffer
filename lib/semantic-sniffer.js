'use babel';

import SemanticSnifferView from './semantic-sniffer-view';
import {
  CompositeDisposable,
  DisplayMarker,
  DisplayMarkerLayer,
  TextEditor,
} from 'atom';

/*
https://flight-manual.atom.io/api/v1.53.0/DisplayMarkerLayer/
https://flight-manual.atom.io/api/v1.53.0/DisplayMarker/
https://flight-manual.atom.io/api/v1.53.0/TextEditor/#instance-decorateMarker

TODO: develop code to find instances of 'code smells' in the editor.
This will be hard coded to search for defined classes of novice coding errors for the time being and is lang specific.
*/
export default {

    semanticSnifferView: null,
    modalPanel: null,
    subscriptions: null,
    editorMarkerLayers: {},

    activate(state) {
        // TODO: add configuration that allows you to disable rescanning on change

        // this.semanticSnifferView = new SemanticSnifferView(
        //   state.semanticSnifferViewState
        // );
        // this.modalPanel = atom.workspace.addModalPanel({
        //   item : this.semanticSnifferView.getElement(),
        //   visible : false
        // });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        // Q: what is atom-workspace in this context?
        this.subscriptions.add(atom.commands.add(
          'atom-workspace', {
            'semantic-sniffer:sniff': () => this.sniff()
          }
        ));

        // this.subscriptions.add(atom.commands.add(''))

        // TODO: subscribe to changes to text
        // editor.onDidStopChanging

        // Execute once for every opened editor
        // https://flight-manual.atom.io/hacking-atom/sections/package-word-count/
        atom.workspace.observeTextEditors(editor => {
          var sniffviewlayer = editor.addMarkerLayer();

          this.editorMarkerLayers[editor.id] = sniffviewlayer;
        });
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.semanticSnifferView.destroy();
    },

    serialize() {
      return {
        // semanticSnifferViewState : this.semanticSnifferView.serialize()
      };
    },

    sniff() {
        console.log('SemanticSniffer is sniffing!');
        // TODO: check filetype

        // TODO: check null case
        const editor = atom.workspace.getActiveTextEditor();
        console.log("Observing editor: " + editor.getLongTitle());
        // bruh bruh
        var regex_if = new RegExp('(if.*).\\s*(?!==)\\b(?=\\s*=)\\s*=\\s*.', 'gm');
        // var regex_if = new RegExp('bro', 'gm');
        // for now, if we encounter an if statement, print something to the console.
        editor.scan(regex_if, scanResult => {
          // console.log('hello');
          // check for existing markers:
          if (
            this.editorMarkerLayers[editor.id].findMarkers({
              intersectsBufferRange: scanResult.range
            }).length == 0
          ) {
            // then we should create a view for it:
            console.log("adding view for", scanResult);
            let new_marker = this.editorMarkerLayers[editor.id].markBufferRange(
              scanResult.range,
              {
                invalidate: 'surround'
              }
            );
            let new_view = new SemanticSnifferView();
            editor.decorateMarker(
              new_marker,
              {
                type: 'block',
                class: 'semantic-sniffer-marker',
                item: new_view
              }
            );
          }
          else {
            console.log("sniffer view already created for result", scanResult);
          }
        });
        // editor.decorateMarker();
        // bruh bruh
        // return (this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show());
        // return this.modalPanel.hide();
    },

    // list of regex queries for common mistakes

    // activate only on supported langs?

    // this'll be an action that finds an if statement with only 1 equal sign
    //
    scanEditorForCommonMistakes() {
        console.log("Not implemented!");
    }
};
