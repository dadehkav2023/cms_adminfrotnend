import { ErrorMessage, Field } from "formik";
import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { InpuLable } from "..";

const RichTextEditor = ({ name, data, significant, title, height }) => {
  return (
    <>
      <InpuLable lableText={title} significant={significant} />
      <Field
        name={name}
        value={data}
        render={({ field, form }: any) => {
          return (
            <>
              <div
                style={
                  form.touched[name] && form.errors.name
                    ? {
                        border: "1px solid #ff2222",
                        borderRadius: "7px",
                        overflow: "hidden",
                      }
                    : {}
                }
              >
                <SunEditor
                  height={height ? height + "px" : "500px"}
                  defaultValue={field.value}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e);
                  }}
                  setOptions={{
                    height: 200,
                    buttonList: buttonList.complex,
                    imageUploadUrl:
                      "https://api.admin.cms.sabakorg.ir/api/Uploader/UploadFileCKeeditor",
                  }}
                />
              </div>
            </>
          );
        }}
      />
      <span style={{ color: "#ff2222", fontSize: "11px" }}>
        <ErrorMessage name={name} />
      </span>
    </>
  );
};
export default RichTextEditor;
