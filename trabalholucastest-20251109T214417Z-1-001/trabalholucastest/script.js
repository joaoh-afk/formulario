/**
 * Executa o script quando o DOM (estrutura da página) está totalmente carregado.
 */
 document.addEventListener('DOMContentLoaded', () => {

   
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const dataForm = document.getElementById('dataForm');
    
    if (dataForm) {
        
        const nome = document.getElementById('nome');
        const sobrenome = document.getElementById('sobrenome');
        const email = document.getElementById('email');
        const idade = document.getElementById('idade');

       
        const dadosSalvos = localStorage.getItem('formData');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            nome.value = dados.nome;
            sobrenome.value = dados.sobrenome;
            email.value = dados.email;
            idade.value = dados.idade;
        }

        
        dataForm.addEventListener('submit', (e) => {
           
            e.preventDefault(); 
            
           
            let isFormValid = true;
            isFormValid = validateField(nome, 3, 50, 'Nome') && isFormValid;
            isFormValid = validateField(sobrenome, 3, 50, 'Sobrenome') && isFormValid;
            isFormValid = validateEmail(email) && isFormValid;
            isFormValid = validateAge(idade) && isFormValid;

           
            if (isFormValid) {
               
                const dadosDoFormulario = {
                    nome: nome.value,
                    sobrenome: sobrenome.value,
                    email: email.value,
                    idade: idade.value
                };
                
                // 2. Salva os dados no localStorage
                // JSON.stringify converte o objeto em texto (string)
                localStorage.setItem('formData', JSON.stringify(dadosDoFormulario));
                
                // 3. Redireciona para a página de confirmação
                window.location.href = 'confirmation.html';
            }
        });
    }

    /**
     * Função reutilizável para mostrar/esconder erros
     * @param {HTMLElement} inputElement - O campo (input)
     * @param {string} message - A mensagem de erro
     * @param {boolean} isValid - Se o campo é válido ou não
     */
    function showError(inputElement, message, isValid) {
        // Encontra o 'div' de erro correspondente (ex: 'nome' -> 'nomeError')
        const errorElement = document.getElementById(inputElement.id + 'Error');
        
        if (!isValid) {
            errorElement.textContent = message;
            errorElement.style.display = 'block'; // Mostra a mensagem
            inputElement.classList.add('invalid'); // Adiciona classe CSS ao input
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none'; // Esconde a mensagem
            inputElement.classList.remove('invalid'); // Remove classe CSS
        }
    }

   
    function validateField(input, min, max, fieldName) {
        const value = input.value.trim();
        if (value === '') {
            showError(input, `${fieldName} não pode estar vazio.`, false);
            return false;
        }
        if (value.length < min || value.length > max) {
            showError(input, `${fieldName} deve ter entre ${min} e ${max} caracteres.`, false);
            return false;
        }
        showError(input, '', true); // Válido
        return true;
    }

   
    function validateEmail(input) {
        const value = input.value.trim();
        if (value === '') {
            showError(input, 'Email não pode estar vazio.', false);
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(input, 'Email inválido. Use um formato como "exemplo@dominio.com".', false);
            return false;
        }
        showError(input, '', true); 
        return true;
    }

   
    function validateAge(input) {
        const value = input.value;
        if (value === '') {
            showError(input, 'Idade não pode estar vazia.', false);
            return false;
        }
       
        const age = parseInt(value, 10);
        
       
        if (isNaN(age) || age <= 0 || age >= 120 || !Number.isInteger(parseFloat(value))) {
            showError(input, 'Idade deve ser um número inteiro positivo menor que 120.', false);
            return false;
        }
        showError(input, '', true); 
        return true;
    }


   
    const dadosContainer = document.getElementById('dadosConfirmacao');
    
    if (dadosContainer) {
        
        const btnConfirmar = document.getElementById('btnConfirmar');
        const btnEditar = document.getElementById('btnEditar');

        
        const dadosSalvos = localStorage.getItem('formData');
        
        if (dadosSalvos) {
            
            const dados = JSON.parse(dadosSalvos);
            
            
            dadosContainer.innerHTML = `
                <p><strong>Nome:</strong> ${dados.nome}</p>
                <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
                <p><strong>Email:</strong> ${dados.email}</p>
                <p><strong>Idade:</strong> ${dados.idade}</p>
            `;
        } else {
           
            dadosContainer.innerHTML = '<p>Nenhum dado para confirmar. Por favor, preencha o formulário.</p>';
            btnConfirmar.disabled = true;
            btnEditar.disabled = true;
        }

        
        btnConfirmar.addEventListener('click', () => {
           
            
            alert('Dados confirmados com sucesso! (Simulado). A redirecionar para a página inicial.');
            
            // Redireciona para o início
            window.location.href = 'index.html';
        });

       
        btnEditar.addEventListener('click', () => {
            
            window.location.href = 'form.html';
        });
    }
});