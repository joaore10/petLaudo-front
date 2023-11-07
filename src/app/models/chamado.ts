export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: any;
    status: any;
    observacoes: string;
    tecnico: any;
    clinica: any;
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
    laudo: any;
    imagens: string[];
}