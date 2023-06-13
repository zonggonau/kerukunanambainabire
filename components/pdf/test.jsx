import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
export default function Doctemplate({ data, img }) {
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
                <Text style={{ alignItems: "center", fontSize: 10 }}>
                  {data.anggota.jabatan}
                </Text>
              </View>
            </View>
            <View style={css.leftBox}>
              <View style={{ alignItems: "flex-start", padding: 5 }}>
                <Text style={css.textAbout}>Keret: {data.anggota.keret}</Text>
                <Text style={css.textAbout}>
                  TTL: {data.anggota.tempat_lahir}, {data.anggota.tanggal_lahir}
                </Text>
                <Text style={css.textAbout}>Gender: Pria</Text>
                <Text style={css.textAbout}>Status Perkawinan: Menikah</Text>
                <Text style={css.textAbout}>Agama: Kristen Katholik</Text>
                <Text style={css.textAbout}>Golongan Darah: 0</Text>
                <Text style={css.textAbout}>Email: cristoper@gmail.com</Text>
                <Text style={css.textAbout}>No HP: 081355315427</Text>
                <Text style={css.textAbout}>No KK: 2424234524</Text>
                <Text style={css.textAbout}>NO KTP: 24253452424</Text>
                <Text style={css.textAbout}>Distrik: Nabire</Text>
                <Text style={css.textAbout}>Kelurahan/Kampung: Morgo</Text>
                <Text style={css.textAbout}>RT/RW: 01/02</Text>
                <Text style={css.textAbout}>Alamat: Jln. Topo km 9</Text>
              </View>
            </View>
            <View style={css.leftBox}>
              <View style={{ alignItems: "flex-start", padding: 5 }}>
                <Text style={css.textAbout}>Pendidikan: Sarjana Teknik</Text>
                <Text style={css.textAbout}>Jabatan Pekerjaan: Dokter </Text>
                <Text style={css.textAbout}>
                  Pekerjaan: Pegawai Negri Sipil
                </Text>
                <Text style={css.textAbout}>Jabatan Kerukunan: Anggota</Text>
              </View>
            </View>
          </View>
          <View style={css.rightside}>
            {/* TENTANG SAYA */}
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
                  TENTANG SAYA
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
            {/* PENDIDIKAN FORMAL */}
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
                  PENDIDIKAN FORMAL
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
            {/* PENDIDIKAN NON FORMAL */}
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
                  PENDIDIKAN NON FORMAL
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
            {/* RIWAYAT PEKERJAAN */}
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
                  RIWAYAT PEKERJAAN
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
            {/* RIWAYAT PEKERJAAN */}
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
                  PENGALAMAN KERJA
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
                    fontSize: 11,
                    fontWeight: "extrabold",
                    color: "blue",
                  }}
                >
                  PENGHARGAAN DITERIMA
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
  textAbout: {
    fontSize: 10,
    padding: 2,
  },
});
