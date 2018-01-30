/* exported easyImageTools */

( function() {
	'use strict';

	window.easyImageTools = {
		CLOUD_SERVICES_UPLOAD_GATEWAY: 'https://files.cke-cs.com/upload/',
		assertCommandsState: function( editor, asserts ) {
			var command;

			for ( command in asserts ) {
				assert.areSame( asserts[ command ], editor.getCommand( command ).state,
					'Command ' + command + ' has appropriate state' );
			}
		}
	};
} )();
