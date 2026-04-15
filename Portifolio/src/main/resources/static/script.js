async function carregarProjetos() {
    try {
        const resposta = await fetch('http://localhost:8081/api/projetos');
        const projetos = await resposta.json();
        const container = document.getElementById('lista-projetos');
        container.innerHTML = '';

        projetos.forEach(projeto => {
            const div = document.createElement('div');
            div.classList.add('project-card');
            div.innerHTML = `
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <strong>${projeto.tecnologia}</strong><br>
                <button onclick="deletarProjeto(${projeto.id})" class="btn-delete">Excluir</button>
            `;
            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

async function salvarProjeto() {
    const projeto = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        tecnologia: document.getElementById('tecnologia').value,
        linkGithub: document.getElementById('linkGithub').value
    };

    try {
        const resposta = await fetch('http://localhost:8081/api/projetos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projeto)
        });

        if (resposta.ok) {
            alert("Salvo com sucesso!");
            carregarProjetos();
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}

async function deletarProjeto(id) {
    if (confirm("Deseja excluir?")) {
        await fetch(`http://localhost:8081/api/projetos/${id}`, { method: 'DELETE' });
        carregarProjetos();
    }
}


carregarProjetos();

function toggleAdmin() {
    const admin = document.querySelector('.admin-area');
    admin.style.display = (admin.style.display === 'none') ? 'block' : 'none';
}

function toggleAdmin() {
    const admin = document.getElementById('admin-area');
    if (admin.style.display === 'flex') {
        admin.style.display = 'none';
    } else {
        admin.style.display = 'flex';
    }
}