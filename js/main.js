"use strict";
let isDark = localStorage.getItem("MdEditThemeIsDark");
if(isDark == null){
	isDark = 0;
	localStorage.setItem("MdEditThemeIsDark", 0);
}
let editorObj;
let height = window.innerHeight;
let customConfig = {
	theme: isDark == 1 ? "dark" : "default",
	previewTheme: isDark == 1 ? "dark" : "default",
	editorTheme: isDark == 1 ? "pastel-on-dark" : "default",
	height: (height - 20) + 'px',
	path: "./lib/",
	toolbarIcons: () => ["saveFile","|","preview","|","watch","|","file","||","help"],
	disabledKeyMaps : [ "Ctrl-B","Ctrl-S","Ctrl-O","Ctrl-`" ],
	onload: function() {
		var keyMap = {
			"Ctrl-S": function(cm) {
				saveFile(cm);
			},
			"Ctrl-O": function(cm) {
				$("#file-input").click();
			},
			"Ctrl-`": function(cm) {
				editorObj.setTheme(isDark == 1 ? 'default': 'dark');
				editorObj.setPreviewTheme(isDark == 1 ? 'default': 'dark');
				editorObj.setEditorTheme(isDark == 1 ? 'default': 'pastel-on-dark');
				isDark = (isDark == 1 ? 0 : 1);
				localStorage.setItem("MdEditThemeIsDark", isDark);
			}
		};
		this.addKeyMap(keyMap);
		$('[type="file"]').bind("change", function(){
			let text = '';
			let selectedFile = this.files[0];
			let name = selectedFile.name;
			if(name){
				$("#file-name-span").html(":"+name);
			}
			let size = selectedFile.size;
			let reader = new FileReader();
			reader.readAsText(selectedFile);
			reader.onload = function () {
				text = this.result;
				setTimeout(() => {
					let ecm = editorObj.cm;
					ecm.setCursor({line:100000000, ch:100000000});
					ecm.setSelection({line:0, ch:0}, ecm.getCursor());
					ecm.replaceSelection(text);
					ecm.setCursor({line:0, ch:0});
				},300);
			}
		});
		setTimeout(() => {
			let ecm = editorObj.cm;
			ecm.setSelection({line:0, ch:0}, {line:1, ch:1});
			if(ecm.getSelection().indexOf('E=mc^2') != -1){
				ecm.replaceSelection('');
			}
			ecm.setCursor({line:0, ch:0});
		},100);
	},

	toolbarIconsClass : {
		saveFile : "fa-floppy-o"
	},

	toolbarIconTexts : {
		saveFile: 'Save',
		preview: 'Preview',
		watch: 'watch',
	},
	toolbarCustomIcons : {
		file: '<div class="file-div"><i class="fa fa-file-text-o file-open-span" aria-hidden="true"></i><input id="file-input" type="file" accept=".md"/><span id="file-name-span"></span></div>',
	},
	toolbarHandlers : {
		saveFile: function(cm, icon, cursor, selection) {
			saveFile(cm);
		}
	},

	lang : {
		toolbar : {
			file : "打开文件 cyrl + o",
			saveFile : "保存 ctrl + s"  
		}
	}
};
$(function() {
	editorObj = editormd("app", customConfig);
});
function saveFile(cm){
	cm.setCursor({line:100000000, ch:100000000});
	cm.setSelection({line:0, ch:0}, cm.getCursor());
	let content = cm.getSelection();
	cm.setSelection({line:0, ch:0}, {line:0, ch:30});
	let filename = cm.getSelection();
	if(filename){
		filename = filename.replace(/(?![0-9a-zA-Z_\-\u4e00-\u9fa5]{1,20})./g, "");
	}
	cm.setCursor({line:0, ch:0});
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, (filename == '' ? 'newFile' : filename) + ".md");
}
