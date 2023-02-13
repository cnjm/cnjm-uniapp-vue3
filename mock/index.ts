import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import exampleMock from "./example";

export function setupProdMockServer() {
  createProdMockServer([...exampleMock]);
}
