export async function get(host, path) {
  const url = `${host}/${path}`;

  return await fetchTemplate(url);
}

export async function post(host, path, data, headers = {}) {
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

async function fetchTemplate(url, options = null) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw Error(data);
  }
}
