function Auth() {
    const loginBtn = getElementById("login");
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:5678/api/users/login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Email ou mot de passe invalide");
                    }
                    if (response.status === 404) {
                        throw new Error("Introuvable");
                    }
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.token);
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

Auth();
