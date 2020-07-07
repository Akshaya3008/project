/**
 * 
 */
function validateLogin() {
	var token=sessionStorage.getItem("token");
	if (token === undefined || token.trim() == "" || token == "null" || token === null) {
		window.location.href = "login.html";
	} 
}

function logout() {
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("branch");
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("emp_type");
	window.location.href="login.html";
}
