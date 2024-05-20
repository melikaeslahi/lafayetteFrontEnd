'use client';
import   { useState, useEffect, useRef } from 'react'
import Input from './Input'
 
 

 

const  Editor = ({name ,title , containerClass}) =>{
 
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}
  
    useEffect(() => {
      editorRef.current = {
        // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor  ,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
      }
      setEditorLoaded(true)
    }, [])
 
    return(
  <Input name={name} title={title} containerClass={containerClass} >
      {({ field, form }) => {
          return (
              <>
                  <div>
                  {editorLoaded ? 
                      <CKEditor
                          editor={ClassicEditor}
                          onInit={(editor) => { this.editor = editor; }}
                          data={field.value}
                          onChange={(event, editor) => {
                              form.setFieldValue(field.name, editor.getData());
                          }}
                          className="dark:bg-zinc-600 bg-white dark:text-gray-100"
                      />
                    : <p>در حال بارگذاری</p>}
                  </div>
              </>
          )
      }}
 </Input>
    )
}
export default Editor;