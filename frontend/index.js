//const URL = "http://localhost:8080/v1/convert"
let BASE_URL = "https://us-central1-yaml2go.cloudfunctions.net/gener8";

let yaml = document.getElementById("yamlGenerator");
let codecopied = document.getElementById("codecopied");
let editor = "";
let changeTheme = document.getElementById("changeTheme");
let settheme = document.body.getAttribute("dark-theme");
let codeMirrorMainClass = document.getElementsByClassName(
	"CodeMirror cm-s-default"
);
const MODE_LIGHT  = "light"
const MODE_DARK = "dark"

// set theme
function applyTheme() {
	settheme = document.body.getAttribute("dark-theme");
	settheme == MODE_LIGHT
		? document.body.setAttribute("dark-theme", MODE_DARK)
		: document.body.setAttribute("dark-theme", MODE_LIGHT);
	let value = settheme == MODE_LIGHT ? MODE_DARK : MODE_LIGHT
	localStorage.setItem("camelTheme", `${value}`);
	changeEditorMode();
}

// apply mode
changeTheme.addEventListener("change", (event) => {
	applyTheme();
});

// Codemirror modes
editor = CodeMirror.fromTextArea(document.getElementById("prompt"), {
	lineNumbers: true,
	mode: "text/x-yaml",
});

yaml = CodeMirror.fromTextArea(document.getElementById("yamlGenerator"), {
	lineNumbers: true,
	mode: "text/x-yaml",
});

window.generatorCall = function () {
	URL = formGoogleFuncURL()
	let promptData = document.getElementById("prompt").value;
	document.getElementById("prompt").style.border = "1px solid #ced4da";
	promptData = editor.getValue();
	$.ajax({
		url: `${URL}`,
		type: "POST",
		contentType: "text/plain",
		data: promptData,
		success: function (data) {
			document.getElementById("error").style.display = "none";
			document.getElementById("err-span").innerHTML = "";
			yaml.setValue(data);
		},
		error: function (jqXHR, request, error) {
			document.getElementById("prompt").style.border = "1px solid red";
			if (jqXHR.status == 400) {
				displayError(
					"Invalid text prompt. Please check the text and try again."
				);
			} else {
				displayError(
					"Something went wrong! Please report this to https://github.com/PrasadG193/Gener8/issues"
				);

			}
		},
	});
};

function formGoogleFuncURL() {
	return BASE_URL;
}

function getValue(id) {
	v = document.getElementById(id).value.trim();
	return v;
}

//Convert
document.getElementById("convert").addEventListener("click", convert);

function convert() {
	yaml.setValue("Generating...");
	hideError();
	generatorCall();
}

//Clear YAML
document.getElementById("clearYaml").addEventListener("click", () => {
	editor.setValue("");
});

//Clear yaml
document.getElementById("clearGo").addEventListener("click", () => {
	yaml.setValue("");
});


function displayError(err) {
	document.getElementById("err-span").innerHTML = err;
	document.getElementById("error").style.display = "block";
}

function hideError() {
	document.getElementById("err-span").innerHTML = "";
	document.getElementById("error").style.display = "none";
	yaml.setOption("lineWrapping", false);
}

document.getElementById("copybutton").addEventListener("click", function () {
	if (window.navigator) {
		navigator.clipboard.writeText(yaml.getValue());
		codecopied.style.display = "flex";
		window.setTimeout(function () {
			codecopied.style.display = "none";
		}, 700);
	}
});


function changeEditorMode() {
	for (let i = 0; i < codeMirrorMainClass.length; i++) {
		document
			.getElementsByClassName("CodeMirror")
		[i].classList.toggle("cm-s-material-darker");
	}
}

// Check if theme mode is already set
if (localStorage.getItem("camelTheme")) {
	const value = localStorage.getItem("camelTheme");
	document.body.setAttribute("dark-theme", value);
	value !== MODE_LIGHT && document.getElementById("theme-check").setAttribute("checked", "checked");
	value !== MODE_LIGHT && changeEditorMode();
}
