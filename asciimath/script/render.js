let debounceTimer;

// MathJax config
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    AsciiMath: {
        delimiters: [['`', '`'], ['$$', '$$']]
    }
});

// Make sure the input is valid, otherwise we will not render the input.
function isValidAsciiMath(input) {
    return /^[a-zA-Z0-9+\-*/^_=(),. \t\n|{}<>:]+$/.test(input);
}

function renderMath() {
	var input = document.getElementById('math-input').value.trim();
	var output = document.getElementById('math-output');

	if (input === "" || !isValidAsciiMath(input)) {
	    output.innerHTML = "<em>Rendered output will appear here...</em>";
	    output.style.color = "#888";
	} else {
	    output.innerHTML = "`" + input + "`"; // wrap in AsciiMath delimiters
	    MathJax.Hub.Queue(["Typeset", MathJax.Hub, output]); // Send the input to be rendered
	    output.style.color = "#000"; // change to black when actual math is rendered
	}
}

// we must add a delay because mathjax is slow and likes to output before the text
// is fully processed
function debounceRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderMath, 500); // delay in ms
}

window.onload = function() {
    document.getElementById('math-input').addEventListener('input', debounceRender); // Call debounceRender() when the user
    																				// types into the `math-input` text box.
    renderMath(); // initialize the output box
};
