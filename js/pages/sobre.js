/* ===========================
   CarreiraMais — Sobre
   =========================== */

function pageSobre() {
  return `
  <div class="sobre-intro">
    <div class="container">
      <h1>Sobre o CarreiraMais</h1>
      <p>Uma plataforma criada para democratizar o acesso à educação e às oportunidades profissionais no Brasil.</p>
    </div>
  </div>

  <div class="container sobre-page">
    <div class="sobre-content">

      <!-- 1. Proposta e Propósitos -->
      <div class="sobre-section">
        <h2>1. Proposta e Propósitos</h2>
        <p>O <strong>CarreiraMais</strong> é uma plataforma digital gratuita e responsiva com foco na recomendação personalizada de cursos e na conexão entre profissionais e o mercado de trabalho. A proposta une tecnologia e impacto social para democratizar o acesso à educação de qualidade e a oportunidades profissionais, especialmente para estudantes, recém-formados e profissionais em transição de carreira.</p>
        <p>A plataforma identifica as habilidades e interesses de cada usuário e, a partir disso, sugere cursos relevantes disponíveis em plataformas confiáveis como Coursera, Alura, SENAI, Fundação Bradesco, entre outras. Além da recomendação de cursos, o CarreiraMais conecta os usuários a vagas de emprego compatíveis com seu perfil, funcionando como um elo entre formação e mercado.</p>
      </div>

      <!-- 2. Objetivo -->
      <div class="sobre-section">
        <h2>2. Objetivo</h2>

        <h3>2.1 Objetivo Geral</h3>
        <p>Desenvolver uma plataforma web gratuita e responsiva que ofereça recomendações personalizadas de cursos e oportunidades de conexão profissional, contribuindo para a formação contínua dos usuários e facilitando o acesso ao mercado de trabalho.</p>

        <h3>2.2 Objetivos Específicos</h3>
        <ul>
          <li>Criar um sistema de cadastro que capture habilidades, formação e interesses dos usuários;</li>
          <li>Implementar um algoritmo de recomendação que associe o perfil do usuário a cursos e vagas relevantes;</li>
          <li>Disponibilizar um catálogo atualizado de cursos gratuitos e pagos de plataformas reconhecidas;</li>
          <li>Conectar usuários a empresas parceiras por meio de uma base de vagas segmentadas por área e perfil;</li>
          <li>Garantir acessibilidade e usabilidade em diferentes dispositivos e tamanhos de tela;</li>
          <li>Contribuir com os Objetivos de Desenvolvimento Sustentável (ODS 4 e ODS 8) da ONU.</li>
        </ul>
      </div>

      <!-- 3. Justificativa -->
      <div class="sobre-section">
        <h2>3. Justificativa</h2>
        <p>O Brasil enfrenta um paradoxo no mercado de trabalho: ao mesmo tempo em que milhões de pessoas buscam emprego ou qualificação, empresas relatam dificuldade em encontrar candidatos com o perfil técnico e comportamental adequado. Esse descompasso evidencia a necessidade de ferramentas que orientem trabalhadores e estudantes na escolha de cursos e na apresentação de suas competências ao mercado.</p>
        <p>Segundo o IBGE, a taxa de desemprego no Brasil ainda afeta milhões de pessoas, sendo especialmente alta entre jovens e pessoas com baixa escolaridade. Paralelamente, o avanço tecnológico exige constante atualização profissional, tornando o acesso à educação continuada um diferencial competitivo essencial.</p>
        <p>O CarreiraMais surge como uma resposta a essa realidade, oferecendo de forma gratuita uma plataforma que une educação, tecnologia e empregabilidade. Ao alinhar-se com a ODS 4 (Educação de Qualidade) e a ODS 8 (Trabalho Decente e Crescimento Econômico), a plataforma contribui para um desenvolvimento mais inclusivo e sustentável, promovendo oportunidades reais para todos.</p>
      </div>

      <!-- ODS Cards -->
      <div class="sobre-section">
        <h2 style="color:var(--text);border-color:var(--border)">Alinhamento com os ODS da ONU</h2>
        <div class="ods-cards-sobre">
          <div class="ods-card ods4">
            <div class="ods-icon"><span>ODS</span>4</div>
            <div class="ods-body">
              <h3>Educação de Qualidade</h3>
              <p>Garantir educação inclusiva, equitativa e de qualidade, promovendo oportunidades de aprendizagem ao longo da vida para todos — meta central da plataforma CarreiraMais.</p>
            </div>
          </div>
          <div class="ods-card ods8">
            <div class="ods-icon"><span>ODS</span>8</div>
            <div class="ods-body">
              <h3>Trabalho Decente e Crescimento</h3>
              <p>Promover o crescimento econômico inclusivo e o emprego pleno, produtivo e decente para todos — conectando pessoas qualificadas a oportunidades reais.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  `;
}

function initSobre() {
  // Static page, nothing needed
}
