import { z } from "zod";

/**
 * Validação para garantir que as variáveis de ambiente necessárias estejam presentes e sejam do tipo correto.
 */
const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === "true"),
  MODE: z.enum(["development", "production", "test"]),
});

/**
 * O método `parse` lança um erro se as variáveis de ambiente não corresponderem ao esquema.
 *
 * A variável `env` contém as variáveis de ambiente validadas.
 *
 * Variáveis prontas para serem utilizadas de forma segura no aplicativo.
 */
export const env = envSchema.parse(import.meta.env);
