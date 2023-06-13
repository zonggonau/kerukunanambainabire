import { Text, View, StyleSheet } from "@react-pdf/renderer";
export default function Riwayat({ data, title }) {
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
    <View style={css.rightBox}>
      <View style={{ padding: 7, borderBottom: 0.5, borderColor: "#ddd" }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "extrabold",
            color: "blue",
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ padding: 7 }}>
        {data.map((item, index) => (
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
                  {formatDate(item.star_date)} - {formatDate(item.finish_date)}
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
