function result(message, type) {
    const id = Math.random();
    $("#bodyResult").append(`
            <div class="card shadow-2xl lg:card-side bg-${type} w-72 h-14 m-5" id="${id}" >
                <div class="card-body p-1 flex-row-reverse">
                    <div class="justify-end card-actions">
                        <button class="btn btn-${type} btn-square" onclick="closeResult('${id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                class="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <p id="result" class="my-3">${message}</p>
                </div>
            </div>
    `);
}

function closeResult(id) {
    console.log(typeof id);
    document.getElementById(id).style.display = "none";
}