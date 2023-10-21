export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: any;
    status: any;
    titulo: string;
    observacoes: string;
    tecnico: any;
    cliente: any;
    clinica: any;
    nomeCliente: string;
    nomeTecnico: string;
    nomeClinica: string;
    dataNascimento: string;
    dataEstudo: string;
    idade: any;
    sexo: string;
    raca: string;
    especie: string;
    responsavelPaciente: string;
    medicoRequerente: string;
    nomePaciente: string;
    crmv: string;
    regiaoExame: string;
    imagens: [];
    laudo: any;
}