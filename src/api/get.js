const host = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
const imageHost =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export async function getNodes(nodeId) {
  return await get(host, `/${nodeId}`).catch((error) => console.log(error));
}

export function getImage(path) {
  return `${imageHost}${path}`;
}

async function get(host, path, headers = {}) {
  const url = `${host}/${path}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}
