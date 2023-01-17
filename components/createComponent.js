const creatBtn = document.querySelector("#create_btn")

creatBtn.addEventListener('click', () => {
    const name = document.querySelector("#name").value
    const model = document.querySelector("#model").value
    const year = document.querySelector("#year").value
    const img = document.querySelector("#img").value
    const styles = document.querySelector("#styles").value

    const payload = { name, model, year, img, styles }
    fetch("http://localhost:8080/components", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => alert("Компонент создан успешно!"))
    .catch(() => alert("Error"))
})
