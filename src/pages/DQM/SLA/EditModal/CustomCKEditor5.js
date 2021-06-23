import React, { useState } from "react"
import AWSMButtonOption from "../../../../components/Common/AWSMButtonOption"
import EditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../../assets/images/AWSM-Trash-Icon.svg"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import "./index.scss"

const SLARecordEditor = ({ data, onChange }) => {
  const [editor, setEditor] = useState(null)

  const outFormatHandler = (input) =>{
    let data = input.split('<td>')
    let itemIdentifier = data[1].split('</td>')[0]
    let description = data[2].split('</td>')[0]
    let kpi = data[3].split('</td>')[0]
    let mitigation_plan = data[4].split('</td>')[0]
    let action_by = data[5].split('</td>')[0]
    let module = data[6].split('</td>')[0]
    let remarks = data[7].split('</td>')[0]
    return {
      itemIdentifier,
      description,
      kpi,
      mitigation_plan,
      action_by,
      module,
      remarks,
    }
  }

  const onEditorChange = (event, editor) => {
    if (editor) {
      let data = outFormatHandler(editor.getData())
      onChange(data)
    }
  }


  const InputDataHandler = () =>{
    return `
    <table class="sla-table-detail" style="width: 100%;">
    <tbody>
        <tr>
            <td>${data?.itemIdentifier || ''}</td>
            <td>${data?.description || ''}</td>
            <td>${data?.kpi || ''}</td>
            <td>${data?.mitigation_plan || ''}</td>
            <td>${data?.action_by || ''}</td>
            <td>${data?.module || ''}</td>
            <td>${data?.remarks || ''}</td>
        </tr>
    </tbody>
    </table>`
}

  return (
    <div className="sla-editor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "numberedList",
            "bulletedList",
            "|",
            "outdent",
            "indent",
            "|",
          ],
          removePlugins: ["TableToolbar"],
        }}
        id='sla-detail'
        name="sla-detail"
        data={InputDataHandler()}
        onChange={onEditorChange}
        onReady={editor => setEditor(editor)}
      />
    </div>
  )
}

export default SLARecordEditor
