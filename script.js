const form = document.getElementById('enderecoForm');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const ufInput = document.getElementById('uf');
const complementoInput = document.getElementById('complemento');

const originalPlaceholders = {
    cep: cepInput.placeholder,
    logradouro: logradouroInput.placeholder,
    numero: numeroInput.placeholder,
    uf: ufInput.placeholder
};

function aplicarMascaraCEP(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    return valor;
}

function removerErro(input, placeholderOriginal) {
    input.classList.remove('input-error');
    input.placeholder = placeholderOriginal;
}

function adicionarErro(input, nomeCampo) {
    input.classList.add('input-error');
    input.placeholder = `O campo ${nomeCampo} é obrigatório`;
    input.value = '';
}

cepInput.addEventListener('input', function(e) {
    e.target.value = aplicarMascaraCEP(e.target.value);
    removerErro(e.target, originalPlaceholders.cep);
});

ufInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
    removerErro(e.target, originalPlaceholders.uf);
});

numeroInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
    removerErro(e.target, originalPlaceholders.numero);
});

logradouroInput.addEventListener('input', function(e) {
    removerErro(e.target, originalPlaceholders.logradouro);
});

function validarCEP(cep) {
    const regexCEP = /^(\d{5})-(\d{3})$/;
    return regexCEP.test(cep);
}

function validarUF(uf) {
    const regexUF = /^[A-Z]{2}$/;
    return regexUF.test(uf);
}

function validarLogradouro(logradouro) {
    return logradouro.trim().length >= 5;
}

function validarNumero(numero) {
    const regexNumero = /^\d+$/;
    return regexNumero.test(numero);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cep = cepInput.value;
    const logradouro = logradouroInput.value;
    const numero = numeroInput.value;
    const uf = ufInput.value;
    const complemento = complementoInput.value;
    
    if (!cep || cep.trim() === '') {
        adicionarErro(cepInput, 'CEP');
        cepInput.focus();
        return;
    }
    
    if (!validarCEP(cep)) {
        alert('CEP inválido! Use o formato 00000-000. Exemplo: 12345-678');
        cepInput.classList.add('input-error');
        cepInput.focus();
        return;
    }
    
    if (!logradouro || logradouro.trim() === '') {
        adicionarErro(logradouroInput, 'Logradouro');
        logradouroInput.focus();
        return;
    }
    
    if (!validarLogradouro(logradouro)) {
        alert('O Logradouro deve conter no mínimo 5 caracteres!');
        logradouroInput.classList.add('input-error');
        logradouroInput.focus();
        return;
    }
    
    if (!numero || numero.trim() === '') {
        adicionarErro(numeroInput, 'Número');
        numeroInput.focus();
        return;
    }
    
    if (!validarNumero(numero)) {
        alert('O campo Número deve conter apenas dígitos numéricos!');
        numeroInput.classList.add('input-error');
        numeroInput.focus();
        return;
    }
    
    if (!uf || uf.trim() === '') {
        adicionarErro(ufInput, 'UF');
        ufInput.focus();
        return;
    }
    
    if (!validarUF(uf)) {
        alert('UF inválido! Use 2 letras maiúsculas. Exemplo: SP, RJ, MG');
        ufInput.classList.add('input-error');
        ufInput.focus();
        return;
    }

    alert('Endereço cadastrado com sucesso!');
    form.reset();
});
