"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import React, { FC, useEffect, useRef } from "react";

interface CKeditorProps {
  form: any;
  name: any;
  editorLoaded?: boolean;
}

const CKeditor: FC<CKeditorProps> = ({ form, name, editorLoaded }) => {
  const editorRef = useRef<any>(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <div className="">
          {CKEditor && (
            <CKEditor
              editor={ClassicEditor}
              data={form.getValues(name)}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                form.setValue(name, data);
              }}
            />
          )}
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                <FormMessage className="mt-3 h-[500px]" />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CKeditor;
