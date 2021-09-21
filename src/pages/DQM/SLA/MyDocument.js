import React, { useEffect, useState } from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import awsmLogo from "../../../assets/images/AWSM-logo.png"
import { Html } from "react-pdf-html"

// Create styles
// const styles = StyleSheet.create({
//   mainSection: {
//     backgroundColor: "#ffffff",
//     padding: '10em 5em',
//   },
//   lftflt: {
//     float: 'left',
//   },
//   ritflt: {
//     float: 'right',
//   },
//   headerSection: {
//     flexDirection: 'row',
//   },

// })

// Create Document Component
function MyDocument(props) {
  const [gethtml, setGethtml] = useState("")

  useEffect(() => {
    const html = `
    <html>
    <body>
    <div style='background-color: #fff; padding: 4em 4em'>
      <div style='width: 100%;'>
          <div style="float: left;">
           <img src=${awsmLogo} />
          </div>
          <div style="float: right;">
            <table>
                <tbody>
                    <tr>
                        <td><p><strong>Module</strong></p></td>
                        <td><p>:Data Quality Management</p></td>
                    </tr>
                    <tr>
                        <td><p><strong>Last Updated</strong></p></td>
                        <td><p>:12 Mar 2021</p></td>
                    </tr>
                    <tr>
                        <td><p><strong>Download On</strong></p></td>
                        <td><p>:20 Mar 2021</p></td>
                    </tr>                    
                </tbody>
            </table>
          </div>       
      </div>
      
    </div>
    </body>
  </html>
  `
    setGethtml(html)
  }, [])

  return (
    <Document>
      <Page size="A4">
        <Html>{gethtml}</Html>
      <View style={styles.headersection}>
        <img src={awsmLogo} alt="AWSM Logo" className="vertical-hr-left" />
        <View>
        <Text></Text>
          </View>
      </View>
      {props.data.length &&
        props.data.map((item, index) => {
          return (
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
          )
        })} */}
      </Page>
    </Document>
  )
}

export default MyDocument