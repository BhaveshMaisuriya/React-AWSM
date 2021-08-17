import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const MyDocument = props => (
  <Document>
    <Page size="A4" style={styles.page}>
      {props.data.length && (
          props.data.map((item, index)=> {
              return(
                <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              )
          })
       
      )}
    </Page>
  </Document>
)

export default MyDocument