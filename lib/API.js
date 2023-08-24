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
    "http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=9404"
  );

  let { kecamatan } = await req.json();
  return kecamatan;
}

async function getSumAnggota() {
  let qs = require("qs");
  let query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const anggota = await fetch(HOST + "/api/anggotas?" + query, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const data = await anggota.json();
  return data;
}

export {
  getPendidikan,
  getPekerjaan,
  getKeret,
  getJabatan,
  getKerukunan,
  getDistrik,
  getSumAnggota,
};
