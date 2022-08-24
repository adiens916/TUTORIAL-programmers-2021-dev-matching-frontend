import { get } from "./fetch.js";

const host = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
const imageHost =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export async function getNodes(nodeId) {
  try {
    return await get(host, `/${nodeId}`);
  } catch (e) {
    console.log(e);
  }
}

export function getImage(path) {
  return `${imageHost}${path}`;
}
