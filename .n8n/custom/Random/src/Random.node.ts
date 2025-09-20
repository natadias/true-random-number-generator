import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription
} from "n8n-workflow";
import axios from "axios";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: { light: 'file:icon.svg', dark: 'file:icon.svg' },
    group: ["transform"],
    version: 1,
    description: "Gera um número inteiro aleatório usando a API do Random.org",
    defaults: {
      name: "Random",
    },
    inputs: ['main'] as const,
    outputs: ['main'] as const,
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        options: [
          {
            name: "True Random Number Generator",
            value: "generate",
            description: "Gera um número inteiro aleatório entre o valor máximo e máximo",
          },
        ],
        default: "generate",
      },
      {
        displayName: "Min",
        name: "min",
        type: "number",
        default: 1,
        description: "Número mínimo que pode ser gerado",
        required: true,
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        default: 60,
        description: "Número máximo que pode ser gerado",
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter("min", i) as number;
      const max = this.getNodeParameter("max", i) as number;

      if (min >= max) {
        throw new Error(`O valor mínimo (${min}) não pode ser maior ou igual ao máximo (${max})`);
      }

      const RANDOM_LIMIT = 1000000000;
      if (min < -RANDOM_LIMIT || max > RANDOM_LIMIT) {
        throw new Error(`Os valores devem estar entre -${RANDOM_LIMIT} e ${RANDOM_LIMIT}. Item index: ${i}`);
      }

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      try {
        const response = await axios.get(url, { responseType: 'text' });
        const randomNumber = parseInt(response.data.trim(), 10);

        if (isNaN(randomNumber)) {
          throw new Error(`Resposta inválida da API: ${response.data}`);
        }

        returnData.push({ json: { randomNumber } });
      } catch (error) {
        throw new Error(`Erro ao gerar número aleatório: ${(error as Error).message}`);
      }
    }

    return this.prepareOutputData(returnData);
  }
}
