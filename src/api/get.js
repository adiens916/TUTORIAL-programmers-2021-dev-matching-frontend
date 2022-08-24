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

async function get(host, path) {
  const url = `${host}/${path}`;

  return await fetchTemplate(url);
}

async function post(host, path, data, headers = {}) {
  const url = `${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  };

  return await fetchTemplate(url, options);
}

async function fetchTemplate(url, options) {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw Error(data);
  }
}
