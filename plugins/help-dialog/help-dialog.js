/*!
 * Help dialog plugin for Editor.md
 *
 * @file        help-dialog.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-08
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

	var factory = function (exports) {

		var $            = jQuery;
		var pluginName   = "help-dialog";

		exports.fn.helpDialog = function() {
			var _this       = this;
			var lang        = this.lang;
			var editor      = this.editor;
			var settings    = this.settings;
			var path        = settings.pluginPath + pluginName + "/";
			var classPrefix = this.classPrefix;
			var dialogName  = classPrefix + pluginName, dialog;
			var dialogLang  = lang.dialog.help;

			if (editor.find("." + dialogName).length < 1)
			{			
				var dialogContent = "<div class=\"markdown-body\" style=\"font-family:微软雅黑, Helvetica, Tahoma, STXihei,Arial;height:390px;overflow:auto;font-size:14px;border-bottom:1px solid #ddd;padding:0 20px 20px 0;\"></div>";

				dialog = this.createDialog({
					name       : dialogName,
					title      : dialogLang.title,
					width      : 840,
					height     : 540,
					mask       : settings.dialogShowMask,
					drag       : settings.dialogDraggable,
					content    : dialogContent,
					lockScreen : settings.dialogLockScreen,
					maskStyle  : {
						opacity         : settings.dialogMaskOpacity,
						backgroundColor : settings.dialogMaskBgColor
					},
					buttons    : {
						close : [lang.buttons.close, function() {      
							this.hide().lockScreen(false).hideMask();
							
							return false;
						}]
					}
				});
			}

			dialog = editor.find("." + dialogName);

			this.dialogShowMask(dialog);
			this.dialogLockScreen();
			dialog.show();

			var helpContent = dialog.find(".markdown-body");

            if (helpContent.html() === "") {
                var md = 
                `
<blockquote>
    <h1>KeyMap</h1>
    <p>
    <pre>
| Keyboard shortcuts (键盘快捷键)                 |   说明                            |
| :---------------------------------------------- |:--------------------------------- |
| F9                                              | 切换实时预览                      |
| F10                                             | 全屏HTML预览(按 Shift + ESC 退出) |
| F11                                             | 切换全屏状态                      |
| Ctrl + \`                                       | 切换主题                          |
| Ctrl + 1~6 / Command + 1~6                      | 插入标题1~6                       |
| Ctrl + A / Command + A                          | 全选                              |
| Ctrl + B / Command + B                          | 插入粗体                          |
| Ctrl + D / Command + D                          | 插入日期时间                      |
| Ctrl + E / Command + E                          | 插入Emoji符号                     |
| Ctrl + F / Command + F                          | 查找/搜索                         |
| Ctrl + G / Command + G                          | 切换到下一个搜索结果项            |
| Ctrl + H / Command + H                          | 插入水平线                        |
| Ctrl + I / Command + I                          | 插入斜体                          |
| Ctrl + K / Command + K                          | 插入行内代码                      |
| Ctrl + L / Command + L                          | 插入链接                          |
| Ctrl + O / Command + O                          | 打开文件                          |
| Ctrl + Q                                        | 代码折叠切换                      |
| Ctrl + S / Command + S                          | 保存文件                          |
| Ctrl + U / Command + U                          | 插入无序列表                      |
| Ctrl + Z / Command + Z                          | 撤销                              |
| Ctrl + Y / Command + Y                          | 重做                              |
| Ctrl + Shift + A                                | 插入@链接                         |
| Ctrl + Shift + C                                | 插入行内代码                      |
| Ctrl + Shift + E                                | 打开插入Emoji表情对话框           |
| Ctrl + Shift + F / Command + Option + F         | 替换                              |
| Ctrl + Shift + G / Shift + Command + G          | 切换到上一个搜索结果项            |
| Ctrl + Shift + H                                | 打开HTML实体字符对话框            |
| Ctrl + Shift + I                                | 插入图片                          |
| Ctrl + Shift + K                                | 插入TeX(KaTeX)公式符号            |
| Ctrl + Shift + L                                | 打开插入链接对话框                |
| Ctrl + Shift + O                                | 插入有序列表                      |
| Ctrl + Shift + P                                | 打开插入PRE对话框                 |
| Ctrl + Shift + Q                                | 插入引用                          |
| Ctrl + Shift + R / Shift + Command + Option + F | 全部替换                          |
| Ctrl + Shift + S                                | 插入删除线                        |
| Ctrl + Shift + T                                | 打开插入表格对话框                |
| Ctrl + Shift + U                                | 将所选文字转成大写                |
| Shift + Alt + C                                 | 插入代码                       |
| Shift + Alt + H                                 | 打开使用帮助对话框                |
| Shift + Alt + L                                 | 将所选文本转成小写                |
| Shift + Alt + P                                 | 插入分页符                        |
| Alt + L                                         | 将所选文本转成小写                |
| Shift + Alt + U                                 | 将所选的每个单词的首字母转成大写  |
| Ctrl + Shift + Alt + C                          | 打开插入代码块对话框层            |
| Ctrl + Shift + Alt + I                          | 打开插入图片对话框层              |
| Ctrl + Shift + Alt + U                          | 将所选文本的第一个首字母转成大写  |
| Ctrl + Alt + G                                  | 跳转到指定的行                    |

    </pre>
    </p>
</blockquote>

<h1>MarkDown</h1>

<h4>标题</h4>

<p>
<pre>
    // h1
    # title1
    //h2
    ## title2
   //h1
    title1
    =
    //h2
    title2
    -
</pre>
</p>

<h4>段落 &lt;p&gt;</h4>

<p>
<pre>
text
//空行
text 
</pre>
</p>

<h4>换行 &lt;br/&gt;</h4>

<p>
<pre>
text1&lt;br/&gt;
text2
</pre>
</p>

<h4>粗体 **</h4>

<p>
<pre>
**text**
</pre>
</p>

<h4>斜体 *</h4>

<p>
<pre>
*text*
</pre>
</p>

<h4>粗斜体 ***</h4>

<p>
<pre>
***text***
</pre>
</p>

<h4>引用 &gt;</h4>

<p>
<pre>
 &gt; text
</pre>
</p>

<h4>有序列表 1.</h4>

<p>
<pre>
1. text1
2. text2
</pre>
</p>

<h4>无序列表 -</h4>

<p>
<pre>
- text1
- text2
</pre>
</p>

<h4>代码 \`</h4>
<p>
<pre>
//代码行
    \` code
//代码块
    \`\`\`type
    code
    \`\`\`
</pre>
</p>

<h4>删除线 ~~</h4>

<p>
<pre>
~~text~~
</pre>
</p>

<h4>复选 -[ ]</h4>

<p>
<pre>
-[ ] item1
-[x] item2
</pre>
</p>

<h4>分割 ---</h4>

<p><pre>
    p1
    ---
    p2
</pre>
</p>

<h4>超链接</h4>

<p>
<pre>
//[text](href &#39;title&#39;)
[通用标准](https://commonmark.org &#39;commonmark&#39;)
</pre>
</p>

<h4>图片 img</h4>

<p>
<pre>
// ![alt](src &quot;title&quot;)
![log](https://commonmark.org/images/markdown-mark.png2 &quot;markdown&quot;)
</pre>
</p>
                `;
                helpContent.html(md);
                helpContent.find("a").attr("target", "_blank");
            }
        };

    };

    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
    else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) { // for Require.js

            define(["editormd"], function(editormd) {
                factory(editormd);
            });

        } else { // for Sea.js
            define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
        }
    } 
    else
    {
        factory(window.editormd);
    }

})();
