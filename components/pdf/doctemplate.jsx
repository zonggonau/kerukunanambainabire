import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Riwayat from "./riwayat";
export default function Doctemplate({ data, img }) {
  function formatDate(tgl) {
    const d = new Date(tgl);
    const tahun = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const mString = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const dateString = date + " " + mString[month - 1] + " " + tahun;
    return dateString;
  }
  return (
    <Document>
      <Page style={css.page} size="A4">
        <View style={css.section}>
          <View style={css.leftside}>
            <View style={css.leftBox}>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={css.imgprofile}
                  src={process.env.NEXT_PUBLIC_HOST + img}
                />
              </View>
              <View style={{ alignItems: "center", padding: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "900",
                    color: "black",
                  }}
                >
                  {data.anggota.nama}
                </Text>
                <Text style={{ alignItems: "center", fontSize: 9 }}>
                  {data.anggota.email}
                </Text>
              </View>
            </View>
            {data.anggota.desc == null ? (
              ""
            ) : (
              <View style={css.leftBox}>
                <View style={{ padding: 5 }}>
                  <View style={css.about}>
                    <Text style={css.textAbout}>{data.anggota.desc}</Text>
                  </View>
                </View>
              </View>
            )}

            <View style={css.leftBox}>
              <View style={{ padding: 5 }}>
                <View style={css.about}>
                  <Text style={css.textAbout}>Keret</Text>
                  <Text style={css.textAbout}>{data.anggota.keret}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>TTL</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.tempat_lahir}, {data.anggota.tanggal_lahir}
                  </Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Jenis Kelamin</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.jenis_kelamin}
                  </Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Status Perkawinan</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.status_perkawinan}
                  </Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Agama</Text>
                  <Text style={css.textAbout}>{data.anggota.agama}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Golongan Darah</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.golongan_darah}
                  </Text>
                </View>
                {/* <View style={css.about}>
                  <Text style={css.textAbout}>Email</Text>
                  <Text style={css.textAbout}>{data.anggota.email}</Text>
                </View> */}
                <View style={css.about}>
                  <Text style={css.textAbout}>No HP</Text>
                  <Text style={css.textAbout}>{data.anggota.phone}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>No KK</Text>
                  <Text style={css.textAbout}>{data.anggota.nkk}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>No KTP</Text>
                  <Text style={css.textAbout}>{data.anggota.nik}</Text>
                </View>
                <View style={css.aboutfooter}>
                  <Text style={css.textAbout}>Alamat</Text>
                  <Text style={css.textAbout}>{data.anggota.alamat}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>RT/RW</Text>
                  <Text style={css.textAbout}>{data.anggota.rt_rw}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Kel/Kamp</Text>
                  <Text style={css.textAbout}>{data.anggota.kelurahan}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Distrik</Text>
                  <Text style={css.textAbout}>{data.anggota.distrik}</Text>
                </View>
              </View>
            </View>
            <View style={css.leftBox}>
              <View style={{ padding: 5 }}>
                <View style={css.about}>
                  <Text style={css.textAbout}>Pendidikan</Text>
                  <Text style={css.textAbout}>{data.anggota.pendidikan}</Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Pekerjaan</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.pekerjaan_sekarang}
                  </Text>
                </View>
                <View style={css.about}>
                  <Text style={css.textAbout}>Jabatan Pekerjaan </Text>
                  <Text style={css.textAbout}>{data.anggota.jabatan}</Text>
                </View>
                <View style={css.aboutfooter}>
                  <Text style={css.textAbout}>Jabatan Kerukunan</Text>
                  <Text style={css.textAbout}>
                    {data.anggota.jabatan_kerukunan}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={css.rightside}>
            {/* RIWAYAT PEKERJAAN */}
            <Riwayat data={data.riwayat_pekerjaans} title="RIWAYAT PEKERJAAN" />
            {/* PENDIDIKAN FORMAL */}
            <Riwayat
              data={data.riwayat_pendidikans}
              title="RIWAYAT PENDIDIKAN"
            />

            {/* PENDIDIKAN NON FORMAL */}
            <Riwayat
              data={data.pendidikannonformals}
              title="RIWAYAT PENDIDIKAN NON FORMAL"
            />

            {/* RIWAYAT JABATAN */}
            <View style={css.rightBox}>
              <View
                style={{ padding: 7, borderBottom: 0.5, borderColor: "#ddd" }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "extrabold",
                    color: "blue",
                  }}
                >
                  RIWAYAT JABATAN
                </Text>
              </View>
              <View style={{ padding: 7 }}>
                <Text style={{ fontSize: 10 }}>
                  Diterjemahkan dari bahasa Inggris-about.me adalah layanan
                  hosting web pribadi yang didirikan bersama oleh Ryan Freitas,
                  Tony Conrad dan Tim Young pada Oktober 2009
                </Text>
              </View>
            </View>
            {/* PENGHARGAAN */}
            <View style={css.rightBox}>
              <View
                style={{ padding: 7, borderBottom: 0.5, borderColor: "#ddd" }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "extrabold",
                    color: "blue",
                  }}
                >
                  PENGHARGAAN DITERIMA
                </Text>
              </View>
              <View style={{ padding: 7 }}>
                {data.penghargaans.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      borderBottom: 0.4,
                      borderColor: "#ddd",
                    }}
                  >
                    <View>
                      <View>
                        <Text style={{ fontSize: 11 }}>{item.nama}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 8, color: "#aaa" }}>
                          {item.kota},{" "}
                        </Text>
                        <Text style={{ fontSize: 8, color: "#aaa" }}>
                          {formatDate(item.tgl_terima)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={css.textAbout}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            {/* KEANGGOTAN ORMAS */}
            <View style={css.rightBox}>
              <View
                style={{ padding: 7, borderBottom: 0.5, borderColor: "#ddd" }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "extrabold",
                    color: "blue",
                  }}
                >
                  KEANGGOTAAN ORMAS
                </Text>
              </View>
              <View style={{ padding: 7 }}>
                <Text style={{ fontSize: 10 }}>
                  Diterjemahkan dari bahasa Inggris-about.me adalah layanan
                  hosting web pribadi yang didirikan bersama oleh Ryan Freitas,
                  Tony Conrad dan Tim Young pada Oktober 2009
                </Text>
              </View>
            </View>
            {/* BAHASA ASING DIKUASAI */}
            <View style={css.rightBox}>
              <View
                style={{ padding: 7, borderBottom: 0.5, borderColor: "#ddd" }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "extrabold",
                    color: "blue",
                  }}
                >
                  BAHASA ASING DIKUASAI
                </Text>
              </View>
              <View style={{ padding: 7 }}>
                <Text style={{ fontSize: 10 }}>
                  Diterjemahkan dari bahasa Inggris-about.me adalah layanan
                  hosting web pribadi yang didirikan bersama oleh Ryan Freitas,
                  Tony Conrad dan Tim Young pada Oktober 2009
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const css = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  leftside: {
    // border: 0.9,
    // borderColor: "#ddd",
    width: 250,
    margin: 5,
  },
  rightside: {
    // border: 0.9,
    // borderColor: "#ddd",
    width: 500,
    margin: 5,
  },
  leftBox: {
    border: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rightBox: {
    border: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgprofile: {
    width: 177,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  about: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "0.4",
    borderColor: "#ddd",
  },
  aboutfooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAbout: {
    fontSize: 9,
    padding: 2,
    fontWeight: 900,
  },
});
