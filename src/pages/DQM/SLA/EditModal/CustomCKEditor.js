import React,{useEffect} from 'react'
import CKEditor  from 'ckeditor4-react';

const config = {
    removeButtons : 'Styles,Strike,Underline,Superscript,Subscript',
    toolbarGroups : [
        { name: 'styles'},
        { name: 'basicstyles'},
        { name: 'paragraph', groups: ['list', 'indent', 'align', 'bidi' ] },
    ],
    contentsCss: [`${process.env.PUBLIC_URL}/resources/ckeditor.css`],
    allowedContent :true,
    removePlugins : 'magicline,elementspath,liststyle,contextmenu,tabletools,tableselection',
    disableNativeSpellChecker : false,
    fullPage :false,
    language :'en',
    height:'25em'
};


export default function CustomCKEditor(props){
    const { data } = props
    const InputDataHandler = () =>{
        return `
        <table class="sla-table-detail" style="width: 100%;">
        <tbody>
            <tr>
                <td class="item sla-td-1" id="sla-td-1">${data?.item || '&nbsp;'}</td>
                <td class="item sla-td-2" id="sla-td-2">${data?.description || '&nbsp;'}</td>
                <td class="item sla-td-3" id="sla-td-3">${data?.kpi || '&nbsp;'}</td>
                <td class="item sla-td-4" id="sla-td-4">${data?.mitigation_plan || '&nbsp;'}</td>
                <td class="item sla-td-5" id="sla-td-5">${data?.action_by || '&nbsp;'}</td>
                <td class="item sla-td-6" id="sla-td-6">${data?.module || '&nbsp;'}</td>
                <td class="item sla-td-7" id="sla-td-7">${data?.remarks || '&nbsp;'}</td>
            </tr>
        </tbody>
        </table>`
    }

    return (
        <CKEditor
            config={config}
            name="sla-detail"
            data={InputDataHandler()}
        />
    )
}
