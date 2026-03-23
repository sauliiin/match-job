# 🚀 CarreiraMais — O Tinder Profissional (Só que Melhor e Sem Vácuo) https://match-job-tau.vercel.app/ 🔥🔥🔥🔥🔥
 
Bem-vindo ao repositório do **CarreiraMais**! Se você cansou de sites de emprego que parecem planilhas do Excel de 2004 e de plataformas acadêmicas caóticash, você está no lugar certo! 🎯

Prepare-se para uma experiência com a estética de quem vive em **2077** 🤘🏻, cheia de neon, sombras duplas e bordas afiadas. 🕶️✨

---

## 👽 O Que é Esse Monstro?

O **CarreiraMais** é uma *Single Page Application (SPA)* raiz, construída na base da garra, do café e do "puro suco" do HTML/CSS/Vanilla JS (nada de frameworks pesando 300MB no seu `node_modules`).

O objetivo? Conectar **Profissionais/Estudantes** com **Cursos Fodas** (gratuitos e pagos) e **Vagas de Emprego** que realmente dão match com as habilidades deles. Sem enrolação. 🤝

### 🌟 Features de Tremer o Teclado
- **Modo Escuro Cyberpunk Mágico:** Um botão que desliga as luzes da sua tela e acende o neon **Cyberpunk 2077** 🤘🏻! 
- **Match Automático Tunado:** O sistema não faz unidunitê de skill. Ele cruza **habilidades**, **área**, **contexto do perfil**, **nível do curso**, **tipo de vaga** e até a **localização/modalidade** pra montar um ranking mais inteligente.
- **Explicação do Match:** Além de jogar a recomendação na sua cara, o sistema ainda mostra o famoso *"por que diabos isso apareceu pra mim?"* com percentual e justificativa no card.
- **Sem Recarregar a Página:** Clicou? Abriu! A navegação é por hash `#`, mais lisa que sabonete molhado. 🧼
- **Stepper de Cadastro:** Uma tela de cadastro para usuários e empresas dividida em passos bonitinhos, pra ninguém ter crise de ansiedade preenchendo 200 campos de uma vez. 💆‍♂️
- **Login com Firebase Auth:** Adeus gambiarra de sessão fake. Agora o login usa **Firebase Authentication** de verdade, com os perfis guardados no **Realtime Database**.

---

## 🧠 O Cérebro do Match (Agora Ficou Mais Esperto)

Emocionado e malandro:

- **Cursos:** o ranking considera habilidades em comum, área de interesse, contexto textual do seu perfil e alinhamento com o seu momento (`Estudante`, `Profissional Formado` ou `Em transição de carreira`).
- **Vagas:** além de habilidades e área, ele também pesa tipo de vaga (`Estágio`, `CLT`, `PJ`, etc.), modalidade (`Remoto`, `Híbrido`, `Presencial`) e localização.
- **Match com explicação:** cada card no dashboard mostra um percentual e uma frase do tipo: *"3 habilidades em comum + mesma área + nível alinhado com seu momento."*

Traduzindo: não é o cérebro da Skynet, mas não recomenda qualquer coisa só porque viu uma palavra igual no meio da descrição. 😌

---

## 🛠️ Tecnologias Usadas (O Arsenal)

- **HTML5:** Mais semântico que o dicionário Aurélio. 📚
- **CSS3:** Todo no capricho. Usamos variáveis CSS globais para pintar o sete. Espere ver muito Ciano (`#00f0ff`), Rosa Choque e o nosso Amarelo Cyberpunk de queimar retinas (`#fcee0a`). 🎨
- **Vanilla JavaScript:** 0% jQuery, 100% adrenalina pura. Manipulação de DOM como os deuses da web planejaram. ⚡
- **Firebase Authentication:** Pra fazer login sem inventar moda errada e deixar o acesso mais sério.
- **Firebase Realtime Database:** Onde os perfis e cadastros ficam salvos, esperando o próximo match acontecer.
- **FontAwesome:** Porque a gente ama um íconezinho bem colocado. 🪄
- **Google Fonts:** "Inter" e "Poppins" para deixar o texto mais chique do que cardápio de restaurante caro. 🍷

---

## 🚀 Como Rodar o Brinquedo

Quer ver essa lindeza rodando na sua máquina? É mais fácil que fazer miojo:

1. **Clone ou baixe** este projeto maravilhoso.
2. Não procure o `package.json`. *Ele não existe.* MUAHAHAHA! 🦇
3. Garanta que no seu projeto do **Firebase** o login por **E-mail/Senha** esteja ativado no **Authentication**.
4. Dê aquela conferida básica nas regras do **Realtime Database**, porque sem isso o bagulho não conversa com o banco.
5. Baixe a extensão **Live Server** no seu VS Code (se é que você já não tem, né?).
6. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**.
7. *Voilá!* Pegue seus óculos escuros e curta a plataforma no seu navegador! 😎

---

## 🤝 Quer Contribuir?

1. Encontrou um bug? Abre uma issue nos contando onde o neon piscou errado. 🐛
2. Quer colocar mais cursos ou vagas fake divertidas no `data.js`? Fique à vontade!
3. O código é livre, aberto e cheio de comentários para você não se perder.

---

### 📜 Licença

Totalmente Open Access. Desenvolvido para causar impacto social e deixar o mundo do recrutamento pelo menos 200% mais bonito. 💅🌍

Feito com 💖 (e muita estilização CSS inline que foi magicamente corrigida)!
