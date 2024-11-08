import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.css";
import MediaLib from "../MediaLib";

const CustomCKEditor = ({ onChange, name, value }) => {
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);

  const handleToggleMediaLib = () => {
    setMediaLibVisible((prev) => !prev);
  };

  const handleChangeAssets = (assets) => {
    if (editorInstance) {
      let newValue = value ? value : "";

      assets.forEach((asset) => {
        if (asset.mime.includes("image")) {
          const imgTag = `<p><img src="${asset.url}" alt="${asset.alt}" /></p>`;
          newValue = `${newValue}${imgTag}`;
        }
      });

      editorInstance.setData(newValue);
      onChange({ target: { name, value: newValue } });
    }
    handleToggleMediaLib();
  };

  return (
    <>
      <button
        onClick={handleToggleMediaLib}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #2977ff",
          color: "#2977ff",
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "12px"
        }}
      >
        Open Media Library
      </button>

      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "|",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
        }}
        data={value}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
          setEditorInstance(editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
      <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={handleToggleMediaLib}
      />
    </>
  );
};

export default CustomCKEditor;
