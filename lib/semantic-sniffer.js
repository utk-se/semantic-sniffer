'use babel';

import SemanticSnifferView from './semantic-sniffer-view';
import {
    CompositeDisposable,
    DisplayMarker,
    DisplayMarkerLayer,
    TextEditor,
} from 'atom';
import SmellDetector from './smell-detector'

// TODO: conditional import here?
// include parsers for common programming languages
const Parser = require('tree-sitter');
const Java = require('tree-sitter-java');
const Python = require('tree-sitter-python');
const C = require('tree-sitter-c');
const Cpp = require('tree-sitter-cpp');
const Go = require('tree-sitter-go');
const Php = require('tree-sitter-php');
const Javascript = require('tree-sitter-javascript');
const Csharp = require('tree-sitter-c-sharp');

const {Query} = Parser
const parser = new Parser();
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
    editorSniffers: {},
    snifferLangs: {
        '.source.java': Java,
        '.source.c': C,
        '.source.cpp': Cpp,
        '.source.js' : Javascript,
        '.source.py' : Python,
        '.source.csharp': Csharp,
        '.source.php' : Php,
        '.source.go' : Go,
    },
    activate(state) {

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        // Q: what is atom-workspace in this context?
        this.subscriptions.add(atom.commands.add('atom-workspace', {'semantic-sniffer:sniff' : () => this.sniff()}));

        // this.subscriptions.add(atom.commands.add(''))

        // Execute once for every opened editor
        // https://flight-manual.atom.io/hacking-atom/sections/package-word-count/
        atom.workspace.observeTextEditors(editor => {
            var sniffviewlayer = editor.addMarkerLayer();
            let lang = snifferLangs[editor.getRootScopeDescriptor()];
            if(lang != undefined) {
              this.editorMarkerLayers[editor.id] = sniffviewlayer;
              this.editorSniffers[editor.id] = new SmellDetector(lang, editor.getBuffer().buffer);
              this.subscriptions.add(editor.onDidStopChanging(event => {
                  this.sniff(editor);
              }));
            }
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

    sniff(n_editor) {
        console.log('SemanticSniffer is sniffing!');
        var editor = undefined;
        if (n_editor)
        {
            editor = n_editor;
        }
        else
        {
            editor = atom.workspace.getActiveTextEditor();
        }
        let lang = editor.getRootScopeDescriptor();

        console.log("Observing editor: " + editor.getLongTitle());
        console.log("Language: " + lang);

        let buffer = editor.getBuffer().buffer;
        // can we assume the above buffer updates with editor?

        editor.scan(regex_if, scanResult => {
            // console.log('hello');
            // check for existing markers:
            // can't query async
            let existing = this.editorMarkerLayers[editor.id]
                               .findMarkers({intersectsBufferRange : scanResult.range})
                               .filter((marker) => {
                                   if (marker.isValid())
                                       return true;
                                   else
                                   {
                                       console.log("sniff,", marker, "is dead");
                                       marker.destroy();
                                       return false;
                                   };
                               });
            if (existing.length == 0)
            {
                // then we should create a view for it:
                console.log("adding hint for", scanResult);
                let new_marker =
                    this.editorMarkerLayers[editor.id].markBufferRange(scanResult.range, {invalidate : 'touch'});
                // let new_view = new SemanticSnifferView();
                new_marker.onDidDestroy(() => {
                    console.log("sniffer hint changed:", new_marker);
                });
                editor.decorateMarker(new_marker, {
                    type : 'highlight',
                    class : 'semantic-sniffer-hint',
                });
            }
            else
            {
                console.log("sniffer hint already created for smell", scanResult);
                console.log("existing hints:", existing);
            }
        });
        // bruh bruh
        // return (this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show());
        // return this.modalPanel.hide();
    },
};
