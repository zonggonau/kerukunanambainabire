const HOST = process.env.NEXT_PUBLIC_HOST;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

async function getPendidikan() {
  let req = await fetch(HOST + "/api/riwayat-pendidikans", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  let data = await req.json();
  return data;
}

async function getPekerjaan() {
  let req = await fetch(HOST + "/api/riwayat-pekerjaans", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  let data = await req.json();
  return data;
}

async function getKeret() {
  const reqKeret = await fetch(HOST + "/api/anggotas", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const { data: resKeret } = await reqKeret.json();
  return resKeret;
}

async function getJabatan() {
  const reqJabatan = await fetch(HOST + "/api/jabatans", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const { data: resJabatan } = await reqJabatan.json();
  return resJabatan;
}

async function getKerukunan() {
  const reqKerukunan = await fetch(HOST + "/api/jabatan-kerukunans", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const { data: resKerukunan } = await reqKerukunan.json();
  return resKerukunan;
}

async function getDistrik() {
  let req = await fetch(
    "http://www.emsifa.com/api-wilayah-indonesia/api/districts/9404.json"
  );

  let data = await req.json();
  return data;
}

export {
  getPendidikan,
  getPekerjaan,
  getKeret,
  getJabatan,
  getKerukunan,
  getDistrik,
};
