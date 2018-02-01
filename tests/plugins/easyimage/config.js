/* bender-tags: editor,widget */
/* bender-ckeditor-plugins: easyimage,toolbar,contextmenu */
/* bender-include: ../widget/_helpers/tools.js */
/* global widgetTestsTools */

( function() {
	'use strict';

	bender.editors = {
		standard: {},

		classCustomized: {
			config: {
				// Widget is identified by id.
				extraAllowedContent: 'figure[id]',
				easyimage_class: 'customClass',
				easyimage_fullClass: 'customFullClass',
				easyimage_sideClass: 'customSideClass',
				easyimage_alignLeftClass: 'customAlignLeftClass',
				easyimage_alignCenterClass: 'customAlignCenterClass',
				easyimage_alignRightClass: 'customAlignRightClass'
			}
		},

		toolbarString: {
			config: {
				extraPlugins: 'basicstyles',
				easyimage_toolbar: 'Bold,Italic'
			}
		},

		toolbarArray: {
			config: {
				extraPlugins: 'basicstyles',
				easyimage_toolbar: [ 'Bold', 'Italic' ]
			}
		}
	};

	function createCustomClassTest( command ) {
		return function() {
			var bot = this.editorBots.classCustomized;

			bot.setData( CKEDITOR.document.getById( 'changedClass' ).getHtml(), function() {
				var editor = bot.editor,
					widgetInstance = widgetTestsTools.getWidgetById( editor, 'customSideId', true );

				widgetInstance.focus();

				// IE11 for some reasons needs to have the command state force refreshed, after focusing the widget with API only.
				editor.commands[ 'easyimage' + command ].refresh( editor, editor.elementPath() );

				editor.execCommand( 'easyimage' + command );

				assert.beautified.html( CKEDITOR.document.getById( 'expectedCustom' + command + 'Class' ).getHtml(), editor.getData() );
			} );
		};
	}

	function createToolbarTest( editorName, expectedItems ) {
		return function() {
			var editor = bender.editors[ editorName ],
				balloonToolbar = editor.balloonToolbars._contexts[ 0 ].toolbar,
				items = CKEDITOR.tools.objectKeys( balloonToolbar._items );

			assert.areSame( expectedItems.length, items.length, 'Buttons count' );
			arrayAssert.containsItems( expectedItems, items, 'Buttons type' );
		};
	}

	function createMenuTest( editorName, expectedItems ) {
		expectedItems = [ 'cut', 'copy', 'paste' ].concat( expectedItems );

		function getItemsNames( items ) {
			var names = [];

			CKEDITOR.tools.array.forEach( items, function( item ) {
				names.push( item.name );
			} );

			return names;
		}

		return function() {
			var bot = bender.editorBots[ editorName ],
				editor = bot.editor;

			bot.setData( CKEDITOR.document.getById( 'standardWidget' ).getHtml(), function() {
				var element = editor.editable().findOne( 'figure' ),
					widget = editor.widgets.getByElement( element );

				widget.focus();

				bot.contextmenu( function( menu ) {
					arrayAssert.containsItems( expectedItems, getItemsNames( menu.items ), 'Context menu items types' );

					menu.hide();
				} );
			} );
		};
	}

	bender.test( {
		'test easyimage_class - changed': function() {
			widgetTestsTools.assertWidget( {
				count: 1,
				widgetOffset: 0,
				nameCreated: 'easyimage',
				html: CKEDITOR.document.getById( 'changedClass' ).getHtml(),
				bot: this.editorBots.classCustomized
			} );
		},

		'test easyimage_fullClass - changed': createCustomClassTest( 'Full' ),
		'test easyimage_sideClass - changed': createCustomClassTest( 'Side' ),
		'test easyimage_alignLeftClass - changed': createCustomClassTest( 'AlignLeft' ),
		'test easyimage_alignCenterClass - changed': createCustomClassTest( 'AlignCenter' ),
		'test easyimage_alignRightClass - changed': createCustomClassTest( 'AlignRight' ),

		'test balloon toolbar buttons (default settings)': createToolbarTest( 'standard',
			[ 'EasyimageFull', 'EasyimageSide', 'EasyimageAlt' ] ),
		'test balloon toolbar buttons (string syntax)': createToolbarTest( 'toolbarString', [ 'Bold', 'Italic' ] ),
		'test balloon toolbar buttons (array syntax)': createToolbarTest( 'toolbarArray', [ 'Bold', 'Italic' ] ),

		'test context menu items (default settings)': createMenuTest( 'standard',
			[ 'easyimagefull', 'easyimageside', 'easyimagealt' ] ),
		'test context menu items (string syntax)': createMenuTest( 'toolbarString', [ 'bold', 'italic' ] ),
		'test context menu items (array syntax)': createMenuTest( 'toolbarArray', [ 'bold', 'italic' ] )
	} );
} )();
