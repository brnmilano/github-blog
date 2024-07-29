import { setupWorker } from "msw/browser";
import { env } from "../env";

/**
 * No momento em que eu chamo a função setupWorker, os mocks ainda não irão funcionar,
 * as requisições ainda não serão interceptadas. Apenas quando o worker.start() for chamado,
 * é que os mocks vão entrar em ação. A partir deste momento, todas as requisições feitas
 * vão ser interceptadas pelo MSW.
 */
export const worker = setupWorker();

/**
 * Se o modo de execução for diferente de "test", não é necessário iniciar o worker.
 * O worker só deve ser iniciado em ambiente de teste.
 *
 * A função enableMsw é chamada no arquivo src/main.tsx e faz o seguinte:
 * A variável MODE que está nas minhas variáveis de ambiente é igual a "test"? Se não,
 * não irá fazer nada e irá criar a aplicação React normalmente.
 *
 * Se for igual a test, antes de iniciar a aplicação, eu chamo a função enableMsw que
 * vai iniciar o worker e a partir deste momento, todas as requisições feitas na aplicação
 * vão ser interceptadas pelo MSW.
 *
 * Caso tudo funcione da maneira correta, no console irá aparecer a mensagem: `[MSW] Mocking enabled`.
 */
export async function enableMsw() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
