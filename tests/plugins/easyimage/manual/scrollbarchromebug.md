@bender-tags: 4.9.0, bug, 1550, easyimage
@bender-ui: collapsed
@bender-ckeditor-plugins: sourcearea, wysiwygarea, toolbar, easyimage, link

----

1. Move cursor over image in both editors.

**Expected:** Nothing unusual happens, scrollbar is not flickering.

**Unexpected:**
* Empty scrollbar shows up.
* Scrollbar flicker when cursor is moved over the images.

_**Note:** In **Chrome** browser in second editor, scrollbars flickers as the issue is not fixed for `divarea editor` (https://bugs.chromium.org/p/chromium/issues/detail?id=803045)._
