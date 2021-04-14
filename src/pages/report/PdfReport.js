import React from "react";
import {
  PDFViewer,
  Page,
  Font,
  Text,
  View,
  Document,
  StyleSheet,Image
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell
} from "@david.kucsai/react-pdf-table";


const styles = StyleSheet.create({
  page: {
   
    fontFamily: "Sarabun",
    paddingTop: 35,
    paddingbottom: 35,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  container:{
    alignSelf: 'center'
  }
});

Font.register({
  family: "Sarabun",
  fonts: [{ src: "./fonts/Sarabun-Regular.ttf" }],
});

const PdfReport = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const [isOnPdfView, setIsOnPdfView] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      console.log('set')
      setIsOnPdfView(true)
    }, 1000)
  }, [])

  return (
    <>
    {
      isOnPdfView && (
    
    <PDFViewer className="container-fluid mt-3" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Image style={{width:50,textAlign:"center" }} src="./logo192.png" />
        </View>
          <View style={styles.title}>
            <Text>รายงานการสั่งซื้อสินค้า</Text>
          </View>
          <Table
            data={cart}
          >
            <TableHeader textAlign={"center"}>
              <TableCell >รหัสสินค้า</TableCell>
              <TableCell >ชื่อสินค้า</TableCell>
              <TableCell>ราคา</TableCell>
              <TableCell>จำนวน</TableCell>
              <TableCell>รวม</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell style={{textAlign: 'center' }} getContent={(r) => r.id} />
              <DataTableCell style={{textAlign: 'center' }}getContent={(r) => r.name} />
              <DataTableCell style={{textAlign: 'center' }}getContent={(r) => r.price} />
              <DataTableCell style={{textAlign: 'center' }}getContent={(r) => r.qty} />
              <DataTableCell style={{textAlign: 'center' }}getContent={(r) => r.price * r.qty} />
            </TableBody>
          </Table>
        </Page>
      </Document>
    </PDFViewer>
      )
}
</>
  );
};

export default PdfReport;
